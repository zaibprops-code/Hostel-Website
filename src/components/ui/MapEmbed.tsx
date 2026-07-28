import { Icon } from "./Icon";
import { primaryBranch } from "@/data/branches";

/**
 * Google Maps embed with a graceful, on-brand fallback. Lazy-loaded so it
 * never blocks the page, and it degrades to a "get directions" link if no
 * embed URL is configured for a branch yet.
 */
export function MapEmbed({
  src,
  title,
}: {
  src?: string;
  title: string;
}) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    primaryBranch.address,
  )}`;

  if (!src) {
    return (
      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-forest-900/10 bg-forest-50 text-forest-700 transition-colors hover:bg-forest-100"
      >
        <Icon name="location" size={32} className="text-brass-500" />
        <span className="font-medium">Open in Google Maps</span>
      </a>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-forest-900/10 shadow-lg">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full grayscale-[0.15]"
        allowFullScreen
      />
    </div>
  );
}
