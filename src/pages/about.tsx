import { usePageTitle } from "@/hooks/usePageTitle";
import RevealWords from "@/components/ui/RevealWords";

export default function About() {
  usePageTitle("About | Mohammednur");

  return (
    <div className="flex items-center flex-1 p-4">
      <RevealWords
        parts={[
          "I'm a Web Engineer",
          { pill: true, className: "bg-primary", image: "/lotus.png" },
          "passionate about developing intuitive front-end interfaces",
          { pill: true, className: "bg-black" },
          "and building robust back-end systems.",
          { pill: true, className: "bg-primary/25" },
        ]}
        className="max-w-sm md:max-w-2xl text-left text-2xl md:text-4xl font-light leading-relaxed text-black/70"
      />
    </div>
  );
}
