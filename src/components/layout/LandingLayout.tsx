import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.4, 0, 1, 1] as const;

export default function LandingLayout() {
  const location = useLocation();
  // Capture the outlet at render time so the exiting page keeps its own content
  const outlet = useOutlet();
  // const reduceMotion = useReducedMotion();

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
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, left: 0 })}
      >
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mx-auto w-full p-3 md:p-4 lg:p-6"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
