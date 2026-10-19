import { useSeo } from "@/hooks/useSeo";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useSeo({
    title: "Mohammednur Seid — Full-Stack React & Next.js Developer",
    path: "/",
  });

  // mobile: a full-width column of sections; md and up: a horizontal strip
  return (
    <div className="flex w-full flex-col md:w-auto md:flex-row md:gap-2">
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}
