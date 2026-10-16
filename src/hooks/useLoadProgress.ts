import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getPreloadTasks } from "@/lib/preload";

const COUNT_MS = 1400; // the designed count-up
const TICK_MS = 60;
const HOLD_MS = 900; // brief beat on 100% before the curtain lifts
const DEADLINE_MS = 3200; // nothing can hold the curtain longer than this

export function useLoadProgress() {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0); // whole number, 0-100
  const [loaded, setLoaded] = useState(false); // reached 100: the page can mount behind the curtain
  const [ready, setReady] = useState(false); // curtain can lift

  useEffect(() => {
    let cancelled = false;
    let finished = false;
    let hold: ReturnType<typeof setTimeout> | undefined;

    const duration = reduceMotion ? COUNT_MS / 3 : COUNT_MS;
    const startedAt = performance.now();

    // a broken or missing preload list must never keep the page from loading
    let tasks: PromiseLike<unknown>[] = [];
    try {
      tasks = Array.from(getPreloadTasks() as Iterable<PromiseLike<unknown>>);
    } catch {
      tasks = [];
    }

    let real = tasks.length ? 0 : 100;
    let settled = 0;
    tasks.forEach((task) =>
      Promise.resolve(task)
        .catch(() => undefined)
        .then(() => {
          settled += 1;
          real = (settled / tasks.length) * 100;
        }),
    );

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      clearInterval(timer);
      clearTimeout(deadline);
      setValue(100);
      setLoaded(true);
      hold = setTimeout(() => !cancelled && setReady(true), HOLD_MS);
    };

    // Wall-clock timers only, no animation frames: a throttled tab can't freeze the number.
    // The number shows whichever is behind (the count-up or the real loading), so it never over-claims.
    const timer = setInterval(() => {
      const t = Math.min(100, ((performance.now() - startedAt) / duration) * 100);
      setValue(Math.floor(Math.min(t, real)));
      if (t >= 100 && real >= 100) finish();
    }, TICK_MS);

    const deadline = setTimeout(finish, DEADLINE_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
      clearTimeout(deadline);
      clearTimeout(hold);
    };
  }, [reduceMotion]);

  return { value, loaded, ready };
}