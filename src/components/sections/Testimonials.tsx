import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { rise, staggerContainer } from "@/constants";

// TODO: fill these in. Three fit the layout best.
const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "CLIENT NAME",
    role: "ROLE · COMPANY",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "CLIENT NAME",
    role: "ROLE · COMPANY",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "CLIENT NAME",
    role: "ROLE · COMPANY",
  },
];

// card width and a small vertical drift per card, so the row doesn't feel like a grid
const layout = [
  { width: "52vw", offset: "0vh" },
  { width: "60vw", offset: "7vh" },
  { width: "54vw", offset: "-4vh" },
];

export default function Testimonials() {
  return (
    <section
      data-section="TESTIMONIALS"
      className="relative flex w-max items-stretch"
    >
      {/* giant faint section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[1.5vw] select-none font-gendy text-[26vh] italic font-semibold leading-[0.8] text-primary/10"
      >
        04
      </span>

      {/* vertical tag, left edge */}
      <span className="absolute left-3.5 top-4 rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl]">
        SEC. 04 — TESTIMONIALS
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
          04
        </motion.span>
        <motion.h2
          variants={rise}
          className="mt-3.5 font-gendy text-[clamp(44px,5vw,92px)] font-semibold leading-[1.05]"
        >
          Kind words
        </motion.h2>
        <motion.p
          variants={rise}
          className="mt-[3.5vh] max-w-xs font-mono text-[11px] leading-[2.1] tracking-[0.2em] text-gray-500"
        >
          FROM PEOPLE WHO SHIPPED WITH ME AND LIVED TO TELL ABOUT IT.
        </motion.p>
      </motion.div>

      {testimonials.map((t, i) => (
        <motion.article
          key={i}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ "--tw": layout[i % layout.length].width } as CSSProperties}
          className={`relative z-10 flex h-full w-[calc(100vw-40px)] shrink-0 flex-col justify-center px-[4vw] lg:w-(--tw) ${
            i !== 0 && "border-l border-gray-100"
          }`}
        >
          <motion.div
            variants={rise}
            style={{ top: layout[i % layout.length].offset }}
            className="relative"
          >
            <BiSolidQuoteAltLeft size={26} className="mb-6 text-primary" />

            <blockquote className="max-w-[30ch] font-gendy text-[clamp(20px,1.6vw,30px)] font-medium italic leading-[1.55]">
              “{t.quote}”
            </blockquote>

            <cite className="mt-7 block font-mono text-[11px] font-medium not-italic leading-[1.9] tracking-[0.18em]">
              <b className="font-medium text-gray-800">{t.name}</b>
              <br />
              <span className="text-gray-500">{t.role}</span>
            </cite>
          </motion.div>
        </motion.article>
      ))}
    </section>
  );
}
