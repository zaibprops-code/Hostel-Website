import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { site, telLink, whatsappTo } from "@/data/site";
import { flagshipBranch, branches } from "@/data/branches";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Booking",
  description:
    "Contact Riwaq Hostels — book a bed or arrange a visit at any branch. Reach us on WhatsApp or by phone, or go straight to the branch you're interested in.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        path="/contact"
        eyebrow="Contact & booking"
        title="Let's find you a room."
        lede="Booking a bed is simple — send us a message with what you're looking for and we'll take it from there. Prefer to see it first? Arrange a visit any day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: contact details */}
          <div>
            <SectionHeading
              eyebrow="Reach us"
              title="However suits you best."
              as="h2"
            />
            <div className="mt-8 space-y-4">
              {site.contacts.map((c) => (
                <div
                  key={c.phone}
                  className="rounded-2xl border border-forest-900/10 bg-white p-5"
                >
                  <p className="font-semibold text-forest-800">{c.name}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-brass-600">
                    {c.role}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={whatsappTo(
                        c.whatsapp,
                        "Hi Riwaq — I'd like to ask about availability.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      <Icon name="whatsapp" size={16} />
                      WhatsApp
                    </a>
                    <a
                      href={telLink(c.phone)}
                      className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-4 py-2.5 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-700/5"
                    >
                      <Icon name="phone" size={16} className="text-brass-500" />
                      {c.phoneDisplay}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="mt-8 rounded-2xl border border-forest-900/10 bg-sand p-6">
              <div className="flex items-start gap-3">
                <Icon name="location" size={20} className="mt-0.5 shrink-0 text-brass-500" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-brass-600">
                    Flagship branch
                  </p>
                  <p className="font-semibold text-forest-800">
                    {flagshipBranch.name}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {flagshipBranch.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: enquiry form */}
          <div>
            <SectionHeading
              eyebrow="Booking enquiry"
              title="Send us the details."
              lede="Tell us who you are and what you need — we'll confirm availability and next steps."
              as="h2"
            />
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Reach a specific branch */}
      <Section className="bg-sand">
        <SectionHeading
          eyebrow="By location"
          title="Reach a specific branch."
          lede="Each Riwaq branch has its own front desk. Go straight to the one you're interested in."
          as="h2"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => {
            const open = b.status === "open";
            return (
              <div
                key={b.id}
                className="flex flex-col rounded-2xl border border-forest-900/10 bg-white p-6"
              >
                <div className="flex items-center gap-2">
                  <Badge tone={open ? "emerald" : "brass"}>
                    {open ? "Open now" : "Opening soon"}
                  </Badge>
                  <Badge tone="neutral">
                    <Icon name="location" size={13} /> {b.area}
                  </Badge>
                </div>
                <h3 className="mt-4 font-semibold text-forest-800">{b.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{b.address}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href={`/branches/${b.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-4 py-2 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-700/5"
                  >
                    View branch
                  </Link>
                  <a
                    href={whatsappTo(
                      b.whatsapp,
                      open
                        ? `Hi Riwaq — I'd like to ask about ${b.name}.`
                        : `Hi Riwaq — please add me to the waitlist for ${b.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    <Icon name="whatsapp" size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Map */}
      <Section className="bg-sand" contained={false}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Find us"
            title="In the heart of E-11/2, Islamabad."
            as="h2"
          />
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
          <MapEmbed
            src={flagshipBranch.mapEmbedUrl}
            title={`Map showing ${flagshipBranch.name}`}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {flagshipBranch.nearby.map((n) => (
              <span
                key={n.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3 py-1.5 text-sm text-forest-800"
              >
                {n.name}
                <span className="text-ink-muted">· {n.distance}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
