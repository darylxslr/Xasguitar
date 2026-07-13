import { transposeChord } from "./transposition";
import { CapoSuggestion } from "@/types/theory";

export function applyCapo(chord: string, capoFret: number): string {
  return transposeChord(chord, -capoFret);
}

export function applyCapoToChords(
  chords: string[],
  capoFret: number
): string[] {
  return chords.map((c) => applyCapo(c, capoFret));
}

const beginnerFriendlyChords = new Set([
  "C", "D", "E", "G", "A", "Am", "Em", "Dm", "D7", "G7", "C7", "A7", "E7",
  "Fmaj7", "Am7", "Em7", "Dm7",
]);

function isComplexShape(chord: string): boolean {
  const root = chord.replace(/[#bmM0-9]/g, "");
  return !beginnerFriendlyChords.has(chord) && !beginnerFriendlyChords.has(root);
}

export function recommendCapo(
  chords: string[],
  originalKey: string
): CapoSuggestion[] {
  const suggestions: CapoSuggestion[] = [];

  for (let capoFret = 1; capoFret <= 7; capoFret++) {
    const simplified = chords.map((c) => applyCapo(c, capoFret));
    const complexCount = simplified.filter(isComplexShape).length;

    if (complexCount <= Math.ceil(simplified.length * 0.3) || complexCount < 2) {
      suggestions.push({
        capoFret,
        originalKey,
        newKey: originalKey,
        originalChords: [...chords],
        simplifiedChords: simplified,
        explanation: capoFret === 1
          ? "Capo on fret 1 — play using open shapes"
          : `Capo on fret ${capoFret} — play these simpler shapes`,
      });
    }
  }

  return suggestions.slice(0, 2);
}

export function getChordDifficulty(chord: string): "easy" | "medium" | "hard" {
  if (beginnerFriendlyChords.has(chord)) return "easy";
  if (chord.length <= 3 && !chord.includes("maj") && !chord.includes("dim") && !chord.includes("aug"))
    return "medium";
  return "hard";
}
