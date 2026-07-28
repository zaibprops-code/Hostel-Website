import type { GalleryItem } from "@/types";
import { Frame } from "./Frame";
import { cn } from "@/lib/cn";

/**
 * A responsive mosaic. The first tile spans two columns/rows on larger
 * screens for an editorial, gallery-wall feel without any JS.
 */
export function GalleryGrid({
  items,
  feature = true,
}: {
  items: GalleryItem[];
  feature?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => {
        const big = feature && i === 0;
        return (
          <figure
            key={item.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl",
              big && "col-span-2 row-span-2",
            )}
          >
            <Frame
              asset={item}
              rounded="rounded-2xl"
              ratio={big ? "aspect-square" : "aspect-[4/3]"}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="h-full transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {item.caption && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-ivory">
                  {item.caption}
                </span>
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
