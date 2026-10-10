import { motion } from "framer-motion";
import { usePageTitle } from "@/hooks/usePageTitle";
import { easeOutExpo } from "@/constants";

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
      fd
    </motion.div>
  );
}
