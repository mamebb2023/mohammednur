import { usePageTitle } from "@/hooks/usePageTitle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  usePageTitle("Mohammednur | Software Engineer");

  return (
    <div className="flex gap-2">
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}
