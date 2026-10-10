import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent } from "framer-motion";
import { easeInOutQuart, easeOutExpo } from "@/constants";
import { useLoadProgress } from "@/hooks/useLoadProgress";
import Roll from "@/components/ui/Roll";

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

  const digits = String(value).padStart(3, "0").split("");

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
            className="fixed inset-0 z-100 overflow-hidden bg-white"
            role="status"
            aria-label="Loading"
          >
            <span className="sr-only">{value}%</span>

            {/* same big-number treatment and corner as the hero's "01" */}
            <motion.div
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
              className="absolute bottom-2 left-[1.5vw] flex select-none items-end font-gendy text-[24vh] font-semibold leading-[0.8] tabular-nums text-primary"
            >
              {digits.map((d, i) => {
                // leading zeros stay quiet until a real digit arrives
                const leadingZero =
                  d === "0" &&
                  i < 2 &&
                  digits.slice(0, i).every((x) => x === "0");
                return (
                  <Roll
                    key={i}
                    value={d}
                    dir={1}
                    pad="-my-[0.15em] py-[0.15em]"
                    className={`w-[0.75em] px-[0.05em] transition-opacity duration-300 ${leadingZero ? "opacity-30" : ""}`}
                  />
                );
              })}
              <span className="ml-[0.05em] text-[0.4em] opacity-70">%</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
