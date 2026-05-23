// Static content for the landing page. Keeping copy + data here means
// the section components stay focused on layout/markup.

import type { Prize, Judge } from "@/types";

export const EVENT = {
  name: "Futureproof",
  tagline: "Build What's Next",
  date: "May 22–23, 2025",
  location: "TLV Office",
  announcement: "48 Hours of Innovation. One Mission: Shape Tomorrow.",
} as const;

export const REGISTER = {
  heading: "Ready to Build What’s Next?",
  placeholder: "Your full name",
  submitLabel: "Register now",
} as const;

export const ABOUT_COPY = [
  "Welcome to Futureproof, our annual internal hackathon where bold ideas take the spotlight.",
  "Over two high-energy days, teams from across the company will come together to imagine, build, and prototype what's next for our platform.",
] as const;

export const PRIZES: Prize[] = [
  {
    place: "1st Place",
    title: "All-expenses-paid trip to San Francisco",
    image: "/3d/plane.png",
  },
  {
    place: "2nd Place",
    title: "Macbook Pro",
    image: "/3d/macbook.png",
  },
  {
    place: "3rd Place",
    title: "Airpods Max",
    image: "/3d/airpods.png",
  },
];

export const JUDGES: Judge[] = [
  {
    name: "Maya Lin",
    role: "VP of Product",
    image: "/judges/Maya.png",
    description:
      "A visionary product strategist with a passion for turning bold ideas into scalable experiences; Maya brings a sharp eye for real-world impact and user-first thinking.",
  },
  {
    name: "Jordan Wells",
    role: "Head of Engineering",
    image: "/judges/Jordan.png",
    description:
      "The architect behind some of our most complex systems, Jordan values clever hacks, clean execution, and technical elegance — with bonus points for shipping potential.",
  },
  {
    name: "Riya Kapoor",
    role: "Design Director",
    image: "/judges/Riya.png",
    description:
      "A creative force who lives at the intersection of storytelling and systems thinking, Riya will be on the lookout for thoughtful design, intuitive UX, and strong visual narratives.",
  },
];
