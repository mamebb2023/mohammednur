import { useCallback, useEffect, useRef, type ComponentType } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BiCodeAlt,
  BiLayer,
  BiMessageSquareDetail,
  BiPaperPlane,
  BiRocket,
  BiUserCircle,
} from "react-icons/bi";
import type { ScrollEngine, ScrollState } from "@/lib/scrollEngine";

type IconConfig = {
  section: string; // matches the data-section of the section it belongs to
  Icon: ComponentType<{ size?: string | number }>;
  rx: number; // resting x, as a fraction of the viewport width (where it sits while its section is in place)
  ry: number; // top, in % of the viewport height
  k: number; // parallax: 1 = same speed as the page, higher = faster = feels closer
  size: number; // in vh
  at?: number; // 0-1: where along a long (wide) section it belongs; 0 = its start
};

// The icons that go with each section. Contact's content sits on the right, so its icon sits on the left.
const ICONS: IconConfig[] = [
  { section: "HOME", Icon: BiCodeAlt, rx: 0.72, ry: 12, k: 1.5, size: 24 },
  { section: "ABOUT", Icon: BiUserCircle, rx: 0.78, ry: 50, k: 1.3, size: 28 },
  { section: "PROJECTS", Icon: BiLayer, rx: 0.68, ry: 8, k: 1.6, size: 22 },
  {
    section: "PROJECTS",
    Icon: BiRocket,
    rx: 0.5,
    ry: 56,
    k: 1.4,
    size: 26,
    at: 0.55,
  },
  {
    section: "TESTIMONIALS",
    Icon: BiMessageSquareDetail,
    rx: 0.74,
    ry: 54,
    k: 1.5,
    size: 24,
  },
  {
    section: "CONTACT",
    Icon: BiPaperPlane,
    rx: 0.04,
    ry: 22,
    k: 1.6,
    size: 26,
  },
];

const FAR = 1e5; // "not measured yet / section not on this page": keeps the icon hidden

function SectionIcon({
  config,
  engine,
  scrollLeft,
  vw,
}: {
  config: IconConfig;
  engine: ScrollEngine;
  scrollLeft: MotionValue<number>;
  vw: MotionValue<number>;
}) {
  const { section, Icon, rx, ry, k, size, at = 0 } = config;

  // the scrollLeft at which this icon sits at rest (its section lined up, or the chosen spot along a long one)
  const anchor = useMotionValue(FAR);

  // right -> left, k times faster than the page: it arrives with its section and leaves with it
  const x = useTransform(
    [scrollLeft, anchor, vw],
    ([sl, a, w]: number[]) => w * rx + k * (a - sl),
  );
  const opacity = useTransform(
    [scrollLeft, anchor, vw],
    ([sl, a, w]: number[]) =>
      Math.max(0, 1 - Math.abs(a - sl) / (w * 0.85)) ** 1.5,
  );
  const rotate = useTransform(
    [scrollLeft, anchor, vw],
    ([sl, a, w]: number[]) => ((a - sl) / w) * 20,
  );

  // Anchor once per invalidation (resize, a section mounting, an image loading) — never
  // on a scroll frame.
  const measure = useCallback(
    ({ vertical }: ScrollState, origin: DOMRect) => {
      const scroller = engine.element;
      // mobile: the icons are display:none anyway, so don't measure for them at all
      if (!scroller || vertical) return anchor.set(FAR);
      const el = scroller.querySelector<HTMLElement>(
        `[data-section="${section}"]`,
      );
      if (!el) return anchor.set(FAR);
      const r = el.getBoundingClientRect();
      const left = r.left - origin.left + scroller.scrollLeft;
      const pad = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
      anchor.set(left - pad + at * Math.max(0, r.width - scroller.clientWidth));
    },
    [engine, section, at, anchor],
  );

  useEffect(() => engine.onInvalidate(measure), [engine, measure]);

  // A blurred element still costs a raster even at opacity 0. Off screen, skip it entirely.
  const blur = useRef<HTMLSpanElement>(null);
  const hidden = useRef(false);

  const setBlur = useCallback(
    (node: HTMLSpanElement | null) => {
      blur.current = node;
      if (!node) return;
      hidden.current = opacity.get() < 0.01;
      node.style.visibility = hidden.current ? "hidden" : "visible";
    },
    [opacity],
  );

  useMotionValueEvent(opacity, "change", (v) => {
    const node = blur.current;
    const hide = v < 0.01;
    if (!node || hide === hidden.current) return;
    hidden.current = hide;
    node.style.visibility = hide ? "hidden" : "visible";
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, opacity, rotate, top: `${ry}%` }}
      className="hidden md:block pointer-events-none -z-10 fixed left-0 text-primary/25 will-change-transform"
    >
      {/* The blur sits on a static inner layer: it rasterises once, and the outer
          transform then only re-composites that cached texture. */}
      <span
        ref={setBlur}
        className="block"
        style={{ filter: `blur(${(k - 1) * 3}px)` }}
      >
        <Icon size={`${size}vh`} />
      </span>
    </motion.div>
  );
}

export default function SectionIcons({ engine }: { engine: ScrollEngine }) {
  const scrollLeft = useMotionValue(0);
  const vw = useMotionValue(window.innerWidth);

  useEffect(
    () =>
      engine.onTick(({ left, vw: width, vertical }) => {
        if (vertical) return; // the icons only exist from md up
        scrollLeft.set(left);
        vw.set(width);
      }),
    [engine, scrollLeft, vw],
  );

  return (
    <>
      {ICONS.map((c) => (
        <SectionIcon
          key={`${c.section}-${c.at ?? 0}`}
          config={c}
          engine={engine}
          scrollLeft={scrollLeft}
          vw={vw}
        />
      ))}
    </>
  );
}
