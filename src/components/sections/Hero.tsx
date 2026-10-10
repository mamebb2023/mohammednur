import { motion } from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";
import { easeOutExpo } from "@/constants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export default function Hero() {
  return (
    <section
      data-section="HOME"
      className="w-screen relative flex items-center pl-[6vw] pr-[4vw] p-3"
    >
      {/* giant faint section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-[1.5vw] select-none font-gendy text-[26vh] italic font-semibold leading-[0.8] text-primary/10"
      >
        01
      </span>

      {/* vertical tag, left edge */}
      <span className="absolute left-3.5 top-4 rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl]">
        SEC. 01 — HERO
      </span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[min(920px,68vw)]"
      >
        <motion.p
          variants={rise}
          className="mb-[3.2vh] font-mono text-[11px] font-medium tracking-[0.3em] text-gray-600"
        >
          FULL-STACK DEV · CALM UNDER LOAD
        </motion.p>

        <motion.p
          variants={rise}
          className="mb-[1.2vh] font-gendy text-[clamp(30px,3.6vw,64px)] italic leading-[1.15] text-gray-500"
        >
          Hi, I am<span className="text-primary">,</span>
        </motion.p>

        <motion.h1
          variants={rise}
          className="font-gendy text-[clamp(48px,8vw,150px)] font-semibold leading-[0.98] tracking-[-0.01em]"
        >
          Mohammednur
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-[3.6vh] max-w-[52ch] text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-gray-600"
        >
          Software developer with five years of experience building full-stack
          web apps with React and Next.js. I've shipped everything from an AI
          tool that turns a text prompt into a React component to a health
          assistant and a bilingual clinic site. I care about clean interfaces,
          smooth motion, and code that stays easy to change.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-[5vh] flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.24em] text-gray-500"
        >
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.7, ease: "easeInOut", repeat: Infinity }}
            className="text-primary"
          >
            <BiRightArrowAlt size={24} />
          </motion.span>
          <span>
            TAKE A STROLL <span className="text-primary">—</span> THIS PAGE GOES
            SIDEWAYS
          </span>
        </motion.div>
      </motion.div>

      {/* vertical side note, right edge */}
      <span className="absolute right-[3vw] top-1/2 -translate-y-1/2 font-mono text-[10px] font-medium tracking-[0.4em] text-gray-500 [writing-mode:vertical-rl]">
        PORTFOLIO — 2026 · ADDIS ABABA · UTC+3
      </span>
    </section>
  );
}
