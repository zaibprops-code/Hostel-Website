import Link from "next/link";
import type { Branch } from "@/types";
import { Frame } from "./Frame";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { formatPrice } from "@/data/rooms";
import { cn } from "@/lib/cn";

const statusBadge = {
  open: { tone: "emerald" as const, label: "Open now" },
  "opening-soon": { tone: "brass" as const, label: "Opening soon" },
  waitlist: { tone: "amber" as const, label: "Waitlist open" },
};

const genderLabel = { boys: "Boys", girls: "Girls", "co-ed": "Co-ed" };

export function BranchCard({ branch }: { branch: Branch }) {
  const status = statusBadge[branch.status];
  const cover =
    branch.gallery[0] ?? {
      src: "/placeholder",
      alt: branch.name,
      tone: branch.gender === "girls" ? ("brass" as const) : ("forest" as const),
    };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Frame
          asset={cover}
          rounded="rounded-none"
          ratio="aspect-[16/10]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone={status.tone}>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                branch.status === "open" ? "bg-emerald-500" : "bg-brass-500",
              )}
            />
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brass-600">
          <Icon name="users" size={14} />
          {genderLabel[branch.gender]} · {branch.area}
        </div>
        <h3 className="mt-2 text-display text-xl text-forest-800">
          {branch.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {branch.tagline}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-ink-soft">
          <Icon name="location" size={16} className="text-brass-500" />
          {branch.city}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-forest-900/8 pt-5">
          <div>
            <p className="text-xs text-ink-muted">From</p>
            <p className="text-lg font-semibold text-forest-800">
              {formatPrice(branch.priceFrom, branch.currency)}
              <span className="text-xs font-normal text-ink-muted"> /mo</span>
            </p>
          </div>
          <Link
            href={`/branches/${branch.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-forest-700/25 px-4 py-2 text-sm font-medium text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-700/5"
          >
            {branch.status === "open" ? "View branch" : "Join waitlist"}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
