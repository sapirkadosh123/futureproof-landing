"use client";

// Button — lavender primary CTA (Register Now).
// Micro-interactions:
//   - whileHover: scale 1.03 + lavender glow shadow blooms in
//   - whileTap: scale 0.97 (tactile press-down)
//   - transition: 150ms with the inOut curve from lib/motion
// Background colour still uses the existing CSS `transition-colors`
// so the bg change remains buttery alongside the transform.

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "@/lib/cx";
import { ease } from "@/lib/motion";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  children: React.ReactNode;
};

export function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: ease.inOut }}
      className={clsx(
        "inline-flex items-center justify-center bg-lavender px-4 py-2",
        "text-[18px] font-medium uppercase tracking-wide text-ink",
        "transition-[background-color,box-shadow] duration-300",
        // Softer, more diffuse bloom — larger blur, lower alpha
        "hover:bg-lavender-600 hover:shadow-[0_14px_44px_-10px_rgba(210,142,255,0.4)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
