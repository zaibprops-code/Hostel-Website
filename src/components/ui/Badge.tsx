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

/** Maps a room/branch availability state to a labelled dot badge. */
export function AvailabilityBadge({
  state,
}: {
  state?: "available" | "limited" | "waitlist";
}) {
  if (!state) return null;
  const config = {
    available: { tone: "emerald" as const, label: "Beds available", dot: "bg-emerald-500" },
    limited: { tone: "amber" as const, label: "Limited beds", dot: "bg-amber-500" },
    waitlist: { tone: "neutral" as const, label: "Waitlist", dot: "bg-ink-muted" },
  }[state];
  return (
    <Badge tone={config.tone}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </Badge>
  );
}
