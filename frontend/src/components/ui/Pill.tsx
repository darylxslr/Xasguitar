"use client";

import { ReactNode } from "react";

interface PillProps {
  label: string;
  value: string | number;
  editable?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

export default function Pill({ label, value, editable, onClick, icon }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-bg-tertiary text-text-secondary border border-bg-tertiary ${
        editable ? "hover:border-accent-amber/50 cursor-pointer" : ""
      } transition-colors min-touch`}
    >
      {icon}
      <span className="text-text-muted">{label}:</span>
      <span className="text-text-primary font-medium font-mono">{value}</span>
      {editable && <span className="text-accent-amber text-xs ml-1">▾</span>}
    </button>
  );
}
