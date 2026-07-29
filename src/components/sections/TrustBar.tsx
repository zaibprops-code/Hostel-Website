import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types";

/**
 * A quiet reassurance strip directly under the hero — the promises that
 * matter most, restated the moment a visitor scrolls.
 */
const promises: { icon: IconName; label: string }[] = [
  { icon: "cctv", label: "CCTV security" },
  { icon: "wifi", label: "High-speed WiFi" },
  { icon: "housekeeping", label: "Daily housekeeping" },
  { icon: "laundry", label: "On-site laundry" },
  { icon: "location", label: "Minutes from campus" },
];

export function TrustBar() {
  return (
    <div className="border-y border-forest-900/8 bg-sand">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-6 sm:px-8">
        {promises.map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-2.5 text-sm font-medium text-forest-800"
          >
            <Icon name={p.icon} size={20} className="text-brass-500" />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}
