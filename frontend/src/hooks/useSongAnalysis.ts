"use client";

import { useState, useCallback } from "react";
import { Song } from "@/types/song";
import { analyzeSong } from "@/lib/api/backend";
import { searchSong } from "@/lib/api/musicbrainz";

export function useSongAnalysis() {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const analyze = useCallback(async (input: File | string) => {
    setLoading(true);
    setError(null);
    setProgress("");
    const result = await analyzeSong(input, (p) => setProgress(p));
    if (result.song) {
      setSong(result.song);
    } else {
      setError(result.error || "Failed to analyze this song. Try a different source.");
    }
    setLoading(false);
  }, []);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchSong(query);
      if (results.length === 0) {
        setError("No results found.");
      }
      return results;
    } catch {
      setError("Search failed.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { song, loading, error, progress, analyze, search };
}