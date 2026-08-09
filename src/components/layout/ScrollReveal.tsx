"use client";

import { useEffect } from "react";

/**
 * Drives the scroll-reveal system defined in globals.css.
 *
 * Every element marked with `data-reveal` starts hidden and eases into view
 * the first time it scrolls on screen. A single IntersectionObserver handles
 * the whole page; a MutationObserver picks up anything added later — a new
 * route, or cards revealed by a client-side filter — so nothing is ever left
 * stranded and invisible. If the browser lacks IntersectionObserver, or the
 * visitor prefers reduced motion, everything is simply shown at once. The
 * `html.js` gate (set by an inline script in the layout) keeps content visible
 * when JavaScript is unavailable.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => el.classList.add("is-visible"));
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
      // Keep revealing anything added later (client navigation, filters).
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observe = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };

    observe(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) io.observe(node);
          observe(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
