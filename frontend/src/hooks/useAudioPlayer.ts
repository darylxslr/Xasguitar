"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  volume: number;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    speed: 1,
    volume: 0.8,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animRef = useRef<number>(0);

  const update = useCallback(() => {
    if (!audioRef.current) return;
    setState((s) => ({
      ...s,
      currentTime: audioRef.current!.currentTime,
      duration: audioRef.current!.duration || s.duration,
    }));
    animRef.current = requestAnimationFrame(update);
  }, []);

  const load = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.playbackRate = 1;
    audio.volume = 0.8;
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setState((s) => ({ ...s, duration: audio.duration }));
    });
    audio.addEventListener("ended", () => {
      setState((s) => ({ ...s, isPlaying: false }));
      cancelAnimationFrame(animRef.current);
    });
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play();
    setState((s) => ({ ...s, isPlaying: true }));
    animRef.current = requestAnimationFrame(update);
  }, [update]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
    cancelAnimationFrame(animRef.current);
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) pause();
    else play();
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((s) => ({ ...s, currentTime: time }));
    }
  }, []);

  const setSpeed = useCallback((speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setState((s) => ({ ...s, speed }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState((s) => ({ ...s, volume }));
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return { ...state, load, play, pause, toggle, seek, setSpeed, setVolume };
}
