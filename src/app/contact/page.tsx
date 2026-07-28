import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import {
  site,
  whatsappLink,
  telLink,
  mailLink,
} from "@/data/site";
import { primaryBranch } from "@/data/branches";
import { pageMeta } from "@/lib/seo";
import type { IconName } from "@/types";

export const metadata: Metadata = pageMeta({
  title: "Contact & Booking",
  description:
    "Book a bed or arrange a visit at Riwaq Boys Hostel, G-11 Islamabad. Reach us by WhatsApp, phone or email — the front desk replies within the hour.",
  path: "/contact",
});

const channels: {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  note: string;
}[] = [
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Chat with the front desk",
    href: whatsappLink("Hi Riwaq — I'd like to ask about availability."),
    external: true,
    note: "Fastest — usually a reply within the hour",
  },
  {
    icon: "phone",
    label: "Call us",
    value: site.contact.phoneDisplay,
    href: telLink(),
    external: true,
    note: "Front desk staffed 24/7",
  },
  {
    icon: "mail",
    label: "Email",
    value: site.contact.email,
    href: mailLink("Enquiry from riwaqhostels.com"),
    external: true,
    note: "For detailed questions & documents",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
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
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brass-200 hover:shadow-md"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600 transition-colors group-hover:bg-brass-100 group-hover:text-brass-600">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-forest-800">
                      {c.value}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">{c.note}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address & hours */}
            <div className="mt-8 rounded-2xl border border-forest-900/10 bg-sand p-6">
              <div className="flex items-start gap-3">
                <Icon name="location" size={20} className="mt-0.5 shrink-0 text-brass-500" />
                <div>
                  <p className="font-semibold text-forest-800">
                    {primaryBranch.name}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {primaryBranch.address}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-brass-500" />
                <p className="text-sm text-ink-soft">{site.contact.hours}</p>
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

      {/* Map */}
      <Section className="bg-sand" contained={false}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Find us"
            title="In the heart of G-11, Islamabad."
            as="h2"
          />
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
          <MapEmbed
            src={primaryBranch.mapEmbedUrl}
            title={`Map showing ${primaryBranch.name}`}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {primaryBranch.nearby.map((n) => (
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
