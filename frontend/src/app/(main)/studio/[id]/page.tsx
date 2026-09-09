"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SongHeader from "@/components/studio/SongHeader";
import WaveformPlayer from "@/components/studio/WaveformPlayer";
import ChordTimeline from "@/components/studio/ChordTimeline";
import TablatureView from "@/components/studio/TablatureView";
import TheoryDrawer from "@/components/studio/TheoryDrawer";
import { sampleSongs } from "@/data/songs";
import { useStudioStore } from "@/stores/studio";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export default function StudioPage() {
  const params = useParams();
  const { setSong, setIsPlaying, isPlaying, song: storeSong } = useStudioStore();

  const song = useMemo(() => {
    if (storeSong && storeSong.id === params.id) return storeSong;
    return sampleSongs.find((s) => s.id === params.id) || sampleSongs[0];
  }, [params.id, storeSong]);

  useEffect(() => {
    if (song) setSong(song);
  }, [song, setSong]);

  useKeyboardShortcuts({
    Space: () => setIsPlaying(!isPlaying),
  });

  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
        <p className="text-text-secondary">Song not found</p>
        <Link
          href="/"
          className="text-accent-amber hover:underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <SongHeader song={song} />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="p-4 space-y-4 border-r border-bg-tertiary">
          <WaveformPlayer />
          <TablatureView />
        </div>

        <div className="p-4">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">
            Chords &amp; Lyrics
          </h2>
          <ChordTimeline />
        </div>
      </div>

      <TheoryDrawer />
    </div>
  );
}
