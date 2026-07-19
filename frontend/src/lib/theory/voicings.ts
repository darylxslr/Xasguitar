import { noteToIndex, indexToNote } from "./transposition";
import { CHORD_QUALITIES } from "@/constants/music";
import { ChordShape } from "@/types/theory";

export function parseChord(chord: string): { root: string; quality: string } {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return { root: "C", quality: "" };
  return { root: match[1], quality: match[2] };
}

export function getChordNotes(chord: string): string[] {
  const { root, quality } = parseChord(chord);
  const intervals = CHORD_QUALITIES[quality] || CHORD_QUALITIES[""];
  const rootIdx = noteToIndex(root);
  return intervals.map((semitones) => indexToNote(rootIdx + semitones));
}

const openChordShapes: Record<string, ChordShape> = {
  // ===== Open =====
  C: {
    name: "C",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  A: {
    name: "A",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 1 },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 2, note: "C#", finger: 3 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  G: {
    name: "G",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 2 },
      { string: 5, fret: 2, note: "B", finger: 1 },
      { string: 4, fret: 0, note: "G" },
      { string: 3, fret: 0, note: "D" },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 3, note: "G", finger: 4 },
    ],
  },
  E: {
    name: "E",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 2, note: "E", finger: 3 },
      { string: 3, fret: 1, note: "G#", finger: 1 },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  D: {
    name: "D",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 1 },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 2, note: "F#", finger: 2 },
    ],
  },
  Am: {
    name: "Am",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 2, note: "A", finger: 3 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Em: {
    name: "Em",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 2, note: "E", finger: 3 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Dm: {
    name: "Dm",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 1, note: "F", finger: 1 },
    ],
  },

  // ===== Barre =====
  F: {
    name: "F",
    positions: [
      { string: 6, fret: 1, note: "F", finger: 1 },
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 3, note: "F", finger: 4 },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 1, note: "F", finger: 1 },
    ],
    barres: [{ fret: 1, fromString: 6, toString: 1 }],
  },
  Bb: {
    name: "Bb",
    positions: [
      { string: 5, fret: 1, note: "Bb" },
      { string: 4, fret: 3, note: "F" },
      { string: 3, fret: 3, note: "Bb" },
      { string: 2, fret: 3, note: "D" },
      { string: 1, fret: 1, note: "F" },
    ],
    barres: [{ fret: 1, fromString: 5, toString: 1 }],
  },
  "F#": {
    name: "F#",
    positions: [
      { string: 6, fret: 2, note: "F#", finger: 1 },
      { string: 5, fret: 4, note: "C#", finger: 3 },
      { string: 4, fret: 4, note: "F#", finger: 4 },
      { string: 3, fret: 3, note: "A#", finger: 2 },
      { string: 2, fret: 2, note: "C#", finger: 1 },
      { string: 1, fret: 2, note: "F#", finger: 1 },
    ],
    barres: [{ fret: 2, fromString: 6, toString: 1 }],
  },
  B: {
    name: "B",
    positions: [
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 4, note: "F#" },
      { string: 3, fret: 4, note: "B" },
      { string: 2, fret: 4, note: "D#" },
      { string: 1, fret: 2, note: "F#" },
    ],
    barres: [{ fret: 2, fromString: 5, toString: 1 }],
  },
  Bm: {
    name: "Bm",
    positions: [
      { string: 5, fret: 2, note: "B", finger: 1 },
      { string: 4, fret: 4, note: "F#", finger: 3 },
      { string: 3, fret: 4, note: "B", finger: 4 },
      { string: 2, fret: 3, note: "D", finger: 2 },
      { string: 1, fret: 2, note: "F#", finger: 1 },
    ],
    barres: [{ fret: 2, fromString: 5, toString: 1 }],
  },
  "F#m": {
    name: "F#m",
    positions: [
      { string: 6, fret: 2, note: "F#", finger: 1 },
      { string: 5, fret: 4, note: "C#", finger: 3 },
      { string: 4, fret: 4, note: "F#", finger: 4 },
      { string: 3, fret: 2, note: "A", finger: 1 },
      { string: 2, fret: 2, note: "C#", finger: 1 },
      { string: 1, fret: 2, note: "F#", finger: 1 },
    ],
    barres: [{ fret: 2, fromString: 6, toString: 1 }],
  },
  Cm: {
    name: "Cm",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 1 },
      { string: 4, fret: 5, note: "G", finger: 3 },
      { string: 3, fret: 5, note: "C", finger: 4 },
      { string: 2, fret: 4, note: "Eb", finger: 2 },
      { string: 1, fret: 3, note: "G", finger: 1 },
    ],
    barres: [{ fret: 3, fromString: 5, toString: 1 }],
  },
  Fm: {
    name: "Fm",
    positions: [
      { string: 6, fret: 1, note: "F", finger: 1 },
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 3, note: "F", finger: 4 },
      { string: 3, fret: 1, note: "Ab", finger: 1 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 1, note: "F", finger: 1 },
    ],
    barres: [{ fret: 1, fromString: 6, toString: 1 }],
  },
  Gm: {
    name: "Gm",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 1 },
      { string: 5, fret: 5, note: "D", finger: 3 },
      { string: 4, fret: 5, note: "G", finger: 4 },
      { string: 3, fret: 3, note: "Bb", finger: 1 },
      { string: 2, fret: 3, note: "D", finger: 1 },
      { string: 1, fret: 3, note: "G", finger: 1 },
    ],
    barres: [{ fret: 3, fromString: 6, toString: 1 }],
  },
  "C#m": {
    name: "C#m",
    positions: [
      { string: 5, fret: 4, note: "C#", finger: 1 },
      { string: 4, fret: 6, note: "G#", finger: 3 },
      { string: 3, fret: 6, note: "C#", finger: 4 },
      { string: 2, fret: 5, note: "E", finger: 2 },
      { string: 1, fret: 4, note: "G#", finger: 1 },
    ],
    barres: [{ fret: 4, fromString: 5, toString: 1 }],
  },

  // ===== 7th (Dominant) =====
  C7: {
    name: "C7",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 3, note: "Bb", finger: 4 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  G7: {
    name: "G7",
    positions: [
      { string: 6, fret: 3, note: "G" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 0, note: "G" },
      { string: 3, fret: 0, note: "D" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 1, note: "F" },
    ],
  },
  D7: {
    name: "D7",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 2, note: "F#", finger: 3 },
    ],
  },
  A7: {
    name: "A7",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 2, note: "C#", finger: 3 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  E7: {
    name: "E7",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 0, note: "E" },
      { string: 3, fret: 1, note: "G#" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  B7: {
    name: "B7",
    positions: [
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 1, note: "D#", finger: 1 },
      { string: 3, fret: 2, note: "F#", finger: 3 },
      { string: 1, fret: 2, note: "F#", finger: 4 },
    ],
  },
  F7: {
    name: "F7",
    positions: [
      { string: 6, fret: 1, note: "F" },
      { string: 5, fret: 3, note: "C" },
      { string: 4, fret: 1, note: "Eb" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 1, note: "C" },
      { string: 1, fret: 1, note: "F" },
    ],
    barres: [{ fret: 1, fromString: 6, toString: 1 }],
  },

  // ===== Major 7th =====
  Cmaj7: {
    name: "Cmaj7",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Fmaj7: {
    name: "Fmaj7",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "F" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 1, note: "E" },
      { string: 1, fret: 0, note: "A" },
    ],
  },
  Gmaj7: {
    name: "Gmaj7",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 3 },
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 2, note: "F#", finger: 1 },
    ],
  },
  Amaj7: {
    name: "Amaj7",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 1, note: "G#", finger: 1 },
      { string: 2, fret: 2, note: "C#", finger: 3 },
      { string: 1, fret: 0, note: "E" },
    ],
  },

  // ===== Minor 7th =====
  Am7: {
    name: "Am7",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 1, note: "C" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Dm7: {
    name: "Dm7",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 1, note: "C" },
      { string: 1, fret: 1, note: "F" },
    ],
  },
  Em7: {
    name: "Em7",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 0, note: "E" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Bm7: {
    name: "Bm7",
    positions: [
      { string: 5, fret: 2, note: "B", finger: 1 },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 2, note: "F#", finger: 3 },
    ],
  },
  Cm7: {
    name: "Cm7",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 2 },
      { string: 4, fret: 1, note: "Eb", finger: 1 },
      { string: 3, fret: 3, note: "Bb", finger: 3 },
      { string: 2, fret: 4, note: "Eb", finger: 4 },
    ],
  },
  Gm7: {
    name: "Gm7",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 2 },
      { string: 5, fret: 1, note: "Bb", finger: 1 },
      { string: 4, fret: 3, note: "F", finger: 3 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 3, note: "D", finger: 4 },
      { string: 1, fret: 3, note: "G", finger: 4 },
    ],
  },

  // ===== Sus =====
  Asus2: {
    name: "Asus2",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 2, note: "A", finger: 3 },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Asus4: {
    name: "Asus4",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E", finger: 1 },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Dsus2: {
    name: "Dsus2",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 3, note: "D" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Dsus4: {
    name: "Dsus4",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 1 },
      { string: 2, fret: 3, note: "D", finger: 2 },
      { string: 1, fret: 3, note: "G", finger: 3 },
    ],
  },
  Esus4: {
    name: "Esus4",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B", finger: 1 },
      { string: 4, fret: 2, note: "E", finger: 2 },
      { string: 3, fret: 2, note: "A", finger: 3 },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Gsus4: {
    name: "Gsus4",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 1 },
      { string: 5, fret: 3, note: "C", finger: 2 },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 3, note: "G", finger: 4 },
    ],
  },
  Csus2: {
    name: "Csus2",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 2 },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 3, note: "G", finger: 4 },
    ],
  },
  Csus4: {
    name: "Csus4",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 3 },
      { string: 4, fret: 3, note: "F", finger: 4 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 1, note: "F", finger: 1 },
    ],
  },

  // ===== Add9 =====
  Cadd9: {
    name: "Cadd9",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 2 },
      { string: 4, fret: 2, note: "E", finger: 1 },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 3, note: "D", finger: 3 },
      { string: 1, fret: 3, note: "G", finger: 4 },
    ],
  },
  Gadd9: {
    name: "Gadd9",
    positions: [
      { string: 6, fret: 3, note: "G", finger: 1 },
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 3, note: "G", finger: 1 },
    ],
  },
  Dadd9: {
    name: "Dadd9",
    positions: [
      { string: 5, fret: 5, note: "D" },
      { string: 4, fret: 4, note: "F#" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Aadd9: {
    name: "Aadd9",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 2, note: "C#" },
      { string: 1, fret: 0, note: "E" },
    ],
  },

  // ===== 6th =====
  C6: {
    name: "C6",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 4 },
      { string: 4, fret: 2, note: "E", finger: 3 },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 1, note: "C", finger: 1 },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  G6: {
    name: "G6",
    positions: [
      { string: 6, fret: 3, note: "G" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  D6: {
    name: "D6",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A", finger: 2 },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 2, note: "F#", finger: 3 },
    ],
  },
  A6: {
    name: "A6",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 2, note: "C#" },
      { string: 1, fret: 2, note: "F#" },
    ],
  },
  E6: {
    name: "E6",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B", finger: 2 },
      { string: 4, fret: 2, note: "E", finger: 3 },
      { string: 3, fret: 1, note: "G#", finger: 1 },
      { string: 2, fret: 2, note: "C#", finger: 4 },
      { string: 1, fret: 0, note: "E" },
    ],
  },

  // ===== Dim / Aug =====
  Bdim: {
    name: "Bdim",
    positions: [
      { string: 5, fret: 2, note: "B", finger: 1 },
      { string: 4, fret: 3, note: "F", finger: 2 },
      { string: 3, fret: 4, note: "B", finger: 4 },
      { string: 2, fret: 3, note: "D", finger: 3 },
    ],
  },
  Cdim: {
    name: "Cdim",
    positions: [
      { string: 5, fret: 3, note: "C", finger: 1 },
      { string: 4, fret: 4, note: "Gb", finger: 2 },
      { string: 3, fret: 5, note: "C", finger: 4 },
      { string: 2, fret: 4, note: "Eb", finger: 3 },
    ],
  },
  Caug: {
    name: "Caug",
    positions: [
      { string: 5, fret: 3, note: "C" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 1, note: "G#" },
      { string: 2, fret: 1, note: "C" },
    ],
  },

  // ===== Power =====
  C5: {
    name: "C5",
    positions: [
      { string: 5, fret: 3, note: "C" },
      { string: 4, fret: 5, note: "G" },
    ],
  },
  D5: {
    name: "D5",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A" },
    ],
  },
  E5: {
    name: "E5",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B" },
    ],
  },
  F5: {
    name: "F5",
    positions: [
      { string: 6, fret: 1, note: "F" },
      { string: 5, fret: 3, note: "C" },
    ],
  },
  G5: {
    name: "G5",
    positions: [
      { string: 6, fret: 3, note: "G" },
      { string: 5, fret: 5, note: "D" },
    ],
  },
  A5: {
    name: "A5",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
    ],
  },
};

