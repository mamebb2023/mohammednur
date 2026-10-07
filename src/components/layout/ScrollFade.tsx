import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const FADE_SIZE = 32; // px

export default function ScrollFade({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [moreBelow, setMoreBelow] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setMoreBelow(el.scrollHeight - el.clientHeight - el.scrollTop > 1);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    observer.observe(content);

    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const mask = moreBelow
    ? `linear-gradient(to bottom, black calc(100% - ${FADE_SIZE}px), transparent)`
    : "none";

  return (
    <div
      ref={scrollerRef}
      className={`h-full overflow-y-auto overscroll-y-contain transition-all ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {/* min-h-full + children using my-auto = centered when short, scrollable when tall */}
      <div ref={contentRef} className="flex min-h-full flex-col">
        {children}
      </div>
    </div>
  );
}
