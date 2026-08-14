from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Xasguitar Backend"
    debug: bool = False
    max_upload_size_mb: int = 50
    max_audio_seconds: int = 600
    temp_dir: str = "/tmp/xasguitar"
    audio_dir: str = "/tmp/xasguitar/audio"
    cors_origins: list[str] = ["http://localhost:3000"]
    yt_dlp_path: str = "yt-dlp"

    model_config = {"env_prefix": "XASGUITAR_"}


settings = Settings()
