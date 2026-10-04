import { usePageTitle } from "@/hooks/usePageTitle";
import RevealText from "../ui/RevealText";

export default function Projects() {
  usePageTitle("Projects | Mohammednur");

  return (
    <div className="min-h-screen flex flex-col justify-end p-3 md:p-4 lg:p-6">
      <RevealText className="text-8xl">Projects</RevealText>
    </div>
  );
}
