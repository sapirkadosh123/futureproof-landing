"use client";

// RegisterFooter — final CTA + minimal site footer.
//
// Motion:
//   - Pen-tool 3D fades in from the right (fadeFromRight)
//   - Headline + form reveal as a Stagger (60ms increment, calm)
//   - Micro footer bar fades up last, on its own viewport trigger

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EVENT, REGISTER } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { Float3D } from "@/components/motion/Float3D";
import { fadeBlur, fadeUp, softFade } from "@/lib/motion";

export function RegisterFooter() {
  return (
    <section
      data-section="register-footer"
      className="relative w-full px-6 pb-[60px] pt-[140px] md:px-[60px] md:pb-[80px] md:pt-[200px]"
    >
      {/* ---- Pen-tool 3D — fade + scroll parallax + mouse-reactive float.
              Heavier movement profile than the code element so the two
              objects read at different depths/speeds. */}
      <Reveal
        variants={softFade}
        amount={0.1}
        className="pointer-events-none absolute -top-[200px] right-[-220px] z-30 hidden w-[589px] lg:block xl:right-[-160px]"
      >
        <Parallax offset={80}>
          <Float3D
            parallax={36}
            tilt={5}
            driftY={20}
            driftX={9}
            driftRotate={4}
            duration={12}
            delay={-2}
          >
            <Image
              src="/3d/pentool.png"
              alt=""
              width={885}
              height={939}
              className="block h-auto w-full"
            />
          </Float3D>
        </Parallax>
      </Reveal>

      {/* ---- CTA column ---- */}
      <Stagger
        staggerChildren={0.18}
        className="relative z-10 mx-auto flex w-full max-w-[667px] flex-col items-center gap-10 sm:gap-12 md:gap-[79px]"
      >
        <StaggerItem variants={fadeBlur}>
          <h2 className="text-center text-[32px] uppercase leading-[1.15] text-white sm:text-[40px] md:text-[56px] lg:text-[70px]">
            {REGISTER.heading}
          </h2>
        </StaggerItem>

        <StaggerItem className="w-full">
          <motion.form
            onSubmit={(event) => {
              // Wire to backend later — for now just block the page reload.
              event.preventDefault();
            }}
            variants={fadeUp}
            className="w-full"
          >
            <div
              className={[
                "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
                "sm:border sm:border-[#3d3d3d] sm:bg-ink sm:py-[14px] sm:pl-[20px] sm:pr-[14px]",
                "transition-[border-color,box-shadow] duration-500",
                // Focus-within: brighten the border and grow the lavender glow softly
                "sm:focus-within:border-lavender/50",
                "sm:focus-within:shadow-[0px_80px_120px_0px_rgba(210,142,255,0.22),0px_4px_19px_0px_rgba(0,0,0,0.43)]",
              ].join(" ")}
              style={{
                boxShadow:
                  "0px 60px 100px 0px rgba(210,142,255,0.12), 0px 4px 19px 0px rgba(0,0,0,0.43)",
              }}
            >
              <input
                type="text"
                name="name"
                required
                placeholder={REGISTER.placeholder}
                aria-label={REGISTER.placeholder}
                className={[
                  // Mobile: standalone bordered field so it reads as an input.
                  "min-w-0 flex-1 bg-transparent text-[16px] uppercase tracking-wideish text-white placeholder:text-white/40 focus:outline-none",
                  "border border-[#3d3d3d] px-4 py-3",
                  // sm+: the wrapper carries the border, input goes flush.
                  "sm:border-0 sm:px-0 sm:py-0 sm:text-[22px]",
                ].join(" ")}
              />
              <Button type="submit" className="w-full sm:w-auto">
                {REGISTER.submitLabel}
              </Button>
            </div>
          </motion.form>
        </StaggerItem>
      </Stagger>

      {/* ---- Footer micro-bar — ambient soft fade ---- */}
      <Reveal
        variants={softFade}
        className="relative z-10 mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-[11px] uppercase tracking-wideish text-white/40 sm:text-left md:mt-[120px] md:flex-row md:text-[14px]"
      >
        <span>
          &copy; {new Date().getFullYear()} {EVENT.name} Hackathon
        </span>
        <span>
          {EVENT.date} &middot; {EVENT.location}
        </span>
      </Reveal>
    </section>
  );
}
