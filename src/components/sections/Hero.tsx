import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";
import { rise, staggerContainer } from "@/constants";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const hintRef = useRef<HTMLDivElement>(null);
  const hintVisible = useInView(hintRef);

  return (
    <section
      data-section="HOME"
      className="relative flex items-center py-10 pl-6 pr-6 max-md:min-h-[75svh] md:min-w-screen md:py-3 md:pl-[6vw] md:pr-[4vw]"
    >
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 md:bottom-3 left-[1.5vw] select-none font-gendy text-[18svh] italic font-semibold leading-[0.8] text-primary/10 md:text-[26svh]"
      >
        01
      </motion.span>

      <span className="absolute left-3.5 top-4 hidden rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl] md:block">
        SEC. 01 — HERO
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full md:max-w-[min(920px,68vw)]"
      >
        <motion.p
          variants={rise}
          className="mb-[clamp(12px,3.2svh,28px)] font-mono text-[10px] font-medium tracking-[0.18em] text-gray-600 sm:text-[11px] sm:tracking-[0.3em]"
        >
          FULL-STACK DEV <span className="text-primary">·</span> FROM IDEA TO
          SHIPPED
        </motion.p>

        <motion.p
          variants={rise}
          className="mb-[1.2svh] font-gendy text-[clamp(22px,5.5vw,30px)] italic leading-[1.15] text-gray-500 md:text-[clamp(30px,3.6vw,64px)]"
        >
          Hi. I am<span className="text-primary">,</span>
        </motion.p>

        <motion.h1
          variants={rise}
          className="font-gendy text-[clamp(40px,12vw,56px)] font-semibold leading-[0.98] tracking-[-0.01em] md:text-[clamp(48px,8vw,150px)]"
        >
          Mohammednur
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-[clamp(14px,3.6svh,32px)] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-[clamp(15px,1.15vw,18px)] leading-[1.7] text-gray-600 md:leading-[1.75]"
        >
          Software developer with five years of building full-stack web apps
          with React and Next.js. I've shipped everything from an AI tool that
          turns a text prompt into a React component to a health assistant and a
          bilingual clinic site. I care about clean interfaces, smooth motion,
          and code that stays easy to change.
        </motion.p>

        <motion.div
          ref={hintRef}
          variants={rise}
          className="mt-[clamp(16px,5svh,40px)] flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.18em] text-gray-500 sm:text-[11px] sm:tracking-[0.24em]"
        >
          {/* the wrapper turns the arrow downward on mobile; the inner span's nudge then runs down the page */}
          <span aria-hidden="true" className="max-md:rotate-90">
            <motion.span
              animate={
                hintVisible && !reduceMotion ? { x: [0, 10, 0] } : { x: 0 }
              }
              transition={
                hintVisible && !reduceMotion
                  ? { duration: 1.7, ease: "easeInOut", repeat: Infinity }
                  : { duration: 0.2 }
              }
              className="block text-primary"
            >
              <BiRightArrowAlt size={24} />
            </motion.span>
          </span>
          <span>
            <span className="md:hidden">SCROLL DOWN</span>
            <span className="hidden md:inline">
              TAKE A STROLL <span className="text-primary">—</span> THIS PAGE
              GOES SIDEWAYS
            </span>
          </span>
        </motion.div>
      </motion.div>

      <span className="absolute bottom-3 right-[3vw] hidden font-mono text-[10px] font-medium tracking-[0.4em] text-gray-500 [writing-mode:vertical-rl] md:block">
        PORTFOLIO — 2026 · ADDIS ABABA · UTC+3
      </span>
    </section>
  );
}
