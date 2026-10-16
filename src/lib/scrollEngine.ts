import { useMemo } from "react";

/**
 * One scroll position, one rAF, one set of measurements for the whole page.
 *
 * The page used to have five independent consumers of the same scroller: three scroll
 * listeners, two always-on rAF loops and a handful of getBoundingClientRect calls per
 * scroll event, interleaved with writes. Every frame now runs in three phases:
 *
 *   1. write  — the scroller's own easing (ScrollFade), via setWriter
 *   2. read   — one snapshot of the scroll position (cheap, no layout flush)
 *   3. tick   — subscribers update motion values / canvas / state from that snapshot
 *
 * Nothing in the read or tick phase touches the DOM's geometry, so a scroll frame no
 * longer ping-pongs between forced layouts. Expensive measurements (section offsets,
 * icon anchors, canvas size) happen once per invalidation instead of once per frame.
 *
 * When nothing is scrolling, nothing animates and nothing has changed on screen,
 * there is no scheduled frame at all.
 */

/** Snapshot handed to subscribers. `max*` and `vw` are refreshed on invalidation only. */
export type ScrollState = {
  left: number;
  top: number;
  /** clientWidth / clientHeight of the scroller. */
  width: number;
  height: number;
  maxX: number;
  maxY: number;
  /** Below the md breakpoint the page scrolls down instead of sideways. */
  vertical: boolean;
  /** window.innerWidth, for elements positioned against the viewport. */
  vw: number;
};

/** Runs once per frame, after the write and read phases. Must not read layout. */
export type Tick = (state: ScrollState) => void;
/** Runs when the content or the box may have changed (resize, sections mounting). */
export type Invalidation = (state: ScrollState, origin: DOMRect) => void;
/**
 * Runs at the top of each frame to apply this frame's scroll position.
 * Returns true to keep frames coming (i.e. it is still easing).
 */
export type FrameWriter = (now: number) => boolean;

// Below the md breakpoint the page scrolls vertically; from md up it scrolls sideways.
// One media query, read once per frame, shared by every caller.
const md = window.matchMedia("(max-width: 767px)");

export const isVertical = () => md.matches;

export class ScrollEngine {
  private el: HTMLElement | null = null;
  /** Latest snapshot. Read it freely: it is a plain object, refreshed every frame. */
  readonly state: ScrollState = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    maxX: 0,
    maxY: 0,
    vertical: md.matches,
    vw: window.innerWidth,
  };
  private origin = new DOMRect();
  private ticks = new Set<Tick>();
  private invalidations = new Set<Invalidation>();
  private writer: FrameWriter | null = null;
  private raf = 0;
  private ro: ResizeObserver | null = null;
  private mo: MutationObserver | null = null;

  /** The scroller element, once something has attached it (a ref callback, not an effect). */
  get element() {
    return this.el;
  }

  /** The scroller's last measured box. Valid after any invalidation. */
  get box(): DOMRect {
    return this.origin;
  }

  /**
   * Idempotent. Called from a ref callback so the engine is live before any sibling's
   * effect runs — effects are the wrong place for this, they run in tree order.
   */
  attach(el: HTMLElement | null) {
    if (el === this.el) return;
    this.detach();
    if (!el) return;
    this.el = el;

    el.addEventListener("scroll", this.onScroll, { passive: true });

    this.ro = new ResizeObserver(this.invalidate);
    this.ro.observe(el);
    // the content strip: its size is what decides every section's offset
    if (el.firstElementChild) this.ro.observe(el.firstElementChild);

    // Direct children only (that is the content strip, and its children are the
    // sections). `subtree` here would re-measure on every node a section adds.
    this.mo = new MutationObserver(this.invalidate);
    this.mo.observe(el, { childList: true });

    this.measure();
  }

  detach() {
    if (!this.el) return;
    this.el.removeEventListener("scroll", this.onScroll);
    this.ro?.disconnect();
    this.mo?.disconnect();
    this.ro = null;
    this.mo = null;
    this.el = null;
  }

  onTick(fn: Tick) {
    this.ticks.add(fn);
    fn(this.state); // catch subscribers up on whatever already happened
    return () => {
      this.ticks.delete(fn);
    };
  }

  onInvalidate(fn: Invalidation) {
    this.invalidations.add(fn);
    if (this.el) fn(this.state, this.origin);
    return () => {
      this.invalidations.delete(fn);
    };
  }

  /** Installs the frame's write phase. Returns a cleanup that restores the previous one. */
  setWriter(fn: FrameWriter | null) {
    this.writer = fn;
    return () => {
      if (this.writer === fn) this.writer = null;
    };
  }

  /** Ask for a frame, e.g. after a wheel event changed the target. */
  requestFrame() {
    if (this.raf) return;
    this.raf = requestAnimationFrame(this.frame);
  }

  /** Full re-measure: sizes, the origin rect, then every invalidation subscriber. */
  invalidate = () => this.measure();

  private measure() {
    if (!this.el) return;
    const s = this.state;
    s.width = this.el.clientWidth;
    s.height = this.el.clientHeight;
    s.maxX = Math.max(0, this.el.scrollWidth - s.width);
    s.maxY = Math.max(0, this.el.scrollHeight - s.height);
    s.vertical = md.matches;
    s.vw = window.innerWidth;
    s.left = this.el.scrollLeft;
    s.top = this.el.scrollTop;
    this.origin = this.el.getBoundingClientRect();

    this.invalidations.forEach((fn) => fn(s, this.origin));
    this.requestFrame();
  }

  /** Scroll position only: two reads that any scroll frame needs anyway. */
  private readPosition() {
    if (!this.el) return;
    const s = this.state;
    s.left = this.el.scrollLeft;
    s.top = this.el.scrollTop;
    s.vertical = md.matches;
  }

  private onScroll = () => this.requestFrame();

  private frame = (now: number) => {
    this.raf = 0;
    if (!this.el) return;

    const keepGoing = this.writer ? this.writer(now) : false;

    this.readPosition();
    this.ticks.forEach((fn) => fn(this.state));

    if (keepGoing) this.requestFrame();
  };
}

/** One engine per scroller; stable for the lifetime of the layout. */
export function useScrollEngine() {
  return useMemo(() => new ScrollEngine(), []);
}