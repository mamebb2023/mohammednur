import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
