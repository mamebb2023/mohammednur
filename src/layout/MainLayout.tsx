import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router";
import ReactLenis from "lenis/react";
import ScrollFade from "@/components/ScrollFade";
import BottomBar from "@/components/BottomBar";
import Lotus from "@/components/Lotus";
import SectionIcons from "@/components/SectionIcons";

// Where the lotus's centre ends up at the end of the scroll, as a fraction of the viewport width.
const LOTUS_END_CENTER = 0.15;

// The lotus's centre at scroll 0, mirroring the left-* classes below (left-5/6, md:left-1/2, lg:left-1/3; the box is full width).
const lotusStartCenter = (vw: number) =>
  vw * ((vw >= 1024 ? 1 / 3 : vw >= 768 ? 1 / 2 : 5 / 6) + 0.5);

const MainLayout = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // each page starts at the left edge
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [pathname]);

  // 0 -> 1 across the horizontal scroll, read live so late-loading content can't throw it off
  const progress = useMotionValue(0);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [progress]);

  // scrubbed: the lotus travels from its resting spot on the right to the left as you scroll
  const lotusX = useTransform(progress, (p) => {
    const vw = window.innerWidth;
    return -p * (lotusStartCenter(vw) - vw * LOTUS_END_CENTER);
  });

  return (
    <ReactLenis root>
      <main className="relative flex flex-col justify-between gap-3 h-screen overflow-hidden p-3">
        <motion.div
          style={{ x: lotusX }}
          className="-z-10 fixed size-full top-1/2 left-5/6 md:left-1/2 lg:left-1/3 will-change-transform"
        >
          <Lotus />
        </motion.div>

        {/* big faint icons that arrive with their section, sweeping right -> left faster than the page */}
        <SectionIcons scrollerRef={scrollerRef} />

        <Header scrollerRef={scrollerRef} />

        <div className="flex-1 rounded-3xl border border-gray-100">
          <ScrollFade scrollerRef={scrollerRef}>
            <Outlet />
          </ScrollFade>
        </div>

        <BottomBar className="h-12" scrollerRef={scrollerRef} />
      </main>
    </ReactLenis>
  );
};

export default MainLayout;
