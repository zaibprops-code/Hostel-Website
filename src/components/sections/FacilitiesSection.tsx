import { Section, SectionHeading } from "@/components/ui/Section";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { Button } from "@/components/ui/Button";
import { featuredFacilities } from "@/data/facilities";

export function FacilitiesSection() {
  return (
    <Section id="facilities">
      <SectionHeading
        align="center"
        eyebrow="Facilities"
        title="Everything you need, already taken care of."
        lede="The essentials done properly — the things that quietly make daily life easier, safer and more comfortable."
        className="mx-auto"
      />

      <div className="mt-12">
        <FacilityGrid facilities={featuredFacilities} columns={3} />
      </div>

      <div className="mt-10 text-center">
        <Button href="/facilities" variant="secondary">
          See all facilities
        </Button>
      </div>
    </Section>
  );
}
