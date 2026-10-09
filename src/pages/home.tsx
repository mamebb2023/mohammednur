import { motion } from "framer-motion";
import { BiArrowToRight } from "react-icons/bi";
import { usePageTitle } from "@/hooks/usePageTitle";
import { easeOutExpo } from "@/constants";
import RevealWords from "@/components/ui/RevealWords";
import { Link } from "react-router-dom";

const reduceMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2, delay: 1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: reduceMotion() ? 0 : 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.4 },
  },
};

export default function Home() {
  usePageTitle("Home | Mohammednur");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto flex flex-col justify-center flex-1 w-full max-w-6xl space-y-6 p-4"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-black/50 backdrop-blur-md">
          <span className="size-2 rounded-full bg-primary" />
          Available for work
        </span>
      </motion.div>

      <RevealWords
        parts={["Building", "digital", "products", "that", "feel", "alive."]}
        className="font-gendy text-5xl leading-[0.95] text-black sm:text-6xl md:text-7xl lg:text-8xl"
        delay={0.3}
        stagger={0.04}
      />

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-lg font-light leading-relaxed text-black/60 md:text-xl"
      >
        I'm <span className="font-medium text-black">Mohammednur</span>, a
        full-stack developer and founder crafting modern web experiences from
        Addis Ababa.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-4 pt-4"
      >
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_-8px_rgba(3,252,127,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(3,252,127,0.9)] active:scale-95"
        >
          View my work
          <BiArrowToRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-7 py-3.5 text-sm font-semibold text-black backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary active:scale-95"
        >
          Get in touch
        </Link>
      </motion.div>
    </motion.div>
  );
}
