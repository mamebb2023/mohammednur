import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rollTransition, rollVariants } from "@/constants";

const UNIT = 10; // px between ruler ticks

type Sec = { name: string; left: number };
type SecState = { idx: number; total: number; name: string; dir: number };

/**
 * A value that rolls out and is replaced in place.
 * dir  1: old one leaves upward, new one rises from below
 * dir -1: the reverse (going backwards)
 */
function Roll({ value, dir }: { value: string; dir: number }) {
  return (
    <span className="-my-0.5 inline-grid overflow-hidden py-0.5">
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={value}
          custom={dir}
          variants={rollVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={rollTransition}
          style={{ transformOrigin: "0% 100%" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function BottomBar({
  scrollerRef,
  className = "",
}: {
  scrollerRef: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primaryRef = useRef<HTMLSpanElement>(null); // a .text-primary element, read for the canvas ring

  const [pct, setPct] = useState({ v: 0, dir: 1 });
  const [sec, setSec] = useState<SecState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const scroller = scrollerRef.current;
    if (!canvas || !ctx || !scroller) return;

    /* ---- sections: any element inside the scroller with data-section="NAME" ---- */
    let secs: Sec[] = [];
    const collect = () => {
      const base = scroller.getBoundingClientRect().left - scroller.scrollLeft;
      secs = [...scroller.querySelectorAll<HTMLElement>("[data-section]")].map(
        (el) => ({
          name: el.dataset.section ?? "",
          left: el.getBoundingClientRect().left - base,
        }),
      );
    };

    let color = "currentColor";
    let primary = "currentColor";
    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color; // follows the text-* class
      if (primaryRef.current)
        primary = getComputedStyle(primaryRef.current).color;
    };

    let lastPct = 0;
    let lastIdx = -1;
    let lastKey = "";
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const sl = scroller.scrollLeft;
      const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);

      /* percent: state only changes when the rounded number does */
      const p = max > 0 ? Math.round((sl / max) * 100) : 0;
      if (p !== lastPct) {
        const dir = p > lastPct ? 1 : -1;
        lastPct = p;
        setPct({ v: p, dir });
      }

      /* active section = last one whose left edge has passed the viewport centre */
      let idx = -1;
      if (secs.length) {
        const center = sl + scroller.clientWidth / 2;
        idx = 0;
        secs.forEach((s, i) => {
          if (s.left <= center) idx = i;
        });
      }
      const key = idx === -1 ? "" : `${idx}/${secs.length}/${secs[idx].name}`;
      if (key !== lastKey) {
        const dir = idx >= lastIdx ? 1 : -1;
        lastKey = key;
        lastIdx = idx;
        setSec(
          idx === -1
            ? null
            : { idx, total: secs.length, name: secs[idx].name, dir },
        );
      }

      /* ruler */
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (!W) return;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const first = Math.max(0, Math.floor((sl - cx) / UNIT));
      const lastTick = Math.floor((sl + cx) / UNIT) + 1;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.font = '9px ui-monospace, "DM Mono", monospace';
      ctx.textAlign = "center";

      for (let i = first; i <= lastTick; i++) {
        const x = Math.round(cx + i * UNIT - sl) + 0.5;
        const major = i % 10 === 0;
        const mid = i % 5 === 0;
        ctx.globalAlpha = major ? 0.55 : mid ? 0.3 : 0.14;
        ctx.beginPath();
        ctx.moveTo(x, H - 4);
        ctx.lineTo(x, H - (major ? 14 : mid ? 10 : 6));
        ctx.stroke();
        if (major) ctx.fillText(`${i / 10}m`, x, H - 19);
      }

      // "you are here" pointer: primary ring, regular-colored dot
      ctx.globalAlpha = 1;
      ctx.strokeStyle = primary;
      ctx.beginPath();
      ctx.arc(cx, H - 9, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, H - 9, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    collect();
    size();
    // re-collect when the page changes (sections mount/unmount) or the layout resizes
    const mo = new MutationObserver(collect);
    mo.observe(scroller, { childList: true, subtree: true });
    const ro = new ResizeObserver(() => {
      size();
      collect();
    });
    ro.observe(canvas);
    ro.observe(scroller);
    if (scroller.firstElementChild) ro.observe(scroller.firstElementChild);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
    };
  }, [scrollerRef]);

  const digits = String(pct.v).padStart(3, "0").split("");

  return (
    <div
      className={`flex items-stretch gap-4 rounded-3xl border border-gray-100 px-5 font-mono text-[10px] tracking-[0.2em] ${className}`}
    >
      {/* 01/05 · NAME — number and name roll when the section changes; the slash is primary */}
      {sec && (
        <span className="flex items-center whitespace-nowrap">
          <Roll value={String(sec.idx + 1).padStart(2, "0")} dir={sec.dir} />
          <span className="text-primary">/</span>
          <span>{String(sec.total).padStart(2, "0")}</span>
          <span>&nbsp;·&nbsp;</span>
          <Roll value={sec.name} dir={sec.dir} />
        </span>
      )}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block min-w-16 flex-1"
      />

      {/* SCROLL 000% — each digit rolls on its own; the % is primary */}
      <span className="hidden items-center whitespace-nowrap sm:flex">
        SCROLL&nbsp;
        {digits.map((d, i) => (
          <Roll key={i} value={d} dir={pct.dir} />
        ))}
        <span ref={primaryRef} className="text-primary">
          %
        </span>
      </span>
    </div>
  );
}
