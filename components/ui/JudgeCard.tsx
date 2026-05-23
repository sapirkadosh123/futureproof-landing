"use client";

// JudgeCard — full-bleed portrait + hover reveal of the judge's bio.
//
// Layers (back → front):
//   1. Diagonal background gradient (ink → lavender)
//   2. B&W portrait (object-cover, grayscale)
//   3. Bottom legibility gradient (40% of card, always on — keeps the
//      name + role readable in the default state)
//   4. Hover darken overlay — full-card linear gradient (matches the
//      Figma hover variant: from ink at bottom up to 40% ink at top).
//      Hidden by default on desktop, faded in on group-hover.
//      Always-on on mobile so the description below stays readable.
//   5. Description — fades + slides up from just below its rest
//      position. Positioned with `bottom-*` so it anchors to the line
//      directly above the name/role, content flowing upward.
//   6. Name + role — anchored at bottom-left of the card. Position is
//      preserved across the default ↔ hover transition; the description
//      never pushes them.
//
// Mobile (<md): description is shown by default; no hover needed.
// Desktop (md+): description is hidden until the card is hovered.

import Image from "next/image";
import { motion } from "framer-motion";
import { clsx } from "@/lib/cx";
import { ease } from "@/lib/motion";
import type { Judge } from "@/types";

type JudgeCardProps = {
  judge: Judge;
  className?: string;
};

export function JudgeCard({ judge, className }: JudgeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: ease.inOut }}
      className={clsx(
        "group relative aspect-[480/542] w-full overflow-hidden",
        "transition-shadow duration-700",
        "hover:shadow-[0_40px_100px_-28px_rgba(210,142,255,0.25)]",
        className,
      )}
    >
      {/* 1. Diagonal background gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(146deg, #0a090b 41%, #d28eff 93%)",
        }}
      />

      {/* 2. Portrait — grayscale, subtle zoom on hover */}
      <Image
        src={judge.image}
        alt={`Portrait of ${judge.name}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 480px"
        className="object-cover grayscale transition-transform duration-700 ease-out md:group-hover:scale-[1.04]"
        priority={false}
      />

      {/* 3. Always-on bottom gradient — keeps the name + role legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%]"
        style={{
          background:
            "linear-gradient(to top, #0a090b 0%, rgba(10,9,11,0) 100%)",
        }}
      />

      {/* 4. Hover darken — full-card overlay that mirrors the Figma hover
              variant. Visible by default on mobile so the description reads. */}
      <div
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 ease-out",
          "opacity-100 md:opacity-0 md:group-hover:opacity-100",
        )}
        style={{
          background:
            "linear-gradient(to top, #0a090b 0%, rgba(10,9,11,0.4) 100%)",
        }}
      />

      {/* 5. Description — anchored above the name, content flows upward.
              Soft slide + fade on group-hover (desktop); visible by default
              on mobile. */}
      <div className="absolute inset-x-0 bottom-[100px] z-20 px-6 sm:bottom-[120px] sm:px-8 lg:bottom-[148px] lg:px-[60px]">
        <p
          className={clsx(
            "text-[14px] leading-[1.35] text-white sm:text-[16px] lg:text-[20px]",
            "transition-[opacity,transform] duration-500 ease-out",
            "opacity-100 translate-y-0",
            "md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0",
          )}
        >
          {judge.description}
        </p>
      </div>

      {/* 6. Name + role — position preserved, always visible */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 py-6 sm:px-8 sm:py-7 lg:px-[60px] lg:py-[30px]">
        <p className="text-[22px] font-bold uppercase leading-[1.1] text-white sm:text-[26px] lg:text-[32px]">
          {judge.name}
        </p>
        <p className="mt-1 text-[13px] uppercase tracking-wideish text-white sm:text-[16px] lg:text-[24px]">
          {judge.role}
        </p>
      </div>
    </motion.div>
  );
}
