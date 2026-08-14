"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/data/site";
import { seedAvailability } from "@/data/availability";
import type { AvailabilitySnapshot } from "@/lib/availability/shared";
import { statusTone } from "@/lib/availability/shared";
import {
  answer as buildAnswer,
  DEFAULT_SUGGESTIONS,
  SUGGESTION_QUERIES,
  type AssistantAnswer,
} from "@/lib/assistant/engine";

/**
 * The on-site assistant. Answers seat availability, pricing, facilities,
 * location and booking questions instantly from the site's own data + live
 * availability — and hands off to WhatsApp (with the question pre-filled) for
 * anything better handled by a person. Sits above the WhatsApp button.
 */

interface BotMsg {
  id: string;
  role: "bot";
  answer: AssistantAnswer;
}
interface UserMsg {
  id: string;
  role: "user";
  text: string;
}
type Msg = BotMsg | UserMsg;

let seq = 0;
const nextId = () => `m${++seq}`;

const toneClasses: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
  red: "bg-rose-100 text-rose-800 ring-rose-200",
};

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const snapRef = useRef<AvailabilitySnapshot>(seedAvailability());
  const fetchedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Pull the live availability snapshot the first time the panel opens.
  const ensureSnapshot = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    try {
      const res = await fetch("/api/availability", { cache: "no-store" });
      if (res.ok) snapRef.current = (await res.json()) as AvailabilitySnapshot;
    } catch {
      /* keep the seed snapshot — the assistant still works */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    ensureSnapshot();
    if (!greeted) {
      setGreeted(true);
      setMessages([
        { id: nextId(), role: "bot", answer: buildAnswer("hi", snapRef.current) },
      ]);
    }
    // Focus the input shortly after the open animation.
    const t = setTimeout(() => inputRef.current?.focus(), 180);
    return () => clearTimeout(t);
  }, [open, greeted, ensureSnapshot]);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q) return;
      setInput("");
      setMessages((m) => [...m, { id: nextId(), role: "user", text: q }]);
      await ensureSnapshot();
      setTyping(true);
      // A brief, honest "thinking" beat — this is instant, not a fake wait.
      window.setTimeout(() => {
        const a = buildAnswer(q, snapRef.current);
        setMessages((m) => [...m, { id: nextId(), role: "bot", answer: a }]);
        setTyping(false);
      }, 280);
    },
    [ensureSnapshot],
  );

  const onSuggestion = (label: string) => send(SUGGESTION_QUERIES[label] ?? label);

  return (
    <>
      {/* Launcher — sits just above the WhatsApp button. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the Riwaq assistant"
          className="group fixed bottom-[5.75rem] right-5 z-40 flex items-center gap-2 rounded-full bg-forest-700 px-4 py-3 text-ivory shadow-[0_10px_26px_rgba(18,48,41,0.35)] ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:bg-forest-800 sm:bottom-[6.75rem] sm:right-7"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Icon name="sparkle" size={20} className="shrink-0" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            Ask us
          </span>
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse rounded-full bg-brass-400 ring-2 ring-ivory"
          />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Riwaq assistant"
          className="fixed bottom-4 right-4 z-[60] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-ivory shadow-2xl ring-1 ring-black/5 sm:bottom-6 sm:right-6 asst-in"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-gradient-to-br from-forest-700 to-forest-900 px-4 py-3 text-ivory">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
              <Icon name="sparkle" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">Riwaq assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-ivory/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Answers instantly · here to help
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-full p-1.5 text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory"
            >
              <CloseIcon />
            </button>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
            {messages.map((m) =>
              m.role === "user" ? (
                <UserBubble key={m.id} text={m.text} />
              ) : (
                <BotBubble key={m.id} answer={m.answer} onSuggestion={onSuggestion} />
              ),
            )}
            {typing && <TypingBubble />}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-forest-900/10 bg-white px-3 py-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about seats, pricing, location…"
              aria-label="Message the assistant"
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-forest-900 placeholder:text-ink-muted/70 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-700 text-ivory transition-colors hover:bg-forest-800 disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[82%] rounded-2xl rounded-br-md bg-forest-700 px-3.5 py-2 text-sm text-ivory shadow-sm">
        {text}
      </p>
    </div>
  );
}

function BotBubble({
  answer,
  onSuggestion,
}: {
  answer: AssistantAnswer;
  onSuggestion: (label: string) => void;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[88%] space-y-2 rounded-2xl rounded-bl-md border border-forest-900/10 bg-white px-3.5 py-2.5 text-sm text-forest-900 shadow-sm">
        {answer.text.map((p, i) => (
          <p key={i} className="whitespace-pre-line leading-relaxed">
            {p}
          </p>
        ))}

        {answer.rooms && answer.rooms.length > 0 && (
          <ul className="mt-1 space-y-1.5">
            {answer.rooms.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-2 rounded-xl bg-forest-50 px-2.5 py-1.5"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-forest-900">
                    {r.name}
                  </span>
                  <span className="block text-[11px] text-ink-muted">
                    {r.price}
                    {r.note ? ` · ${r.note}` : ""}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
                    toneClasses[statusTone(r.status)],
                  )}
                >
                  {typeof r.bedsAvailable === "number"
                    ? `${r.bedsAvailable} bed${r.bedsAvailable === 1 ? "" : "s"}`
                    : r.statusText}
                </span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={whatsappLink(answer.whatsapp.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#1cae52] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#189a49]"
        >
          <Icon name="whatsapp" size={14} />
          {answer.whatsapp.label}
        </a>
      </div>

      {answer.suggestions && answer.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-0.5">
          {answer.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSuggestion(s)}
              className="rounded-full border border-forest-700/25 bg-white px-2.5 py-1 text-[11px] font-medium text-forest-800 transition-colors hover:border-forest-700/50 hover:bg-forest-700/5"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-forest-900/10 bg-white px-3.5 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted/60"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12l16-8-6 16-3-7-7-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Keep the default-suggestion export referenced so tree-shaking keeps parity
// with the engine's canonical list.
export const ASSISTANT_SUGGESTIONS = DEFAULT_SUGGESTIONS;
