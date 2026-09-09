# Xasguitar

An open-source guitar learning platform with song analysis, chord detection, tablature, and a structured academy curriculum. No login required — everything is free and unlocked.

## Features

- **Song Analysis Studio** — Paste a YouTube URL or upload an audio file to analyze chords and view synchronized waveform playback
- **Chord Library** — Browse 40+ chord shapes across 10 categories (Open, Barre, 7th, Major 7th, Minor 7th, Sus, Add9, 6th, Dim/Aug, Power) with interactive fretboard diagrams
- **Academy Curriculum** — 15 unlocked lessons across Beginner/Intermediate/Advanced tracks with YouTube embeds
- **Smart Input Bar** — Three input modes: YouTube URL, file upload, or MusicBrainz text search
- **Music Theory Engine** — Chord voicings, scale generation, transposition, finger assignment, and capo recommendation
- **Waveform Player** — Synchronized playback with speed/volume controls and keyboard shortcuts
- **Dark/Light Theme** — Persisted to localStorage

## Architecture

```
frontend/          Next.js 16 + React 19 SPA
  ├── app/         App Router pages (studio, academy, chords, settings)
  ├── components/  UI, layout, studio, academy, chord components
  ├── lib/         API clients, audio processing, music theory engine
  ├── stores/      Zustand state management (studio store)
  └── types/       Song, Lesson, ChordShape, theory type definitions

backend/           Python FastAPI service
  ├── app/
  │   ├── api/     REST endpoints (analyze, transcribe, metadata)
  │   ├── core/    Audio processing & chord estimation (librosa)
  │   ├── models/  Pydantic data models (Song, SongMetadata, ChordEvent)
  │   └── config/  Environment-based settings (XASGUITAR_ prefix)
  └── tests/       Pytest test suite
```

## Tech Stack

### Frontend

| Layer            | Library                                                    |
| ---------------- | ---------------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19                          |
| Language         | TypeScript 5 (strict)                                      |
| Styling          | Tailwind CSS v4 (CSS-first config)                         |
| State            | Zustand 5                                                  |
| Data Fetching    | TanStack React Query 5                                     |
| Animations       | Framer Motion 12                                           |
| Audio            | WaveSurfer.js 7, Tone.js 15                                |
| Music Theory     | Tonal.js 4                                                 |
| Icons            | Lucide React, Tabler Icons                                 |

### Backend

| Layer       | Library                                    |
| ----------- | ------------------------------------------ |
| Framework   | FastAPI 0.115                              |
| Server      | Uvicorn 0.30                               |
| Validation  | Pydantic 2 + pydantic-settings             |
| Audio       | librosa 0.10 (chroma CQT, beat tracking)   |
| Download    | yt-dlp (async subprocess for audio)        |
| Python      | ≥ 3.11                                     |

## Quick Start

### Prerequisites

- Node.js ≥ 20
- Python ≥ 3.11
- yt-dlp (for YouTube audio extraction)

### Frontend

```bash
cd frontend
npm install
npm run dev      # → http://localhost:3000
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload   # → http://localhost:8000
```

Set `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000` in the frontend environment to connect them.

### Windows Quick Start

Use the provided batch script:

```cmd
run.bat both   # Start both servers in separate windows
run.bat test   # Run backend tests
run.bat build  # Build frontend for production
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

Transcribe chords from an uploaded audio file using librosa chroma CQT analysis.

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

## Music Theory Engine

### Chord Voicings (`frontend/src/lib/theory/voicings.ts`)

- 40+ chord shapes defined with precise finger positions, string/fret data, and barre markers
- Chord categories: Open, Barre, 7th, Major 7th, Minor 7th, Sus, Add9, 6th, Dim/Aug, Power
- `getChordShape()` returns fretboard positions for a given chord

### Transposition (`frontend/src/lib/theory/transposition.ts`)

- `transposeChord(chord, semitones)` — Transpose a chord by semitones
- `transposeChordTimeline(chords, semitones)` — Transpose an entire chord progression
- `transposeKey(key, semitones)` — Transpose a key signature

### Capo (`frontend/src/lib/theory/capo.ts`)

- `applyCapo(chord, capoFret)` — Apply capo transposition to a chord
- `recommendCapo(chords, originalKey)` — Suggest capo positions that simplify chord shapes for beginners
- `getChordDifficulty(chord)` — Classify chords as "easy", "medium", or "hard"

### Scales (`frontend/src/lib/theory/scales.ts`)

- `generateScale(root, scaleType)` — Generate scale patterns (major, minor, pentatonic, blues)
- `getScaleDegrees(root, scaleType)` — Get scale degree notes

## Key Components

### Studio Page (`/studio/[id]`)

- **SmartInputBar** — YouTube URL, file upload, or text search input
- **WaveformPlayer** — Synchronized audio playback with WaveSurfer.js
- **ChordTimeline** — Visual chord progression timeline
- **TablatureView** — Guitar tablature display
- **SongHeader** — Song metadata (title, artist, key, BPM, capo)
- **TheoryDrawer** — Music theory information panel
- **CapoCalculator** — Interactive capo recommendation tool
- **ChordTooltip** — Hover tooltip for chord names
- **FretboardOverlay** — Fretboard visualization

### Academy (`/academy`)

- **DashboardHeader** — Curriculum overview
- **CurriculumGrid** — Track-based lesson grid (Beginner/Intermediate/Advanced)
- **LessonCard** — Individual lesson preview card
- **LessonPlayer** — YouTube embed with lesson content
- **InteractiveFretboard** — Rendered fretboard with highlighted positions
- **VideoEmbed** — YouTube video player component
- **StatsBar** — Lesson statistics

### Chords (`/chords`)

- **ChordLibrary** — Grid of chord categories and shapes
- **ChordCard** — Individual chord card with diagram
- **ChordDiagram** — SVG fretboard diagram renderer
- **ChordPopup** — Interactive chord detail popup
- **HandDiagram** — Finger positioning visualization

### UI Components (`/components/ui`)

Badge, Button, Card, Drawer, Input, Pill, Slider, Tooltip

## Data Flow

```
User Input (URL/File/Search)
    │
    ├── YouTube URL ──► Backend /api/v1/analyze ──► yt-dlp download ──► librosa analysis ──► Song object
    ├── File Upload  ──► Backend /api/v1/analyze ──► save_temp_audio ──► librosa analysis ──► Song object
    └── Text Search  ──► MusicBrainz API ──► Search results
    │
    ▼
