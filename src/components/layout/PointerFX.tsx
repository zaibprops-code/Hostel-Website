"use client";

import { useEffect } from "react";

/**
 * Drives the cursor spotlight (see globals.css `[data-spotlight]`). For every
 * spotlight element it tracks the pointer and writes the light's position into
 * CSS custom properties, toggling `.is-hot` while the pointer is over the card.
 *
 * Skipped entirely on coarse pointers (touch) and when reduced motion is
 * preferred. A MutationObserver keeps it working for cards added later
 * (client-side navigation, filters).
 */
export function PointerFX() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const bound = new WeakSet<HTMLElement>();

    const enhance = (el: HTMLElement) => {
      if (bound.has(el)) return;
      bound.add(el);

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      const onEnter = () => el.classList.add("is-hot");
      const onLeave = () => el.classList.remove("is-hot");

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    };

    const scan = (root: ParentNode) =>
      root
        .querySelectorAll<HTMLElement>("[data-spotlight]")
        .forEach(enhance);

    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-spotlight]")) enhance(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);

  return null;
}
