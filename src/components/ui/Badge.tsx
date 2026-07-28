import { cn } from "@/lib/cn";

type Tone = "brass" | "forest" | "emerald" | "amber" | "neutral";

const tones: Record<Tone, string> = {
  brass: "bg-brass-100 text-brass-700",
  forest: "bg-forest-100 text-forest-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-800",
  neutral: "bg-stone text-ink-soft",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

import type { Availability } from "@/types";

const availabilityConfig: Record<
  Availability,
  { tone: Tone; label: string; dot: string }
> = {
  available: { tone: "emerald", label: "Beds available", dot: "bg-emerald-500" },
  limited: { tone: "amber", label: "Almost full", dot: "bg-amber-500" },
  waitlist: { tone: "brass", label: "Waitlist", dot: "bg-brass-500" },
  full: { tone: "neutral", label: "Fully occupied", dot: "bg-ink-muted" },
};

/** Maps a room/branch availability state to a labelled dot badge. */
export function AvailabilityBadge({ state }: { state?: Availability }) {
  if (!state) return null;
  const config = availabilityConfig[state];
  return (
    <Badge tone={config.tone}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </Badge>
  );
}

/** A small key explaining each availability state. */
export function AvailabilityLegend() {
  const order: Availability[] = ["available", "limited", "waitlist", "full"];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {order.map((state) => {
        const c = availabilityConfig[state];
        return (
          <span key={state} className="inline-flex items-center gap-2 text-sm text-ink-soft">
            <span className={cn("h-2 w-2 rounded-full", c.dot)} />
            {c.label}
          </span>
        );
      })}
    </div>
  );
}
