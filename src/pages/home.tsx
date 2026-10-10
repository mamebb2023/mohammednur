import { usePageTitle } from "@/hooks/usePageTitle";
import Hero from "@/components/sections/Hero";

export default function Home() {
  usePageTitle("Mohammednur | Software Engineer");

  return (
    <div className="flex gap-2">
      <Hero />
      <section data-section="ABOUT" className="w-screen">
        About
      </section>
      <section data-section="PROJECTS" className="w-screen">
        Projects
      </section>
      <section data-section="TESTIMONIALS" className="w-screen">
        Testimonials
      </section>
      <section data-section="CONTACT" className="w-screen">
        Contact
      </section>
    </div>
  );
}
