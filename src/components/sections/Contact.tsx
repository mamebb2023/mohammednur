import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BiCheck,
  BiCopy,
  BiLogoGithub,
  BiLogoLinkedin,
  BiRotateLeft,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
import { rise, staggerContainer } from "@/constants";

const EMAIL = "mamebb2023@gmail.com";
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/mamebb2023",
    Icon: BiLogoGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohammednur-seid",
    Icon: BiLogoLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/thatsolodev",
    Icon: FaXTwitter,
  },
  {
    label: "Upwork",
    href: "https://upwork.com/freelancers/~01e488d551441650a7",
    Icon: SiUpwork,
  },
];

const iconBtn =
  "grid size-[54px] shrink-0 cursor-pointer place-items-center rounded-full border border-gray-200 bg-white/60 text-gray-600 transition hover:border-primary hover:text-black hover:shadow-lg max-md:size-12";

const pillBtn =
  "inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/45 bg-white/60 px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.16em] text-gray-800 transition hover:border-primary hover:bg-primary hover:text-black hover:shadow-lg";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      data-section="CONTACT"
      className="relative flex w-full items-center justify-end pl-6 pr-6 max-md:min-h-[70svh] max-md:justify-center max-md:py-10 md:w-screen md:pl-[6vw] md:pr-[3vw]"
    >
      {/* giant faint section number */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[1.5vw] select-none font-gendy text-[18svh] italic font-semibold leading-[0.8] text-primary/10 max-md:left-auto max-md:right-4 max-md:text-[13svh] md:text-[26vh]"
      >
        05
      </motion.span>

      {/* vertical tag, left edge */}
      <span className="absolute left-3.5 top-4 hidden rotate-180 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.24em] text-gray-500 [writing-mode:vertical-rl] md:block">
        SEC. 05 — CONTACT
      </span>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex flex-col justify-center max-md:w-full lg:w-[52vw] max-lg:rounded-3xl md:max-lg:p-6"
      >
        <motion.p
          variants={rise}
          className="flex flex-wrap items-center justify-end gap-2 font-mono text-[11px] font-medium tracking-[0.3em] text-gray-500 max-md:justify-start max-md:gap-x-1.5 max-md:gap-y-1 max-md:text-[10px] max-md:tracking-[0.22em]"
        >
          <b className="font-medium text-primary">05</b> · CONTACT — SAY HI ·
          <span className="inline-block size-1.75 animate-pulse rounded-full bg-primary" />
          OPEN FOR NEW PROJECTS
        </motion.p>

        <motion.h2
          variants={rise}
          className="mb-[5vh] mt-[3vh] text-right font-gendy text-[clamp(34px,4.2vw,76px)] font-semibold leading-[1.08] max-md:mb-6 max-md:mt-4 max-md:text-left"
        >
          Let's build something
          <br />
          <span className="text-transparent tracking-wide [-webkit-text-stroke:2px_var(--color-primary)]">
            worth shipping.
          </span>
        </motion.h2>

        <motion.div
          variants={rise}
          className="flex flex-wrap items-center justify-end gap-4.5 max-md:justify-start max-md:gap-3"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="break-all border-b-2 border-primary/40 pb-2 font-gendy text-[clamp(22px,2.4vw,42px)] font-semibold leading-[1.2] transition-colors duration-300 hover:border-primary hover:text-primary max-md:text-[clamp(17px,4.9vw,21px)]"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className={iconBtn}
          >
            {copied ? <BiCheck size={22} /> : <BiCopy size={20} />}
          </button>
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-[5.5vh] flex justify-end gap-3 max-md:mt-6 max-md:justify-start max-md:gap-2.5"
        >
          {SOCIALS.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -4 }}
              className={iconBtn}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-[7vh] flex flex-wrap items-center justify-end gap-6.5 font-mono text-[10px] tracking-[0.18em] text-gray-500 max-md:mt-8 max-md:justify-start max-md:gap-x-3 max-md:gap-y-2"
        >
          <span>© {new Date().getFullYear()} MOHAMMEDNUR</span>
          <span className="w-10 h-px bg-gray-200 max-md:hidden"></span>
          <span>BUILT WITH ❤️ BY ME</span>
          <span className="w-10 h-px bg-gray-200 max-md:hidden"></span>
          <button
            type="button"
            onClick={(e) => {
              const btn = e.currentTarget;
              if (window.matchMedia("(max-width: 767px)").matches) {
                // mobile: the scroller is vertical, so glide back to the top
                btn
                  .closest<HTMLElement>("[data-scroller]")
                  ?.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // desktop: bubbles up to the scroller, which glides back to the start
                btn.dispatchEvent(
                  new CustomEvent("scrollfade:to", {
                    detail: 0,
                    bubbles: true,
                  }),
                );
              }
            }}
            className={pillBtn}
          >
            <BiRotateLeft size={16} />
            BACK TO START
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
