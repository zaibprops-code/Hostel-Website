import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TeamSection } from "@/components/sections/TeamSection";
import { brandStats } from "@/data/site";
import { upcomingBranches } from "@/data/branches";
import { pageMeta } from "@/lib/seo";
import type { IconName } from "@/types";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Riwaq Hostels brings secure, spotless, well-run accommodation to Islamabad's students and professionals — built as a brand designed to grow across the city.",
  path: "/about",
});

const values: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Safety first, always",
    body: "Every decision starts with one question: is this safe? Controlled entry, 24/7 staff and CCTV aren't extras — they're the baseline.",
  },
  {
    icon: "sparkle",
    title: "Clean is non-negotiable",
    body: "A hostel lives or dies on cleanliness. Daily housekeeping and maintained washrooms are held to a standard we'd want for ourselves.",
  },
  {
    icon: "check",
    title: "Honest and transparent",
    body: "Clear monthly pricing, no hidden charges, and what you see on the tour is exactly what you move into. Trust is earned in the details.",
  },
  {
    icon: "users",
    title: "People over property",
    body: "Staff who know your name, respond quickly and treat residents like guests. A building is just walls — the care is what makes it home.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who we are"
        title="Building the accommodation Islamabad's students deserve."
        lede="Riwaq began with one hostel and a high standard. The vision is bigger: a trusted hospitality brand, growing branch by branch across the city."
      />

      {/* Story */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Frame
            asset={{
              src: "/images/about-story.svg",
              alt: "The Riwaq common area, warm and welcoming",
              tone: "forest",
            }}
            ratio="aspect-[5/4]"
            rounded="rounded-[2rem]"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="shadow-xl"
          />
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Started with a simple frustration."
              lede="Finding good accommodation in Islamabad shouldn't be this hard. Too many hostels felt unsafe, unclean, or ran on excuses. We built Riwaq to be the opposite — a place we'd be happy for our own family to live in."
            />
            <p className="mt-5 leading-relaxed text-ink-soft">
              The name <em className="text-forest-800">Riwaq</em> (رواق) is the
              shaded arcade of a traditional courtyard — a place of shelter,
              calm and belonging. That&apos;s the feeling we set out to build: a
              home base that&apos;s secure and cared for, so residents can focus
              on their studies, their work and their lives.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Today that&apos;s our flagship boys hostel in G-11. Tomorrow it&apos;s a
              family of branches — more boys hostels, girls hostels and
              executive stays — each held to the exact same standard.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-sand">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title="The standards behind every Riwaq."
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex gap-5 rounded-2xl border border-forest-900/8 bg-white p-6"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                <Icon name={v.icon} size={24} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-forest-800">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid gap-6 rounded-[2rem] bg-forest-800 p-8 text-ivory sm:grid-cols-2 sm:p-12 lg:grid-cols-4">
          {brandStats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-display text-4xl text-brass-300 sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ivory/75">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Meet the team */}
      <TeamSection />

      {/* Roadmap / expansion */}
      <Section className="bg-sand">
        <SectionHeading
          align="center"
          eyebrow="Where we're going"
          title="One hostel today. A trusted chain tomorrow."
          lede="We're growing deliberately — opening each new branch only when it can meet the Riwaq standard. Here's what's on the horizon."
          className="mx-auto"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="relative space-y-8 border-l-2 border-forest-900/10 pl-8">
            <li className="relative">
              <span className="absolute -left-[2.6rem] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Icon name="check" size={14} />
              </span>
              <p className="font-semibold text-forest-800">
                Riwaq Boys Hostel — G-11{" "}
                <span className="text-sm font-normal text-emerald-600">
                  · Open now
                </span>
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Our flagship, full and thriving in the heart of Islamabad.
              </p>
            </li>
            {upcomingBranches.map((b) => (
              <li key={b.id} className="relative">
                <span className="absolute -left-[2.6rem] flex h-6 w-6 items-center justify-center rounded-full border-2 border-brass-400 bg-ivory" />
                <p className="font-semibold text-forest-800">
                  {b.name}{" "}
                  <span className="text-sm font-normal text-brass-600">
                    · Opening soon
                  </span>
                </p>
                <p className="mt-1 text-sm text-ink-soft">{b.tagline}.</p>
              </li>
            ))}
            <li className="relative">
              <span className="absolute -left-[2.6rem] flex h-6 w-6 items-center justify-center rounded-full border-2 border-forest-900/15 bg-ivory" />
              <p className="font-semibold text-forest-800">
                Beyond Islamabad
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                As the brand grows, so does the map — new sectors, and in time,
                new cities.
              </p>
            </li>
          </ol>
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
