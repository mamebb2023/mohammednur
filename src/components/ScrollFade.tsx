import { useCallback, useEffect, useRef, type ReactNode, type RefObject } from "react";
import type { ScrollEngine, ScrollState } from "@/lib/scrollEngine";

const FADE_SIZE = 32; // px

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function ScrollFade({
  children,
  className = "",
  engine,
  scrollerRef,
}: {
  children: ReactNode;
  className?: string;
  /** The shared scroll engine; this component owns the scroller element. */
  engine: ScrollEngine;
  /** Optional: lets a parent read / write the scroller directly. */
  scrollerRef?: RefObject<HTMLDivElement | null>;
}) {
  const localRef = useRef<HTMLDivElement>(null);

  // A ref callback, not an effect: the engine has to be live before sibling effects run.
  const setScroller = useCallback(
    (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (scrollerRef) scrollerRef.current = node;
      engine.attach(node);
    },
    [engine, scrollerRef],
  );

  useEffect(() => {
    const scroller = localRef.current;
    if (!scroller) return;

    /* ---- edge fades (both sides, sized by how far you've scrolled) ---- */
    const updateMask = ({ left, maxX, vertical }: ScrollState) => {
      // On mobile the content stacks, so there is nothing to fade at the sides.
      if (vertical) {
        scroller.style.maskImage = "none";
        scroller.style.webkitMaskImage = "none";
        return;
      }
      const l = clamp(left, 0, FADE_SIZE);
      const r = clamp(maxX - left, 0, FADE_SIZE);
      if (l < 1 && r < 1) {
        scroller.style.maskImage = "none";
        scroller.style.webkitMaskImage = "none";
        return;
      }
      const m = `linear-gradient(to right, transparent 0, black ${l}px, black calc(100% - ${r}px), transparent 100%)`;
      scroller.style.maskImage = m;
      scroller.style.webkitMaskImage = m;
    };

    /* ---- smooth wheel -> horizontal scroll ---- */
    let current = scroller.scrollLeft;
    let target = current;
    let last = performance.now();
    let running = false;

    // While idle nothing tracks native scrolling (touch pan, scrollbar drag, keyboard), so
    // current/target go stale. Resync from the real position before applying any new input,
    // otherwise the next wheel/drag/goto starts from an old position (or gets discarded).
    const sync = () => {
      if (running) return;
      current = scroller.scrollLeft;
      target = current;
    };

    // Frames only run while there is something to move, so an idle page costs nothing.
    const wake = () => {
      if (!running) last = performance.now();
      running = true;
      engine.requestFrame();
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      const max = engine.state.maxX;
      if (max <= 0) return;
      sync();
      let d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) d *= 18;
      else if (e.deltaMode === 2) d *= scroller.clientWidth;
      e.preventDefault();
      e.stopPropagation();
      target = clamp(target + d, 0, max);
      wake();
    };

    /* ---- mouse drag-to-scroll ---- */
    let drag: { x: number; t: number } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (engine.state.maxX <= 0) return;
      // leave interactive things alone (add data-no-drag to opt anything else out)
      if (
        (e.target as HTMLElement).closest(
          "a,button,input,textarea,select,[data-no-drag]",
        )
      )
        return;
      e.preventDefault(); // no text selection / native image drag
      sync();
      drag = { x: e.clientX, t: target };
      scroller.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      target = clamp(drag.t - (e.clientX - drag.x) * 1.7, 0, engine.state.maxX);
      wake();
    };
    const endDrag = () => {
      if (!drag) return;
      drag = null;
      scroller.style.cursor = "";
    };

    /* ---- programmatic scroll: el.dispatchEvent(new CustomEvent("scrollfade:to", { detail: left })) ---- */
    const onGoto = (e: Event) => {
      sync();
      target = clamp((e as CustomEvent<number>).detail, 0, engine.state.maxX);
      wake();
    };

    // The frame's write phase: apply this frame's position before anyone reads it.
    const write = (now: number) => {
      const sl = scroller.scrollLeft;

      // Idle: frames also run for native scrolling (touch, scrollbar, keyboard). Just follow it,
      // and never write back, or slow native scrolling gets snapped to the old position.
      if (!running) {
        current = sl;
        target = sl;
        return false;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // adopt native input mid-glide
      if (Math.abs(sl - current) > 4) {
        current = sl;
        target = sl;
      }

      const delta = target - current;
      if (Math.abs(delta) < 0.05) {
        current = target;
        if (sl !== current) scroller.scrollLeft = current;
        running = false;
        return false;
      }

      current += delta * (1 - Math.pow(0.0016, dt));
      if (scroller.scrollLeft !== current) scroller.scrollLeft = current;
      return true;
    };

    // The page got shorter or longer: keep the target inside it, and repaint the fade.
    const onInvalidate = (s: ScrollState) => {
      target = clamp(target, 0, s.maxX);
      updateMask(s);
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("scrollfade:to", onGoto);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    const stopWriter = engine.setWriter(write);
    const stopTick = engine.onTick(updateMask);
    const stopInvalidate = engine.onInvalidate(onInvalidate);
    updateMask(engine.state);

    return () => {
      stopWriter();
      stopTick();
      stopInvalidate();
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("scrollfade:to", onGoto);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [engine]);

  return (
    <div
      ref={setScroller}
      data-scroller
      className={`h-full [&_img]:select-none [&_img]:[-webkit-user-drag:none] max-md:overflow-y-auto max-md:overflow-x-hidden max-md:overscroll-y-contain md:cursor-grab md:overflow-x-auto md:overflow-y-hidden md:overscroll-x-contain ${className}`}
    >
      {/* Desktop: w-max + min-w-full grows with a horizontal strip of content, fills the viewport when short.
          Mobile: a plain full-width column that grows downward and scrolls vertically.
          Children can use my-auto to stay vertically centered. */}
      <div className="flex max-md:w-full max-md:flex-col md:h-full md:w-max md:min-w-full">
        {children}
      </div>
    </div>
  );
}
