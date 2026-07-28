import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { pricing } from "@/data/booking";
import type { PriceLine } from "@/types";
import { cn } from "@/lib/cn";

const kindBadge: Record<PriceLine["kind"], { label: string; tone: "emerald" | "brass" | "forest" | "neutral" }> = {
  recurring: { label: "Monthly", tone: "forest" },
  "one-time": { label: "One-time", tone: "brass" },
  included: { label: "Included", tone: "emerald" },
  optional: { label: "Optional", tone: "neutral" },
};

/**
 * Transparent pricing. Everything charged, included or optional — stated
 * plainly in one place. This is a trust section as much as a pricing one.
 */
export function PricingBreakdown() {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white">
      <ul className="divide-y divide-forest-900/8">
        {pricing.map((line) => {
          const badge = kindBadge[line.kind];
          return (
            <li
              key={line.id}
              className="flex items-start gap-4 p-5 sm:items-center sm:p-6"
            >
              <span
                className={cn(
                  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  line.kind === "included"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-forest-50 text-forest-600",
                )}
              >
                {line.icon && <Icon name={line.icon} size={22} />}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-semibold text-forest-800">
                    {line.label}
                  </span>
                  <Badge tone={badge.tone}>{badge.label}</Badge>
                </div>
                {line.note && (
                  <p className="mt-0.5 text-sm text-ink-muted">{line.note}</p>
                )}
              </div>

              <span
                className={cn(
                  "shrink-0 text-right font-semibold",
                  line.kind === "included"
                    ? "text-emerald-700"
                    : "text-forest-800",
                )}
              >
                {line.amount}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-forest-900/8 bg-sand px-6 py-4 text-sm text-ink-soft">
        <Icon name="check" size={16} className="mr-1.5 inline text-forest-500" />
        No hidden charges. What you agree to at check-in is what you pay.
      </p>
    </div>
  );
}
