"use client";

// Float3D — wraps a child (typically a 3D rendered image) in three
// layered motion treatments that together give the "weightless 3D
// object hanging in space" feel:
//
//   1. MOUSE PARALLAX — translate X/Y based on the global cursor
//      position. Foreground objects use a larger range, background
//      objects a smaller one.
//   2. MOUSE TILT — rotateX/rotateY based on cursor; combined with a
//      CSS `perspective` on the wrapper this reads as a soft 3D pivot
//      toward the cursor.
//   3. IDLE DRIFT — a continuous, low-amplitude looped translate +
//      rotation so the object never sits perfectly still.
//
// Each instance owns its own window mousemove listener. Two listeners
// (one per 3D image on the page) is well within budget. Spring
// smoothing makes the parallax soft and physical.
//
// Only transforms/opacity are touched — compositor-friendly. Reduced
// motion is honoured via the root MotionConfig (animations snap to
// final state).

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { clsx } from "@/lib/cx";

type Float3DProps = {
  children: React.ReactNode;
  /** Mouse parallax max range in px (applied to X; Y is scaled 0.7×). */
  parallax?: number;
  /** Mouse-driven 3D tilt range in degrees (rotateX/rotateY). */
  tilt?: number;
  /** Idle drift Y amplitude (px). */
  driftY?: number;
  /** Idle drift X amplitude (px). */
  driftX?: number;
  /** Idle rotation amplitude (deg). */
  driftRotate?: number;
  /** Idle loop duration in seconds — vary across objects for depth. */
  duration?: number;
  /** Phase offset (negative pre-starts the loop so multiple objects desync). */
  delay?: number;
  className?: string;
};

export function Float3D({
  children,
  parallax = 30,
  tilt = 4,
  driftY = 14,
  driftX = 6,
  driftRotate = 3,
  duration = 9,
  delay = 0,
  className,
}: Float3DProps) {
  // Window-level mouse position, normalised to (-1 … 1).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  // Soft, slow spring — physical, no overshoot.
  const sx = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.6 });

  // Translate parallax
  const px = useTransform(sx, [-1, 1], [-parallax, parallax]);
  const py = useTransform(sy, [-1, 1], [-parallax * 0.7, parallax * 0.7]);

  // 3D tilt — invert rotateX so cursor below tilts the object slightly back
  const rotY = useTransform(sx, [-1, 1], [-tilt, tilt]);
  const rotX = useTransform(sy, [-1, 1], [tilt, -tilt]);

  return (
    <div className={clsx(className)} style={{ perspective: "1200px" }}>
      <motion.div
        style={{
          x: px,
          y: py,
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{
            y: [0, -driftY, 0, driftY * 0.35, 0],
            x: [0, driftX * 0.5, 0, -driftX, 0],
            rotate: [0, driftRotate, 0, -driftRotate, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
