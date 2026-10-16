import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeInOutQuart } from "@/constants";
import { useLoadProgress } from "@/hooks/useLoadProgress";

const EXIT_S = 0.5; // how long the curtain takes to fade
const MOUNT_AT_MS = 400; // the page mounts just before the curtain is gone, so its entrance is seen

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, ready } = useLoadProgress();
  const [showContent, setShowContent] = useState(false);

  // A timer, not an animation callback: a paused rAF must never keep the page unmounted.
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setShowContent(true), MOUNT_AT_MS);
    return () => clearTimeout(timer);
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
              transition: { duration: EXIT_S, ease: easeInOutQuart },
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
