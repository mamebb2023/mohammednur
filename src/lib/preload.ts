import { projects } from "@/constants";

const FONTS_TO_LOAD = ['1em "Kulim Park"', '1em "Gendy Regular"'];
const FONT_SAMPLE = "Aa Bb Cc 0123456789 Home About Projects Contact";

// A task must never be able to hold the loader open. A font or an image that stalls
// (offline, blocked, a 404 that never settles) is simply marked as done.
const TASK_TIMEOUT_MS = 2500;

export const withTimeout = (
  task: Promise<unknown>,
  ms: number = TASK_TIMEOUT_MS,
): Promise<void> =>
  Promise.race([
    Promise.resolve(task).then(
      () => undefined,
      () => undefined,
    ),
    new Promise<void>((resolve) => setTimeout(resolve, ms)),
  ]);

const loadFonts = () =>
  withTimeout(
    Promise.allSettled(
      FONTS_TO_LOAD.map((font) => document.fonts.load(font, FONT_SAMPLE)),
    ),
  );

// Resolves on load or error; decode() is only used to finish early when it beats them.
const preloadImage = (src: string) =>
  withTimeout(
    new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
      img.decode().then(resolve, resolve);
    }),
  );

// Only what is actually on the page. Each project keeps a gallery of six images but
// renders one, and warming the rest just competes with the first paint for bandwidth.
const RENDERED_IMAGES = Array.from(
  new Set(projects.flatMap((p) => [p.images[0], p.logo])),
);

export const getPreloadTasks = (): Promise<unknown>[] => [
  loadFonts(),
  ...RENDERED_IMAGES.map(preloadImage),
];