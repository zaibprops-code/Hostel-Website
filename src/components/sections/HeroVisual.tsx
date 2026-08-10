"use client";

import { useEffect, useRef } from "react";
import { Frame } from "@/components/ui/Frame";

/**
 * The hero's image column, with a subtle pointer-parallax: the photo drifts a
 * few pixels against the cursor for depth, settling back when the pointer
 * leaves. Disabled on touch and reduced-motion.
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

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
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (imgRef.current) imgRef.current.style.transform = "";
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
    <div ref={wrapRef} className="reveal relative lg:self-start" style={{ animationDelay: "120ms" }}>
      <div
        ref={imgRef}
        className="relative transition-transform duration-500 ease-out will-change-transform"
      >
        <Frame
          asset={{
            src: "/images/hero.jpg",
            alt: "The residents' lounge at Riwaq Boys Hostel in E-11/2, Islamabad — comfortable sofas and a calm, bright sitting area",
            tone: "brass",
            blurDataURL:
              "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBf/EACAQAAICAgEFAQAAAAAAAAAAAAECAxEABCEFEjIzcXL/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFxEAAwEAAAAAAAAAAAAAAAAAABESQf/aAAwDAQACEQMRAD8AbWRTJGwhLrwCAtirvBHuaw2XWWJoJGHbGGjrk5qw+tfmQ6j4x/oYNPBpR//Z",
          }}
          rounded="rounded-[2rem]"
          priority
          sizes="(min-width: 1024px) 55vw, 90vw"
          imgClassName="object-center"
          className="h-[320px] sm:h-[400px] lg:h-[440px] shadow-2xl shadow-forest-950/40 ring-1 ring-ivory/10"
        />
      </div>
    </div>
  );
}
