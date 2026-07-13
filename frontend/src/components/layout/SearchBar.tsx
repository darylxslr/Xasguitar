"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-text-muted" />
      <input
        type="text"
        placeholder="Search lessons"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 pl-10 pr-4 py-2 bg-bg-tertiary text-text-primary rounded-lg border border-bg-tertiary focus:border-accent-amber focus:outline-none text-sm transition-colors placeholder:text-text-muted"
      />
    </div>
  );
}
