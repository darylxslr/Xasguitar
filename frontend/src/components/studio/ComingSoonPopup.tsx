"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ComingSoonPopup() {
  const [open, setOpen] = useState(true);

  const handleDismiss = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-secondary border border-bg-tertiary rounded-xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <img src="/logo.svg" alt="Xasguitar" className="w-50 h-50 mx-auto mb-0" />
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Hey there, Welcome! 
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              I&apos;m working hard on the AI song analysis and can&apos;t wait to share it with you. In the meantime, the <Link href="/academy" className="text-accent-amber hover:underline font-medium" onClick={handleDismiss}>Academy</Link> and <Link href="/chords" className="text-accent-amber hover:underline font-medium" onClick={handleDismiss}>Chord Library </Link> are ready for you to explore &mdash; happy playing! 🎸
            </p>
            <button
              onClick={handleDismiss}
              className="w-full px-6 py-2.5 rounded-lg bg-accent-amber text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Got It
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
