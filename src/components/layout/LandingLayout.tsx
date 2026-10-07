import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Lotus from "../Lotus";
import { easeOutExpo } from "@/constants";
import RevealText from "../ui/RevealText";

const easeIn = [0.4, 0, 1, 1] as const;

export default function LandingLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: easeOutExpo },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: easeIn },
    },
  };

  return (
    <main className="relative flex flex-col justify-between min-h-screen p-4 gap-2">
      {/* lotus fixed */}
      <div className="-z-10 fixed size-full top-1/2 left-5/6 md:left-1/2 lg:left-1/3">
        <Lotus />
      </div>

      <Header />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, left: 0 })}
      >
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          animate="animate"
          exit="exit"
          className="flex-1 flex items-center"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>

      {/* The one title for every page, its label comes from the route */}
      <RevealText className="text-6xl sm:text-7xl lg:text-8xl" />
    </main>
  );
}
