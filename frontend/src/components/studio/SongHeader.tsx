"use client";

import Pill from "@/components/ui/Pill";
import { Song } from "@/types/song";
import { formatKey } from "@/lib/utils/formatting";
import { useStudioStore } from "@/stores/studio";

interface SongHeaderProps {
  song: Song;
}

export default function SongHeader({ song }: SongHeaderProps) {
  const { capo, transpose, setCapo, setTranspose } = useStudioStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-bg-secondary border-b border-bg-tertiary">
      <div>
        <h1 className="text-xl font-bold text-text-primary">{song.title}</h1>
        <p className="text-sm text-text-muted">{song.artist}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Pill
          label="Key"
          value={formatKey(song.metadata.key, song.metadata.scale)}
          editable
          onClick={() => setTranspose(transpose === 0 ? -1 : 0)}
        />
        <Pill
          label="Capo"
          value={`Fret ${capo}`}
          editable
          onClick={() => setCapo(capo >= 7 ? 0 : capo + 1)}
        />
        <Pill label="BPM" value={song.metadata.bpm} />
        <Pill
          label="Transpose"
          value={transpose > 0 ? `+${transpose}` : transpose === 0 ? "0" : `${transpose}`}
          editable
          onClick={() => setTranspose(transpose + 1 > 5 ? -5 : transpose + 1)}
        />
      </div>
    </div>
  );
}
