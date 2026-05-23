// Shared motion system.
//
// Style targets: Apple / Linear / Stripe / Vercel — restrained, fast in,
// slow out, GPU-friendly (transform + opacity only), no bouncy springs.
//
// Two ideas underpin the whole system:
//   1. *Easing*: every animation eases out with one canonical curve so
//      the page feels like it shares a metronome.
//   2. *Short, small*: durations stay under ~0.7s and transforms stay
//      under ~24px / 0.02 scale, so the motion reads as polish rather
//      than spectacle.

import type { Transition, Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

/** Easing curves. `out` is the signature curve used everywhere by default. */
export const ease = {
  /** Expo-out-ish — quick depart, long glide. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Tight symmetric curve for hover/exit transitions. */
  inOut: [0.65, 0, 0.35, 1] as const,
};

/** Standard durations (seconds).
 *  Tuned for "calm cinematic" reveals — slow enough to feel premium, not
 *  slow enough to feel sluggish. */
export const duration = {
  fast: 0.4,
  base: 0.9,
  slow: 1.2,
};

/** Stagger increments (seconds between children). */
export const stagger = {
  tight: 0.08,
  base: 0.14,
  loose: 0.2,
};

/** Default transition — used inside variants unless overridden. */
export const baseTransition: Transition = {
  duration: duration.base,
  ease: ease.out,
};

/** Default viewport trigger for scroll-in reveals.
 *  Lowered to 0.18 so slower reveals have time to complete by the moment
 *  the element is fully on screen. */
export const inViewport = {
  once: true,
  amount: 0.18,
} as const;

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

/** Subtle rise + fade. The workhorse — use for most content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Pure opacity fade. Use for backgrounds, decorative bleeds. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

/** Slide in from left — used for the About 3D bleed. */
export const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: baseTransition },
};

/** Slide in from right — used for the pen-tool bleed. */
export const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: baseTransition },
};

/** Rise + fade from a larger offset — for the announcement strip. */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Scale + fade — used sparingly on full-bleed media like judge cards. */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ...baseTransition, duration: duration.slow },
  },
};

/**
 * Subtle blur reveal — opacity + tiny rise + filter blur.
 * The signature Stripe/Linear "text crystallizes in" effect.
 * Use sparingly on headlines/focal text — blur is more expensive to
 * paint than transform, so don't apply it to dozens of elements at once.
 */
export const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    // Slightly longer than the workhorse fadeUp — focal headlines benefit
    // from a calmer crystallization.
    transition: { duration: 1.1, ease: ease.out },
  },
};

/**
 * Soft opacity-only fade — slower, no movement.
 * Best for ambient/decorative content: background gradients, 3D bleeds,
 * footer microbars — anything that should fade in without drawing the
 * eye to motion.
 */
export const softFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/**
 * Parent variant that orchestrates child reveals.
 * Children must declare their own `hidden`/`show` states and omit
 * `initial`/`animate` so they inherit from this parent.
 */
export function staggerParent(
  delay = 0,
  increment: number = stagger.base,
): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: increment,
      },
    },
  };
}
