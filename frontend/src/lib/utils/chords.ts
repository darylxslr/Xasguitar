export function normalizeChord(chord: string): string {
  return chord.trim().replace(/\s+/g, "");
}

export function isBarreChord(chord: string): boolean {
  const root = chord.replace(/[#bmM0-9]/g, "");
  const barreRoots = new Set(["F", "B", "Bb", "F#", "C#", "G#", "D#", "A#"]);
  return root.length <= 2 && barreRoots.has(root);
}

export function chordToDisplayName(chord: string): string {
  const replacements: Record<string, string> = {
    "maj7": "△7",
    "m7": "m7",
    "dim7": "°7",
    "dim": "°",
    "aug": "+",
  };
  let result = chord;
  for (const [key, val] of Object.entries(replacements)) {
    result = result.replace(key, val);
  }
  return result;
}
