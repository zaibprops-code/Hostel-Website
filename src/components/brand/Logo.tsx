import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

/**
 * The Riwaq wordmark. The mark is a stylised arcade arch — "riwaq" (رواق)
 * is the shaded colonnade of a courtyard: shelter, calm, belonging.
 */
export function Logo({
  className,
  tone = "dark",
  showTagline = false,
  size = "default",
}: {
  className?: string;
  tone?: "dark" | "light";
  showTagline?: boolean;
  /** "lg" is used in the header; "default" everywhere else (e.g. footer). */
  size?: "default" | "lg";
}) {
  const text = tone === "light" ? "text-ivory" : "text-forest-800";
  const sub = tone === "light" ? "text-ivory/70" : "text-ink-muted";
  const lg = size === "lg";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <ArchMark
        className={cn(
          "shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5",
          lg ? "h-12 w-12 sm:h-14 sm:w-14" : "h-9 w-9",
          tone === "light" ? "text-brass-300" : "text-brass-500",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-display font-semibold tracking-tight",
            lg ? "text-[1.7rem] sm:text-[2rem]" : "text-xl",
            text,
          )}
        >
          Riwaq
          <span className={tone === "light" ? "text-brass-300" : "text-brass-500"}>
            .
          </span>
        </span>
        <span
          className={cn(
            "font-semibold uppercase tracking-[0.22em]",
            lg ? "text-[0.72rem] sm:text-[0.8rem]" : "text-[0.62rem]",
            sub,
          )}
        >
          {showTagline ? "Hostels · Islamabad" : "Hostels"}
        </span>
      </span>
    </Link>
  );
}

export function ArchMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        className="fill-forest-700"
      />
      <g stroke="currentColor" strokeWidth="1.8" fill="none">
        <path d="M10 30V19a10 10 0 0 1 20 0v11" />
        <path d="M15 30v-9a5 5 0 0 1 10 0v9" />
      </g>
      <line
        x1="8"
        y1="30.5"
        x2="32"
        y2="30.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
