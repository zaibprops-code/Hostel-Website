import Image from "next/image";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/cn";

/**
 * The single image surface used across the site.
 *
 * Real photography is the goal — drop a raster (.jpg/.png/.webp) at the
 * asset's `src` and this renders an optimised next/image. Until then it
 * draws a tasteful generated placeholder (a soft gradient with the Riwaq
 * arch motif) so the layout reads as premium and finished, never "broken
 * image". No design work is thrown away when the photos arrive.
 */

const RASTER = /\.(jpe?g|png|webp|avif)$/i;

const tones = {
  forest: {
    from: "#163a30",
    to: "#2f6350",
    arch: "#d7ba70",
    label: "#eef4f1",
  },
  brass: {
    from: "#7c552a",
    to: "#c9a24b",
    arch: "#faf6ec",
    label: "#faf6ec",
  },
  sand: {
    from: "#e7ded0",
    to: "#f2ece0",
    arch: "#b8934a",
    label: "#45423b",
  },
  night: {
    from: "#0e2721",
    to: "#123a30",
    arch: "#c9a24b",
    label: "#d6e5de",
  },
} as const;

export function Frame({
  asset,
  className,
  imgClassName,
  rounded = "rounded-2xl",
  priority,
  sizes = "100vw",
  ratio,
}: {
  asset: ImageAsset;
  className?: string;
  /** Extra classes on the <img> itself — e.g. object-position for cropping. */
  imgClassName?: string;
  rounded?: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
}) {
  const isReal = RASTER.test(asset.src);
  const tone = tones[asset.tone ?? "forest"];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-stone",
        rounded,
        ratio,
        className,
      )}
    >
      {isReal ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <ArchPlaceholder tone={tone} label={asset.alt} />
      )}
    </div>
  );
}

function ArchPlaceholder({
  tone,
  label,
}: {
  tone: (typeof tones)[keyof typeof tones];
  label: string;
}) {
  return (
    <div className="absolute inset-0" role="img" aria-label={label}>
      <svg
        className="h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${tone.from}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={tone.from} />
            <stop offset="1" stopColor={tone.to} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${tone.from})`} />
        {/* Riwaq arcade — a row of arches */}
        <g
          fill="none"
          stroke={tone.arch}
          strokeWidth="2"
          opacity="0.35"
        >
          {[70, 160, 250, 340].map((x) => (
            <path
              key={x}
              d={`M${x - 34} 240 V150 a34 34 0 0 1 68 0 V240`}
            />
          ))}
          <line x1="20" y1="240" x2="380" y2="240" />
        </g>
        <circle cx="330" cy="70" r="26" fill={tone.arch} opacity="0.18" />
      </svg>
    </div>
  );
}
