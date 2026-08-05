import type { RoomType } from "@/types";
import { Frame } from "./Frame";
import { Icon } from "./Icon";
import { Badge, AvailabilityBadge } from "./Badge";
import { Button } from "./Button";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";

export function RoomCard({
  room,
  className,
}: {
  room: RoomType;
  className?: string;
}) {
  return (
    <article
      data-reveal
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative">
        <Frame
          asset={room.image}
          rounded="rounded-none"
          ratio="aspect-[4/3]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {room.popular && (
            <Badge tone="brass">
              <Icon name="sparkle" size={12} /> Most popular
            </Badge>
          )}
          <AvailabilityBadge state={room.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-display text-xl text-forest-800">{room.name}</h3>
          <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
            <Icon name="users" size={16} className="text-brass-500" />
            {room.occupancyLabel}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {room.description}
        </p>

        <ul className="mt-5 space-y-2">
          {room.amenities.slice(0, 4).map((a) => (
            <li
              key={a}
              className="flex items-center gap-2 text-sm text-ink-soft"
            >
              <Icon name="check" size={15} className="shrink-0 text-forest-500" />
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-forest-900/8 pt-5">
          <p className="text-sm text-ink-muted">Pricing on enquiry</p>
          <Button
            href={whatsappLink(
              `Hi Riwaq — I'm interested in the ${room.name} (${room.occupancyLabel}). Is a bed available, and what's the rent?`,
            )}
            variant="secondary"
            size="sm"
            external
            aria-label={`Enquire about ${room.name}`}
          >
            Enquire
          </Button>
        </div>
      </div>
    </article>
  );
}
