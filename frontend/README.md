# Xasguitar — Frontend

Next.js 16 guitar learning UI with song analysis studio, chord library, and academy curriculum.

## Tech Stack

| Layer            | Library                                                    |
| ---------------- | ---------------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19                          |
| Language         | TypeScript 5 (strict)                                      |
| Styling          | Tailwind CSS v4 (CSS-first config)                         |
| State            | Zustand 5                                                   |
| Data Fetching    | TanStack React Query 5                                     |
| Animations       | Framer Motion 12                                            |
| Audio            | WaveSurfer.js 7, Tone.js 15                                 |
| Music Theory     | Tonal.js 4                                                  |
| Icons            | Lucide React, Tabler Icons                                  |

## Directory Structure

```
src/
├── app/                    Next.js App Router pages
│   ├── (main)/             Route group with shared NavBar
│   │   ├── page.tsx        Home — SmartInputBar + TrendingTabs
│   │   ├── academy/        Curriculum dashboard + lesson pages
│   │   ├── chords/         Chord library browser
│   │   ├── settings/       Theme, audio, shortcuts, about, donate
│   │   └── studio/[id]/    Song analysis workspace
│   └── api/metadata/       Backend proxy route
├── components/
│   ├── academy/            LessonCard, LessonPlayer, CurriculumGrid, InteractiveFretboard
│   ├── chords/             ChordLibrary, ChordCard, ChordDiagram, ChordPopup, HandDiagram
│   ├── layout/             NavBar, SearchBar
│   ├── studio/             SmartInputBar, WaveformPlayer, ChordTimeline, TablatureView, etc.
│   └── ui/                 Badge, Button, Card, Drawer, Input, Pill, Slider, Tooltip
├── constants/              Music theory constants, theme palette
├── data/                   Lesson curriculum data, sample songs
├── hooks/                  useAudioPlayer, useSongAnalysis, useKeyboardShortcuts, useLocalSettings
├── lib/
│   ├── api/                Backend API client, MusicBrainz search, YouTube URL parser
│   ├── audio/              WaveSurfer factory, client-side BPM/key estimation
│   ├── theory/             Chord voicings, finger assignment, scales, transposition, capo
│   └── utils/              Chord normalization, formatting helpers
├── providers/              ThemeProvider (dark/light)
├── stores/                 Zustand store (song, capo, transpose, player state)
└── types/                  Song, Lesson, ChordShape type definitions
```

## Pages

| Route              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `/`                | Home — paste URL, upload audio, or search songs     |
| `/studio/[id]`     | Song analysis with waveform, chord timeline, tabs   |
| `/academy`         | Curriculum dashboard — 3 tracks, 15 lessons         |
| `/academy/[slug]`  | Individual lesson page with YouTube embed           |
| `/chords`          | Chord library with 40+ shapes, interactive popup    |
| `/settings`        | Theme toggle, audio prefs, keyboard shortcuts, about |

## Key Features

- **Smart Input Bar** — three input modes (YouTube URL, file upload, text search)
- **Studio** — synchronized waveform + chord timeline + tablature + capo/transpose controls
- **Chord Library** — 40+ chord shapes across 10 categories, interactive fretboard + hand diagram popup
- **Academy** — 15 unlocked lessons across Beginner/Intermediate/Advanced tracks
- **Music Theory Engine** — chord voicings, scale generation, transposition, finger assignment, capo recommendation
- **Dark/Light Theme** — persisted to localStorage
- **Keyboard Shortcuts** — space (play/pause), arrows (seek), +/- (speed)

## Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start development server        |
| `npm run build`   | Production build                |
| `npm run start`   | Serve production build          |
| `npm run lint`    | ESLint check                    |

## Environment

| Variable                     | Default                   | Description                    |
| ---------------------------- | ------------------------- | ------------------------------ |
| `NEXT_PUBLIC_BACKEND_URL`    | `http://localhost:8000`   | Python backend base URL        |
