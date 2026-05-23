import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BackgroundLines } from "@/components/motion/BackgroundLines";
import "./globals.css";

// CircularXX — the actual Figma brand font, loaded from /public/fonts.
//
// Weight map (matches every place the Figma file references the family):
//   Regular  → 400  — body copy, tags, subtitle, role text, paragraphs,
//                     "Build What's Next", "Hackathon", section headings
//   Medium   → 500  — Register CTA buttons + the announcement strip
//   Bold     → 700  — judge names ("Maya Lin", etc.)
//
// Exposed as `--font-sans` so the existing `font-sans` utility on the
// body picks it up automatically.
const circularXX = localFont({
  src: [
    {
      path: "../public/fonts/CircularXX-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CircularXX-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CircularXX-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Futureproof — Build What's Next",
  description:
    "48 hours of innovation. One mission: shape tomorrow. The internal hackathon for bold ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={circularXX.variable}>
      <body className="min-h-screen bg-ink font-sans text-white antialiased">
        <MotionProvider>
          {/* Page-wide vertical-line atmosphere — fixed behind all content. */}
          <BackgroundLines />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
