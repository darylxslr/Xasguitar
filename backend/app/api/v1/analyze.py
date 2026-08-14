import asyncio
import uuid

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel

from app.models.song import Song
from app.core.audio_processor import (
    process_youtube_url,
    save_uploaded_audio,
    analyze_stored_audio,
)

router = APIRouter()

JOBS: dict[str, dict] = {}


class JobOut(BaseModel):
    jobId: str
    status: str
    progress: str = ""
    error: str = ""
    song: Song | None = None


@router.post("/analyze", response_model=JobOut, status_code=202)
async def analyze_song(
    url: str = Form(None),
    audio: UploadFile = File(None),
):
    if not url and not audio:
        raise HTTPException(status_code=400, detail="Provide either a URL or an audio file")

    job_id = _new_job()

    if url:
        asyncio.create_task(_run_url_job(job_id, url))
    else:
        storage = await save_uploaded_audio(audio)
        asyncio.create_task(_run_upload_job(job_id, storage))

    return JobOut(jobId=job_id, status="queued")


@router.get("/analyze/{job_id}", response_model=JobOut)
async def get_analysis(job_id: str):
    job = JOBS.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Analysis job not found")
    return JobOut(
        jobId=job_id,
        status=job["status"],
        progress=job["progress"],
        error=job["error"],
        song=job["song"],
    )


def _new_job() -> str:
    job_id = uuid.uuid4().hex
    JOBS[job_id] = {"status": "queued", "progress": "", "error": "", "song": None}
    return job_id


def _set_progress(job: dict):
    def set_progress(message: str) -> None:
        job["progress"] = message
        if message.startswith("Analyzing"):
            job["status"] = "analyzing"
    return set_progress


def _finish(job: dict, song: Song) -> None:
    job["status"] = "done"
    job["song"] = song


def _fail(job: dict, message: str) -> None:
    job["status"] = "error"
    job["error"] = message


async def _run_url_job(job_id: str, url: str) -> None:
    job = JOBS[job_id]
    job["status"] = "downloading"
    job["progress"] = "Fetching track info…"
    try:
        song = await process_youtube_url(url, on_progress=_set_progress(job))
        _finish(job, song)
    except HTTPException as exc:
        _fail(job, str(exc.detail))
    except Exception as exc:  # pragma: no cover - defensive
        _fail(job, f"Analysis failed: {exc}")


async def _run_upload_job(job_id: str, storage: dict) -> None:
    job = JOBS[job_id]
    job["status"] = "analyzing"
    job["progress"] = "Analyzing audio…"
    try:
        song = await analyze_stored_audio(
            storage["id"],
            storage["title"],
            storage["artist"],
            "upload",
            "",
            storage["path"],
            on_progress=_set_progress(job),
        )
        _finish(job, song)
    except Exception as exc:  # pragma: no cover - defensive
        _fail(job, f"Analysis failed: {exc}")
