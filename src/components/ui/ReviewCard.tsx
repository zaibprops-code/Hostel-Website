import type { Review } from "@/types";
import { Stars } from "./Stars";
import { cn } from "@/lib/cn";

const sourceLabel: Record<NonNullable<Review["source"]>, string> = {
  resident: "Resident",
  google: "Google review",
  parent: "Parent",
};

export function ReviewCard({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <figure
      data-reveal
      className={cn(
        "flex h-full flex-col rounded-2xl border border-forest-900/8 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
        <span className="text-display text-2xl leading-none text-brass-300">“</span>
        {review.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-900/8 pt-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-sm font-semibold text-forest-700">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-forest-800">
            {review.author}
          </p>
          {review.role && (
            <p className="truncate text-xs text-ink-muted">{review.role}</p>
          )}
        </div>
        {review.source && (
          <span className="ml-auto shrink-0 text-[0.65rem] font-medium uppercase tracking-wide text-brass-500">
            {sourceLabel[review.source]}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
