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
  C: {
    name: "C",
    positions: [
      { string: 5, fret: 3, note: "C" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 1, note: "C" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  A: {
    name: "A",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 2, note: "C#" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  G: {
    name: "G",
    positions: [
      { string: 6, fret: 3, note: "G" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 0, note: "G" },
      { string: 3, fret: 0, note: "D" },
      { string: 2, fret: 0, note: "G" },
      { string: 1, fret: 3, note: "G" },
    ],
  },
  E: {
    name: "E",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 1, note: "G#" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  D: {
    name: "D",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 3, note: "D" },
      { string: 1, fret: 2, note: "F#" },
    ],
  },
  Am: {
    name: "Am",
    positions: [
      { string: 5, fret: 0, note: "A" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 1, note: "C" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Em: {
    name: "Em",
    positions: [
      { string: 6, fret: 0, note: "E" },
      { string: 5, fret: 2, note: "B" },
      { string: 4, fret: 2, note: "E" },
      { string: 3, fret: 0, note: "G" },
      { string: 2, fret: 0, note: "B" },
      { string: 1, fret: 0, note: "E" },
    ],
  },
  Dm: {
    name: "Dm",
    positions: [
      { string: 4, fret: 0, note: "D" },
      { string: 3, fret: 2, note: "A" },
      { string: 2, fret: 3, note: "D" },
      { string: 1, fret: 1, note: "F" },
    ],
  },
};

export function getChordShape(chord: string): ChordShape | null {
  return openChordShapes[chord] || null;
}

export function getAlternativeVoicings(chord: string): ChordShape[] {
  return getChordShape(chord) ? [getChordShape(chord)!] : [];
}
