import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function Stars({
  rating = 5,
  size = 16,
  className,
}: {
  rating?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5 text-brass-400", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          className={i < Math.round(rating) ? "fill-brass-400" : "text-stone"}
        />
      ))}
    </div>
  );
}
