import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router";
import ReactLenis from "lenis/react";
import ScrollFade from "@/components/ScrollFade";
import BottomBar from "@/components/BottomBar";
import Lotus from "@/components/Lotus";

const MainLayout = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // each page starts at the left edge
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [pathname]);

  return (
    <ReactLenis root>
      <main className="relative flex flex-col justify-between gap-3 h-screen overflow-hidden p-3">
        <div className="-z-10 fixed size-full top-1/2 left-5/6 md:left-1/2 lg:left-1/3">
          <Lotus />
        </div>

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
