"use client";

// StarIcon — the 4-point sparkle/compass glyph from Figma.
// Inlined as SVG so the colour can be controlled via Tailwind's
// `text-*` utilities (the path uses `currentColor`).
//
// Motion is built in so every instance across the page behaves the
// same way (Hero logo, Prizes title, etc.). Caller still controls
// size + colour via `className` (passed onto the outer wrapper).
//
// Idle:   rotates 180° every 5 seconds (so 360° per 10 seconds),
//         with ease-in-out per half-turn — elegant pulse, never spinny.
// Hover:  +180° on the inner wrapper, smooth ease-in-out, ~0.6 s.
//         Composes cleanly with the idle rotation because the two
//         transforms live on separate DOM nodes.
//
// All transforms; no filters, no layout — compositor-only.
// prefers-reduced-motion is honoured via the root MotionConfig.

import { motion } from "framer-motion";
import { clsx } from "@/lib/cx";
import { ease } from "@/lib/motion";

type StarIconProps = {
  className?: string;
};

export function StarIcon({ className }: StarIconProps) {
  return (
    <motion.div
      // Caller-controlled size/colour live here so they apply to the
      // whole rotating wrapper (currentColor is read from this layer).
      className={clsx("block", className)}
      aria-hidden="true"
      animate={{ rotate: [0, 180, 360] }}
      transition={{
        duration: 10, // 180° per 5 s → 360° per 10 s
        ease: ["easeInOut", "easeInOut"],
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <motion.div
        className="block h-full w-full"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.6, ease: ease.inOut }}
      >
        <svg
          viewBox="0 0 124 124"
          className="block h-full w-full"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M64.1875 57.1611L101.84 17L107.497 22.6562L67.9014 59.7764L123 58L122.999 66L68.4561 64.2393L107.497 100.84L101.84 106.497L64.1699 66.3164L66 123H58L59.7734 67.9727L23.6572 106.497L18.001 100.84L57.0938 64.1895L1 66V58L57.6475 59.8271L18.001 22.6562L23.6572 17L59.7588 55.5078L58.001 1H66.001L64.1875 57.1611Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
