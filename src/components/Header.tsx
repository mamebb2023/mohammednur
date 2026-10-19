import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiEnvelope,
  BiHome,
  BiLayer,
  BiMenu,
  BiMessageSquareDetail,
  BiUser,
  BiX,
} from "react-icons/bi";
import {
  activeSpring,
  bottomLabelVariants,
  easeOutExpo,
  hoverSpring,
  rollTransition,
  stackVariants,
  topLabelVariants,
} from "@/constants";
import {
  findSection,
  isVertical,
  keyOf,
  sectionPos,
  startOf,
} from "@/lib/sectionNav";
import Lotus from "./Lotus";

// Each hash maps to an element inside the scroller with id="about" (or data-section="ABOUT", case-insensitive).
const sections = [
  { label: "Home", path: "/", Icon: BiHome },
  { label: "About", path: "/#about", Icon: BiUser },
  { label: "Projects", path: "/#projects", Icon: BiLayer },
  {
    label: "Testimonials",
    path: "/#testimonials",
    Icon: BiMessageSquareDetail,
  },
  { label: "Contact", path: "/#contact", Icon: BiEnvelope },
];

const tabs = sections;

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  // while a tab-click glide is running, ignore scroll-driven updates so the indicator doesn't hop through every tab
  const lock = useRef<{ pos: number; until: number } | null>(null);

  /* ---- active tab follows the section in view ---- */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const v = isVertical();
      const sl = v ? scroller.scrollTop : scroller.scrollLeft;

      if (lock.current) {
        if (
          performance.now() < lock.current.until &&
          Math.abs(sl - lock.current.pos) > 2
        )
          return;
        lock.current = null;
      }

      const max = v
        ? scroller.scrollHeight - scroller.clientHeight
        : scroller.scrollWidth - scroller.clientWidth;
      const size = v ? scroller.clientWidth : scroller.clientWidth;

      let next = "/";
      if (max > 2 && sl >= max - 2) {
        next = tabs[tabs.length - 1].path; // the last section is often too short/narrow to reach the centre
      } else {
        const center = sl + size / 2;
        for (const t of tabs) {
          if (t.path === "/") continue;
          const el = findSection(scroller, keyOf(t.path));
          if (el && startOf(scroller, el) <= center) next = t.path;
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

  /* ---- mobile menu: close on outside tap or Escape ---- */
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /* ---- tab click: glide when the section is on this page, otherwise let the
     router navigate to "/#section" and MainLayout glides once it mounts ---- */
  const goTo = (path: string) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const v = isVertical();

    let pos = 0;
    if (path !== "/") {
      const el = findSection(scroller, keyOf(path));
      if (!el) return;
      pos = sectionPos(scroller, el);
    }

    lock.current = { pos, until: performance.now() + 1500 };
    setActivePath(path);

    if (v) {
      // mobile: native smooth scroll down the column
      scroller.scrollTo({ top: pos, behavior: "smooth" });
    } else {
      // desktop: the ScrollFade glide
      scroller.dispatchEvent(new CustomEvent("scrollfade:to", { detail: pos }));
    }
  };

  const onHome = pathname === "/";
  const onTabClick = (e: MouseEvent, path: string) => {
    if (!onHome) return; // not on home: the NavLink changes route, the hash effect glides
    e.preventDefault();
    goTo(path);
  };

  const isTabActive = (path: string) => path === activePath;

  return (
    <header className="relative z-50 flex items-center justify-between">
      <div className="flex-center w-16">
        <Lotus size="h-8 w-5" />
      </div>

      {/* mobile: burger + dropdown */}
      <div ref={menuRef} className="relative md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full bg-white/50 text-black ring-1 ring-gray-100 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {menuOpen ? <BiX size={26} /> : <BiMenu size={24} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-56 rounded-3xl bg-white/90 p-2 shadow-xl shadow-black/10 ring-1 ring-gray-100"
            >
              {tabs.map(({ label, path, Icon }) => {
                const isActive = isTabActive(path);
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={(e) => {
                      onTabClick(e, path);
                      setMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-black active:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </NavLink>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* desktop: the pill nav */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="hidden items-center gap-1 overflow-hidden whitespace-nowrap rounded-full bg-white/50 p-1 ring-1 ring-gray-100 md:flex"
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
                onClick={(e) => onTabClick(e, tab.path)}
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
