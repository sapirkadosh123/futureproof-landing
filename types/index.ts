// Shared types used across sections.

export type Prize = {
  place: "1st Place" | "2nd Place" | "3rd Place";
  title: string;
  image: string;
};

export type Judge = {
  name: string;
  role: string;
  image: string;
  /** Bio paragraph revealed on hover (or always on mobile). */
  description: string;
};
