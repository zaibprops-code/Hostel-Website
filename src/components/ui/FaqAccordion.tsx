"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/cn";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-forest-900/10 rounded-2xl border border-forest-900/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-base font-medium text-forest-800 sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest-900/15 text-forest-700 transition-transform duration-300",
                    isOpen && "rotate-45 border-brass-400 bg-brass-50 text-brass-600",
                  )}
                  aria-hidden="true"
                >
                  <span className="absolute h-3 w-px bg-current" />
                  <span className="absolute h-px w-3 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-ink-soft sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
