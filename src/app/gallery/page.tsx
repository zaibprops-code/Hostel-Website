import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryExplorer } from "@/components/sections/GalleryExplorer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Photo Gallery",
  description:
    "Take a look inside Riwaq Boys Hostel — bright rooms, calm common areas, clean washrooms and a well-kept building in G-11, Islamabad.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Gallery"
        path="/gallery"
        eyebrow="Gallery"
        title="See it before you visit."
        lede="A real look at the rooms, the common spaces and the building. No stock photos — this is exactly what you'll walk into."
      />
      <Section>
        <GalleryExplorer />
      </Section>
      <ClosingCTA />
    </>
  );
}
