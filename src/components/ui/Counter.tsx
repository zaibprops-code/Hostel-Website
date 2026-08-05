"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from zero the first time it scrolls into view.
 *
 * Accepts the display string as-is (e.g. "10+", "8 min", "24/7") and animates
 * only the leading integer, preserving any prefix/suffix. Non-numeric values
 * are shown unchanged. Respects reduced-motion by rendering the final value
 * immediately.
 */
export function Counter({
  value,
  className,
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/\d[\d,]*/);
  const target = match ? parseInt(match[0].replace(/,/g, ""), 10) : null;
  const [display, setDisplay] = useState(target === null ? value : renderAt(value, match!, 0));

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(eased * target);
        setDisplay(renderAt(value, match!, current));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Rebuild the string with `n` swapped in for the matched number. */
function renderAt(value: string, match: RegExpMatchArray, n: number): string {
  const i = match.index ?? 0;
  return value.slice(0, i) + n.toLocaleString() + value.slice(i + match[0].length);
}
