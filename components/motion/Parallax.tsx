"use client";

// Parallax — wraps a child in a scroll-linked vertical drift.
//
// As the element passes through the viewport, its y translation goes
// from 0 (when it first appears at the viewport bottom) to +offset
// (when it exits the viewport top). Positive offsets feel like
// "background lag" — element appears to scroll slower than the page.
// Negative offsets pull the element ahead of the scroll.
//
// Layer different offsets across siblings to build foreground/
// background depth. Spring-damped so the motion stays soft.
//
// All transforms are GPU-only (translateY). Respects prefers-reduced-motion.

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { clsx } from "@/lib/cx";

type ParallaxProps = {
  children: React.ReactNode;
  /** Pixel amplitude — element moves from +offset to -offset across its viewport pass. */
  offset?: number;
  /** Optional className on the OUTER (ref'd) wrapper. */
  className?: string;
  /** Display style on the outer wrapper. Default block. */
  inline?: boolean;
};

export function Parallax({
  children,
  offset = 40,
  className,
  inline = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the element first peeks into the viewport bottom,
  // 1 when its last pixel leaves the top. Linear across that range.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, offset]);
  // Spring smooths jitter from scroll quantization. Damping ≥30 keeps
  // it non-bouncy (Apple/Linear feel, not Material's overshoot).
  const ySpring = useSpring(yRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      className={clsx(inline ? "inline-block" : "block", className)}
    >
      {reduceMotion ? (
        children
      ) : (
        <motion.div style={{ y: ySpring }}>{children}</motion.div>
      )}
    </div>
  );
}
