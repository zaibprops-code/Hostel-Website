"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

const WA_MESSAGE = "Hi Riwaq — I'd like to ask about availability and pricing.";
const WA_LINK = whatsappLink(WA_MESSAGE);
const REDIRECT_MS = 2000;

/**
 * The single WhatsApp action for the whole site. On click it plays a short,
 * on-brand "message sent" preview — a mini WhatsApp chat where the pre-filled
 * message is delivered, read (blue ticks) and Riwaq starts typing — before the
 * real chat opens. Opening WhatsApp immediately would switch tabs before the
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

      {connecting && <ChatPreview />}
    </>
  );
}

/** A miniature WhatsApp chat that plays a "message sent → read → typing" flow. */
function ChatPreview() {
  // step 0 sending · 1 sent(✓) · 2 delivered(✓✓) · 3 read(blue) · 4 typing
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 350),
      setTimeout(() => setStep(2), 750),
      setTimeout(() => setStep(3), 1150),
      setTimeout(() => setStep(4), 1450),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="wa-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/70 px-6 backdrop-blur-sm"
    >
      <div className="wa-card w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* WhatsApp-style header */}
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#128C7E] text-sm font-bold">
            R
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              Riwaq Hostels
            </p>
            <p className="text-[0.7rem] leading-tight text-white/70">
              {step >= 4 ? "typing…" : "online"}
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[0.65rem] text-white/70">
            <Icon name="whatsapp" size={16} />
            WhatsApp
          </span>
        </div>

        {/* Chat body */}
        <div className="space-y-2 bg-[#ECE5DD] px-4 py-5">
          {/* Outgoing message */}
          <div className="flex justify-end">
            <div className="wa-bubble relative max-w-[80%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2 shadow-sm">
              <p className="text-[0.82rem] leading-snug text-[#111b21]">
                {WA_MESSAGE}
              </p>
              <div className="mt-0.5 flex items-center justify-end gap-1">
                <span className="text-[0.6rem] text-black/45">now</span>
                <Ticks step={step} />
              </div>
            </div>
          </div>

          {/* Riwaq typing */}
          {step >= 4 && (
            <div className="flex justify-start">
              <div className="wa-bubble rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
                <div className="wa-typing flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer status */}
        <div className="flex items-center justify-center gap-2 border-t border-black/5 bg-white px-4 py-3 text-center">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" />
          <p className="text-xs text-ink-soft">
            Opening WhatsApp…{" "}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-forest-700 underline"
            >
              tap here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/** WhatsApp-style delivery ticks that progress sent → delivered → read. */
function Ticks({ step }: { step: number }) {
  const blue = step >= 3;
  const doubled = step >= 2;
  const color = blue ? "#34B7F1" : "rgba(0,0,0,0.4)";
  return (
    <span className="relative inline-flex h-3 w-4 items-center">
      <Check style={{ color }} className="absolute left-0" />
      <Check
        style={{ color }}
        className="absolute left-[5px] transition-opacity duration-200"
        hidden={!doubled}
      />
    </span>
  );
}

function Check({
  className,
  style,
  hidden,
}: {
  className?: string;
  style?: React.CSSProperties;
  hidden?: boolean;
}) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ ...style, opacity: hidden ? 0 : 1 }}
    >
      <path
        d="M2 8.5l3.5 3.5L14 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
