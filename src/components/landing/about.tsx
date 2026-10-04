import { usePageTitle } from "@/hooks/usePageTitle";
import RevealText from "../ui/RevealText";
import RevealWords from "../ui/RevealWords";

export default function About() {
  usePageTitle("About | Mohammednur");

  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto_1fr] p-3 md:p-4 lg:p-6">
      {/* Row 2: passage, vertically centered, aligned left */}
      <div className="row-start-2 flex items-center justify-start">
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
      </div>

      {/* Row 3: title, pinned to the bottom */}
      <div className="row-start-3 self-end">
        <RevealText className="text-8xl">About</RevealText>
      </div>
    </div>
  );
}
