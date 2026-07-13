from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.song import Song, SongMetadata, MediaInfo, ChordEvent
from app.core.audio_processor import process_youtube_url, process_uploaded_file

router = APIRouter()


@router.post("/analyze", response_model=Song)
async def analyze_song(
    url: str = Form(None),
    audio: UploadFile = File(None),
):
    if not url and not audio:
        raise HTTPException(status_code=400, detail="Provide either a URL or an audio file")

    if url:
        result = await process_youtube_url(url)
    else:
        result = await process_uploaded_file(audio)

    return result
