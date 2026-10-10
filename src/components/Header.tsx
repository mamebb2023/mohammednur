import { useEffect, useRef, useState, type RefObject } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  activeSpring,
  bottomLabelVariants,
  easeOutExpo,
  hoverSpring,
  rollTransition,
  stackVariants,
  topLabelVariants,
} from "@/constants";
import Lotus from "./Lotus";

// Each hash maps to an element inside the scroller with id="about" (or data-section="ABOUT", case-insensitive).
const sections = [
  { label: "Home", path: "/" },
  { label: "About", path: "#about" },
  { label: "Projects", path: "#projects" },
  { label: "Testimonials", path: "#testimonials" },
  { label: "Contact", path: "#contact" },
];

const tabs = sections;

const keyOf = (path: string) => path.replace(/^[/#]/, "");

const findSection = (scroller: HTMLElement, key: string) =>
  scroller.querySelector<HTMLElement>(
    `[id="${key}"], [data-section="${key}" i]`,
  );

// left edge of an element in the scroller's scrollable coordinate space
const leftOf = (scroller: HTMLElement, el: HTMLElement) =>
  el.getBoundingClientRect().left -
  scroller.getBoundingClientRect().left +
  scroller.scrollLeft;

// Header: only width and opacity. Width opens from the right edge (the header is anchored right).
const navVariants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      width: { duration: 0.8, ease: easeOutExpo },
    },
  },
};

const indicatorVariants = {
  hidden: { scaleX: 0.25, scaleY: 0.25, opacity: 0 },
  visible: { scaleX: 1, scaleY: 1, opacity: 1 },
};

export default function Header({
  scrollerRef,
}: {
  scrollerRef: RefObject<HTMLDivElement | null>;
}) {
  const [activePath, setActivePath] = useState("/");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  // while a tab-click glide is running, ignore scroll-driven updates so the indicator doesn't hop through every tab
  const lock = useRef<{ left: number; until: number } | null>(null);

  /* ---- active tab follows the section in view ---- */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const sl = scroller.scrollLeft;

      if (lock.current) {
        if (
          performance.now() < lock.current.until &&
          Math.abs(sl - lock.current.left) > 2
        )
          return;
        lock.current = null;
      }

      const max = scroller.scrollWidth - scroller.clientWidth;
      let next = "/";
      if (max > 2 && sl >= max - 2) {
        next = tabs[tabs.length - 1].path; // the last section is often too narrow to reach the centre
      } else {
        const center = sl + scroller.clientWidth / 2;
        for (const t of tabs) {
          if (t.path === "/") continue;
          const el = findSection(scroller, keyOf(t.path));
          if (el && leftOf(scroller, el) <= center) next = t.path;
        }
      }
      setActivePath(next);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    const mo = new MutationObserver(update); // sections mounting after a route change
    mo.observe(scroller, { childList: true, subtree: true });

    return () => {
      scroller.removeEventListener("scroll", update);
      ro.disconnect();
      mo.disconnect();
    };
  }, [scrollerRef]);

  /* ---- tab click -> glide to the section ---- */
  const goTo = (path: string) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let left = 0;
    if (path !== "/") {
      const el = findSection(scroller, keyOf(path));
      if (!el) return;
      // line the section up with the scroller's inner padding edge
      left =
        leftOf(scroller, el) -
        (parseFloat(getComputedStyle(scroller).paddingLeft) || 0);
    }
    left = Math.max(0, left);

    lock.current = { left, until: performance.now() + 1500 };
    setActivePath(path);
    scroller.dispatchEvent(new CustomEvent("scrollfade:to", { detail: left }));
  };

  const isTabActive = (path: string) => path === activePath;

  return (
    <header className="flex justify-between items-center z-50">
      <div className="flex-center w-16">
        <Lotus size="h-8 w-5" />
      </div>

      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-1 overflow-hidden whitespace-nowrap rounded-full ring-1 ring-gray-100 bg-white/50 p-1"
        aria-label="Main navigation"
      >
        {tabs.map((tab, index) => {
          const isActive = isTabActive(tab.path);
          const isHovered = hoverIndex === index;
          const rolled = isActive || isHovered;

          return (
            <div
              key={tab.path}
              className="relative shrink-0"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <AnimatePresence initial={false}>
                {isHovered && !isActive && (
                  <motion.span
                    key="hover"
                    variants={indicatorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={hoverSpring}
                    style={{ transformOrigin: "50% 100%" }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-gray-100"
                  />
                )}
                {isActive && (
                  <motion.span
                    key="active"
                    variants={indicatorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={activeSpring}
                    style={{ transformOrigin: "50% 100%" }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-primary"
                  />
                )}
              </AnimatePresence>

              <NavLink
                to={tab.path}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(tab.path);
                }}
                className={`relative z-10 flex items-center rounded-full px-4 py-2 text-sm font-medium transition-[color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isActive ? "text-white" : "text-black"
                }`}
              >
                <span className="-my-0.5 block overflow-hidden py-0.5">
                  <motion.span
                    custom={index}
                    variants={stackVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ transformOrigin: "0% 100%" }}
                    className="relative block"
                  >
                    <motion.span
                      variants={topLabelVariants}
                      initial={false}
                      animate={rolled ? "rolled" : "idle"}
                      transition={rollTransition}
                      style={{ transformOrigin: "0% 100%" }}
                      className="block"
                    >
                      {tab.label}
                    </motion.span>

                    <motion.span
                      aria-hidden="true"
                      variants={bottomLabelVariants}
                      initial={false}
                      animate={rolled ? "rolled" : "idle"}
                      transition={rollTransition}
                      style={{ transformOrigin: "0% 100%" }}
                      className="absolute inset-0 block"
                    >
                      {tab.label}
                    </motion.span>
                  </motion.span>
                </span>
              </NavLink>
            </div>
          );
        })}
      </motion.nav>
    </header>
  );
}
