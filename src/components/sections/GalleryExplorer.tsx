"use client";

import { useState } from "react";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { gallery, galleryCategories } from "@/data/gallery";
import type { GalleryCategory } from "@/types";
import { cn } from "@/lib/cn";

type Filter = "all" | GalleryCategory;

export function GalleryExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const items =
    filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...galleryCategories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-forest-700 text-ivory"
                  : "border border-forest-900/12 bg-white text-ink-soft hover:border-forest-700/40 hover:text-forest-800",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <GalleryGrid items={items} feature={filter === "all"} />

      {items.length === 0 && (
        <p className="py-16 text-center text-ink-muted">
          Photos for this category are coming soon.
        </p>
      )}
    </div>
  );
}
