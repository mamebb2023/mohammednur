import { usePageTitle } from "@/hooks/usePageTitle";
import RevealWords from "@/components/ui/RevealWords";
import { motion } from "framer-motion";
import Lotus from "@/components/Lotus";
import Logomarquee from "@/components/Marquee";
import BackdropSwap from "@/components/BackdropSwap";

export default function About() {
  usePageTitle("About | Mohammednur");

  return (
    <div className="flex items-center flex-1 p-4">
      <RevealWords
        parts={[
          "I'm a Web Engineer",
          {
            pill: true,
            className: "bg-primary",
            children: (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex-center size-full"
              >
                <Lotus gradient="bg-white" size="h-16 w-10" />
              </motion.div>
            ),
          },
          "passionate about developing intuitive front-end interfaces",
          {
            pill: true,
            className: "bg-black",
            children: (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="size-full"
              >
                <BackdropSwap />
              </motion.div>
            ),
          },
          "and building robust back-end systems",
          {
            pill: true,
            className: "border-3 border-primary",
            children: (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="size-full flex-center text-black"
              >
                <Logomarquee />
              </motion.div>
            ),
          },
        ]}
        className="max-w-sm md:max-w-2xl text-left text-2xl md:text-4xl font-light leading-relaxed text-black/70"
      />
    </div>
  );
}
