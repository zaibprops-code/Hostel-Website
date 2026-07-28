import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RoomCard } from "@/components/ui/RoomCard";
import { RoomComparison } from "@/components/ui/RoomComparison";
import { AvailabilityLegend } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { PricingBreakdown } from "@/components/sections/PricingBreakdown";
import { roomTypes, formatPrice, priceFrom } from "@/data/rooms";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Rooms & Pricing",
  description: `Furnished single, double, triple and quad-sharing rooms in Islamabad from ${formatPrice(priceFrom)}/month. Transparent pricing, no hidden charges.`,
  path: "/rooms",
});

const included = [
  "Furnished bed, mattress & storage",
  "High-speed fibre WiFi",
  "Electricity with backup power",
  "Daily housekeeping of common areas",
  "24/7 security & CCTV",
  "Filtered drinking water",
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Rooms"
        eyebrow="Rooms & pricing"
        title="A room for every budget and every rhythm."
        lede={`From sociable quad-sharing to a private single room — all furnished, all move-in ready. Beds from ${formatPrice(priceFrom)} a month, everything included.`}
      />

      <Section>
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-forest-900/8 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-forest-800">
            Live room availability
          </p>
          <AvailabilityLegend />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Prices are per month and include utilities. A one-time refundable
          security deposit applies. Ask us about semester-length rates.
        </p>
      </Section>

      {/* Comparison */}
      <Section id="compare" className="bg-sand">
        <SectionHeading
          eyebrow="Compare"
          title="Weigh them up side by side."
          lede="Not sure which room fits? Here's how the categories compare on the things that matter most."
        />
        <div className="mt-10">
          <RoomComparison rooms={roomTypes} />
        </div>
      </Section>

      {/* Transparent pricing */}
      <Section id="pricing">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Transparent pricing"
              title="Exactly what you pay for."
              lede="No hidden charges, no surprises after you move in. Here's the full picture — what's monthly, what's one-time, what's already included, and what's optional."
            />
          </div>
          <PricingBreakdown />
        </div>
      </Section>

      {/* What's included */}
      <Section className="bg-sand">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Every room includes"
            title="One simple monthly rent. No surprises."
            lede="We keep pricing honest: utilities, internet, security and housekeeping are all part of the rent. What you pay is what you agreed — nothing bolted on later."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-forest-900/8 bg-white px-4 py-3.5"
              >
                <Icon name="check" size={18} className="shrink-0 text-forest-500" />
                <span className="text-sm font-medium text-forest-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
