import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Prizes } from "@/components/sections/Prizes";
import { Judges } from "@/components/sections/Judges";
import { RegisterFooter } from "@/components/sections/RegisterFooter";

export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-page">
      <Hero />
      <About />
      <Prizes />
      <Judges />
      <RegisterFooter />
    </main>
  );
}
