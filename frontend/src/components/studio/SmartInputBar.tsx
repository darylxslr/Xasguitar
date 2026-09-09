"use client";

import { useState, useRef, DragEvent } from "react";
import { Link, Upload, Search, Music } from "lucide-react";
import { motion } from "framer-motion";

type InputMode = "url" | "upload" | "search";

interface SmartInputBarProps {
  onAnalyze: (input: File | string) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
  progress?: string;
}

export default function SmartInputBar({ onAnalyze, onSearch, loading, progress }: SmartInputBarProps) {
  const [mode, setMode] = useState<InputMode>("url");
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const modes: { key: InputMode; icon: typeof Link; label: string }[] = [
    { key: "url", icon: Link, label: "Paste URL" },
    { key: "upload", icon: Upload, label: "Upload Audio" },
    { key: "search", icon: Search, label: "Search Title" },
  ];

  const handleSubmit = () => {
    if (mode === "url" && url) onAnalyze(url);
    if (mode === "search" && query) onSearch(query);
  };

  const handleFile = (file: File) => {
    if (file) onAnalyze(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-6 bg-bg-secondary rounded-xl p-1 border border-bg-tertiary">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-touch ${
                isActive
                  ? "text-accent-amber"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute inset-0 bg-accent-amber/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 w-4 h-4" />
              <span className="relative z-10">{m.label}</span>
            </button>
          );
        })}
      </div>

      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Paste a YouTube, SoundCloud, or audio link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 px-5 py-3 bg-bg-secondary text-text-primary border border-bg-tertiary rounded-xl focus:border-accent-amber focus:outline-none text-sm placeholder:text-text-muted"
          />
          <button
            onClick={handleSubmit}
            disabled={!url || loading}
            className="px-6 py-3 bg-accent-amber/10 text-accent-amber font-semibold rounded-xl hover:bg-accent-amber/20 transition-all disabled:opacity-50 min-touch"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      )}

      {mode === "upload" && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            dragOver
              ? "border-accent-amber bg-accent-amber/5"
              : "border-bg-tertiary bg-bg-secondary hover:border-accent-amber/50"
          }`}
        >
          <Music className="w-10 h-10 text-text-muted" />
          <div className="text-center">
            <p className="text-text-primary font-medium">Drop audio file here</p>
            <p className="text-text-muted text-sm mt-1">Supports MP3, WAV, FLAC</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".mp3,.wav,.flac,audio/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {mode === "search" && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by song title or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 px-5 py-3 bg-bg-secondary text-text-primary border border-bg-tertiary rounded-xl focus:border-accent-amber focus:outline-none text-sm placeholder:text-text-muted"
          />
          <button
            onClick={handleSubmit}
            disabled={!query || loading}
            className="px-6 py-3 bg-accent-amber/10 text-accent-amber font-semibold rounded-xl hover:bg-accent-amber/20 transition-all disabled:opacity-50 min-touch"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading && progress && (
        <p className="text-sm text-text-muted text-center mt-4">{progress}</p>
      )}
    </div>
  );
}
