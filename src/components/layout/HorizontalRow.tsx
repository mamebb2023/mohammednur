import { useEffect, useRef, type ReactNode } from "react";

const railClass =
  "row-start-2 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth";

function canScrollVertically(node: Element | null) {
  let el = node as HTMLElement | null;

  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    if (
      el.scrollHeight > el.clientHeight + 1 &&
      /(auto|scroll)/.test(style.overflowY)
    ) {
      return true;
    }
    el = el.parentElement;
  }

  return false;
}

export default function HorizontalRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!railRef.current) return;
    const rail: HTMLDivElement = railRef.current;

    function onWheel(event: WheelEvent) {
      if (event.deltaX !== 0 || event.deltaY === 0) return;

      const max = rail.scrollWidth - rail.clientWidth;
      if (max <= 0) return;
      if (canScrollVertically(event.target as Element)) return;

      const next = rail.scrollLeft + event.deltaY;
      if (next <= 0 || next >= max) return;

      event.preventDefault();
      rail.scrollLeft = next;
    }

    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={railRef} className={`${railClass} ${className}`}>
      {children}
    </div>
  );
}

export function Slide({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex shrink-0 snap-center flex-col justify-center pr-6 md:pr-10 lg:pr-16 ${className}`}
    >
      {children}
    </section>
  );
}
