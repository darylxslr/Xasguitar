import { Note, NOTES } from "@/constants/music";

export function noteToIndex(note: string): number {
  const n = note.replace(/[0-9]/g, "");
  const idx = NOTES.indexOf(n as Note);
  return idx === -1 ? 0 : idx;
}

export function indexToNote(index: number): string {
  const wrapped = ((index % 12) + 12) % 12;
  return NOTES[wrapped];
}

export function transposeChord(chord: string, semitones: number): string {
  const match = chord.match(/^([A-G])([#b]?)(.*)$/);
  if (!match) return chord;

  let [_, root, accidental, quality] = match;
  const noteStr = root + accidental;
  const idx = noteToIndex(noteStr);
  const newIdx = idx + semitones;
  const newRoot = indexToNote(newIdx);

  return newRoot + quality;
}

export function transposeChordTimeline(
  chords: { timestamp: number; chord: string; lyrics: string }[],
  semitones: number
) {
  return chords.map((c) => ({
    ...c,
    chord: transposeChord(c.chord, semitones),
  }));
}

export function transposeKey(key: string, semitones: number): string {
  return transposeChord(key, semitones);
}
