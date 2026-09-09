"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import { useStudioStore } from "@/stores/studio";

export default function WaveformPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const loopRef = useRef<{ start: number | null; end: number | null }>({ start: null, end: null });
  const { song, isPlaying, speed, currentTime, setIsPlaying, setCurrentTime, setSpeed } =
    useStudioStore();
  const [duration, setDuration] = useState(0);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);

  const audioUrl = song?.media?.audioUrl;

  useEffect(() => {
    loopRef.current = { start: loopStart, end: loopEnd };
  }, [loopStart, loopEnd]);

  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      height: 80,
      waveColor: "rgba(255, 183, 3, 0.35)",
      progressColor: "#FFB703",
      cursorColor: "rgba(255, 183, 3, 0.8)",
      cursorWidth: 1,
      url: audioUrl,
    });
    waveSurferRef.current = ws;

    ws.on("ready", () => setDuration(ws.getDuration()));

    ws.on("timeupdate", (time: number) => {
      const { start, end } = loopRef.current;
      if (start !== null && end !== null && time > end) {
        ws.setTime(start);
        ws.play();
      }
      setCurrentTime(time);
    });

    ws.on("finish", () => setIsPlaying(false));

    return () => {
      ws.destroy();
      waveSurferRef.current = null;
    };
  }, [audioUrl, setCurrentTime, setIsPlaying]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws) return;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying]);

  useEffect(() => {
    waveSurferRef.current?.setPlaybackRate(speed);
  }, [speed]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws) return;
    if (Math.abs(ws.getCurrentTime() - currentTime) > 0.1) {
      ws.setTime(currentTime);
    }
  }, [currentTime]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4">
      <div
        ref={containerRef}
        className="w-full h-20 mb-4 bg-bg-primary rounded-lg"
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-text-muted">
          {format(currentTime)}
        </span>
        <span className="text-xs font-mono text-text-muted">
          {format(duration)}
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setLoopStart(currentTime)}
          className="text-xs px-2 py-1 rounded bg-bg-tertiary text-text-secondary hover:text-accent-amber transition-colors min-touch"
          title="Set loop start"
        >
          <RotateCcw className="w-3 h-3 inline" /> A
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full p-0"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentTime(Math.min(duration || currentTime, currentTime + 5))}
        >
          <SkipForward className="w-4 h-4" />
        </Button>

        <button
          onClick={() => setLoopEnd(currentTime)}
          className="text-xs px-2 py-1 rounded bg-bg-tertiary text-text-secondary hover:text-accent-amber transition-colors min-touch"
          title="Set loop end"
        >
          B <RotateCcw className="w-3 h-3 inline" />
        </button>
      </div>

      <div className="space-y-2">
        <Slider
          label="Speed"
          min={0.5}
          max={1.25}
          step={0.05}
          value={speed}
          onChange={(v) => setSpeed(v)}
        />
      </div>

      {loopStart !== null && loopEnd !== null && (
        <div className="mt-3 text-center">
          <span className="text-xs text-accent-cyan font-medium">
            Looping: {format(loopStart)} - {format(loopEnd)}
          </span>
        </div>
      )}
    </div>
  );
}