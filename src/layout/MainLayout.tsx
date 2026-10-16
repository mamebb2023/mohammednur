import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router";
import ScrollFade from "@/components/ScrollFade";
import BottomBar from "@/components/BottomBar";
import Lotus from "@/components/Lotus";
import SectionIcons from "@/components/SectionIcons";
import { useScrollEngine } from "@/lib/scrollEngine";

// Where the lotus's centre ends up at the end of the scroll, as a fraction of the viewport width.
const LOTUS_END_CENTER = 0.15;

// The lotus's centre at scroll 0, mirroring the left-* classes below (left-5/6, md:left-1/2, lg:left-1/3; the box is full width).
const lotusStartCenter = (vw: number) =>
  vw * ((vw >= 1024 ? 1 / 3 : vw >= 768 ? 1 / 2 : 5 / 6) + 0.5);

const MainLayout = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const engine = useScrollEngine();
  const { pathname } = useLocation();

  // each page starts at the top-left (mobile scrolls vertically, desktop horizontally)
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, top: 0 });
  }, [pathname]);

  // 0 -> 1 across the horizontal scroll, read from the shared snapshot so late-loading
  // content can't throw it off
  const progress = useMotionValue(0);
  useEffect(
    () =>
      engine.onTick(({ left, maxX, vertical }) =>
        progress.set(
          !vertical && maxX > 0 ? Math.min(1, Math.max(0, left / maxX)) : 0,
        ),
      ),
    [engine, progress],
  );

  // scrubbed: the lotus travels from its resting spot on the right to the left as you scroll
  const lotusX = useTransform(
    progress,
    (p) =>
      -p *
      (lotusStartCenter(engine.state.vw) - engine.state.vw * LOTUS_END_CENTER),
  );

  return (
    <main className="relative flex h-dvh flex-col justify-between gap-3 overflow-hidden p-3">
      <motion.div
        style={{ x: lotusX }}
        className="-z-10 fixed size-full top-1/2 left-5/6 md:left-1/2 md:will-change-transform lg:left-1/3"
      >
        <Lotus size="h-[500px] w-[260px] md:h-[600px] md:w-[320px]" />
      </motion.div>

      {/* big faint icons that arrive with their section, sweeping right -> left faster than the page */}
      <SectionIcons engine={engine} />

      <Header scrollerRef={scrollerRef} />

      {/* min-h-0 lets this flex child shrink below its content so the mobile column can scroll */}
      <div className="min-h-0 flex-1 rounded-3xl border border-gray-100">
        <ScrollFade engine={engine} scrollerRef={scrollerRef}>
          <Outlet />
        </ScrollFade>
      </div>

      <BottomBar className="h-12" scrollerRef={scrollerRef} />
    </main>
  );
};

export default MainLayout;