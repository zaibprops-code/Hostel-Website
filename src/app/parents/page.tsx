import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { AdmissionChecklist } from "@/components/sections/AdmissionChecklist";
import { parentAssurances, emergencyContacts, nearbyEssentials } from "@/data/parents";
import { site, whatsappLink, telLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "For Parents",
  description:
    "Information for parents of Riwaq residents: how security and supervision work, visitor and payment policies, emergency contacts, and nearby hospitals — everything you need to feel confident.",
  path: "/parents",
});

export default function ParentsPage() {
  return (
    <>
      <PageHero
        breadcrumb="For Parents"
        eyebrow="For parents"
        title="The reassurance you're looking for."
        lede="Sending your son to a new city is a big decision. Here's exactly how we keep residents safe, supervised and supported — and how to reach us any time."
      />

      {/* Assurances */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Your concerns, answered"
          title="What matters most to you, handled properly."
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parentAssurances.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-forest-900/8 bg-white p-6"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                <Icon name={a.icon} size={24} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-forest-800">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Emergency contacts */}
      <Section className="bg-forest-900 text-ivory">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Emergency & essential contacts"
              title={
                <span className="text-ivory">
                  If something happens, you know exactly who to call.
                </span>
              }
              lede={
                <span className="text-ivory/75">
                  Keep these handy. Our front desk is staffed around the clock,
                  and these national services cover Islamabad.
                </span>
              }
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {emergencyContacts.map((c) => {
              const inner = (
                <>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ivory/10 text-brass-300">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-ivory/70">{c.label}</p>
                    <p className="font-semibold text-ivory">{c.value}</p>
                  </div>
                </>
              );
              return (
                <li key={c.id}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-4 transition-colors hover:border-brass-300/50 hover:bg-ivory/10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-4">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Nearby essentials */}
      <Section className="bg-sand">
        <SectionHeading
          eyebrow="The neighbourhood"
          title="Everything your son needs is close by."
          lede="Universities, healthcare, daily shopping and transport — all within a short reach of the hostel."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nearbyEssentials.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-forest-900/8 bg-white p-6"
            >
              <h3 className="flex items-center gap-2.5 font-semibold text-forest-800">
                <Icon name={group.icon} size={20} className="text-brass-500" />
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.places.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-ink-soft">{p.name}</span>
                    <span className="shrink-0 font-medium text-ink-muted">
                      {p.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Admission checklist */}
      <Section id="admission">
        <SectionHeading
          eyebrow="Getting settled"
          title="How admission works, start to finish."
          lede="A clear checklist so move-in day is smooth and there are no last-minute surprises."
        />
        <div className="mt-12">
          <AdmissionChecklist />
        </div>
      </Section>

      {/* Talk to us */}
      <Section className="bg-sand">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-forest-900/10 bg-white p-8 text-center sm:p-12">
          <h2 className="text-display text-2xl text-forest-800 sm:text-3xl">
            Would you like to speak with us directly?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-soft">
            We&apos;re always happy to talk parents through everything — the
            hostel, the arrangement, and any concern you have. Reach us any time.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              href={whatsappLink("As a parent, I'd like to ask about Riwaq Hostels.")}
              variant="brass"
              size="lg"
              external
            >
              <Icon name="whatsapp" size={18} />
              Message us
            </Button>
            <Button href={telLink()} variant="secondary" size="lg" external>
              <Icon name="phone" size={18} />
              {site.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
