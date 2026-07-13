"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { TrendingTab } from "@/types/song";

interface TrendingTabsProps {
  tabs: TrendingTab[];
  onSelect: (tab: TrendingTab) => void;
}

export default function TrendingTabs({ tabs, onSelect }: TrendingTabsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
        Trending Tabs &amp; Community Analyzed
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <Card key={tab.id} hover onClick={() => onSelect(tab)}>
            <div className="flex flex-col gap-2">
              <h3 className="text-text-primary font-semibold truncate">
                {tab.title}
              </h3>
              <p className="text-text-muted text-sm truncate">{tab.artist}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">
                  {tab.key}
                </span>
                <span className="text-xs text-text-muted">{tab.tempo} BPM</span>
                <Badge variant={tab.difficulty} className="ml-auto">
                  {tab.difficulty}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
