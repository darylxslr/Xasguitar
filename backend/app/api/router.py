from fastapi import APIRouter

from app.api.v1.analyze import router as analyze_router
from app.api.v1.transcribe import router as transcribe_router
from app.api.v1.metadata import router as metadata_router

api_router = APIRouter()

api_router.include_router(analyze_router, tags=["analysis"])
api_router.include_router(transcribe_router, tags=["transcription"])
api_router.include_router(metadata_router, tags=["metadata"])
