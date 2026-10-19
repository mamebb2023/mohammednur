// Helpers for linking to the home page's sections (the ones that live inside the
// horizontal scroller). Shared by the Header tabs and by the hash glide on route
// change, so a "#section" link behaves the same however it was reached.

// below the md breakpoint the page scrolls vertically; from md up it scrolls sideways
export const isVertical = () => window.matchMedia("(max-width: 767px)").matches;

// "/#about" and "#about" both name the section "about"
export const keyOf = (path: string) => path.replace(/^\/?#/, "");

// a section can be tagged with id="about" or data-section="ABOUT"; both work
export const findSection = (scroller: HTMLElement, key: string) =>
  scroller.querySelector<HTMLElement>(`[id="${key}"], [data-section="${key}" i]`);

// start edge of an element (top on mobile, left on desktop) in the scroller's scrollable coordinates
export const startOf = (scroller: HTMLElement, el: HTMLElement) => {
  const s = scroller.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return isVertical()
    ? r.top - s.top + scroller.scrollTop
    : r.left - s.left + scroller.scrollLeft;
};

// the scroll offset that lines the section up with the scroller's inner padding edge
export const sectionPos = (scroller: HTMLElement, el: HTMLElement) => {
  const cs = getComputedStyle(scroller);
  const pad = parseFloat(isVertical() ? cs.paddingTop : cs.paddingLeft) || 0;
  return Math.max(0, startOf(scroller, el) - pad);
};

// glide to a named section. Returns false when that section isn't on this page.
export const glideToSection = (scroller: HTMLElement, key: string) => {
  const el = findSection(scroller, key);
  if (!el) return false;
  const pos = sectionPos(scroller, el);
  if (isVertical()) {
    // mobile: native smooth scroll down the column
    scroller.scrollTo({ top: pos, behavior: "smooth" });
  } else {
    // desktop: the ScrollFade glide
    scroller.dispatchEvent(new CustomEvent("scrollfade:to", { detail: pos }));
  }
  return true;
};
