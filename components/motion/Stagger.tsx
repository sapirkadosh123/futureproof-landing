"use client";

// Stagger — orchestrating parent + StaggerItem child.
//
// Usage:
//   <Stagger trigger="viewport" staggerChildren={0.08}>
//     <StaggerItem>...</StaggerItem>
//     <StaggerItem variants={fadeFromLeft}>...</StaggerItem>
//   </Stagger>
//
// `trigger="load"` animates immediately on mount (used by the Hero).
// `trigger="viewport"` waits until the parent scrolls into view.
//
// Children pass through `variants` (defaults to `fadeUp`) but MUST NOT
// declare their own `initial` / `animate` — they inherit from the parent
// so the stagger sequencing works.

import { motion, type Variants } from "framer-motion";
import { fadeUp, inViewport, stagger as staggerTokens, staggerParent } from "@/lib/motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** When to fire: on mount, or when scrolled into view. */
  trigger?: "load" | "viewport";
  /** Delay before the first child animates. */
  delay?: number;
  /** Time between consecutive children. */
  staggerChildren?: number;
  /** Viewport fraction (only used with `trigger="viewport"`). */
  amount?: number;
};

export function Stagger({
  children,
  className,
  trigger = "viewport",
  delay = 0,
  staggerChildren = staggerTokens.base,
  amount = inViewport.amount,
}: StaggerProps) {
  const variants = staggerParent(delay, staggerChildren);

  if (trigger === "load") {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        animate="show"
      >
        {children}
      </motion.div>
    );
  }

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

type StaggerItemProps = {
  children: React.ReactNode;
  /** Override the default `fadeUp`. */
  variants?: Variants;
  className?: string;
};

export function StaggerItem({
  children,
  variants = fadeUp,
  className,
}: StaggerItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
