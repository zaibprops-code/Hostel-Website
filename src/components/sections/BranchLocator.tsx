"use client";

import { useState } from "react";
import type { Branch, Gender, BranchStatus } from "@/types";
import { BranchCard } from "@/components/ui/BranchCard";
import { cn } from "@/lib/cn";

type GenderFilter = "all" | Gender;
type StatusFilter = "all" | BranchStatus;

/**
 * The branch locator. Built for growth: as Riwaq adds boys, girls, executive
 * and out-of-city branches, visitors filter down to the right one. Works
 * perfectly with a single branch today and scales to dozens.
 */
export function BranchLocator({ branches }: { branches: Branch[] }) {
  const [gender, setGender] = useState<GenderFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const genders: { id: GenderFilter; label: string }[] = [
    { id: "all", label: "All hostels" },
    { id: "boys", label: "Boys" },
    { id: "girls", label: "Girls" },
  ];
  const statuses: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "Any status" },
    { id: "open", label: "Open now" },
    { id: "opening-soon", label: "Opening soon" },
  ];

  const filtered = branches.filter(
    (b) =>
      (gender === "all" || b.gender === gender) &&
      (status === "all" || b.status === status),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterGroup
          label="Type"
          options={genders}
          value={gender}
          onChange={setGender}
        />
        <FilterGroup
          label="Status"
          options={statuses}
          value={status}
          onChange={setStatus}
        />
      </div>

      <div data-reveal-group className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-ink-muted">
          No branches match that yet — try a different filter, or{" "}
          <a href="/contact" className="text-forest-700 underline">
            ask us what&apos;s coming
          </a>
          .
        </p>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-forest-700 text-ivory"
                  : "border border-forest-900/12 bg-white text-ink-soft hover:border-forest-700/40 hover:text-forest-800",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
