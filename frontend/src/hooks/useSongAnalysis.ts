"use client";

import { useState, useCallback } from "react";
import { Song } from "@/types/song";
import { analyzeSong } from "@/lib/api/backend";
import { searchSong } from "@/lib/api/musicbrainz";

export function useSongAnalysis() {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (input: File | string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSong(input);
      if (result) {
        setSong(result);
      } else {
        setError("Failed to analyze this song. Try a different source.");
      }
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return { song, loading, error, analyze, search };
}
