import { useEffect, useState, type ComponentType, type RefObject } from "react";
import {
  motion,
  useMotionValue,
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
  scrollerRef,
  scrollLeft,
}: {
  config: IconConfig;
  scrollerRef: RefObject<HTMLDivElement | null>;
  scrollLeft: MotionValue<number>;
}) {
  const { section, Icon, rx, ry, k, size, at = 0 } = config;

  // the scrollLeft at which this icon sits at rest (its section lined up, or the chosen spot along a long one)
  const anchor = useMotionValue(FAR);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const measure = () => {
      const el = scroller.querySelector<HTMLElement>(
        `[data-section="${section}"]`,
      );
      if (!el) return anchor.set(FAR);
      const r = el.getBoundingClientRect();
      const left =
        r.left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
      const pad = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
      anchor.set(left - pad + at * Math.max(0, r.width - scroller.clientWidth));
    };

    measure();
    const mo = new MutationObserver(measure); // sections mounting later
    mo.observe(scroller, { childList: true, subtree: true });
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);
    if (scroller.firstElementChild) ro.observe(scroller.firstElementChild);

    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, [scrollerRef, section, at, anchor]);

  // right -> left, k times faster than the page: it arrives with its section and leaves with it
  const x = useTransform(
    [scrollLeft, anchor],
    ([sl, a]: number[]) => window.innerWidth * rx + k * (a - sl),
  );
  const opacity = useTransform(
    [scrollLeft, anchor],
    ([sl, a]: number[]) =>
      Math.max(0, 1 - Math.abs(a - sl) / (window.innerWidth * 0.85)) ** 1.5,
  );
  const rotate = useTransform(
    [scrollLeft, anchor],
    ([sl, a]: number[]) => ((a - sl) / window.innerWidth) * 20,
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        opacity,
        rotate,
        top: `${ry}%`,
        filter: `blur(${(k - 1) * 3}px)`,
      }}
      className="pointer-events-none -z-10 fixed left-0 text-primary/25 will-change-transform"
    >
      <Icon size={`${size}vh`} />
    </motion.div>
  );
}

export default function SectionIcons({
  scrollerRef,
}: {
  scrollerRef: RefObject<HTMLDivElement | null>;
}) {
  const scrollLeft = useMotionValue(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => scrollLeft.set(el.scrollLeft);
    update();
    el.addEventListener("scroll", update, { passive: true });
    setReady(true);
    return () => el.removeEventListener("scroll", update);
  }, [scrollerRef, scrollLeft]);

  if (!ready) return null; // the scroller ref exists after the first commit

  return (
    <>
      {ICONS.map((c) => (
        <SectionIcon
          key={`${c.section}-${c.at ?? 0}`}
          config={c}
          scrollerRef={scrollerRef}
          scrollLeft={scrollLeft}
        />
      ))}
    </>
  );
}
