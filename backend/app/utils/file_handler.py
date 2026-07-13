import os
import tempfile
from pathlib import Path


def cleanup_temp_file(file_path: str) -> None:
    try:
        if os.path.exists(file_path):
            os.unlink(file_path)
    except OSError:
        pass


def get_temp_dir() -> Path:
    temp_dir = Path(tempfile.gettempdir()) / "xasguitar"
    temp_dir.mkdir(parents=True, exist_ok=True)
    return temp_dir
