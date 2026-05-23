// Prizes section with scroll-in motion.
//
// - Title row reveals as a Stagger (star then heading)
// - Card row is a Stagger; each card uses fadeUp and reveals with the
//   default 80ms increment, giving a left-to-right wave.

import { StarIcon } from "@/components/ui/StarIcon";
import { PrizeCard } from "@/components/ui/PrizeCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { fadeBlur } from "@/lib/motion";

export function Prizes() {
  return (
    <section
      data-section="prizes"
      className="relative w-full py-[96px] md:py-[140px]"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* ---- Title row ---- */}
      <Stagger
        staggerChildren={0.16}
        className="px-6 md:px-[60px]"
      >
        <div className="flex flex-wrap items-center gap-5">
          <StaggerItem>
            <StarIcon className="h-[56px] w-[56px] shrink-0 text-lavender md:h-[72px] md:w-[72px]" />
          </StaggerItem>
          <StaggerItem variants={fadeBlur}>
            <h2 className="text-[34px] uppercase leading-[1.1] text-white md:text-[44px] lg:text-[50px]">
              Big ideas deserve big rewards.
            </h2>
          </StaggerItem>
        </div>
      </Stagger>

      {/* ---- Cards row ---- */}
      <Stagger
        staggerChildren={0.14}
        className="mt-[64px] md:mt-[140px]"
      >
        <div className="grid grid-cols-1 gap-px lg:grid-cols-3 lg:gap-0">
          <StaggerItem>
            <PrizeCard
              place="1st Place"
              title="All-expenses-paid trip to San Francisco"
              image={{
                src: "/3d/plane.png",
                width: 339,
                height: 222,
                alt: "Chrome airplane",
              }}
              imagePosition={{ width: 226, top: -62, left: 274 }}
              imageParallax={40}
              float={{
                parallax: 28,
                tilt: 4,
                driftY: 14,
                driftX: 6,
                driftRotate: 3,
                duration: 10,
                delay: 0,
              }}
            />
          </StaggerItem>
          <StaggerItem>
            <PrizeCard
              place="2nd Place"
              title="Macbook Pro"
              image={{
                src: "/3d/macbook.png",
                width: 375,
                height: 236,
                alt: "Chrome MacBook Pro",
              }}
              imagePosition={{ width: 250, bottom: -73, left: 202 }}
              imageParallax={25}
              float={{
                parallax: 32,
                tilt: 4.5,
                driftY: 16,
                driftX: 7,
                driftRotate: 3.5,
                duration: 11,
                delay: -4,
              }}
            />
          </StaggerItem>
          <StaggerItem>
            <PrizeCard
              place="3rd Place"
              title="Airpods Max"
              image={{
                src: "/3d/airpods.png",
                width: 270,
                height: 363,
                alt: "Chrome AirPod",
              }}
              imagePosition={{ width: 180, top: 48, right: -34 }}
              imageParallax={35}
              float={{
                parallax: 24,
                tilt: 3.5,
                driftY: 12,
                driftX: 5,
                driftRotate: 2.5,
                duration: 9,
                delay: -2,
              }}
            />
          </StaggerItem>
        </div>
      </Stagger>
    </section>
  );
}
