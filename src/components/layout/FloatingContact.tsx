"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

const WA_LINK = whatsappLink(
  "Hi Riwaq — I'd like to ask about availability and pricing.",
);
const REDIRECT_MS = 1400;

/**
 * The single WhatsApp action for the whole site. On click it shows a short,
 * honest "Opening WhatsApp" transition (branded loader, not a fake chat) then
 * opens the real chat. Opening immediately would switch tabs before the
 * animation could be seen, so we hold, animate, then go.
 */
export function FloatingContact() {
  const [connecting, setConnecting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset if the page is restored from the back/forward cache (e.g. Back from
  // WhatsApp), and cancel any pending redirect so it can't re-fire.
  useEffect(() => {
    const clear = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      setConnecting(false);
    };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) clear();
    };
    const onPageHide = () => {
      if (timer.current) clearTimeout(timer.current);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") setConnecting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return; // let open-in-new-tab shortcuts through
    }
    e.preventDefault();
    setConnecting(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      window.location.href = WA_LINK;
    }, REDIRECT_MS);
  }, []);

  return (
    <>
      <div className="fc-enter fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
        <div className="fc-float relative">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Riwaq on WhatsApp"
            onClick={handleClick}
            className="fc-shine group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#29d96e] to-[#1cae52] px-4 py-3.5 text-white shadow-[0_10px_26px_rgba(37,211,102,0.45)] ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_34px_rgba(37,211,102,0.6)] active:scale-95"
          >
            <Icon
              name="whatsapp"
              size={24}
              className="fc-beat relative shrink-0 drop-shadow-sm group-hover:[animation-play-state:paused]"
            />
            <span className="relative hidden pr-1 text-sm font-semibold tracking-tight sm:inline">
              Chat with us
            </span>
          </a>
          <span
            aria-hidden
            className="fc-dot absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"
          />
        </div>
      </div>

      {connecting && <ConnectingScreen />}
    </>
  );
}

/** Honest, branded "Opening WhatsApp" transition — a loader, not a fake chat. */
function ConnectingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="wa-backdrop fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0b6b60] to-[#128c7e] px-6 text-center text-white"
    >
      {/* WhatsApp mark with a soft pulse ring and a spinning loader */}
      <div className="wa-card relative flex h-28 w-28 items-center justify-center">
        <span className="wa-ring absolute inset-2 rounded-full bg-white/20" />
        <span className="absolute inset-0 rounded-full border-[3px] border-white/25 border-t-white motion-safe:animate-spin" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1cae52] shadow-lg">
          <Icon name="whatsapp" size={38} />
        </span>
      </div>

      <div className="wa-card">
        <h2 className="text-xl font-semibold tracking-tight">
          Opening WhatsApp
        </h2>
        <p className="mx-auto mt-1.5 max-w-xs text-sm text-white/80">
          Taking you to chat with the Riwaq team…
        </p>
      </div>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-card rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white/25"
      >
        Tap here if it doesn&apos;t open
      </a>
    </div>
  );
}
