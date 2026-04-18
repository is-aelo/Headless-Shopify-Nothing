"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.4,
          ease: [0.215, 0.61, 0.355, 1.0], // Clean cubic-bezier for a "tech" feel
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
