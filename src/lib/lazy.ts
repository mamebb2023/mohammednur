import { lazy, type ComponentType } from "react";

// P is inferred from the module's default export, so props stay typed
function defineLazy<P extends object>(
  load: () => Promise<{ default: ComponentType<P> }>,
) {
  return { load, Component: lazy(load) };
}

export const Silk = defineLazy(() => import("@/components/anim/Silk"));
export const ColorBends = defineLazy(
  () => import("@/components/anim/ColorBlends"),
);
export const Beams = defineLazy(() => import("@/components/anim/Beams"));

export const LogoMarquee = defineLazy(() => import("@/components/Marquee"));

// Everything the loader should wait for. Add new entries here and nowhere else.
const preloadable = [Silk, ColorBends, Beams, LogoMarquee];

// One task per component, so each one nudges the percentage. Never rejects.
export const componentPreloads = () =>
  preloadable.map((c) =>
    c.load().then(
      () => undefined,
      () => undefined,
    ),
  );
