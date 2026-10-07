import { usePageTitle } from "@/hooks/usePageTitle";
import HorizontalRow, { Slide } from "@/components/layout/HorizontalRow";

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <HorizontalRow>
      <Slide>
        <h1 className="text-3xl">Hello World</h1>
      </Slide>
    </HorizontalRow>
  );
}
