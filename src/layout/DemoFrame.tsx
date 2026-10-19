import { Link, Outlet, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSeo } from "@/hooks/useSeo";

// The standalone hero explorations: full-bleed, no site chrome. The frame adds
// the only two things they need on the site: a way back and a noindex (they are
// visual demos, not content pages).
const TITLES: Record<string, string> = {
  "/projects/nova": "Nova — Hero Exploration",
  "/projects/nexus": "Nexus — Hero Exploration",
  "/projects/lumino": "Lumino — Hero Exploration",
  "/projects/unleash": "Unleash — Hero Exploration",
};

export default function DemoFrame() {
  const { pathname } = useLocation();
  useSeo({
    title: `${TITLES[pathname] ?? "Project"} | Mohammednur`,
    noindex: true,
  });

  return (
    <>
      <Outlet />

      <Link
        to="/projects"
        data-no-drag
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-2.5 font-mono text-[10px] font-medium tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <BsArrowLeft size={14} aria-hidden="true" />
        PROJECTS
      </Link>
    </>
  );
}
