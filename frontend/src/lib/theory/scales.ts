import { noteToIndex, indexToNote } from "./transposition";
import { SCALE_INTERVALS } from "@/constants/music";
import { ScalePattern } from "@/types/theory";

const SEMITONE_MAP: Record<string, number> = {
  "1P": 0, "2m": 1, "2M": 2, "3m": 3, "3M": 4,
  "4P": 5, "5d": 6, "5P": 7, "6m": 8, "6M": 9,
  "7m": 10, "7M": 11, "8P": 12,
};

export function generateScale(root: string, scaleType: string): ScalePattern {
  const rootIdx = noteToIndex(root);
  const intervals = SCALE_INTERVALS[scaleType] || SCALE_INTERVALS.major;

  const notes = intervals.map((interval) => {
    const semitones = SEMITONE_MAP[interval] ?? 0;
    return indexToNote(rootIdx + semitones);
  });

  return {
    name: `${root} ${scaleType}`,
    notes,
    intervals,
    positions: [],
  };
}

export function getScaleDegrees(root: string, scaleType: string): string[] {
  const scale = generateScale(root, scaleType);
  const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
  const isMinor = scaleType.includes("minor");

  return scale.notes.map((note, i) => {
    const roman = romanNumerals[i]?.toUpperCase() || "";
    if (isMinor && (i === 1 || i === 2 || i === 5 || i === 6)) {
      return `♭${roman}`;
    }
    return roman;
  });
}
