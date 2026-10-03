import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

type Phase = "loading" | "revealing" | "done";

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [showContent, setShowContent] = useState(false);

  // Motion value: updates the text directly, no React re-render per frame
  const progress = useMotionValue(0);
  const label = useTransform(progress, (v) => `${v.toFixed(1)}%`);

  const MAX_WAIT_MS = 5000; // never hold the loader longer than this

  // One entry per weight/family you actually use
  const FONTS_TO_LOAD = ['1em "Kulim Park"', '1em "Gendy Regular"'];
  const FONT_SAMPLE = "Aa Bb Cc 0123456789 Home About Projects Contact";

  function loadFonts() {
    return Promise.allSettled(
      FONTS_TO_LOAD.map((font) => document.fonts.load(font, FONT_SAMPLE)),
    );
  }

  useEffect(() => {
    let cancelled = false;
    let holdTimeout: ReturnType<typeof setTimeout>;
    let maxTimeout: ReturnType<typeof setTimeout>;

    // 1. The designed count-up (still timed)
    let controls: ReturnType<typeof animate>;
    const countDone = new Promise<void>((resolve) => {
      controls = animate(progress, 100, {
        duration: reduceMotion ? 1 : 2,
        ease: easeInOutQuart,
        onComplete: resolve,
      });
    });

    // 2. Real readiness: fonts loaded, or give up after MAX_WAIT_MS
    const assetsDone = Promise.race([
      loadFonts(),
      new Promise<void>((resolve) => {
        maxTimeout = setTimeout(resolve, MAX_WAIT_MS);
      }),
    ]);

    // 3. Lift the curtain only when both are finished
    Promise.all([countDone, assetsDone]).then(() => {
      if (cancelled) return;
      holdTimeout = setTimeout(() => setPhase("revealing"), 1000);
    });

    return () => {
      cancelled = true;
      controls.stop();
      clearTimeout(holdTimeout);
      clearTimeout(maxTimeout);
    };
  }, [progress, reduceMotion]);

  const CONTENT_DELAY_MS = 1000;

  useEffect(() => {
    if (phase === "loading") return;
    const timeout = setTimeout(() => setShowContent(true), CONTENT_DELAY_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === "loading"]);

  return (
    <>
      {showContent && children}

      <AnimatePresence onExitComplete={() => setPhase("done")}>
        {phase === "loading" && (
          <motion.div
            key="loader"
            initial={false}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.3 } }
                : {
                    y: "-100%",
                    transition: { duration: 0.9, ease: easeInOutQuart },
                  }
            }
            className="fixed inset-0 z-100 flex items-end p-6 bg-primary"
            role="status"
            aria-label="Loading"
          >
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easeOutExpo },
              }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -40,
                transition: { duration: 0.4, ease: easeOutExpo },
              }}
              className="inline-block text-5xl md:text-7xl lg:text-9xl font-light tabular-nums tracking-tight text-white "
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
