"use client";

import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

const WA_LINK = whatsappLink(
  "Hi Riwaq — I'd like to ask about availability and pricing.",
);

/**
 * The single WhatsApp action for the whole site — a persistent, floating
 * button, the highest-intent conversion path for hostel enquiries in Pakistan.
 *
 * On click it plays a short "Opening WhatsApp…" confirmation, THEN opens the
 * chat. (Opening the chat immediately would switch the browser to the new tab
 * before the animation could ever be seen — so we hold, animate, then go.)
 */
export function FloatingContact() {
  const [connecting, setConnecting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    // Respect modified clicks (open-in-new-tab shortcuts) — let them through.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    setConnecting(true);
    if (timer.current) clearTimeout(timer.current);
    // Play the animation, then navigate to WhatsApp.
    timer.current = setTimeout(() => {
      window.location.href = WA_LINK;
    }, 1400);
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

          {/* Breathing "online" indicator */}
          <span
            aria-hidden
            className="fc-dot absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"
          />
        </div>
      </div>

      {connecting && <ConnectingOverlay />}
    </>
  );
}

/** Full-screen confirmation shown briefly after clicking, before WhatsApp opens. */
function ConnectingOverlay() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="wa-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/70 px-6 backdrop-blur-sm"
    >
      <div className="wa-card w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
        {/* WhatsApp mark with a pulsing ring */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#29d96e] to-[#1cae52] text-white shadow-lg shadow-[#25D366]/40">
            <Icon name="whatsapp" size={34} />
          </span>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-forest-900">
          Opening WhatsApp
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Taking you to your chat with Riwaq…
        </p>

        {/* Typing dots */}
        <div className="wa-typing mt-5 flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
        </div>

        {/* Progress sweep */}
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-forest-900/8">
          <div className="wa-progress relative h-full w-full rounded-full" />
        </div>

        <p className="mt-4 text-xs text-ink-muted">
          Not redirected?{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest-700 underline"
          >
            Open WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
