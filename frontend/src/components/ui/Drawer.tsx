"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Drawer({ open, onClose, title, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary rounded-t-2xl border-t border-bg-tertiary max-h-[70vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-between p-4 border-b border-bg-tertiary">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-bg-tertiary text-text-secondary transition-colors min-touch"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
