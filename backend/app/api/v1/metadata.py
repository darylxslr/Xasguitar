from fastapi import APIRouter, Query, HTTPException
import re

router = APIRouter()

YT_REGEX = re.compile(
    r"(?:youtube\.com/(?:watch\?v=|embed/|v/|shorts/)|youtu\.be/)([a-zA-Z0-9_-]{11})"
)


@router.get("/metadata")
async def get_metadata(url: str = Query(...)):
    match = YT_REGEX.search(url)
    if not match:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

    video_id = match.group(1)
    return {
        "sourceType": "youtube",
        "sourceUrl": url,
        "videoId": video_id,
        "audioDuration": 0,
        "extracted": True,
    }
