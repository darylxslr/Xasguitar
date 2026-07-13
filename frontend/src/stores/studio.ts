import { create } from "zustand";
import { Song } from "@/types/song";
import { transposeChordTimeline } from "@/lib/theory/transposition";
import { applyCapoToChords } from "@/lib/theory/capo";

interface StudioState {
  song: Song | null;
  capo: number;
  transpose: number;
  speed: number;
  isPlaying: boolean;
  currentTime: number;

  setSong: (song: Song) => void;
  setCapo: (capo: number) => void;
  setTranspose: (semitones: number) => void;
  setSpeed: (speed: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  getDisplayChords: () => { timestamp: number; chord: string; lyrics: string }[];
}

export const useStudioStore = create<StudioState>((set, get) => ({
  song: null,
  capo: 0,
  transpose: 0,
  speed: 1,
  isPlaying: false,
  currentTime: 0,

  setSong: (song) => set({ song, capo: song.metadata.recommendedCapo, transpose: 0 }),
  setCapo: (capo) => set({ capo }),
  setTranspose: (transpose) => set({ transpose }),
  setSpeed: (speed) => set({ speed }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),

  getDisplayChords: () => {
    const { song, capo, transpose } = get();
    if (!song) return [];

    let chords = song.chordTimeline;

    if (transpose !== 0) {
      chords = transposeChordTimeline(chords, transpose);
    }

    if (capo > 0) {
      chords = chords.map((c) => ({
        ...c,
        chord: applyCapoToChords([c.chord], capo)[0],
      }));
    }

    return chords;
  },
}));
