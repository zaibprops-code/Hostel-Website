import type { Facility } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function FacilityGrid({
  facilities,
  columns = 3,
  variant = "card",
}: {
  facilities: Facility[];
  columns?: 2 | 3 | 4;
  variant?: "card" | "compact";
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  if (variant === "compact") {
    return (
      <ul className={cn("grid grid-cols-2 gap-3", cols)}>
        {facilities.map((f) => (
          <li
            key={f.id}
            className="flex items-center gap-3 rounded-xl border border-forest-900/8 bg-white/60 px-4 py-3"
          >
            <Icon name={f.icon} size={20} className="shrink-0 text-brass-500" />
            <span className="text-sm font-medium text-forest-800">
              {f.name}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-5", cols)}>
      {facilities.map((f) => (
        <li
          key={f.id}
          className="group rounded-2xl border border-forest-900/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass-200 hover:shadow-lg"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600 transition-colors duration-300 group-hover:bg-brass-100 group-hover:text-brass-600">
            <Icon name={f.icon} size={24} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-forest-800">
            {f.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {f.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
