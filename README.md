# Xasguitar

An open-source guitar learning platform with song analysis, chord detection, tablature, and a structured academy curriculum. No login required — everything is free and unlocked.

## Architecture

```
frontend/          Next.js 16 + React 19 SPA
  ├── app/         App Router pages (studio, academy, chords, settings)
  ├── components/  UI, layout, studio, academy, chord components
  ├── lib/         API clients, audio processing, music theory engine
  ├── stores/      Zustand state management
  └── types/       TypeScript type definitions

backend/           Python FastAPI service
  ├── app/
  │   ├── api/     REST endpoints (analyze, transcribe, metadata)
  │   ├── core/    Audio processing & chord estimation
  │   ├── models/  Pydantic data models
  │   └── config/  Environment-based settings
  └── tests/       Pytest test suite
```

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

## Detailed Documentation

- [Frontend README](./frontend/README.md) — UI components, pages, data flow
- [Backend README](./backend/README.md) — API reference, configuration, pipeline

## License

MIT
