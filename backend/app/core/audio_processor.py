import os
import tempfile
import asyncio
from pathlib import Path
from fastapi import UploadFile
from app.config import settings
from app.models.song import Song, SongMetadata, MediaInfo, ChordEvent


async def process_youtube_url(url: str) -> Song:
    temp_dir = Path(settings.temp_dir)
    temp_dir.mkdir(parents=True, exist_ok=True)

    output_template = str(temp_dir / "%(id)s.%(ext)s")

    process = await asyncio.create_subprocess_exec(
        settings.yt_dlp_path,
        "-x",
        "--audio-format", "mp3",
        "-o", output_template,
        url,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    await process.communicate()

    return Song(
        id="",
        title="Analyzed Song",
        artist="Unknown Artist",
        metadata=SongMetadata(
            key="C",
            scale="major",
            bpm=120,
            timeSignature="4/4",
            recommendedCapo=0,
        ),
        media=MediaInfo(
            sourceType="youtube",
            sourceUrl=url,
            audioDuration=0,
        ),
        chordTimeline=[],
        tablatureData="",
    )


async def process_uploaded_file(audio: UploadFile) -> Song:
    file_path = await save_temp_audio(audio)

    return Song(
        id="",
        title=audio.filename or "Uploaded Song",
        artist="Unknown Artist",
        metadata=SongMetadata(
            key="C",
            scale="major",
            bpm=120,
            timeSignature="4/4",
            recommendedCapo=0,
        ),
        media=MediaInfo(
            sourceType="upload",
            sourceUrl="",
            audioDuration=0,
        ),
        chordTimeline=[],
        tablatureData="",
    )


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
