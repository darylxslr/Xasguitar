# Xasguitar — Backend

FastAPI audio analysis service for guitar chord detection and song transcription.

## Tech Stack

| Layer       | Library                                    |
| ----------- | ------------------------------------------ |
| Framework   | FastAPI 0.115                              |
| Server      | Uvicorn 0.30                               |
| Validation  | Pydantic 2 + pydantic-settings             |
| Audio       | librosa 0.10 (chroma CQT, beat tracking)   |
| Download    | yt-dlp (async subprocess for audio)        |
| Python      | ≥ 3.11                                     |

## Directory Structure

```
app/
├── __init__.py
├── main.py              FastAPI app entry point + CORS + health check
├── config.py            Pydantic settings (env prefix: XASGUITAR_)
├── api/
│   ├── router.py        Aggregates all v1 routers
│   └── v1/
│       ├── analyze.py   POST /api/v1/analyze — YouTube URL or uploaded audio → Song
│       ├── transcribe.py POST /api/v1/transcribe — audio file → chord timeline
│       └── metadata.py  GET /api/v1/metadata — YouTube URL → video metadata
├── core/
│   ├── audio_processor.py   YouTube download + upload handling
│   └── chord_estimator.py   librosa-based chord estimation (chroma CQT, argmax)
├── models/
│   └── song.py          Pydantic models: Song, SongMetadata, MediaInfo, ChordEvent
└── utils/
    └── file_handler.py  Temp file cleanup helpers

tests/
├── test_analyze.py            Integration tests (health, analyze validation)
└── test_chord_estimator.py    Unit tests (fallback chords)
```

## API Reference

### `GET /health`

Health check.

```json
{ "status": "ok", "service": "Xasguitar Backend" }
```

### `POST /api/v1/analyze`

Analyze a song from a YouTube URL or uploaded audio file.

| Parameter | Type     | Location | Description            |
| --------- | -------- | -------- | ---------------------- |
| `url`     | `string` | form     | YouTube URL            |
| `audio`   | `file`   | form     | Audio file upload      |

Returns a `Song` object with metadata, chord timeline, and tablature data.

### `POST /api/v1/transcribe`

Transcribe chords from an uploaded audio file.

| Parameter | Type   | Location | Description       |
| --------- | ------ | -------- | ----------------- |
| `audio`   | `file` | form     | Audio file upload |

```json
{ "chordTimeline": [{ "timestamp": 0.0, "chord": "C", "lyrics": "" }, ...] }
```

### `GET /api/v1/metadata`

Extract video metadata from a YouTube URL.

| Parameter | Type     | Location  | Description |
| --------- | -------- | --------- | ----------- |
| `url`     | `string` | query     | YouTube URL |

```json
{ "sourceType": "youtube", "sourceUrl": "...", "videoId": "...", "audioDuration": 0, "extracted": true }
```

## Configuration

All settings use the `XASGUITAR_` prefix.

| Variable                     | Default                    | Description                    |
| ---------------------------- | -------------------------- | ------------------------------ |
| `XASGUITAR_APP_NAME`         | Xasguitar Backend          | Service name                   |
| `XASGUITAR_DEBUG`            | `false`                    | Debug mode                     |
| `XASGUITAR_MAX_UPLOAD_SIZE_MB` | `50`                     | Max upload file size           |
| `XASGUITAR_TEMP_DIR`         | `/tmp/xasguitar`           | Temporary audio file directory |
| `XASGUITAR_CORS_ORIGINS`     | `["http://localhost:3000"]`| Allowed CORS origins           |
| `XASGUITAR_YT_DLP_PATH`      | `yt-dlp`                   | Path to yt-dlp executable      |

## Setup

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload    # → http://localhost:8000
```

### Tests

```bash
pytest
```

## Pipeline

```
YouTube URL  ──► yt-dlp (async) ──► temp MP3 ──► librosa (chroma CQT) ──► chord labels
Uploaded file ──► save_temp_audio() ──► librosa (chroma CQT) ──► chord labels
```

## Current Limitations

- `/analyze` returns stub metadata (hardcoded key=C, bpm=120). Real chord estimation runs only in `/transcribe`.
- Chord detection uses single-note argmax (no chord quality — only root notes like C, G, Am).
- No cleanup of temporary audio files after processing.
- Default temp dir is Unix-style (`/tmp`). On Windows, set `XASGUITAR_TEMP_DIR` explicitly.
