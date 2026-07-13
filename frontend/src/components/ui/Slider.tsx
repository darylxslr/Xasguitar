"use client";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export default function Slider({ min, max, step, value, onChange, label }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-muted w-12 text-right">{label}</span>
      <div className="relative flex-1 h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-amber rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div
          className="absolute w-4 h-4 bg-accent-amber rounded-full shadow-lg -translate-x-1/2 pointer-events-none transition-all"
          style={{ left: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-text-primary w-10">{value.toFixed(step < 1 ? 2 : 0)}</span>
    </div>
  );
}
