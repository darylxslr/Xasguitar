"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import FretboardOverlay from "./FretboardOverlay";
import CapoCalculator from "./CapoCalculator";

export default function TheoryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-accent-amber text-bg-primary font-semibold rounded-full shadow-lg hover:opacity-90 transition-all min-touch"
      >
        <Brain className="w-5 h-5" />
        <span>Theory &amp; Tools</span>
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Theory & Tools">
        <div className="space-y-6">
          <FretboardOverlay />
          <CapoCalculator />
        </div>
      </Drawer>
    </>
  );
}
