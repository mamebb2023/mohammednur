import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BiEnvelope,
  BiPhone,
  BiMap,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiSend,
  BiCheckCircle,
  BiRightArrowAlt,
} from "react-icons/bi";
import type { IconType } from "react-icons";
import { usePageTitle } from "@/hooks/usePageTitle";
import { easeOutExpo } from "@/constants";
import RevealText from "../ui/RevealText";

// TODO: replace with your real details
const EMAIL = "hello@yourdomain.com";

const details: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}[] = [
  { icon: BiEnvelope, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: BiPhone,
    label: "Phone",
    value: "+251 900 000 000",
    href: "tel:+251900000000",
  },
  { icon: BiMap, label: "Based in", value: "Addis Ababa, Ethiopia" },
];

const socials: { icon: IconType; label: string; href: string }[] = [
  { icon: BiLogoGithub, label: "GitHub", href: "https://github.com/" },
  { icon: BiLogoLinkedin, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: BiLogoTwitter, label: "Twitter", href: "https://twitter.com/" },
];

const fieldClass =
  "w-full border-0 border-b border-black/15 bg-transparent py-3 text-base text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-primary";

export default function Contact() {
  usePageTitle("Contact | Mohammednur");
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // No backend yet: opens the visitor's mail app with the message filled in.
    // Swap this for a fetch() to your API / Formspree / EmailJS when ready.
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name} (${from})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    // This root is the parent that starts the animation for every child below
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid min-h-dvh grid-rows-[1fr_auto_1fr] gap-y-10 p-3 pt-24 md:p-4 md:pt-28 lg:p-6 lg:pt-28"
    >
      {/* Row 2: details on the left, form on the right (stacked on mobile) */}
      <div className="row-start-2 grid w-full max-w-6xl mx-auto items-center gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Left: intro, details, socials */}
        <div className="flex flex-col">
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-black/50"
          >
            Contact
          </motion.p>

          <motion.h1
            variants={item}
            className="font-gendy text-6xl leading-[0.95] text-black md:text-8xl"
          >
            Let&apos;s <span className="text-primary">talk</span>
            <span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg font-light leading-relaxed text-black/60"
          >
            Have a project in mind, a question, or just want to say hi? Send a
            message and I&apos;ll get back to you within a day or two.
          </motion.p>

          <motion.ul variants={item} className="mt-12 space-y-6">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xl text-black transition-colors duration-300 group-hover:bg-primary">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
                      {label}
                    </span>
                    <span className="text-base font-medium text-black">
                      {value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-center gap-4 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </motion.ul>

          <motion.div variants={item} className="mt-12 flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/50 text-xl text-black backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: form card */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-8 rounded-4xl border border-gray-100 bg-white/50 p-5 shadow-lg backdrop-blur-md sm:p-6 md:p-10 lg:max-w-xl lg:justify-self-end"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Name
              </span>
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className={`${fieldClass} resize-none`}
            />
          </label>

          {/* Button: label rolls up on hover, same idea as the header tabs */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-black transition-shadow duration-300 hover:shadow-[0_8px_30px_-8px_rgba(3,252,127,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:w-auto sm:self-start"
          >
            <span className="flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-150%]">
              {status === "sent" ? (
                <>
                  <BiCheckCircle className="text-xl" aria-hidden="true" />
                  Opening your mail app
                </>
              ) : (
                <>
                  Send message
                  <BiSend className="text-xl" aria-hidden="true" />
                </>
              )}
            </span>
            <span
              aria-hidden="true"
              className="absolute flex translate-y-[150%] items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            >
              {status === "sent" ? "Thank you" : "Let's go"}
              <BiRightArrowAlt className="text-xl" />
            </span>
          </button>
        </motion.form>
      </div>

      {/* Row 3: the one and only title, pinned to the bottom */}
      <div className="row-start-3 self-end">
        <RevealText className="text-6xl sm:text-7xl lg:text-8xl">
          Contact
        </RevealText>
      </div>
    </motion.div>
  );
}
