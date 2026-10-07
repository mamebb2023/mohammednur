import RevealText from "@/components/ui/RevealText";
import RevealWords from "@/components/ui/RevealWords";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <div className="flex items-center flex-1 p-4">
      <div className="text-lg">
        <RevealText>I'm</RevealText>

        <RevealWords
          parts={["Mohammednur"]}
          delay={0.3}
          className="text-7xl lg:text-8xl"
        />

        <RevealWords
          parts={["Software Engineer & founder at BlackBronze"]}
          className="text-primary text-xl"
        />
      </div>
    </div>
  );
}
