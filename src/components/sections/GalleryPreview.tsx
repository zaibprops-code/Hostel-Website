import { Section, SectionHeading } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { Button } from "@/components/ui/Button";
import { gallery } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <Section id="gallery" className="bg-forest-900 text-ivory">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Gallery"
          title={<span className="text-ivory">A look inside Riwaq.</span>}
          lede={
            <span className="text-ivory/75">
              Bright rooms, calm common areas and a building that&apos;s cared for.
              What you see on the tour is what you move into.
            </span>
          }
        />
        <Button
          href="/gallery"
          className="shrink-0 self-start border border-ivory/25 bg-transparent text-ivory hover:bg-ivory/10 sm:self-auto"
        >
          View full gallery →
        </Button>
      </div>

      <div className="mt-12">
        <GalleryGrid items={gallery.slice(0, 6)} />
      </div>
    </Section>
  );
}
