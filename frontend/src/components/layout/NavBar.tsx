"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Guitar, Waves, BookOpen, Sun, Moon } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Studio", icon: Waves },
  { href: "/academy", label: "Academy", icon: BookOpen },
];

export default function NavBar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-primary/80 backdrop-blur-lg border-b border-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Guitar className="w-7 h-7 text-accent-amber" />
          <span className="text-lg font-bold text-text-primary tracking-tight hidden sm:inline">
            Xasguitar
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-touch ${
                  isActive
                    ? "bg-accent-amber/10 text-accent-amber"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar />
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors min-touch"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
