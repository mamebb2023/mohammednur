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

/* animation setup */
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

export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-between bg-[url('/projects/horse-image.webp')] bg-cover bg-center">
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-3 flex-center"
      >
        <div className="w-4xl border-white/50 border rounded-full p-2 px-8 flex items-center justify-between bg-white/25">
          <a href="#" className={`${accent} text-3xl`}>
            U
          </a>

          <nav className="flex gap-4 text-sm">
            <a className="hover:text-yellow-950 transition-all" href="#">
              About
            </a>
            <a className="hover:text-yellow-950 transition-all" href="#">
              Projects
            </a>
            <a className="hover:text-yellow-950 transition-all" href="#">
              Contact
            </a>
          </nav>

          <button className="border border-white bg-white hover:bg-transparent hover:text-white transition-all rounded-full p-2 px-4 cursor-pointer text-sm">
            Get Started
          </button>
        </div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-1 flex-center"
      >
        <div className="w-7xl flex justify-between items-end px-10">
          {/* LEFT */}
          <div className="space-y-6">
            <motion.div variants={fadeUp} className="space-y-2">
              <h1 className={`${accent} text-6xl leading-tight`}>
                Unleash Your Potential
              </h1>

              <p className="max-w-md text-lg text-transparent bg-clip-text bg-linear-to-br from-black via-yellow-950 to-yellow-800">
                Build bold digital experiences that stand out, connect deeply,
                and leave a lasting impression.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition">
                Get Started
              </button>
              <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
                Contact Us
              </button>
            </motion.div>

            {/* TRUST */}
            <motion.div
              variants={fadeUp}
              className="flex gap-6 text-sm text-black/70 items-center"
            >
              <span className="flex items-center gap-2">
                <FaBolt />
                Accelerated Growth
              </span>

              <span className="flex items-center gap-2">
                <FaPaintBrush />
                Elevated Brand Presence
              </span>

              <span className="flex items-center gap-2">
                <FaRocket size={16} />
                Built to Scale
              </span>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="max-w-md text-lg text-end text-transparent bg-clip-text bg-linear-to-br from-black via-yellow-950 to-yellow-800">
              Unleash your business potential with digital experiences built to
              convert, scale, and stand out. From idea to execution, every
              detail is crafted to push your brand further.
            </p>

            <p className="text-sm text-end text-black/60">
              Turn vision into momentum.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-6 flex flex-col items-center gap-4 text-black/70"
      >
        <p className="text-sm text-center">
          Trusted by
          <br />
          forward-thinking brands & creators
        </p>

        <div className="flex gap-6 text-2xl opacity-80">
          <FaGoogle />
          <FaGithub />
          <FaFigma />
          <FaDribbble />
        </div>
      </motion.div>
    </div>
  );
}
