import { Section, SectionHeading } from "@/components/ui/Section";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { Button } from "@/components/ui/Button";
import { getFacilities } from "@/data/facilities";

// The safety & connectivity essentials are covered by the trust strip above;
// here we showcase the comfort and community amenities, so the homepage never
// repeats the same list twice.
const homeFacilities = getFacilities([
  "study",
  "lounge",
  "kitchen",
  "prayer",
  "washrooms",
  "ac",
]);

export function FacilitiesSection() {
  return (
    <Section id="facilities">
      <SectionHeading
        align="center"
        eyebrow="Facilities"
        title="Beyond the essentials, real comfort."
        lede="The spaces and touches that make daily life genuinely pleasant — to study, to unwind, and to feel at home."
        className="mx-auto"
      />

      <div className="mt-12">
        <FacilityGrid facilities={homeFacilities} columns={3} />
      </div>

      <div className="mt-10 text-center">
        <Button href="/facilities" variant="secondary">
          See all facilities
        </Button>
      </div>
    </Section>
  );
}
