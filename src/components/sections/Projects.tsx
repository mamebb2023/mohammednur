import { motion } from "framer-motion";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { projects, rise, staggerContainer } from "@/constants";

const pad = (n: number) => String(n).padStart(2, "0");

// works for #rgb, #rrggbb and 8-digit #rrggbbaa colors (a plain `${color}20` breaks on the 8-digit ones)
const tint = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/* The grayscale gets its own, much shorter duration: a filter cross-fade repaints the
   whole image on every frame, while the scale is a transform that just gets composited.
   Written as a shorthand because Tailwind's transition-[...] can't carry two durations. */
const figureImg =
  "block size-full scale-[1.03] object-cover md:grayscale md:group-hover/fig:scale-[1.06] md:group-hover/fig:grayscale-0";
const figureImgTransition = {
  transition: "filter 300ms ease-out, transform 700ms ease-out",
};

const btn =
  "inline-flex items-center gap-2 rounded-full border border-primary/45 bg-white/60 px-5 py-3 font-mono text-[11px] font-medium tracking-[0.16em] text-gray-800 transition hover:border-primary hover:bg-primary hover:text-black hover:shadow-lg";

export default function Projects() {
  return (
    <section
      data-section="PROJECTS"
      className="relative flex items-stretch max-md:w-full max-md:flex-col md:w-max"
    >
      {/* the big faint number would land at the very bottom of the whole column on mobile, so it's desktop only */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-[1.5vw] hidden select-none font-gendy text-[18svh] italic font-semibold leading-[0.8] text-primary/10 md:bottom-2 md:block md:text-[26svh]"
      >
        03
      </span>

      <span className="absolute left-3.5 top-4 hidden rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl] md:block">
        SEC. 03 — PROJECTS
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex w-full shrink-0 flex-col justify-center py-10 pl-6 pr-6 md:w-[calc(100vw-40px)] md:py-0 md:pl-[6vw] md:pr-[8vw] lg:w-[42vw] lg:pr-[5vw]"
      >
        <motion.span
          variants={rise}
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
          className="mt-[clamp(14px,3.5svh,32px)] max-w-xs font-mono text-[10px] leading-[2.1] tracking-[0.18em] text-gray-500 sm:text-[11px] sm:tracking-[0.2em]"
        >
          SELECTED WORK — 2024 → NOW.
          <br />
          <br />
          {projects.length} BUILDS I'M PROUD TO PUT MY NAME ON.
        </motion.p>
      </motion.div>

      {projects.map((p, i) => {
        const alt = i % 2 === 1;
        return (
          <motion.article
            key={p.title}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`group relative z-10 flex w-full shrink-0 px-6 py-8 md:h-full md:w-[calc(100vw-40px)] md:py-3 md:max-lg:overflow-x-hidden md:max-lg:overflow-y-auto md:max-lg:overscroll-y-contain lg:pl-[4vw] lg:pr-[4.5vw] ${
              alt ? "lg:w-[70vw]" : "lg:w-[78vw]"
            } ${i !== 0 ? "border-t border-gray-100 md:border-t-0 md:border-l" : ""}`}
          >
            <div className="my-auto w-full">
              <motion.div
                variants={rise}
                className="mb-[clamp(12px,2.8svh,28px)] flex items-baseline justify-between gap-4"
              >
                <span className="font-gendy text-[clamp(42px,4.4vw,80px)] font-semibold leading-none text-transparent transition-[-webkit-text-stroke-color] duration-300 [-webkit-text-stroke:1.5px_rgba(3,252,127,0.45)] group-hover:[-webkit-text-stroke-color:rgba(3,252,127,0.9)]">
                  {pad(i + 1)}
                </span>
                <span className="text-right font-mono text-[10px] font-medium tracking-[0.18em] text-gray-500 sm:text-[11px] sm:tracking-[0.22em]">
                  {p.duration?.toUpperCase()}
                  {p.forClient && " · CLIENT WORK"}
                </span>
              </motion.div>

              <motion.div
                variants={rise}
                className={`flex flex-col items-start gap-[clamp(16px,3.5svh,32px)] lg:items-center lg:gap-[3.4vw] ${
                  alt ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <figure
                  className={`group/fig relative m-0 aspect-video w-[min(100%,440px)] shrink-0 rounded-[18px] shadow-xl shadow-black/10 lg:w-[min(34vw,500px,calc(40vh*16/9))] ${
                    alt ? "lg:mt-[7vh]" : "lg:mb-[7vh]"
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[18px] border border-gray-100">
                    <img
                      src={p.images[0]}
                      alt={`${p.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={figureImgTransition}
                      className={figureImg}
                    />
                  </div>

                  <span
                    style={{
                      borderColor: tint(p.color, 45),
                      backgroundColor: tint(p.color, 30),
                    }}
                    className={`absolute -top-3 z-10 grid size-10 place-items-center rounded-xl border p-1.5 ${
                      alt ? "-left-3" : "-right-3"
                    }`}
                  >
                    <img
                      src={p.logo}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="size-full object-contain"
                    />
                  </span>

                  <figcaption className="absolute bottom-3 left-3.5 z-10 font-mono text-[9px] font-medium tracking-[0.22em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                    FIG. {pad(i + 1)} — {p.role.toUpperCase()}
                  </figcaption>
                </figure>

                <div className="max-w-[36ch]">
                  <h3 className="font-gendy text-[clamp(26px,2.4vw,42px)] font-semibold leading-[1.1]">
                    {p.title}
                  </h3>
                  <p className="mb-4 mt-2 font-mono text-[10px] font-medium tracking-[0.18em] text-gray-600 sm:mb-5 sm:mt-3 sm:text-[11px] sm:tracking-[0.24em]">
                    {p.mini_title?.toUpperCase()}
                  </p>
                  <p className="mb-4 text-[15px] leading-[1.7] text-gray-600 sm:mb-5.5 md:leading-[1.75]">
                    {p.description}
                  </p>

                  <ul className="mb-5 flex flex-wrap gap-2 sm:mb-6.5">
                    {p.features.slice(0, 4).map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.12em] text-gray-600 sm:tracking-[0.16em]"
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
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
