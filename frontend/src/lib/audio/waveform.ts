import WaveSurfer from "wavesurfer.js";

export function createWaveform(
  container: HTMLElement,
  url: string,
  options?: Partial<WaveSurferParams>
) {
  return WaveSurfer.create({
    container,
    waveColor: "#A0AEC0",
    progressColor: "#FFB703",
    cursorColor: "#00F5D4",
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    height: 80,
    normalize: true,
    ...options,
    url,
  });
}

export function createRegion(
  ws: WaveSurfer,
  start: number,
  end: number,
  color: string = "rgba(0, 245, 212, 0.15)"
) {
  if ("addRegion" in ws) {
    (ws as any).addRegion({ start, end, color, drag: true, resize: true });
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface WaveSurferParams {
  container: HTMLElement;
  waveColor: string;
  progressColor: string;
  cursorColor: string;
  barWidth: number;
  barGap: number;
  barRadius: number;
  height: number;
  normalize: boolean;
  url: string;
}
