import { useEffect, useRef, type ReactNode, type RefObject } from "react";

const FADE_SIZE = 32; // px

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function ScrollFade({
  children,
  className = "",
  scrollerRef,
}: {
  children: ReactNode;
  className?: string;
  /** Optional: lets a parent (e.g. the bottom bar) read scrollLeft. */
  scrollerRef?: RefObject<HTMLDivElement | null>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = scrollerRef ?? localRef;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const maxScroll = () => Math.max(0, el.scrollWidth - el.clientWidth);

    /* ---- edge fades (both sides, sized by how far you've scrolled) ---- */
    const updateMask = () => {
      const left = clamp(el.scrollLeft, 0, FADE_SIZE);
      const right = clamp(maxScroll() - el.scrollLeft, 0, FADE_SIZE);
      if (left < 1 && right < 1) {
        el.style.maskImage = "none";
        el.style.webkitMaskImage = "none";
        return;
      }
      const m = `linear-gradient(to right, transparent 0, black ${left}px, black calc(100% - ${right}px), transparent 100%)`;
      el.style.maskImage = m;
      el.style.webkitMaskImage = m;
    };

    /* ---- smooth wheel -> horizontal scroll ---- */
    let current = el.scrollLeft;
    let target = current;
    let last = performance.now();
    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      const max = maxScroll();
      if (max <= 0) return;
      let d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) d *= 18;
      else if (e.deltaMode === 2) d *= el.clientWidth;
      e.preventDefault();
      e.stopPropagation(); // keep Lenis out of it
      target = clamp(target + d, 0, max);
    };

    /* ---- mouse drag-to-scroll ---- */
    let drag: { x: number; t: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (maxScroll() <= 0) return;
      // leave interactive things alone (add data-no-drag to opt anything else out)
      if (
        (e.target as HTMLElement).closest(
          "a,button,input,textarea,select,[data-no-drag]",
        )
      )
        return;
      e.preventDefault(); // no text selection / native image drag
      drag = { x: e.clientX, t: target };
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      target = clamp(drag.t - (e.clientX - drag.x) * 1.7, 0, maxScroll());
    };
    const endDrag = () => {
      if (!drag) return;
      drag = null;
      el.style.cursor = "";
    };

    /* ---- programmatic scroll: el.dispatchEvent(new CustomEvent("scrollfade:to", { detail: left })) ---- */
    const onGoto = (e: Event) => {
      target = clamp((e as CustomEvent<number>).detail, 0, maxScroll());
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // adopt native input (touch pan, scrollbar drag, keyboard)
      const sl = el.scrollLeft;
      if (Math.abs(sl - current) > 4) {
        current = sl;
        target = sl;
      }
      current += (target - current) * (1 - Math.pow(0.0016, dt));
      if (Math.abs(target - current) < 0.05) current = target;
      if (el.scrollLeft !== current) el.scrollLeft = current;
    };

    const onResize = () => {
      target = clamp(target, 0, maxScroll());
      updateMask();
    };

    updateMask();
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateMask, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("scrollfade:to", onGoto);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    const observer = new ResizeObserver(onResize);
    observer.observe(el);
    observer.observe(content);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateMask);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("scrollfade:to", onGoto);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      observer.disconnect();
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      data-lenis-prevent
      className={`h-full overflow-x-auto overflow-y-hidden overscroll-x-contain cursor-grab [&_img]:select-none [&_img]:[-webkit-user-drag:none] ${className}`}
    >
      {/* w-max + min-w-full: grows with a horizontal strip of content, fills the viewport when short.
          Children can use my-auto to stay vertically centered. */}
      <div ref={contentRef} className="flex h-full w-max min-w-full">
        {children}
      </div>
    </div>
  );
}
