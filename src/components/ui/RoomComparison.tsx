import type { RoomType, RoomSpecValue } from "@/types";
import { comparisonFeatures } from "@/data/rooms";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

/**
 * Side-by-side comparison of room categories. On narrow screens the table
 * scrolls horizontally with the feature column pinned, so the comparison
 * stays readable on a phone without cramming.
 */
export function RoomComparison({ rooms }: { rooms: RoomType[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">Comparison of Riwaq room types</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 bg-white p-4 text-sm font-medium text-ink-muted sm:p-5"
            >
              <span className="sr-only">Feature</span>
            </th>
            {rooms.map((room) => (
              <th
                key={room.id}
                scope="col"
                className={cn(
                  "p-4 align-bottom sm:p-5",
                  room.popular && "bg-forest-50",
                )}
              >
                <span className="block text-display text-lg text-forest-800">
                  {room.name}
                </span>
                {room.popular && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brass-600">
                    <Icon name="sparkle" size={12} /> Most popular
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature) => (
            <tr key={feature.id} className="border-t border-forest-900/8">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white p-4 text-sm font-medium text-forest-800 sm:p-5"
              >
                {feature.label}
              </th>
              {rooms.map((room) => (
                <td
                  key={room.id}
                  className={cn(
                    "p-4 text-sm sm:p-5",
                    room.popular && "bg-forest-50/60",
                  )}
                >
                  <SpecValue value={room.specs?.[feature.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SpecValue({ value }: { value?: RoomSpecValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-forest-700">
        <Icon name="check" size={16} className="text-forest-500" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false || value === undefined) {
    return (
      <span className="text-ink-muted" aria-label="Not included">
        —
      </span>
    );
  }
  if (value === "optional") {
    return <span className="font-medium text-amber-700">Optional</span>;
  }
  return <span className="text-ink-soft">{value}</span>;
}
