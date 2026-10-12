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
          className=" underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
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
      data-section="ABOUT"
      className="relative flex w-screen items-center pl-[6vw] pr-[4vw]"
    >
      {/* giant faint section number */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[1.5vw] select-none font-gendy text-[26vh] italic font-semibold leading-[0.8] text-primary/10"
      >
        02
      </motion.span>

      {/* vertical tag, left edge */}
      <span className="absolute left-3.5 top-4 rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl]">
        SEC. 02 — ABOUT
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10"
      >
        <motion.header
          variants={rise}
          className="mb-[5vh] flex items-baseline gap-4"
        >
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
            02
          </span>
          <h2 className="font-gendy text-[clamp(44px,5vw,92px)] font-semibold leading-[1.05]">
            About
          </h2>
          <span className="font-mono text-[11px] tracking-[0.18em] text-gray-500">
            THE PERSON BEHIND THE CURSOR
          </span>
        </motion.header>

        <div className="flex flex-col gap-[4.5vh] lg:flex-row lg:items-start lg:gap-[7vw]">
          <div>
            <motion.p
              variants={rise}
              className="max-w-[30ch] font-gendy text-[clamp(22px,2.05vw,38px)] font-medium leading-[1.45]"
            >
              Good software is <em className="italic text-primary">joinery</em>{" "}
              — invisible when it fits, impossible to ignore when it doesn't.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-[3.6vh] max-w-[46ch] text-[15.5px] leading-[1.8] text-gray-600"
            >
              I'm a full-stack developer who likes turning ideas into tools
              people actually use — an AI generator that writes React components
              from a prompt, a personal health assistant with English voice
              chat. Above all, I care about clean interfaces, smooth motion, and
              code that stays easy to change.
            </motion.p>
          </div>

          <dl className="w-full lg:w-[min(440px,38vw)] lg:flex-none bg-white/15 backdrop-blur-sm rounded-3xl p-3 space-y-1.5">
            {ledger.map((row) => (
              <motion.div
                key={row.term}
                variants={rise}
                whileHover={{ x: 10 }}
                className="group grid grid-cols-[132px_1fr] gap-4.5 px-2.5 py-3.75 transition-colors bg-white/15 rounded-2xl"
              >
                <dt className="pt-1 font-mono text-[10px] font-medium tracking-[0.22em] text-gray-500 transition-colors group-hover:text-white">
                  {row.term}
                </dt>
                <dd className="font-mono text-[13.5px] font-medium leading-[1.6]">
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
