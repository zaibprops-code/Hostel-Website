import { Section, SectionHeading } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types";

/**
 * Sell the experience, not just the room. A calm, editorial look at what daily
 * life actually feels like at Riwaq.
 */
const aspects: { icon: IconName; title: string; body: string }[] = [
  { icon: "study", title: "Room to focus", body: "Quiet study spaces and proper desks for the work that matters." },
  { icon: "lounge", title: "People to belong with", body: "A community that's social when you want it, calm when you don't." },
  { icon: "leaf", title: "Space to breathe", body: "Green surroundings, a rooftop for evening chai, and room to unwind." },
  { icon: "heating", title: "Comfortable in every season", body: "Furnished rooms kept warm through winter and cool through summer." },
];

export function LifestyleSection() {
  return (
    <Section id="lifestyle">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Life at Riwaq"
            title="More than a room — a way to live well while you study."
            lede="The best years of study deserve a home that supports them. Riwaq is designed so the everyday feels easy, safe and genuinely pleasant."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {aspects.map((a) => (
              <div key={a.title} className="flex gap-3.5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                  <Icon name={a.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-semibold text-forest-800">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image collage */}
        <div className="grid grid-cols-2 gap-4">
          <Frame
            asset={{ src: "/images/life/study.svg", alt: "A resident studying", tone: "sand" }}
            ratio="aspect-[3/4]"
            rounded="rounded-2xl"
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="mt-8 shadow-md"
          />
          <Frame
            asset={{ src: "/images/life/lounge.svg", alt: "Residents in the lounge", tone: "forest" }}
            ratio="aspect-[3/4]"
            rounded="rounded-2xl"
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="shadow-md"
          />
        </div>
      </div>
    </Section>
  );
}
