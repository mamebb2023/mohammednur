import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent } from "framer-motion";
import { easeInOutQuart } from "@/constants";
import { useLoadProgress } from "@/hooks/useLoadProgress";

const CONTENT_DELAY_MS = 1000;

const toPercent = (label: string) =>
  Math.min(100, Math.max(0, Math.floor(parseFloat(label) || 0)));

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { label, ready } = useLoadProgress();
  const [value, setValue] = useState(() => toPercent(label.get()));
  const [showContent, setShowContent] = useState(false);

  useMotionValueEvent(label, "change", (l) => setValue(toPercent(l)));

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
              opacity: 0,
              transition: { duration: 0.9, ease: easeInOutQuart },
            }}
            className="fixed inset-0 z-100 overflow-hidden bg-white"
            role="status"
            aria-label="Loading"
          >
            <span className="sr-only">{value}%</span>

            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[1.5vw] flex select-none items-end font-gendy text-[14vh] font-semibold leading-[0.8] tabular-nums text-primary"
            >
              {String(value).padStart(3, "0")}
              <span className="ml-[0.05em] text-[0.4em] opacity-70">%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