Frontend Studio Store (Zustand)
    │
    ├── Song state
    ├── Capo/Transpose state
    ├── Playback state (useAudioPlayer hook)
    └── Keyboard shortcuts (useKeyboardShortcuts hook)
    │
    ▼
React Components (Studio, ChordLibrary, Academy, etc.)
```

## Configuration

### Frontend Environment

| Variable                     | Default                   | Description                    |
| ---------------------------- | ------------------------- | ------------------------------ |
| `NEXT_PUBLIC_BACKEND_URL`    | `http://localhost:8000`   | Python backend base URL        |

### Backend Environment (XASGUITAR_ prefix)

| Variable                     | Default                    | Description                    |
| ---------------------------- | -------------------------- | ------------------------------ |
| `XASGUITAR_APP_NAME`         | Xasguitar Backend          | Service name                   |
| `XASGUITAR_DEBUG`            | `false`                    | Debug mode                     |
| `XASGUITAR_MAX_UPLOAD_SIZE_MB` | `50`                     | Max upload file size           |
| `XASGUITAR_TEMP_DIR`         | `/tmp/xasguitar`           | Temporary audio file directory |
| `XASGUITAR_CORS_ORIGINS`     | `["http://localhost:3000"]`| Allowed CORS origins           |
| `XASGUITAR_YT_DLP_PATH`      | `yt-dlp`                   | Path to yt-dlp executable      |

## Directory Structure

```
.
├── README.md              This file
├── run.bat               Windows startup script
├── vercel.json           Vercel deployment config
├── frontend/
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── src/
│       ├── app/                   Next.js App Router
│       │   ├── (main)/           Route group with shared NavBar
│       │   │   ├── page.tsx      Home page
│       │   │   ├── academy/      Curriculum pages
│       │   │   ├── chords/       Chord library
│       │   │   ├── settings/     Settings page
│       │   │   └── studio/[id]/  Song analysis workspace
│       │   └── api/metadata/     Backend proxy route
│       ├── components/
│       │   ├── academy/          Academy components
│       │   ├── chords/           Chord library components
│       │   ├── layout/           NavBar, SearchBar
│       │   ├── studio/           Studio workspace components
│       │   └── ui/               Reusable UI primitives
│       ├── constants/            Music theory constants, theme
│       ├── data/                 Lesson curriculum data
│       ├── hooks/                useAudioPlayer, useSongAnalysis, etc.
│       ├── lib/
│       │   ├── api/              Backend, MusicBrainz, YouTube clients
│       │   ├── audio/            WaveSurfer factory, BPM/key estimation
│       │   ├── theory/           Voicings, transposition, capo, scales
│       │   └── utils/            Formatting, chord normalization
│       ├── providers/            ThemeProvider
│       ├── stores/               Zustand studio store
│       └── types/                Song, Lesson, theory types
│
└── backend/
    ├── requirements.txt
    └── app/
        ├── main.py              FastAPI entry point
        ├── config.py            Pydantic settings
        ├── api/
        │   ├── router.py        API router aggregation
        │   └── v1/
        │       ├── analyze.py   POST /analyze
        │       ├── transcribe.py POST /transcribe
        │       └── metadata.py  GET /metadata
        ├── core/
        │   ├── audio_processor.py YouTube download + file handling
        │   └── chord_estimator.py librosa chord estimation
        ├── models/
        │   └── song.py          Pydantic models
        └── utils/
            └── file_handler.py  Temp file cleanup
```

## Current Limitations

- `/analyze` returns stub metadata (hardcoded key=C, bpm=120). Real chord estimation runs only in `/transcribe`.
- Chord detection uses single-note argmax (no chord quality — only root notes like C, G, Am).
- No cleanup of temporary audio files after processing.
- Default temp dir is Unix-style (`/tmp`). On Windows, set `XASGUITAR_TEMP_DIR` explicitly.

## License

MIT
