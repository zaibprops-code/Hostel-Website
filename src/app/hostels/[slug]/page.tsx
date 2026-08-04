import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { getFacilities } from "@/data/facilities";
import { flagshipBranch } from "@/data/branches";
import { landingPages, getLandingPage, getLandingSlugs } from "@/data/landing";
import { whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return pageMeta({ title: "Not found", path: `/hostels/${slug}` });
  return {
    ...pageMeta({
      title: page.metaTitle,
      description: page.metaDescription,
      path: `/hostels/${slug}`,
    }),
    keywords: page.keywords,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const facilities = getFacilities(flagshipBranch.facilityIds);
  const others = landingPages.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        breadcrumb={page.h1}
        path={`/hostels/${slug}`}
        eyebrow={page.eyebrow}
        title={page.h1}
        lede={page.intro}
      />

      {/* Highlight + intro CTA */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-display text-2xl text-forest-800">
                  {s.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-forest-900/10 bg-sand p-8 lg:sticky lg:top-28">
            {page.stat && (
              <div className="text-center">
                <p className="text-display text-5xl text-forest-800">
                  {page.stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{page.stat.label}</p>
              </div>
            )}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                href={whatsappLink(
                  `Hi Riwaq — I found you searching "${page.query}". Is a bed available?`,
                )}
                variant="brass"
                external
              >
                <Icon name="whatsapp" size={18} />
                Book on WhatsApp
              </Button>
              <Button href="/rooms" variant="secondary">
                See rooms &amp; pricing
              </Button>
              <Button href="/contact" variant="ghost">
                Arrange a visit
              </Button>
            </div>
            <p className="mt-5 flex items-start gap-2 text-sm text-ink-soft">
              <Icon name="location" size={16} className="mt-0.5 shrink-0 text-brass-500" />
              {flagshipBranch.address}
            </p>
          </aside>
        </div>
      </Section>

      {/* Facilities */}
      <Section className="bg-sand">
        <SectionHeading
          eyebrow="What's included"
          title="Everything taken care of, in one rent."
          lede="The facilities every Riwaq resident gets — done properly."
        />
        <div className="mt-10">
          <FacilityGrid facilities={facilities} columns={4} variant="compact" />
        </div>
      </Section>

      {/* Internal links to sibling landing pages (SEO + navigation) */}
      <Section>
        <SectionHeading eyebrow="Also searching for" title="Explore more" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/hostels/${p.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-brass-200 hover:shadow-md"
            >
              <span className="font-medium text-forest-800">{p.h1}</span>
              <span className="text-brass-500 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
