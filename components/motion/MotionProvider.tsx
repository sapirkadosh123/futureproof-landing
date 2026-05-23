"use client";

// MotionProvider — wraps the whole app in a <MotionConfig> so every
// framer-motion component automatically honours the user's
// prefers-reduced-motion setting (transitions snap to their final state
// when reduced-motion is on).
//
// Lives at the root because it's an inert wrapper — server children
// pass through unchanged.

import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
