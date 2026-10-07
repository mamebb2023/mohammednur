import { usePageTitle } from "@/hooks/usePageTitle";
import HorizontalRow, { Slide } from "@/components/layout/HorizontalRow";
import RevealWords from "@/components/ui/RevealWords";

export default function About() {
  usePageTitle("About | Mohammednur");

  return (
    <HorizontalRow>
      <Slide>
        <RevealWords
          parts={[
            "I'm a Web Engineer",
            { pill: true, className: "bg-primary", image: "/lotus.png" },
            "passionate about developing intuitive front-end interfaces",
            { pill: true, className: "bg-black" },
            "and building robust back-end systems.",
            { pill: true, className: "bg-primary/25" },
          ]}
          className="max-w-md text-left text-xl font-light leading-relaxed text-black/70 md:text-2xl"
        />
      </Slide>
    </HorizontalRow>
  );
}
