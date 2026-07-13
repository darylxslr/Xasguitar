export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatBPM(bpm: number): string {
  return `${bpm} BPM`;
}

export function formatKey(key: string, scale: string): string {
  const scaleSymbol = scale === "minor" ? "m" : "";
  return `${key}${scaleSymbol}`;
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}
