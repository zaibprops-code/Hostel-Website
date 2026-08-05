"use client";

import { useEffect, useRef } from "react";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types";

/**
 * The hero's image column, with a subtle pointer-parallax: the photo and the
 * floating "glass" badge drift a few pixels against the cursor for depth,
 * settling back when the pointer leaves. Disabled on touch and reduced-motion.
 */
const badges: { icon: IconName; text: string }[] = [
  { icon: "cctv", text: "24/7 CCTV secured" },
  { icon: "wifi", text: "Fibre WiFi included" },
];

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    if (!fine || reduce || !wrap) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${tx * -14}px, ${ty * -14}px, 0)`;
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${tx * 26}px, ${ty * 26}px, 0)`;
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (imgRef.current) imgRef.current.style.transform = "";
      if (badgeRef.current) badgeRef.current.style.transform = "";
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="reveal relative" style={{ animationDelay: "120ms" }}>
      <div
        ref={imgRef}
        className="relative transition-transform duration-500 ease-out will-change-transform"
      >
        <Frame
          asset={{
            src: "/images/hero.svg",
            alt: "A calm, bright room at Riwaq Boys Hostel",
            tone: "brass",
          }}
          ratio="aspect-[4/5]"
          rounded="rounded-[2rem]"
          priority
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="shadow-2xl shadow-forest-950/40 ring-1 ring-ivory/10"
        />
      </div>

      {/* Floating glass badge */}
      <div
        ref={badgeRef}
        className="badge-float absolute -bottom-5 -left-4 hidden transition-transform duration-500 ease-out will-change-transform sm:-left-6 sm:block"
      >
        <div className="rounded-2xl border border-ivory/15 bg-forest-900/70 p-4 shadow-xl shadow-forest-950/40 backdrop-blur-md">
          <ul className="space-y-2.5">
            {badges.map((b) => (
              <li key={b.text} className="flex items-center gap-2.5 text-sm text-ivory">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brass-400/20 text-brass-300">
                  <Icon name={b.icon} size={15} />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
