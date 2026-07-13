"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 min-w-48">
          <div className="bg-bg-tertiary border border-bg-secondary rounded-xl shadow-xl p-3 text-sm">
            {content}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-bg-tertiary border-r border-b border-bg-secondary rotate-45 -mt-1.5" />
        </div>
      )}
    </div>
  );
}
