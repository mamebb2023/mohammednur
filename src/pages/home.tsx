import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <div className="flex items-center flex-1 p-4">
      <h1 className="text-3xl">Hello World</h1>
    </div>
  );
}
