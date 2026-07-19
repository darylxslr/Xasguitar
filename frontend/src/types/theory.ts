export interface NotePosition {
  string: number;
  fret: number;
  note: string;
  finger?: number;
}

export interface ChordShape {
  name: string;
  positions: NotePosition[];
  barres?: { fret: number; fromString: number; toString: number }[];
}

export interface ScalePattern {
  name: string;
  notes: string[];
  intervals: string[];
  positions: NotePosition[];
}

export interface CapoSuggestion {
  capoFret: number;
  originalKey: string;
  newKey: string;
  originalChords: string[];
  simplifiedChords: string[];
  explanation: string;
}
