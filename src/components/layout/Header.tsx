import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  activeSpring,
  easeOutExpo,
  hoverSpring,
  rollTransition,
  routes,
} from "@/constants";
import Lotus from "../Lotus";

const tabs = routes;

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

// Labels rise once the width has mostly opened, staggered per tab
const stackVariants = {
  hidden: { y: "130%", rotate: 10 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.55, ease: easeOutExpo, delay: 0.45 + i * 0.08 },
  }),
};

const topLabelVariants = {
  idle: { y: "0%", rotate: 0 },
  rolled: { y: "-130%", rotate: -10 },
};

const bottomLabelVariants = {
  idle: { y: "130%", rotate: 10 },
  rolled: { y: "0%", rotate: 0 },
};

export default function Header() {
  const { pathname } = useLocation();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isTabActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="p-4 flex justify-between items-center z-50">
      <div className="flex-center w-16">
        <Lotus size="h-8 w-5" />
      </div>

      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-1 overflow-hidden whitespace-nowrap rounded-full ring-1 ring-gray-100 bg-white/50 p-1 shadow-lg backdrop-blur-md"
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
