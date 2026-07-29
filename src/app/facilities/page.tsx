import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { getFacilities } from "@/data/facilities";
import { primaryBranch } from "@/data/branches";
import type { Facility } from "@/types";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Facilities",
  description:
    "High-speed WiFi, CCTV security, daily housekeeping, laundry, a shared kitchen, filtered water, parking, AC and heating — the facilities at Riwaq Boys Hostel, E-11/2 Islamabad, done properly.",
  path: "/facilities",
});

const groups: { id: NonNullable<Facility["category"]>; title: string; blurb: string }[] = [
  { id: "essentials", title: "The essentials", blurb: "The things you can't live without — reliable and always on." },
  { id: "safety", title: "Safety & security", blurb: "Peace of mind for you, and for the people who worry about you." },
  { id: "comfort", title: "Comfort & care", blurb: "The details that make daily life easier and more pleasant." },
  { id: "community", title: "Community & focus", blurb: "Space to study, unwind and belong." },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Facilities"
        path="/facilities"
        eyebrow="Facilities"
        title="Everything taken care of, so you don't have to think about it."
        lede="Good accommodation is the sum of small things done right. Here's everything we look after — grouped by what it does for you."
      />

      {groups.map((group, i) => {
        const items = getFacilities(primaryBranch.facilityIds).filter(
          (f) => f.category === group.id,
        );
        if (items.length === 0) return null;
        return (
          <Section key={group.id} className={i % 2 === 1 ? "bg-sand" : undefined}>
            <SectionHeading
              eyebrow={group.title}
              title={group.blurb}
              as="h2"
            />
            <div className="mt-10">
              <FacilityGrid facilities={items} columns={3} />
            </div>
          </Section>
        );
      })}
    </>
  );
}
