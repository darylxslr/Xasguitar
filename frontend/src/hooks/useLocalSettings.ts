"use client";

import { useCallback, useEffect, useState } from "react";

interface LocalSettings {
  volume: number;
  speed: number;
}

const STORAGE_KEY = "xasguitar-settings";
const DEFAULTS: LocalSettings = { volume: 0.8, speed: 1 };

export function useLocalSettings() {
  const [settings, setSettings] = useState<LocalSettings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LocalSettings>;
        setSettings({ ...DEFAULTS, ...parsed });
      }
    } catch { /* ignore corrupt data */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, loaded]);

  const setVolume = useCallback((volume: number) => {
    setSettings((s) => ({ ...s, volume }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setSettings((s) => ({ ...s, speed }));
  }, []);

  return { ...settings, setVolume, setSpeed, loaded };
}
