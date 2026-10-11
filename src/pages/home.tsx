import { usePageTitle } from "@/hooks/usePageTitle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";

export default function Home() {
  usePageTitle("Mohammednur | Software Engineer");

  return (
    <div className="flex gap-2">
      <Hero />
      <About />
      <Projects />
      <section data-section="TESTIMONIALS" className="w-screen">
        Testimonials
      </section>
      <section data-section="CONTACT" className="w-screen">
        Contact
      </section>
    </div>
  );
}
