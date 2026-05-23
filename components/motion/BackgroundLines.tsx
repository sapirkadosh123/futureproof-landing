// BackgroundLines — page-wide vertical-line atmosphere.
//
// Three thin white lines at very low opacity, with a slightly brighter
// gradient streak slowly dropping down each one. CSS-only animation
// (`hero-line-streak` keyframes live in app/globals.css).
//
// Mount once at the root layout. `position: fixed` so the lines stay
// in the viewport while the page scrolls — every section sees the
// same calm vertical lines in the background.
//
// Layering: `fixed inset-0 z-0 pointer-events-none overflow-hidden`.
// All page content sits inside `<main className="relative z-10">`, so
// nothing — text, cards, images, buttons, or the 3D PNG assets (which
// use `z-30`) — is ever covered by this layer.

const LINES: { left: string; delay: number }[] = [
  { left: "15%", delay: 0 },
  { left: "50%", delay: -2.3 },
  { left: "85%", delay: -4.7 },
];

export function BackgroundLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {LINES.map((line, i) => (
        <div
          key={i}
          className="absolute bottom-0 top-0 w-px bg-white/[0.06]"
          style={{ left: line.left }}
        >
          {/* Bright light streak that drops down this line.
              animationDelay staggers the three streaks. */}
          <div
            className="hero-line-streak absolute left-0 w-full"
            style={{
              height: "140px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              animationDelay: `${line.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
