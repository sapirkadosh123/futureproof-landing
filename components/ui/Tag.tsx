// Tag — a small mark (rectangle) + uppercase label.
// Per Figma, all section/header tags use an off-white mark; the lime
// colour is reserved for the announcement strip. `mark` remains
// configurable for future variants.
//
// Responsive: scales from 14px → 18px → 22px (mobile → md → lg) so the
// header date pill doesn't overflow narrow viewports.

import { clsx } from "@/lib/cx";

type TagProps = {
  children: React.ReactNode;
  /** Colour of the small rectangle mark. */
  mark?: "white" | "lime";
  className?: string;
};

export function Tag({ children, mark = "white", className }: TagProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-3 sm:gap-4",
        "text-[14px] sm:text-[18px] lg:text-[22px]",
        "uppercase tracking-wideish text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx(
          "h-[14px] w-[28px] sm:h-[16px] sm:w-[32px] lg:h-[20px] lg:w-[38px]",
          mark === "white" ? "bg-white" : "bg-lime",
        )}
      />
      <span>{children}</span>
    </div>
  );
}
