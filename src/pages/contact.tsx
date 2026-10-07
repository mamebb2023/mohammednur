import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BiEnvelope,
  // BiPhone,
  BiMap,
  BiLogoGithub,
  BiLogoLinkedin,
  BiSend,
  BiCheckCircle,
  BiRightArrowAlt,
} from "react-icons/bi";
import type { IconType } from "react-icons";
import { usePageTitle } from "@/hooks/usePageTitle";
import { easeOutExpo, hoverSpring, rollTransition } from "@/constants";
import { FaXTwitter } from "react-icons/fa6";

const EMAIL = "mamebb2023@gmail.com";
// const PHONE = "+251 900 000 000";

const details: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}[] = [
  { icon: BiEnvelope, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  // {
  //   icon: BiPhone,
  //   label: "Phone",
  //   value: PHONE,
  //   href: `tel:${PHONE}`,
  // },
  { icon: BiMap, label: "Based in", value: "Addis Ababa, Ethiopia" },
];

const socials: { icon: IconType; label: string; href: string }[] = [
  {
    icon: BiLogoGithub,
    label: "GitHub",
    href: "https://github.com/mamebb2023",
  },
  {
    icon: BiLogoLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/mohammednur-seid",
  },
  { icon: FaXTwitter, label: "(X) Twitter", href: "https://x.com/thatsolodev" },
];

const fieldClass =
  "w-full border-0 border-b border-black/15 bg-transparent py-3 text-base text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-primary";

export default function Contact() {
  usePageTitle("Contact | Mohammednur");
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const [btnHovered, setBtnHovered] = useState(false);

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

  const indicatorVariants = {
    hidden: { scaleX: 0.25, scaleY: 0.25, opacity: 0 },
    visible: { scaleX: 1, scaleY: 1, opacity: 1 },
  };

  const topLabelVariants = {
    idle: { y: "0%", rotate: 0 },
    rolled: { y: "-130%", rotate: -10 },
  };

  const bottomLabelVariants = {
    idle: { y: "130%", rotate: 10 },
    rolled: { y: "0%", rotate: 0 },
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="my-auto max-w-6xl mx-auto grid gap-4 md:gap-10 p-4 lg:grid-cols-2 lg:gap-16"
    >
      <div className="space-y-4">
        <div className="h-5"></div>
        <motion.h1
          variants={item}
          className="font-gendy text-6xl leading-[0.85] text-black md:text-8xl"
        >
          Let&apos;s <span className="text-primary">talk.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-sm md:max-w-md text-lg font-light leading-relaxed text-black/60"
        >
          Have a project in mind, a question, or just want to say hi? Send a
          message and I&apos;ll get back to you within a day or two.
        </motion.p>
        <motion.ul variants={item} className="space-y-5">
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
        <motion.div variants={item} className="flex items-center gap-3 md:p-3">
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

      <motion.form
        variants={item}
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 rounded-4xl self-center border border-gray-100 bg-white/50 p-5 shadow-lg backdrop-blur-md sm:p-6 md:p-10 transition-all"
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
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onFocus={() => setBtnHovered(true)}
          onBlur={() => setBtnHovered(false)}
          className="relative flex w-full items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-black transition-shadow duration-300 shadow-[0_8px_30px_-8px_rgba(3,252,127,0.8)] hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:w-auto sm:self-start cursor-pointer active:scale-95"
        >
          {/* White pill that grows from the bottom center */}
          <AnimatePresence initial={false}>
            {btnHovered && (
              <motion.span
                key="hover"
                variants={indicatorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={hoverSpring}
                style={{ transformOrigin: "50% 100%" }}
                className="pointer-events-none absolute -inset-1 rounded-full bg-white"
              />
            )}
          </AnimatePresence>

          {/* Clip wrapper so the rolling labels disappear cleanly */}
          <span className="relative z-10 -my-0.5 block overflow-hidden py-0.5">
            <span className="relative block">
              <motion.span
                variants={topLabelVariants}
                initial={false}
                animate={btnHovered ? "rolled" : "idle"}
                transition={rollTransition}
                style={{ transformOrigin: "50% 100%" }}
                className="flex items-center gap-2"
              >
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
              </motion.span>

              <motion.span
                aria-hidden="true"
                variants={bottomLabelVariants}
                initial={false}
                animate={btnHovered ? "rolled" : "idle"}
                transition={rollTransition}
                style={{ transformOrigin: "50% 100%" }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                {status === "sent" ? "Thank you" : "Let's go"}
                <BiRightArrowAlt className="text-xl" />
              </motion.span>
            </span>
          </span>
        </button>
      </motion.form>
    </motion.div>
  );
}
