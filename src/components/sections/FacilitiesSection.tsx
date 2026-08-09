import { Section, SectionHeading } from "@/components/ui/Section";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { Button } from "@/components/ui/Button";
import { getFacilities } from "@/data/facilities";
import { flagshipBranch } from "@/data/branches";

// Derived from the live branch's actual facilities, minus the few already shown
// in the trust strip above — so the homepage reflects what this branch really
// offers and never repeats the same item twice. Each branch drives its own list.
const trustStripIds = ["cctv", "wifi", "housekeeping", "laundry"];
const homeFacilities = getFacilities(
  flagshipBranch.facilityIds.filter((id) => !trustStripIds.includes(id)),
).slice(0, 6);

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
