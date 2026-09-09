export interface SongMetadata {
  key: string;
  scale: "major" | "minor";
  bpm: number;
  timeSignature: string;
  recommendedCapo: number;
}

export interface MediaInfo {
  sourceType: "youtube" | "upload" | "search";
  sourceUrl: string;
  audioDuration: number;
  audioUrl?: string;
}

export interface ChordEvent {
  timestamp: number;
  chord: string;
  lyrics: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  metadata: SongMetadata;
  media: MediaInfo;
  chordTimeline: ChordEvent[];
  tablatureData: string;
}

export interface TrendingTab {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}
