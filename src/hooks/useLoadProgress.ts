import { useEffect, useState } from "react";
import {
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { easeInOutQuart } from "@/constants";
import { getPreloadTasks } from "@/lib/preload";

const MAX_WAIT_MS = 5000; // never hold the loader longer than this
const HOLD_MS = 1000; // pause on 100% before lifting

export function useLoadProgress() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  // timed: the designed count-up. real: fraction of assets ready.
  // The label shows whichever is behind, so it never over-claims.
  const timed = useMotionValue(0);
  const real = useMotionValue(0);
  const label = useTransform(
    [timed, real],
    ([t, r]: number[]) => `${Math.min(t, r).toFixed(1)}%`,
  );

  useEffect(() => {
    let cancelled = false;
    let maxTimeout: ReturnType<typeof setTimeout>;
    let holdTimeout: ReturnType<typeof setTimeout>;

    const countUp = animate(timed, 100, {
      duration: reduceMotion ? 1 : 2,
      ease: easeInOutQuart,
    });

    const tasks = getPreloadTasks();
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

    const assetsDone = Promise.race([
      Promise.all(tasks),
      new Promise<void>((resolve) => {
        maxTimeout = setTimeout(() => {
          animate(real, 100, { duration: 0.4, ease: "easeOut" });
          resolve();
        }, MAX_WAIT_MS);
      }),
    ]);

    // countUp is thenable, so it works directly in Promise.all
    Promise.all([countUp, assetsDone]).then(() => {
      if (cancelled) return;
      holdTimeout = setTimeout(() => setReady(true), HOLD_MS);
    });

    return () => {
      cancelled = true;
      countUp.stop();
      real.stop();
      clearTimeout(maxTimeout);
      clearTimeout(holdTimeout);
    };
  }, [timed, real, reduceMotion]);

  return { label, ready };
}
