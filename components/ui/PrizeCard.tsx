"use client";

// PrizeCard — one of the three flush cards in the Prizes section.
//
// Micro-interactions on hover (CSS-driven via `group`):
//   - Card lifts 4px (Framer whileHover)
//   - Corner gradient brightens (opacity 0.85 → 1)
//   - 3D image scales 1.04 (CSS scale on inner wrapper — composes
//     cleanly with the Parallax translateY since they're on
//     different DOM nodes)
//   - Soft lavender glow shadow blooms
//
// The 3D image wrapper is `z-30` so the PNG always paints above the
// card's gradient + text. Float3D adds mouse parallax + idle drift on
// top of the scroll-based Parallax (same behavior as the pen-tool).

import Image from "next/image";
import { motion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { Parallax } from "@/components/motion/Parallax";
import { Float3D } from "@/components/motion/Float3D";
import { clsx } from "@/lib/cx";
import { ease } from "@/lib/motion";

type FloatConfig = {
  parallax?: number;
  tilt?: number;
  driftY?: number;
  driftX?: number;
  driftRotate?: number;
  duration?: number;
  delay?: number;
};

type PrizeCardProps = {
  place: string;
  title: string;
  image: { src: string; width: number; height: number; alt?: string };
  /** Per-card 3D image positioning. Pixel values are at desktop scale. */
  imagePosition: {
    width: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  /** Parallax amplitude for the 3D image (px). Default 30. */
  imageParallax?: number;
  /** Float3D config — varied per card so the three objects desync. */
  float?: FloatConfig;
  className?: string;
};

export function PrizeCard({
  place,
  title,
  image,
  imagePosition,
  imageParallax = 30,
  float,
  className,
}: PrizeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: ease.inOut }}
      className={clsx(
        // Auto-height on mobile so two-line titles don't get clipped;
        // fixed 294px from md upward where the design intent kicks in.
        "group relative min-h-[180px] w-full overflow-visible bg-ink md:h-[294px]",
        "transition-shadow duration-700",
        // Soft, atmospheric glow — wider blur, lower alpha for a "fog of light" feel
        "hover:shadow-[0_36px_90px_-24px_rgba(210,142,255,0.3)]",
        className,
      )}
    >
      {/* Corner gradient — brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 90% at 100% 100%, #D9FF6B 0%, #FFB084 18%, #B47CFF 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Text block */}
      <div className="relative z-10 flex h-full flex-col px-8 py-7 md:px-[60px] md:py-[25px]">
        <Tag>{place}</Tag>
        <p className="mt-6 max-w-[369px] text-[24px] leading-[1.3] text-white sm:text-[28px] md:mt-10 md:text-[32px] lg:mt-[64px] lg:text-[36px]">
          {title}
        </p>
      </div>

      {/* 3D image — absolute bleed, on top of card content (z-30).
          Scroll Parallax → Float3D (mouse + idle) → hover-scale → image.
          Hidden below xl because the fixed-pixel bleed positions stop
          reading right once cards drop below ~420px wide. */}
      <div
        className="pointer-events-none absolute z-30 hidden xl:block"
        style={{
          width: `${imagePosition.width}px`,
          top:
            imagePosition.top !== undefined
              ? `${imagePosition.top}px`
              : undefined,
          bottom:
            imagePosition.bottom !== undefined
              ? `${imagePosition.bottom}px`
              : undefined,
          left:
            imagePosition.left !== undefined
              ? `${imagePosition.left}px`
              : undefined,
          right:
            imagePosition.right !== undefined
              ? `${imagePosition.right}px`
              : undefined,
        }}
      >
        <Parallax offset={imageParallax}>
          <Float3D {...float}>
            <div className="transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                width={image.width}
                height={image.height}
                className="block h-auto w-full"
              />
            </div>
          </Float3D>
        </Parallax>
      </div>
    </motion.div>
  );
}
