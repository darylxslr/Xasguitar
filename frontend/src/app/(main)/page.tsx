"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";
import SmartInputBar from "@/components/studio/SmartInputBar";
import TrendingTabs from "@/components/studio/TrendingTabs";
import ComingSoonPopup from "@/components/studio/ComingSoonPopup";
import { trendingTabs } from "@/data/songs";
import { TrendingTab } from "@/types/song";
import { useSongAnalysis } from "@/hooks/useSongAnalysis";
import { useStudioStore } from "@/stores/studio";

export default function HomePage() {
  const router = useRouter();
  const { analyze, search, song, loading, error, progress } = useSongAnalysis();

  useEffect(() => {
    if (song) {
      useStudioStore.getState().setSong(song);
      router.push(`/studio/${song.id}`);
    }
  }, [song, router]);

  const handleAnalyze = (input: File | string) => {
    analyze(input);
  };

  const handleSearch = async (query: string) => {
    search(query);
    router.push("/studio/song-3");
  };

  const handleSelectTab = (tab: TrendingTab) => {
    router.push(`/studio/${tab.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-amber/30 mb-8">
          <Bot className="w-3.5 h-3.5 text-accent-amber" />
          <span className="text-xs font-mono text-accent-amber tracking-[0.2em] uppercase">
            AI-Powered Chord Detection
          </span>
        </div>
        <h1 className="text-5xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
          Analyze Any Song
        </h1>
        <p className="text-text-secondary text-sm max-w-xl mx-auto leading-relaxed">
          Paste a YouTube URL, upload an MP3, or search any track. Get synchronized chords, BPM, key detection, and interactive diagrams in seconds.
        </p>
      </div>

      <SmartInputBar
        onAnalyze={handleAnalyze}
        onSearch={handleSearch}
        loading={loading}
        progress={progress}
      />

      {error && (
        <p className="text-accent-amber text-sm mt-4 text-center max-w-md">
          {error}
        </p>
      )}

      <div className="mt-16 w-full">
        <TrendingTabs tabs={trendingTabs} onSelect={handleSelectTab} />
      </div>

      <ComingSoonPopup />
    </div>
  );
}
