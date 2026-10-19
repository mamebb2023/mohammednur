import { motion } from "framer-motion";
import { rise, staggerContainer } from "@/constants";

const ledger = [
  { term: "BASED IN", detail: "Addis Ababa, ET · UTC+3" },
  { term: "FOCUS", detail: "Full-stack web apps · AI-powered tools" },
  {
    term: "CORE STACK",
    detail: "TypeScript · React · Next.js · Node · Prisma",
  },
  {
    term: "CURRENTLY",
    detail: (
      <>
        Founder @{" "}
        <a
          href="https://blackbronze.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          BlackBronze
        </a>
      </>
    ),
  },
  { term: "STATUS", detail: "open to any freelance work", live: true },
];

export default function About() {
  return (
    <section
      id="about"
      data-section="ABOUT"
      className="relative flex shrink-0 py-10 pl-6 pr-6 md:min-w-screen md:py-3 md:pl-[6vw] md:pr-[4vw] md:max-lg:overflow-x-hidden md:max-lg:overflow-y-auto md:max-lg:overscroll-y-contain"
    >
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-[1.5vw] select-none font-gendy text-[18svh] italic font-semibold leading-[0.8] text-primary/10 md:bottom-2 md:text-[26svh]"
      >
        02
      </motion.span>

      <span className="absolute left-3.5 top-4 hidden rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl] md:block">
        SEC. 02 — ABOUT
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 my-auto w-full"
      >
        <motion.header
          variants={rise}
          className="mb-[clamp(16px,5svh,40px)] flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
            02
          </span>
          <h2 className="font-gendy text-[clamp(44px,5vw,92px)] font-semibold leading-[1.05]">
            About
          </h2>
          <span className="font-mono text-[10px] tracking-[0.18em] text-gray-500 sm:text-[11px]">
            THE PERSON BEHIND THE CURSOR
          </span>
        </motion.header>

        {/* mobile: stacked column; md and up: side by side */}
        <div className="flex flex-col gap-[clamp(20px,4.5svh,40px)] md:flex-row lg:gap-[7vw]">
          <div className="md:min-w-sm">
            <motion.p
              variants={rise}
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg font-gendy text-[clamp(22px,2.05vw,38px)] font-medium leading-[1.45] max-md:text-[22px]"
            >
              Good software is <em className="italic text-primary">joinery</em>{" "}
              — invisible when it fits, impossible to ignore when it doesn't.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-[clamp(14px,3.6svh,32px)] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-[15px] leading-[1.7] text-gray-600 sm:text-[15.5px] md:leading-[1.8]"
            >
              I'm a full-stack developer who likes turning ideas into tools
              people actually use — an AI generator that writes React components
              from a prompt, a personal health assistant with English voice
              chat. Above all, I care about clean interfaces, smooth motion, and
              code that stays easy to change.
            </motion.p>
          </div>

          <dl className="w-full max-w-sm sm:max-w-sm md:max-w-md space-y-1.5 rounded-3xl bg-white/15 p-3 lg:w-[min(440px,38vw)] lg:flex-none">
            {ledger.map((row) => (
              <motion.div
                key={row.term}
                variants={rise}
                whileHover={{ x: 10 }}
                className="group grid grid-cols-[92px_1fr] gap-3 rounded-2xl bg-white/15 px-2.5 py-3 transition-colors sm:grid-cols-[132px_1fr] sm:gap-4.5 sm:py-3.75"
              >
                <dt className="pt-1 font-mono text-[10px] font-medium tracking-[0.16em] text-gray-500 transition-colors group-hover:text-primary sm:tracking-[0.22em]">
                  {row.term}
                </dt>
                <dd className="font-mono text-[13px] font-medium leading-[1.6] sm:text-[13.5px]">
                  {row.live && (
                    <span className="mr-2.25 inline-block size-1.75 animate-pulse rounded-full bg-primary" />
                  )}
                  {row.detail}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
