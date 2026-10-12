import { motion } from "framer-motion";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { projects, rise, staggerContainer } from "@/constants";

const pad = (n: number) => String(n).padStart(2, "0");

// works for #rgb, #rrggbb and 8-digit #rrggbbaa colors (a plain `${color}20` breaks on the 8-digit ones)
const tint = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const btn =
  "inline-flex items-center gap-2 rounded-full border border-primary/45 bg-white/60 px-5 py-3 font-mono text-[11px] font-medium tracking-[0.16em] text-gray-800 transition hover:border-primary hover:bg-primary hover:text-black hover:shadow-lg";

export default function Projects() {
  return (
    <section
      data-section="PROJECTS"
      className="relative flex w-max items-stretch"
    >
      {/* giant faint section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[1.5vw] select-none font-gendy text-[26vh] italic font-semibold leading-[0.8] text-primary/10"
      >
        03
      </span>

      {/* vertical tag, left edge */}
      <span className="absolute left-3.5 top-4 rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl]">
        SEC. 03 — PROJECTS
      </span>

      {/* heading block */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex w-[calc(100vw-40px)] shrink-0 flex-col justify-center pl-[6vw] pr-[8vw] lg:w-[42vw] lg:pr-[5vw]"
      >
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
          className="font-mono text-xs font-medium tracking-[0.2em] text-primary"
        >
          03
        </motion.span>
        <motion.h2
          variants={rise}
          className="mt-3.5 font-gendy text-[clamp(44px,5vw,92px)] font-semibold leading-[1.05]"
        >
          Projects
        </motion.h2>
        <motion.p
          variants={rise}
          className="mt-[3.5vh] max-w-xs font-mono text-[11px] leading-[2.1] tracking-[0.2em] text-gray-500"
        >
          SELECTED WORK — 2024 → NOW.
          <br />
          <br />
          {projects.length} BUILDS I'M PROUD TO PUT MY NAME ON.
        </motion.p>
      </motion.div>

      {/* one card per project; every other one flips and offsets for rhythm */}
      {projects.map((p, i) => {
        const alt = i % 2 === 1;
        return (
          <motion.article
            key={p.title}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`group relative z-10 flex h-full shrink-0 flex-col justify-center pl-[4vw] pr-[4.5vw] w-[calc(100vw-40px)] ${
              alt ? "lg:w-[70vw]" : "lg:w-[78vw]"
            } ${i !== 0 ? "border-l border-gray-100" : ""}`}
          >
            <motion.div
              variants={rise}
              className="mb-[2.8vh] flex items-baseline justify-between"
            >
              <span className="font-gendy text-[clamp(42px,4.4vw,80px)] font-semibold leading-none text-transparent transition-all duration-300 [-webkit-text-stroke:1.5px_rgba(3,252,127,0.45)] group-hover:[-webkit-text-stroke-color:rgba(3,252,127,0.9)]">
                {pad(i + 1)}
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-gray-500">
                {p.duration?.toUpperCase()}
                {p.forClient && " · CLIENT WORK"}
              </span>
            </motion.div>

            <motion.div
              variants={rise}
              className={`flex flex-col items-start gap-[3.5vh] lg:items-center lg:gap-[3.4vw] ${
                alt ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <figure
                className={`group/fig relative m-0 aspect-video w-[min(100%,440px)] shrink-0 rounded-[18px] shadow-xl shadow-black/10 lg:w-[min(34vw,500px,calc(40vh*16/9))] ${
                  alt ? "lg:mt-[7vh]" : "lg:mb-[7vh]"
                }`}
              >
                {/* the image gets its own clipping box (rounded corners + hover zoom),
                    so nothing else in the figure is clipped */}
                <div className="absolute inset-0 overflow-hidden rounded-[18px] border border-gray-100">
                  <img
                    src={p.images[0]}
                    alt={`${p.title} screenshot`}
                    loading="lazy"
                    draggable={false}
                    className="block size-full scale-[1.03] object-cover grayscale transition-all duration-700 ease-out group-hover/fig:scale-[1.06] group-hover/fig:grayscale-0"
                  />
                </div>

                {/* project logo, frosted chip hanging off a corner: right on 01, left on 02, and so on */}
                <span
                  style={{
                    borderColor: tint(p.color, 45),
                    backgroundColor: tint(p.color, 30),
                  }}
                  className={`absolute -top-3 z-10 grid size-10 place-items-center rounded-xl border p-1.5 backdrop-blur-md ${
                    alt ? "-left-3" : "-right-3"
                  }`}
                >
                  <img
                    src={p.logo}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="size-full object-contain"
                  />
                </span>

                <figcaption className="absolute bottom-3 left-3.5 z-10 font-mono text-[9px] font-medium tracking-[0.22em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                  FIG. {pad(i + 1)} — {p.role.toUpperCase()}
                </figcaption>
              </figure>

              <div className="max-w-[36ch]">
                <h3 className="font-gendy text-[clamp(26px,2.4vw,42px)] font-semibold leading-[1.1] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mb-5 mt-3 font-mono text-[11px] font-medium tracking-[0.24em] text-gray-600">
                  {p.mini_title?.toUpperCase()}
                </p>
                <p className="mb-5.5 text-[15px] leading-[1.75] text-gray-600">
                  {p.description}
                </p>

                <ul className="mb-6.5 flex flex-wrap gap-2">
                  {p.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.16em] text-gray-600"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className={btn}
                    >
                      <BiLogoGithub size={16} />
                      SOURCE
                    </a>
                  )}
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className={btn}
                    >
                      <BiLinkExternal size={16} />
                      LIVE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.article>
        );
      })}
    </section>
  );
}
