import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import publicImageUrls from "virtual:public-images";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

const MAX_WAIT_MS = 5000; // never hold the loader longer than this
const CONTENT_DELAY_MS = 1000;

// One entry per weight/family you actually use
const FONTS_TO_LOAD = ['1em "Kulim Park"', '1em "Gendy Regular"'];
const FONT_SAMPLE = "Aa Bb Cc 0123456789 Home About Projects Contact";

// Every jpg/png under src/assets (Vite resolves the final hashed URLs)
const bundledImageUrls = Object.values(
  import.meta.glob("/src/assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
) as string[];

// Bundled + public, de-duplicated
const IMAGE_URLS = Array.from(
  new Set([...bundledImageUrls, ...publicImageUrls]),
);

function loadFonts() {
  return Promise.allSettled(
    FONTS_TO_LOAD.map((font) => document.fonts.load(font, FONT_SAMPLE)),
  );
}

// Never rejects: a broken image shouldn't block the site
function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.decode().then(
      () => resolve(),
      () => resolve(),
    );
  });
}

type Phase = "loading" | "revealing" | "done";

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [showContent, setShowContent] = useState(false);

  // timed: the designed count-up. real: fraction of fonts + images ready (0 to 100).
  // The number shows whichever is behind, so it never claims more than is actually loaded.
  const timed = useMotionValue(0);
  const real = useMotionValue(0);
  const label = useTransform(
    [timed, real],
    ([t, r]: number[]) => `${Math.min(t, r).toFixed(1)}%`,
  );

  useEffect(() => {
    let cancelled = false;
    let holdTimeout: ReturnType<typeof setTimeout>;
    let maxTimeout: ReturnType<typeof setTimeout>;

    // 1. The designed count-up (still timed)
    let controls: ReturnType<typeof animate>;
    const countDone = new Promise<void>((resolve) => {
      controls = animate(timed, 100, {
        duration: reduceMotion ? 1 : 2,
        ease: easeInOutQuart,
        onComplete: resolve,
      });
    });

    // 2. Real readiness: fonts + every image, each one nudges the number forward
    const tasks: Promise<unknown>[] = [
      loadFonts(),
      ...IMAGE_URLS.map(preloadImage),
    ];
    let settled = 0;
    tasks.forEach((task) =>
      task.then(() => {
        if (cancelled) return;
        settled += 1;
        animate(real, (settled / tasks.length) * 100, {
          duration: 0.35,
          ease: "easeOut",
        });
      }),
    );

    // Give up waiting after MAX_WAIT_MS and finish the number so it never stalls below 100
    const assetsDone = Promise.race([
      Promise.all(tasks),
      new Promise<void>((resolve) => {
        maxTimeout = setTimeout(() => {
          animate(real, 100, { duration: 0.4, ease: "easeOut" });
          resolve();
        }, MAX_WAIT_MS);
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
      real.stop();
      clearTimeout(holdTimeout);
      clearTimeout(maxTimeout);
    };
  }, [timed, real, reduceMotion]);

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
