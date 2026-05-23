"use client";

// Reveal — fade a single element in when it enters the viewport.
//
// Defaults to the `fadeUp` variant (the workhorse). For different
// in-motion (slide from left, scale, etc.) pass a variant via `variants`.
//
// Wraps children in a single <motion.div>. That div participates in
// layout, so apply `className` here, not on the child.

import { motion, type Variants } from "framer-motion";
import { fadeUp, inViewport } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  /** Override the default `fadeUp` variant. */
  variants?: Variants;
  className?: string;
  /** Viewport fraction (0–1) at which to trigger. */
  amount?: number;
};

export function Reveal({
  children,
  variants = fadeUp,
  className,
  amount = inViewport.amount,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: inViewport.once, amount }}
    >
      {children}
    </motion.div>
  );
}
