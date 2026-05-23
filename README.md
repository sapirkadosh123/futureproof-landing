# Futureproof — Landing Page

One-pager for the internal **Futureproof** hackathon. Built from a Figma design.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS v3
- Framer Motion

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | TypeScript check (no emit) |

## Folder structure

```
futureproof-landing/
├── app/                    # App Router entry
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Composes the landing sections
│   └── globals.css         # Tailwind directives + CSS vars
├── components/
│   ├── ui/                 # Reusable primitives
│   │   ├── Tag.tsx         # Lime-square + label pill
│   │   ├── Button.tsx      # Lavender CTA button
│   │   └── StarIcon.tsx    # 4-point sparkle glyph
│   └── sections/           # Page sections (one file each)
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Prizes.tsx
│       ├── Judges.tsx
│       └── RegisterFooter.tsx
├── lib/
│   ├── motion.ts           # Shared framer-motion variants
│   └── constants.ts        # Copy, prize + judge data
├── types/
│   └── index.ts            # Shared types (Prize, Judge, ...)
└── public/                 # Static assets (3D renders, photos)
    ├── 3d/
    └── judges/
```

## Status

Scaffold only — sections are stubs. Implementation will be done section-by-section.
