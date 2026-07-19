import { ChordShape } from "@/types/theory";

function isUnderBarre(
  pos: { string: number; fret: number },
  barres?: { fret: number; fromString: number; toString: number }[]
): boolean {
  if (!barres) return false;
  return barres.some((b) => {
    const lo = Math.min(b.fromString, b.toString);
    const hi = Math.max(b.fromString, b.toString);
    return pos.fret === b.fret && pos.string >= lo && pos.string <= hi;
  });
}

export function getUsedFingers(shape: ChordShape): number[] {
  const fretted = shape.positions.filter((p) => p.fret > 0);
  if (fretted.length === 0) return [];

  const lowestFret = Math.min(...fretted.map((p) => p.fret));
  const atLowest = fretted.filter((p) => p.fret === lowestFret);
  const lowestHasBarre = atLowest.length > 1;

  const fixed = new Map<string, number>();

  for (const pos of fretted) {
    const key = `${pos.string}-${pos.fret}`;
    if (pos.finger) {
      fixed.set(key, pos.finger);
    } else if (isUnderBarre(pos, shape.barres)) {
      fixed.set(key, 1);
    } else if (lowestHasBarre && pos.fret === lowestFret) {
      fixed.set(key, 1);
    }
  }

  const used = new Set(fixed.values());
  const remaining = fretted.filter((p) => !fixed.has(`${p.string}-${p.fret}`));

  if (remaining.length > 0) {
    const offset = used.has(1) ? 1 : 0;
    const uniqueFrets = [...new Set(remaining.map((p) => p.fret))].sort((a, b) => a - b);
    for (const pos of remaining) {
      const base = uniqueFrets.indexOf(pos.fret);
      const sameFret = remaining.filter((p) => p.fret === pos.fret);
      const sorted = [...sameFret].sort((a, b) => b.string - a.string);
      const idx = sorted.findIndex(
        (p) => p.string === pos.string && p.fret === pos.fret
      );
      const finger = Math.min(base + idx + 1 + offset, 4);
      used.add(finger);
    }
  }

  return [...used].sort();
}
