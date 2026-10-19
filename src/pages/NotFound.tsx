import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  useSeo({ title: "Page not found | Mohammednur", noindex: true });

  return <div>NotFound</div>;
};

export default NotFound;
