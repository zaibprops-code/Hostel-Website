"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { nearbyEssentials } from "@/data/parents";
import { cn } from "@/lib/cn";

/**
 * An interactive neighbourhood guide: filter the essentials by category and
 * see them beside the map. Deliberately dependency-free — it reads the same
 * structured `nearbyEssentials` data and is ready to upgrade to live map
 * markers (with a maps API key) without changing the data or the layout.
 */
export function NeighbourhoodExplorer({
  mapEmbedUrl,
  mapTitle,
}: {
  mapEmbedUrl?: string;
  mapTitle: string;
}) {
  const categories = ["All", ...nearbyEssentials.map((g) => g.category)];
  const [active, setActive] = useState("All");

  const groups =
    active === "All"
      ? nearbyEssentials
      : nearbyEssentials.filter((g) => g.category === active);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div>
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter nearby places">
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-forest-700 text-ivory"
                    : "border border-forest-900/12 bg-white text-ink-soft hover:border-forest-700/40 hover:text-forest-800",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-brass-600">
                <Icon name={group.icon} size={18} />
                {group.category}
              </h3>
              <ul className="mt-3 divide-y divide-forest-900/8 rounded-2xl border border-forest-900/8 bg-white">
                {group.places.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <span className="flex items-center gap-2.5 text-forest-800">
                      <Icon name="location" size={15} className="text-brass-500" />
                      {p.name}
                    </span>
                    <span className="shrink-0 font-medium text-ink-muted">
                      {p.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <MapEmbed src={mapEmbedUrl} title={mapTitle} />
        <p className="mt-3 text-center text-xs text-ink-muted">
          Approximate travel times by car. Live, interactive markers coming soon.
        </p>
      </div>
    </div>
  );
}
