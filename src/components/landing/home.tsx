import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <div>
      <h1 className="text-3xl">Hello World</h1>
    </div>
  );
}
