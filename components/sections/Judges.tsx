// Judges section with scroll-in motion.
//
// - Tag fades up first (own Reveal)
// - Three judge cards stagger in as a row using scaleFade — slightly slower
//   curve since they're media-heavy and benefit from a calmer reveal.

import { Tag } from "@/components/ui/Tag";
import { JudgeCard } from "@/components/ui/JudgeCard";
import { JUDGES } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { fadeBlur, scaleFade } from "@/lib/motion";

export function Judges() {
  return (
    <section
      data-section="judges"
      className="relative w-full py-[96px] md:py-[140px]"
    >
      {/* ---- Tag ---- */}
      <Reveal variants={fadeBlur} className="px-6 md:px-[60px]">
        <Tag>Meet the Judges</Tag>
      </Reveal>

      {/* ---- Cards row ---- */}
      <Stagger
        staggerChildren={0.18}
        className="mt-[48px] md:mt-[72px]"
      >
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          {JUDGES.map((judge) => (
            <StaggerItem key={judge.name} variants={scaleFade}>
              <JudgeCard judge={judge} />
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </section>
  );
}
