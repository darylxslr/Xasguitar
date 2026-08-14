from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.chord_estimator import analyze_audio
from app.core.audio_processor import save_temp_audio

router = APIRouter()


@router.post("/transcribe")
async def transcribe_audio(
    audio: UploadFile = File(...),
):
    if not audio.filename:
        raise HTTPException(status_code=400, detail="No audio file provided")

    file_path = await save_temp_audio(audio)
    result = analyze_audio(file_path)

    return {"chordTimeline": result["chords"]}
