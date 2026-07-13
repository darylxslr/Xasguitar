"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Guitar, Waves, BookOpen, Sun, Moon, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Studio", icon: Waves },
  { href: "/academy", label: "Academy", icon: BookOpen },
];

export default function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-primary/80 backdrop-blur-lg border-b border-bg-tertiary">
      <div className="w-full px-4 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Guitar className="w-7 h-7 text-accent-amber" />
          <span className="text-lg font-bold text-text-primary tracking-tight hidden sm:inline">
            XASGUITAR
          </span>
        </Link>

        <div className="flex items-center gap-1 justify-self-center">
          {navLinks.map((link) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-touch ${
                  isActive
                    ? "text-accent-amber"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-accent-amber/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-4 h-4" />
                <span className="relative z-10 hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          {pathname.startsWith("/academy") && <SearchBar />}
          <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors min-touch"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            <Link
              href="/settings"
              className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors min-touch"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
