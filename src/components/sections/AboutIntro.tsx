import { Section, SectionHeading } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Counter } from "@/components/ui/Counter";
import { brandStats } from "@/data/site";
import type { IconName } from "@/types";

const pillars: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "cctv",
    title: "Safe, and it shows",
    body: "Controlled entry and CCTV throughout, with the manager on site — the kind of security that lets parents relax.",
  },
  {
    icon: "sparkle",
    title: "Genuinely clean",
    body: "Daily housekeeping and spotless washrooms. We hold the standard so you never have to.",
  },
  {
    icon: "check",
    title: "Honest and transparent",
    body: "Clear monthly pricing and no hidden charges. What you're shown on the tour is exactly what you move into.",
  },
];

export function AboutIntro() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1">
          <Frame
            asset={{
              src: "/images/about.svg",
              alt: "Residents relaxing in the Riwaq common lounge",
              tone: "forest",
            }}
            ratio="aspect-[5/4]"
            rounded="rounded-[2rem]"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="shadow-xl"
          />
          <div className="absolute -bottom-6 right-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest-900/10 shadow-xl">
            {brandStats.slice(0, 2).map((s) => (
              <div key={s.label} className="bg-ivory px-6 py-4 text-center">
                <p className="text-display text-2xl text-forest-800">
                  <Counter value={s.value} />
                </p>
                <p className="mt-1 text-[0.7rem] leading-tight text-ink-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Who we are"
            title="Accommodation, handled — so you can get on with life."
            lede="Good accommodation in Islamabad shouldn't be this hard to find. Riwaq exists to change that — a genuinely well-run home base, built to a standard we'd want for our own family, so your energy goes where it actually matters."
          />

          <div data-reveal-group className="mt-8 space-y-5">
            {pillars.map((p) => (
              <div key={p.title} data-reveal className="group flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600 transition-colors duration-300 group-hover:bg-brass-100 group-hover:text-brass-600">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-semibold text-forest-800">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button href="/about" variant="secondary">
              Our story & standards
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
