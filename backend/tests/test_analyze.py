import asyncio
import io
import uuid
import wave
from pathlib import Path

import numpy as np
import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

from app.main import app
from app.config import settings
from app.core import audio_processor
from app.core.audio_processor import analyze_stored_audio

client = TestClient(app)


@pytest.fixture(autouse=True)
def isolated_audio_dir(tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "audio_dir", str(tmp_path / "audio"))
    d = Path(settings.audio_dir)
    d.mkdir(parents=True, exist_ok=True)
    return d


def _chord_wav_bytes(sr=22050, seconds=4.0) -> bytes:
    freqs = [261.63, 329.63, 392.00]
    t = np.linspace(0, seconds, int(sr * seconds), endpoint=False)
    signal = np.zeros_like(t)
    for f in freqs:
        signal += 0.2 * np.sin(2 * np.pi * f * t)
    pcm = (0.5 * signal * 32767).astype("<i2")

    with io.BytesIO() as buf:
        with wave.open(buf, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(sr)
            w.writeframes(pcm.tobytes())
        return buf.getvalue()


def _make_song(audio_dir):
    """Run the upload analysis pipeline directly (avoids TestClient's
    background-task scheduling, which does not progress to_thread jobs)."""
    audio_id = uuid.uuid4().hex
    path = audio_dir / f"{audio_id}.wav"
    path.write_bytes(_chord_wav_bytes())
    song = asyncio.run(
        analyze_stored_audio(audio_id, "Test Title", "Test Artist", "upload", "", str(path))
    )
    return song


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_analyze_no_input():
    response = client.post("/api/v1/analyze")
    assert response.status_code == 400


def test_analyze_creates_job():
    response = client.post(
        "/api/v1/analyze",
        files={"audio": ("chord.wav", _chord_wav_bytes(), "audio/wav")},
    )
    assert response.status_code == 202
    job = response.json()
    assert job["jobId"]
    assert job["status"] == "queued"

    poll = client.get(f"/api/v1/analyze/{job['jobId']}")
    assert poll.status_code == 200
    assert poll.json()["jobId"] == job["jobId"]


def test_analysis_job_not_found():
    assert client.get("/api/v1/analyze/doesnotexist").status_code == 404


def test_audio_not_found():
    assert client.get("/api/v1/audio/not-a-valid-id.mp3").status_code == 404


def test_analyzed_audio_served_with_range(isolated_audio_dir):
    song = _make_song(isolated_audio_dir)
    url = song.media.audioUrl

    full = client.get(url)
    assert full.status_code == 200
    assert full.headers["content-type"].startswith("audio/")

    ranged = client.get(url, headers={"Range": "bytes=0-99"})
    assert ranged.status_code == 206
    assert ranged.headers["content-range"].startswith("bytes 0-99/")
    assert len(ranged.content) == 100


def test_analysis_populates_song(isolated_audio_dir):
    song = _make_song(isolated_audio_dir)
    assert song.media.audioDuration > 0
    assert song.metadata.bpm > 0
    assert song.media.audioUrl.startswith("/api/v1/audio/")
    assert song.chordTimeline


def test_youtube_length_guard(monkeypatch):
    async def fake_info(url):
        return {"duration": settings.max_audio_seconds * 2, "title": "Long Song"}

    monkeypatch.setattr(audio_processor, "_fetch_youtube_info", fake_info)

    with pytest.raises(HTTPException) as exc:
        asyncio.run(
            audio_processor.process_youtube_url("https://youtube.com/watch?v=abcdefghijk")
        )
    assert exc.value.status_code == 413


def test_youtube_download_stored_before_cleanup(monkeypatch, isolated_audio_dir):
    async def fake_info(url):
        return {"duration": 180, "title": "Test Song", "uploader": "Test Artist"}

    async def fake_download(url, subdir, on_progress=None):
        (subdir / "Test Song.mp3").write_bytes(b"fake-mp3")
        return str(subdir / "Test Song.mp3")

    monkeypatch.setattr(audio_processor, "_fetch_youtube_info", fake_info)
    monkeypatch.setattr(audio_processor, "_download_youtube_audio", fake_download)

    song = asyncio.run(
        audio_processor.process_youtube_url("https://youtube.com/watch?v=abcdefghijk")
    )

    assert song.media.audioUrl.endswith(f"/{song.id}.mp3")
    assert (isolated_audio_dir / f"{song.id}.mp3").is_file()
    assert not (isolated_audio_dir / song.id).exists()