export interface ChordCategory {
  category: string;
  chords: string[];
}

export const chordCategories: ChordCategory[] = [
  { category: "Open", chords: ["C", "A", "G", "E", "D", "Am", "Em", "Dm"] },
  { category: "Barre", chords: ["F", "Bb", "F#", "B", "Bm", "F#m", "Cm", "Fm", "Gm", "C#m"] },
  { category: "7th", chords: ["C7", "G7", "D7", "A7", "E7", "B7", "F7"] },
  { category: "Major 7th", chords: ["Cmaj7", "Fmaj7", "Gmaj7", "Amaj7"] },
  { category: "Minor 7th", chords: ["Am7", "Dm7", "Em7", "Bm7", "Cm7", "Gm7"] },
  { category: "Sus", chords: ["Asus2", "Asus4", "Dsus2", "Dsus4", "Esus4", "Gsus4", "Csus2", "Csus4"] },
  { category: "Add9", chords: ["Cadd9", "Gadd9", "Dadd9", "Aadd9"] },
  { category: "6th", chords: ["C6", "G6", "D6", "A6", "E6"] },
  { category: "Dim/Aug", chords: ["Bdim", "Cdim", "Caug"] },
  { category: "Power", chords: ["C5", "D5", "E5", "F5", "G5", "A5"] },
];

export function getChordShape(chord: string): ChordShape | null {
  return openChordShapes[chord] || null;
}

export function getAlternativeVoicings(chord: string): ChordShape[] {
  return getChordShape(chord) ? [getChordShape(chord)!] : [];
}
