"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dotVariants = {
  initial: {
    opacity: 0.2,
    scale: 0.8,
  },
  animate: {
    opacity: [0.2, 1, 0.2],
    scale: [0.8, 1.1, 0.8],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <motion.span
      className="mx-2 inline-flex items-center gap-1"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={dotVariants}
          className={clsx("h-1 w-1 rounded-[2px]", className || "bg-current")}
          style={{
            boxShadow: "0 0 4px currentColor", // Gives that LED glow aesthetic
          }}
        />
      ))}
    </motion.span>
  );
};

export default LoadingDots;
