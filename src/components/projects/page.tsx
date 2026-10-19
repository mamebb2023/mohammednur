import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { useSeo } from "@/hooks/useSeo";
import { rise, staggerContainer } from "@/constants";

const projects = [
  {
    title: "Michael Edits",
    tag: "Video Editor & Content Creator Portfolio",
    img: "/assets/michaeledits/michaeledits-1.webp",
    link: "https://michaeledits.pro.et/",
  },
  {
    title: "Nova",
    tag: "Hero Exploration",
    img: "/projects/thumb/nova.webp",
    link: "/projects/nova",
  },
  {
    title: "Nexus",
    tag: "Hero Exploration",
    img: "/projects/thumb/nexus.webp",
    link: "/projects/nexus",
  },
  {
    title: "Lumino",
    tag: "Hero Exploration",
    img: "/projects/thumb/lumino.webp",
    link: "/projects/lumino",
  },
  {
    title: "Unleash",
    tag: "Hero Exploration",
    img: "/projects/thumb/unleash.webp",
    link: "/projects/unleash",
  },
  {
    title: "LotusFlow",
    tag: "AI-Powered React Component Generator",
    img: "/assets/lotusflow/lotusflow-1.webp",
    link: "https://lotusflow.vercel.app/",
  },
  {
    title: "WeMD Africa",
    tag: "Online Dermatology Clinic",
    img: "/assets/wemd/wemd-1.webp",
    link: "https://wemd-africa.vercel.app/",
  },
  {
    title: "SanAI",
    tag: "Your Personal AI Doctor",
    img: "/assets/sanai/sanai-1.webp",
    link: "https://sanai-nu.vercel.app/",
  },
  {
    title: "CalHabit",
    tag: "Habit tracking web app",
    img: "/assets/calhabit/calhabit-1.webp",
    link: "https://cal-habit.vercel.app/",
  },
  {
    title: "Brainwave",
    tag: "Modern & Responsive SaaS Landing Page",
    img: "/assets/brainwave/brainwave-1.webp",
    link: "https://brainwave-iota-five-26.vercel.app/",
  },
];

const cardClass =
  "group flex h-full cursor-pointer flex-col border border-gray-500/20 rounded-2xl p-2 hover:border-green-500/40 transition-all bg-white/30";

const isExternal = (url: string) => /^https?:\/\//.test(url);

/* Every card lifts in on its own trigger: the grid travels sideways, so a card far
   to the right should reveal when it actually arrives, not with the first screenful. */
const reveal = {
  variants: rise,
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.3 },
};

function CardBody({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100">
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 flex items-center justify-between px-3">
        <div>
          <h2 className="text-lg md:text-xl font-medium tracking-tight">
            {project.title}
          </h2>
          <p className="text-md text-black/80">{project.tag}</p>
        </div>

        <div className="shrink-0 whitespace-nowrap text-green-800/80 text-sm group-hover:translate-x-1 transition">
          View →
        </div>
      </div>
    </>
  );
}

const ProjectsPage = () => {
  useSeo({
    title: "Projects — Mohammednur Seid | Full-Stack Web Apps",
    description:
      "Selected work by Mohammednur Seid: Michael Edits, LotusFlow, WeMD Africa, SanAI, CalHabit and more — full-stack React and Next.js builds.",
    path: "/projects",
  });

  return (
    <section
      data-scroll-y
      className="relative max-md:min-h-screen shrink-0 px-6 py-5 text-black md:h-full md:w-max md:overflow-y-auto md:overscroll-y-contain md:px-10 md:py-6"
    >
      {/* Back Button + header share one trigger: they are the first thing on the page */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div
          variants={rise}
          className="max-w-5xl mx-auto mb-5 md:mx-0 md:mb-3 md:max-w-none"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition"
          >
            <BsArrowLeft size={16} className="text-green-500" />
            Back
          </Link>
        </motion.div>

        {/* Section Header */}
        <motion.div
          variants={rise}
          className="max-w-5xl mx-auto mb-5 md:mx-0 md:mb-4 md:max-w-none"
        >
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-linear-to-b from-black via-black to-green-500">
            Projects
          </h1>
          <p className="text-sm text-black/60 mt-3 max-w-md">
            A collection of explorations, interfaces, and visual systems.
          </p>
        </motion.div>
      </motion.div>

      {/* Grid — mobile: the usual single column, scrolls down.
          md and up: two rows laid out column-wise, so the page grows sideways
          and the cards travel with the site's horizontal scroll. */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 md:mx-0 md:max-w-none md:auto-cols-[clamp(280px,26vw,420px)] md:grid-flow-col md:grid-cols-none md:grid-rows-2 md:gap-5">
        {projects.map((project) => (
          <motion.div key={project.title} {...reveal}>
            {isExternal(project.link) ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={cardClass}
              >
                <CardBody project={project} />
              </a>
            ) : (
              <Link to={project.link} className={cardClass}>
                <CardBody project={project} />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
