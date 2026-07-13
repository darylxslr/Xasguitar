"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Guitar } from "lucide-react";
import SmartInputBar from "@/components/studio/SmartInputBar";
import TrendingTabs from "@/components/studio/TrendingTabs";
import { trendingTabs, sampleSongs } from "@/data/songs";
import { TrendingTab } from "@/types/song";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (input: File | string) => {
    setLoading(true);
    if (typeof input === "string" && input.includes("youtube.com/watch")) {
      router.push("/studio/song-1");
    } else {
      router.push("/studio/song-2");
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    router.push("/studio/song-3");
  };

  const handleSelectTab = (tab: TrendingTab) => {
    router.push(`/studio/${tab.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Guitar className="w-10 h-10 text-accent-amber" />
          <h1 className="text-4xl font-bold text-text-primary tracking-tight">
            Xasguitar
          </h1>
        </div>
        <p className="text-text-secondary text-lg max-w-md mx-auto">
          Analyze any song, learn every chord. Your smart guitar studio.
        </p>
      </div>

      <SmartInputBar
        onAnalyze={handleAnalyze}
        onSearch={handleSearch}
        loading={loading}
      />

      <div className="mt-16 w-full">
        <TrendingTabs tabs={trendingTabs} onSelect={handleSelectTab} />
      </div>
    </div>
  );
}
