"use client";

import { useEffect, useState } from "react";

/**
 * A back-to-top button that fades in once the visitor has scrolled past the
 * first viewport. Sits bottom-left, opposite the floating WhatsApp button, so
 * the two never collide.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-6 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 bg-ivory/90 text-forest-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory hover:text-brass-600 sm:left-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
