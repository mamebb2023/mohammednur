import {
  FaBolt,
  FaDribbble,
  FaFigma,
  FaGithub,
  FaGoogle,
  FaPaintBrush,
  FaRocket,
} from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

const accent = "font-['Engagement'] font-normal";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Lumino() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-between bg-[url('/projects/nature-cloud.webp')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-6 flex justify-center z-10"
      >
        <div className="relative w-4xl rounded-full p-2 px-8 flex items-center justify-between bg-white/10 backdrop-blur-md">
          <a href="#" className={`${accent} text-3xl`}>
            L
          </a>

          <nav className="flex gap-6 text-sm">
            <a className="hover:text-gray-200 transition-all" href="#">
              Studio
            </a>
            <a className="hover:text-gray-200 transition-all" href="#">
              Branding
            </a>
            <a className="hover:text-gray-200 transition-all" href="#">
              Web Design
            </a>
            <a className="hover:text-gray-200 transition-all" href="#">
              Get in Touch
            </a>
          </nav>

          <button className="border border-white bg-white hover:bg-transparent hover:text-white transition-all rounded-full p-2 px-4 cursor-pointer text-sm text-black">
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Centered Middle Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex-1 p-4 flex flex-col items-center justify-center space-y-8 z-10"
      >
        <motion.div variants={fadeUp} className="space-y-4 text-center">
          <h1 className="text-6xl leading-tight text-center">
            Where <span className={accent}>Ideas</span> Become
            <br /> Digital <span className={accent}>Reality</span>
          </h1>

          <p className="text-center mx-auto max-w-md text-lg text-white/90">
            A creative agency focused on bold branding and high-end web design
            that helps businesses look premium and memorable online.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex gap-4">
          <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition">
            Get Started
          </button>
          <button className="cursor-pointer border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Contact Us
          </button>
        </motion.div>

        {/* TRUST */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 text-sm text-white/70 items-center"
        >
          <span className="flex items-center gap-2">
            <FaBolt />
            Brand identity & visuals
          </span>

          <span className="flex items-center gap-2">
            <FaPaintBrush />
            Premium website design
          </span>

          <span className="flex items-center gap-2">
            <FaRocket size={16} />
            Smooth animations & interactions
          </span>
        </motion.div>
      </motion.div>

      {/* Footer / Brands */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-6 flex flex-col items-center gap-3 text-white/70 z-10"
      >
        <p className="text-sm text-center">
          Trusted by forward-thinking brands & creators
        </p>

        <div className="flex gap-6 text-2xl">
          <FaGoogle />
          <FaGithub />
          <FaFigma />
          <FaDribbble />
        </div>
      </motion.div>
    </div>
  );
}
