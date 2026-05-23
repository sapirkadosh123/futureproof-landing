// About section with scroll-in motion.
//
// Synced to the updated Figma layout:
//   - NEW: 3D AI star (`/3d/3d-ai-star.png`) sits in the left-bleed
//     slot at x≈-261 of the 1440 frame (where the code element used
//     to be), centered vertically against the text column.
//   - MOVED: the 3D `</>` code element is now in the upper-right
//     position, bleeding ~100px past the right edge and ~200px up
//     above the About section's top edge.
//
// Both 3D PNGs get the same motion system as every other 3D asset on
// the page: scroll Reveal (softFade) → scroll Parallax → Float3D
// (mouse parallax + 3D tilt + idle drift). z-30 so they paint above
// section content. Param values are tuned per-asset so the two loops
// desync.

import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { ABOUT_COPY } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { Float3D } from "@/components/motion/Float3D";
import { fadeBlur, softFade } from "@/lib/motion";

export function About() {
  return (
    <section
      data-section="about"
      className="relative w-full px-6 py-[96px] md:px-[60px] md:py-[140px]"
    >
      {/* ---- 3D `</>` code element — NEW POSITION per updated Figma.
              Bleeds upper-right (top:-200, right:-100, width:482).
              Hidden below lg because the bleed requires the layout
              width. */}
      <Reveal
        variants={softFade}
        amount={0.1}
        className="pointer-events-none absolute right-[-100px] top-[-200px] z-30 hidden w-[482px] lg:block"
      >
        <Parallax offset={45}>
          <Float3D
            parallax={22}
            tilt={3.2}
            driftY={12}
            driftX={5}
            driftRotate={2.5}
            duration={9}
            delay={-3}
          >
            <Image
              src="/3d/code.png"
              alt=""
              width={598}
              height={479}
              className="block h-auto w-full"
            />
          </Float3D>
        </Parallax>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_800px] lg:gap-16">
        {/* ---- Left: NEW 3D AI star — replaces the previous code element
                here (per updated Figma). Bleeds far left on lg
                (left:-321 = page x=-261). On mobile it centers smaller. */}
        <Reveal variants={softFade} className="relative z-30 w-full lg:h-[600px]">
          <Parallax offset={70}>
            <Float3D
              parallax={28}
              tilt={4}
              driftY={15}
              driftX={6}
              driftRotate={3}
              duration={11}
              delay={-5}
            >
              <Image
                src="/3d/3d-ai-star.png"
                alt=""
                width={1677}
                height={1717}
                className="mx-auto block h-auto w-[553px] sm:w-[794px] lg:absolute lg:left-[-50px] lg:top-[calc(50%+50px)] lg:mx-0 lg:w-[1763px] lg:-translate-y-1/2"
              />
            </Float3D>
          </Parallax>
        </Reveal>

        {/* ---- Right: text content (unchanged) ---- */}
        <Stagger
          staggerChildren={0.16}
          className="flex w-full max-w-[800px] flex-col gap-10"
        >
          <StaggerItem>
            <Tag>What It&rsquo;s About</Tag>
          </StaggerItem>

          <StaggerItem variants={fadeBlur}>
            <div className="text-[24px] leading-[1.3] text-white md:text-[28px] lg:text-[36px]">
              {ABOUT_COPY.map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-6" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
