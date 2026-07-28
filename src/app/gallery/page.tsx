import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryExplorer } from "@/components/sections/GalleryExplorer";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Take a look inside Riwaq Hostels — bright rooms, calm common areas, clean washrooms and a well-kept building in E-11/2, Islamabad.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb="Gallery"
        eyebrow="Gallery"
        title="See it before you visit."
        lede="A real look at the rooms, the common spaces and the building. No stock photos — this is exactly what you'll walk into."
      />
      <Section>
        <GalleryExplorer />
      </Section>
    </>
  );
}
