import { usePageTitle } from "@/hooks/usePageTitle";

export default function About() {
  usePageTitle("About | Mohammednur");

  return <h1 className="text-3xl">About</h1>;
}
