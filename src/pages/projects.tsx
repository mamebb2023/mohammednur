import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BiLinkExternal,
  BiLogoGithub,
  BiStar,
  BiUser,
  BiCalendar,
} from "react-icons/bi";
import { usePageTitle } from "@/hooks/usePageTitle";
import { easeOutExpo, projects, miniProjects } from "@/constants";

// Normalised shape so featured and mini projects share the same pieces
type Item = {
  title: string;
  mini_title?: string;
  description: string;
  role: string;
  duration?: string;
  features: string[];
  color: string;
  logo: string;
  image?: string;
  live?: string;
  code?: string;
  bestProject?: boolean;
  forClient?: boolean;
};

const featured: Item[] = projects.map((p) => ({
  ...p,
  image: p.images?.[0],
  live: p.links.live,
  code: "code" in p.links ? p.links.code : undefined,
}));

const more: Item[] = miniProjects.map((p) => {
  const links = p.links as string[];
  return {
    ...p,
    image: "images" in p ? p.images?.[0] : p.image,
    code: links.find((l) => l.includes("github.com")),
    live: links.find((l) => !l.includes("github.com")),
  };
});

// Soft tint of each project's own color, works with 6 and 8 digit hex
const tint = (color: string, pct = 15) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

function LinkPill({
  href,
  label,
  icon: Icon,
  solid = false,
}: {
  href: string;
  label: string;
  icon: typeof BiLinkExternal;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 ${
        solid
          ? "bg-primary text-black hover:shadow-[0_8px_30px_-8px_rgba(3,252,127,0.8)]"
          : "border border-black/10 bg-white/50 text-black hover:border-primary hover:bg-primary"
      }`}
    >
      <Icon
        className="text-lg transition-transform duration-300 group-hover:rotate-12"
        aria-hidden="true"
      />
      {label}
    </a>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((f) => (
        <li
          key={f}
          className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60"
        >
          {f}
        </li>
      ))}
    </ul>
  );
}

function Meta({ role, duration }: { role: string; duration?: string }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-widest text-black/40">
      <span className="flex items-center gap-1.5">
        <BiUser aria-hidden="true" />
        {role}
      </span>
      {duration && (
        <span className="flex items-center gap-1.5">
          <BiCalendar aria-hidden="true" />
          {duration}
        </span>
      )}
    </div>
  );
}

function LogoTile({ item, size }: { item: Item; size: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl ${size}`}
      style={{ backgroundColor: tint(item.color, 18) }}
    >
      <img
        src={item.logo}
        alt=""
        loading="lazy"
        className="size-3/4 object-contain"
      />
    </span>
  );
}

function FeaturedCard({ item, variants }: { item: Item; variants: Variants }) {
  return (
    <motion.article
      variants={variants}
      className="group flex flex-col overflow-hidden rounded-4xl border border-gray-100 bg-white/50 shadow-lg transition-shadow duration-500 hover:shadow-2xl"
    >
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: tint(item.color, 20) }}
      >
        {item.image && (
          <img
            src={item.image}
            alt={`${item.title} screenshot`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          {item.bestProject && (
            <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
              <BiStar aria-hidden="true" /> Featured
            </span>
          )}
          {item.forClient && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-black">
              Client work
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex items-center gap-4">
          <LogoTile item={item} size="size-14" />
          <div>
            <h3 className="font-gendy text-3xl leading-none text-black">
              {item.title}
            </h3>
            {item.mini_title && (
              <p className="mt-1 text-sm text-black/50">{item.mini_title}</p>
            )}
          </div>
        </div>

        <p className="text-base font-light leading-relaxed text-black/70">
          {item.description}
        </p>

        <Meta role={item.role} duration={item.duration} />
        <Chips items={item.features.slice(0, 4)} />

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {item.live && (
            <LinkPill
              href={item.live}
              label="Live"
              icon={BiLinkExternal}
              solid
            />
          )}
          {item.code && (
            <LinkPill href={item.code} label="Code" icon={BiLogoGithub} />
          )}
        </div>
      </div>
    </motion.article>
  );
}

function MiniCard({ item, variants }: { item: Item; variants: Variants }) {
  return (
    <motion.li
      variants={variants}
      className="flex gap-4 rounded-4xl border border-gray-100 bg-white/50 p-5 shadow-lg"
    >
      <LogoTile item={item} size="size-12" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight text-black">
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-light text-black/60">
            {item.description}
          </p>
        </div>
        <Meta role={item.role} duration={item.duration} />
        <Chips items={item.features.slice(0, 3)} />
        <div className="flex flex-wrap gap-3">
          {item.live && (
            <LinkPill
              href={item.live}
              label="Live"
              icon={BiLinkExternal}
              solid
            />
          )}
          {item.code && (
            <LinkPill href={item.code} label="Code" icon={BiLogoGithub} />
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default function Projects() {
  usePageTitle("Projects | Mohammednur");
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.2, delay: 1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto my-auto w-full max-w-6xl space-y-10 p-4 pb-20"
    >
      <div className="space-y-4">
        <div className="h-5" />
        <motion.h1
          variants={item}
          className="font-gendy text-6xl leading-[0.85] text-black md:text-8xl"
        >
          Selected <span className="text-primary">work.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-sm text-lg font-light leading-relaxed text-black/60 md:max-w-md"
        >
          Products, client builds and experiments, from AI tools to landing
          pages.
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p) => (
          <FeaturedCard key={p.title} item={p} variants={item} />
        ))}
      </div>

      <div className="space-y-6">
        <motion.p
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-black/50"
        >
          More projects
        </motion.p>
        <ul className="grid gap-6 md:grid-cols-2">
          {more.map((p) => (
            <MiniCard key={p.title} item={p} variants={item} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
