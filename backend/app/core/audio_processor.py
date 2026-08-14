import asyncio
import json
import re
import shutil
import tempfile
import uuid
from pathlib import Path
from typing import Callable, Optional

from fastapi import HTTPException, UploadFile

from app.config import settings
from app.core.chord_estimator import analyze_audio
from app.models.song import Song, SongMetadata, MediaInfo, ChordEvent

ProgressCallback = Optional[Callable[[str], None]]


async def process_youtube_url(url: str, on_progress: ProgressCallback = None) -> Song:
    audio_dir = _audio_dir()
    audio_id = uuid.uuid4().hex
    subdir = audio_dir / audio_id
    subdir.mkdir(parents=True, exist_ok=True)

    info = None
    try:
        info = await _fetch_youtube_info(url)
    except HTTPException:
        info = None

    duration = (info or {}).get("duration")
    if duration and duration > settings.max_audio_seconds:
        raise HTTPException(
            status_code=413,
            detail=(
                f"Track is about {int(duration // 60)} minutes long — "
                f"the limit is {settings.max_audio_seconds // 60} minutes."
            ),
        )

    if on_progress:
        on_progress("Downloading audio…")
    try:
        downloaded = await _download_youtube_audio(url, subdir, on_progress)
        stored = _store_audio(downloaded, audio_id, "mp3")
    finally:
        shutil.rmtree(subdir, ignore_errors=True)
    title = (info or {}).get("title") or "Analyzed Song"
    artist = (info or {}).get("uploader") or "Unknown Artist"
    return await analyze_stored_audio(
        audio_id, title, artist, "youtube", url, stored, on_progress
    )


async def save_uploaded_audio(audio: UploadFile) -> dict:
    audio_dir = _audio_dir()
    audio_id = uuid.uuid4().hex
    ext = Path(audio.filename or "audio.mp3").suffix.lower() or ".mp3"
    stored = audio_dir / f"{audio_id}{ext}"
    stored.write_bytes(await audio.read())

    return {
        "id": audio_id,
        "path": str(stored),
        "title": Path(audio.filename or "Uploaded Song").stem or "Uploaded Song",
        "artist": "Unknown Artist",
    }


async def analyze_stored_audio(
    audio_id: str,
    title: str,
    artist: str,
    source_type: str,
    source_url: str,
    audio_path: str,
    on_progress: ProgressCallback = None,
) -> Song:
    if on_progress:
        on_progress("Analyzing audio…")
    result = await asyncio.to_thread(analyze_audio, audio_path)
    return _build_song(audio_id, title, artist, source_type, source_url, result, audio_path)


async def save_temp_audio(audio: UploadFile) -> str:
    temp_dir = Path(settings.temp_dir)
    temp_dir.mkdir(parents=True, exist_ok=True)

    suffix = Path(audio.filename or "audio.mp3").suffix
    with tempfile.NamedTemporaryFile(
        delete=False, suffix=suffix, dir=temp_dir
    ) as tmp:
        content = await audio.read()
        tmp.write(content)
        return tmp.name


def _build_song(
    audio_id: str,
    title: str,
    artist: str,
    source_type: str,
    source_url: str,
    result: dict,
    audio_path: str,
) -> Song:
    return Song(
        id=audio_id,
        title=title,
        artist=artist,
        metadata=SongMetadata(
            key=result["key"] or "C",
            scale=result["scale"],
            bpm=result["bpm"] or 120,
            timeSignature="4/4",
            recommendedCapo=0,
        ),
        media=MediaInfo(
            sourceType=source_type,
            sourceUrl=source_url,
            audioDuration=result["duration"],
            audioUrl=f"/api/v1/audio/{audio_id}{Path(audio_path).suffix}",
        ),
        chordTimeline=[ChordEvent(**c) for c in result["chords"]],
        tablatureData="",
    )


def _audio_dir() -> Path:
    audio_dir = Path(settings.audio_dir)
    audio_dir.mkdir(parents=True, exist_ok=True)
    return audio_dir


def _store_audio(source_path: str, audio_id: str, ext: str) -> str:
    stored = _audio_dir() / f"{audio_id}.{ext}"
    shutil.move(source_path, stored)
    return str(stored)


async def _fetch_youtube_info(url: str) -> dict:
    process = await asyncio.create_subprocess_exec(
        settings.yt_dlp_path,
        "-J",
        url,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=60)
    if process.returncode != 0:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch track info: {stderr.decode()[:200]}",
        )
    return json.loads(stdout)


async def _download_youtube_audio(
    url: str, subdir: Path, on_progress: ProgressCallback = None
) -> str:
    output_template = str(subdir / "%(title)s.%(ext)s")
    process = await asyncio.create_subprocess_exec(
        settings.yt_dlp_path,
        "-x",
        "--audio-format", "mp3",
        "--no-playlist",
        "-o", output_template,
        url,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    stderr_tail: list[str] = []

    async def _read_stderr():
        assert process.stderr is not None
        while True:
            line = await process.stderr.readline()
            if not line:
                break
            text = line.decode(errors="ignore").rstrip()
            if text:
                stderr_tail.append(text)
            if on_progress and "[download]" in text:
                match = re.search(r"(\d+(?:\.\d+)?)%", text)
                if match:
                    on_progress(f"Downloading… {match.group(1)}%")

    stderr_task = asyncio.create_task(_read_stderr())
    try:
        await asyncio.wait_for(process.wait(), timeout=300)
    except asyncio.TimeoutError:
        process.kill()
        await process.wait()
        raise HTTPException(status_code=502, detail="Download timed out")
    await stderr_task

    if process.returncode != 0:
        detail = " ".join(stderr_tail[-4:])[:200] or "yt-dlp failed"
        raise HTTPException(status_code=502, detail=f"Failed to download audio: {detail}")

    files = [p for p in subdir.iterdir() if p.is_file() and p.suffix.lower() == ".mp3"]
    if not files:
        raise HTTPException(status_code=502, detail="Downloaded audio not found")
    return str(files[0])