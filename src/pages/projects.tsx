import { usePageTitle } from "@/hooks/usePageTitle";
import HorizontalRow, { Slide } from "@/components/layout/HorizontalRow";

export default function Projects() {
  usePageTitle("Projects | Mohammednur");

  return (
    <HorizontalRow>
      <Slide>
        <h1 className="text-3xl">Coming soon</h1>
      </Slide>
    </HorizontalRow>
  );
}
