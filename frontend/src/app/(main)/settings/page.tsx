"use client";

import { Sun, Moon, Volume2, Gauge, Info, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useLocalSettings } from "@/hooks/useLocalSettings";
import Card from "@/components/ui/Card";
import Slider from "@/components/ui/Slider";

const shortcuts = [
  { key: "Space", action: "Play / pause" },
  { key: "← / →", action: "Seek backward / forward" },
  { key: "↑ / ↓", action: "Volume up / down" },
  { key: "[ / ]", action: "Speed down / up" },
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { volume, speed, setVolume, setSpeed } = useLocalSettings();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Customise your experience
        </p>
      </div>

      <section>
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Appearance
        </h2>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-text-secondary" />
              ) : (
                <Sun className="w-5 h-5 text-text-secondary" />
              )}
              <div>
                <p className="text-sm font-medium text-text-primary">Theme</p>
                <p className="text-xs text-text-muted">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                theme === "dark" ? "bg-accent-amber" : "bg-bg-tertiary"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  theme === "dark" ? "translate-x-5.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Audio
        </h2>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-text-secondary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary mb-1">
                  Default volume
                </p>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={setVolume}
                  label="Vol"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-text-secondary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary mb-1">
                  Playback speed
                </p>
                <Slider
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={speed}
                  onChange={setSpeed}
                  label="Speed"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Keyboard Shortcuts
        </h2>
        <Card>
          <div className="space-y-2">
            {shortcuts.map((s) => (
              <div
                key={s.key}
                className="flex items-center justify-between py-1.5"
              >
                <span className="text-sm text-text-secondary">{s.action}</span>
                <kbd className="font-mono text-xs px-2 py-0.5 rounded bg-bg-tertiary text-text-primary">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          About
        </h2>
        <Card>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
            <div className="text-sm text-text-secondary space-y-1">
              <p className="text-text-primary font-semibold">
                Xasguitar v1.0.0
              </p>
              <p>
                Analyze songs, learn guitar. A free, open-source platform for
                guitar enthusiasts.
              </p>
              <a
                href="https://github.com/anomalyco/xasguitar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-amber hover:underline mt-2"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
