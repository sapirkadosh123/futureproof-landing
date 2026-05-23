"use client";

// Hero — grounded typography with subtle scroll-driven liftoff.
// The page-wide warp Starfield lives in app/layout, behind everything.
// Hero only does subtle scroll-y/scale/opacity on its own layers; no
// mouse-driven motion on the main content.

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/StarIcon";
import { EVENT } from "@/lib/constants";
import { fadeBlur, fadeIn, fadeUp, slideUp, staggerParent } from "@/lib/motion";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll-driven liftoff — main content stays grounded.
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const subtitleScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const stripY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const stripOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      data-section="hero"
      className="relative flex w-full flex-col"
      variants={staggerParent(0.05, 0.15)}
      initial="hidden"
      animate="show"
    >
      {/* ---- Header nav ---- */}
      <motion.div
        variants={fadeIn}
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative z-10 px-6 pt-6 md:px-[60px] md:pt-[30px]"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Tag mark="white">
            {EVENT.date} | {EVENT.location}
          </Tag>
          <Button>Register now</Button>
        </div>
      </motion.div>

      {/* ---- Wordmark block ---- */}
      <div className="relative z-10 px-6 pt-16 sm:pt-20 md:px-[60px] md:pt-[100px] lg:pt-[160px]">
        {/* Soft black readability vignette — darkens the page's vertical
            background lines just enough to keep the FUTUREPROOF wordmark
            and subtitle legible. Heavy blur + multi-stop radial fade
            means no visible shape. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 hidden h-[420px] w-[1300px] -translate-x-1/2 md:top-[70px] md:block lg:top-[130px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.12) 55%, transparent 78%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1152px]">
          {/* Star + FUTUREPROOF wordmark */}
          <motion.div
            variants={fadeUp}
            style={{
              y: wordmarkY,
              scale: wordmarkScale,
              opacity: wordmarkOpacity,
              transformOrigin: "top center",
            }}
            className="flex items-center gap-3 sm:gap-4 lg:gap-[26px]"
          >
            <StarIcon className="h-[44px] w-[44px] shrink-0 text-lavender sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px] lg:h-[124px] lg:w-[124px]" />
            <Image
              src="/hero/logotype.svg"
              alt="Futureproof"
              width={1003}
              height={107}
              priority
              className="block h-auto w-full min-w-0 max-w-[1003px] flex-1"
            />
          </motion.div>

          {/* Subtitle + Hackathon sticker */}
          <motion.div
            variants={fadeBlur}
            style={{
              y: subtitleY,
              scale: subtitleScale,
              opacity: subtitleOpacity,
              transformOrigin: "top left",
            }}
            className="relative mt-3 flex flex-col items-start gap-3 sm:mt-4 lg:mt-6 lg:flex-row lg:items-start lg:gap-0"
          >
            <p className="text-[24px] uppercase leading-none text-white sm:text-[32px] md:text-[44px] lg:ml-[150px] lg:text-[70px]">
              Build What&rsquo;s Next
            </p>

            {/* Hackathon sticker — idle bob + sway loop. */}
            <motion.span
              className="inline-block origin-left scale-50 sm:scale-75 lg:ml-8 lg:mt-1 lg:scale-100"
              animate={{
                y: [0, -4, 0, 2, 0],
                rotate: [-5, -3.5, -5, -6.5, -5],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 286 109"
                  className="block h-[100px] w-[286px] text-white"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="143"
                    cy="50"
                    rx="141"
                    ry="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    cx="143"
                    cy="58"
                    rx="141"
                    ry="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[25px] uppercase tracking-oval text-white">
                  Hackathon
                </span>
              </span>
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ---- Announcement strip — infinite marquee ---- */}
      <motion.div
        variants={slideUp}
        style={{ y: stripY, opacity: stripOpacity }}
        className="relative z-10 mt-16 w-full overflow-hidden bg-lime py-2 sm:mt-24 md:mt-[120px] lg:mt-[160px]"
      >
        {/* Announce the message once for screen readers. */}
        <span className="sr-only">{EVENT.announcement}</span>

        {/* Marquee track — eight identical copies. The track is
            `w-max` (fits all copies side by side) and CSS-animates
            `translateX` from 0 to -50% in a linear loop. Because the
            second half is an exact duplicate of the first, the
            wrap-around is seamless — no jump. `motion-reduce:animate-none`
            disables the loop when prefers-reduced-motion is on. */}
        <div
          aria-hidden
          className="flex w-max animate-marquee motion-reduce:animate-none"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center text-[11px] font-medium uppercase tracking-wideish text-ink sm:text-[14px] md:text-[18px] lg:text-[22px]"
            >
              <span className="whitespace-nowrap">{EVENT.announcement}</span>
              <span className="mx-6 sm:mx-8" aria-hidden>
                •
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
