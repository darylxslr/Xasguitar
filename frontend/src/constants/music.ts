export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
export type Note = typeof NOTES[number];

export const STANDARD_TUNING = ["E2", "A2", "D3", "G3", "B3", "E4"];

export const FRET_COUNT = 22;

export const STRING_COUNT = 6;

export const SCALE_INTERVALS: Record<string, string[]> = {
  major: ["1P", "2M", "3M", "4P", "5P", "6M", "7M"],
  minor: ["1P", "2M", "3m", "4P", "5P", "6m", "7m"],
  pentatonicMajor: ["1P", "2M", "3M", "5P", "6M"],
  pentatonicMinor: ["1P", "3m", "4P", "5P", "7m"],
  blues: ["1P", "3m", "4P", "5d", "5P", "7m"],
};

export const CHORD_QUALITIES: Record<string, number[]> = {
  "": [0, 4, 7],
  m: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  7: [0, 4, 7, 10],
  dim7: [0, 3, 6, 9],
  m7b5: [0, 3, 6, 10],
  aug7: [0, 4, 8, 10],
  mMaj7: [0, 3, 7, 11],
};
