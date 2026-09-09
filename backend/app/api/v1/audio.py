import mimetypes
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse, StreamingResponse

from app.config import settings

router = APIRouter()

AUDIO_ID_RE = re.compile(r"^([0-9a-f]{32})\.(mp3|wav|flac|ogg|m4a|aac|webm)$")


@router.get("/audio/{audio_id}")
async def get_audio(request: Request, audio_id: str):
    path = _resolve_audio(audio_id)
    total = path.stat().st_size
    media_type = mimetypes.guess_type(path.name)[0] or "audio/mpeg"

    range_header = request.headers.get("range")
    if range_header:
        match = re.match(r"^bytes=(\d*)-(\d*)$", range_header)
        if match and match.group(1) != "":
            start = int(match.group(1))
            if start >= total:
                raise HTTPException(status_code=416, detail="Range not satisfiable")
            end = int(match.group(2)) if match.group(2) else total - 1
            end = min(end, total - 1)
            content_length = end - start + 1

            def iter_range():
                with open(path, "rb") as f:
                    f.seek(start)
                    remaining = content_length
                    while remaining > 0:
                        chunk = f.read(min(65536, remaining))
                        if not chunk:
                            break
                        remaining -= len(chunk)
                        yield chunk

            return StreamingResponse(
                iter_range(),
                status_code=206,
                media_type=media_type,
                headers={
                    "Content-Range": f"bytes {start}-{end}/{total}",
                    "Accept-Ranges": "bytes",
                    "Content-Length": str(content_length),
                },
            )

    return FileResponse(
        path,
        media_type=media_type,
        headers={"Accept-Ranges": "bytes"},
    )


def _resolve_audio(audio_id: str) -> Path:
    if not AUDIO_ID_RE.match(audio_id):
        raise HTTPException(status_code=404, detail="Audio not found")
    path = Path(settings.audio_dir) / audio_id
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Audio not found")
    return path