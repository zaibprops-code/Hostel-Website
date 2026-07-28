import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { tourStops } from "@/data/tour";
import { whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMeta({
  title: "Virtual Tour",
  description:
    "Take a virtual walkthrough of Riwaq Boys Hostel — the entrance, rooms, lounge, study room, kitchen and rooftop, before you visit in person.",
  path: "/tour",
});

export default function TourPage() {
  return (
    <>
      <PageHero
        breadcrumb="Virtual Tour"
        eyebrow="Virtual tour"
        title="Walk through Riwaq from wherever you are."
        lede="Choosing a hostel without visiting? Take the tour. Here's the whole place, in the order you'd see it on arrival — with video and 360° views rolling out room by room."
      />

      <Section>
        <div className="space-y-16 sm:space-y-24">
          {tourStops.map((stop, i) => (
            <div
              key={stop.id}
              className={cn(
                "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14",
              )}
            >
              <div className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <Frame
                  asset={stop.image}
                  ratio="aspect-[4/3]"
                  rounded="rounded-[1.75rem]"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="shadow-xl"
                />
                {/* Media affordances */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {stop.hasVideo && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-3 py-1.5 text-xs font-semibold text-forest-800 shadow">
                      <Icon name="check" size={13} className="text-brass-500" />
                      Video soon
                    </span>
                  )}
                  {stop.has360 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-3 py-1.5 text-xs font-semibold text-forest-800 shadow">
                      360° soon
                    </span>
                  )}
                </div>
              </div>

              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <p className="eyebrow text-brass-600">
                  Stop {String(i + 1).padStart(2, "0")} / {String(tourStops.length).padStart(2, "0")}
                </p>
                <h2 className="text-display mt-3 text-2xl text-forest-800 sm:text-3xl">
                  {stop.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  {stop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* In-person nudge */}
      <Section className="bg-sand">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="brass">
            <Icon name="sparkle" size={13} /> Nothing beats seeing it
          </Badge>
          <SectionHeading
            align="center"
            title="Prefer to visit in person?"
            lede="You're always welcome to come and see it for yourself. Arrange a visit any day between 9:00 AM and 9:00 PM."
            className="mx-auto mt-4"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href={whatsappLink("Hi Riwaq — I'd like to arrange a visit after the virtual tour.")}
              variant="brass"
              size="lg"
              external
            >
              <Icon name="whatsapp" size={18} />
              Arrange a visit
            </Button>
            <Button href="/gallery" variant="secondary" size="lg">
              See the gallery
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
