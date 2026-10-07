import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeInOutQuart, easeOutExpo } from "@/constants";
import { useLoadProgress } from "@/hooks/useLoadProgress";

const CONTENT_DELAY_MS = 1000;

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { label, ready } = useLoadProgress();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const timeout = setTimeout(() => setShowContent(true), CONTENT_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [ready]);

  return (
    <>
      {showContent && children}

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={false}
            exit={{
              y: "-100%",
              transition: { duration: 0.9, ease: easeInOutQuart },
            }}
            className="fixed inset-0 z-100 flex items-end bg-primary p-6"
            role="status"
            aria-label="Loading"
          >
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easeOutExpo },
              }}
              exit={{
                opacity: 0,
                y: -40,
                transition: { duration: 0.4, ease: easeOutExpo },
              }}
              className="inline-block text-5xl font-light tabular-nums tracking-tight text-white md:text-7xl lg:text-9xl"
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
