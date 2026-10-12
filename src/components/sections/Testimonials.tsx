import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { rise, staggerContainer } from "@/constants";

// DRAFTS written from the work itself, not quotes from these clients yet.
// Get each of them to approve or reword their line before this goes live.
const testimonials = [
  {
    quote:
      "I needed a landing page that shows my work the way I edit: fast, clean and built around the content. Mohammednur delivered exactly that. It looks sharp on phone and desktop, and my work is easy to find.",
    name: "MICHAEL",
    role: "VIDEO EDITOR & CONTENT CREATOR",
  },
  {
    quote:
      "Mohammednur built the backend for our grid bot on Jupiter. The structure is clean, the code is easy to follow, and he explained every decision along the way. Solid engineering from start to finish.",
    name: "VALGRID",
    role: "JUPITER GRID BOT",
  },
  {
    quote:
      "The frontend design for WeMD Africa was clear, modern and easy for patients to use. The English and Amharic versions both felt natural, and the step-by-step consultation form made a long process feel simple.",
    name: "WEMD AFRICA",
    role: "ONLINE DERMATOLOGY CLINIC",
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
          variants={rise}
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
          className="relative z-10 flex h-full w-[calc(100vw-40px)] shrink-0 flex-col justify-center border-l border-gray-100 px-[4vw] lg:w-(--tw)"
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
