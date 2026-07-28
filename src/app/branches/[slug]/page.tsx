import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RoomCard } from "@/components/ui/RoomCard";
import { FacilityGrid } from "@/components/ui/FacilityGrid";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { NeighbourhoodExplorer } from "@/components/sections/NeighbourhoodExplorer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { branches, getBranch } from "@/data/branches";
import { getRooms, formatPrice } from "@/data/rooms";
import { getFacilities } from "@/data/facilities";
import { whatsappLink, telLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return pageMeta({ title: "Branch not found", path: `/branches/${slug}` });
  return pageMeta({
    title: branch.name,
    description: `${branch.tagline}. ${branch.description}`,
    path: `/branches/${slug}`,
  });
}

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const rooms = getRooms(branch.roomTypeIds);
  const facilities = getFacilities(branch.facilityIds);
  const isOpen = branch.status === "open";

  return (
    <>
      <PageHero
        breadcrumb={branch.shortName}
        eyebrow={isOpen ? "Open now" : "Opening soon"}
        title={branch.name}
        lede={branch.tagline}
      />

      {/* Overview */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isOpen ? "emerald" : "brass"}>
                {isOpen ? "Open now" : "Opening soon"}
              </Badge>
              <Badge tone="neutral">
                <Icon name="location" size={13} /> {branch.area}, {branch.city}
              </Badge>
              <Badge tone="forest">
                From {formatPrice(branch.priceFrom, branch.currency)}/mo
              </Badge>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {branch.description}
            </p>
          </div>

          {/* Contact card */}
          <div className="rounded-2xl border border-forest-900/10 bg-sand p-6">
            <h2 className="font-semibold text-forest-800">
              {isOpen ? "Visit or book" : "Be first in line"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="location" size={18} className="mt-0.5 shrink-0 text-brass-500" />
                <span className="text-ink-soft">{branch.address}</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-2.5">
              <Button
                href={whatsappLink(
                  isOpen
                    ? `Hi Riwaq — I'd like to book a bed at ${branch.name}.`
                    : `Hi Riwaq — please add me to the waitlist for ${branch.name}.`,
                )}
                variant="brass"
                external
              >
                <Icon name="whatsapp" size={18} />
                {isOpen ? "Book on WhatsApp" : "Join the waitlist"}
              </Button>
              {isOpen && (
                <Button href={telLink()} variant="secondary" external>
                  <Icon name="phone" size={18} />
                  Call the front desk
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {!isOpen && (
        <Section className="bg-sand">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-forest-900/10 bg-white p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brass-100 text-brass-600">
              <Icon name="sparkle" size={28} />
            </span>
            <h2 className="text-display mt-5 text-2xl text-forest-800 sm:text-3xl">
              This branch is on its way.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
              We&apos;re preparing {branch.name} to the full Riwaq standard. Join
              the waitlist and we&apos;ll notify you the moment rooms open — before
              they&apos;re listed publicly.
            </p>
            <Button
              href={whatsappLink(`Hi Riwaq — please add me to the waitlist for ${branch.name}.`)}
              variant="brass"
              size="lg"
              external
              className="mt-7"
            >
              <Icon name="whatsapp" size={18} />
              Join the waitlist
            </Button>
          </div>
        </Section>
      )}

      {/* Rooms */}
      {rooms.length > 0 && (
        <Section className={isOpen ? "bg-sand" : undefined}>
          <SectionHeading
            eyebrow="Rooms"
            title={isOpen ? "Rooms at this branch" : "Planned room types"}
            lede={
              isOpen
                ? "Furnished and move-in ready. Enquire about live availability."
                : "The categories we're planning for this branch."
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </Section>
      )}

      {/* Facilities */}
      {facilities.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Facilities"
            title="What's on offer here"
            lede="Every Riwaq branch is built around the same essentials, done properly."
          />
          <div className="mt-10">
            <FacilityGrid facilities={facilities} columns={4} variant="compact" />
          </div>
        </Section>
      )}

      {/* Gallery */}
      {branch.gallery.length > 0 && (
        <Section className="bg-forest-900 text-ivory">
          <SectionHeading
            eyebrow="Gallery"
            title={<span className="text-ivory">A look inside</span>}
          />
          <div className="mt-10">
            <GalleryGrid items={branch.gallery.slice(0, 6)} />
          </div>
        </Section>
      )}

      {/* Neighbourhood */}
      {isOpen && (
        <Section className="bg-sand">
          <SectionHeading
            eyebrow="The neighbourhood"
            title="Explore what's around."
            lede="Universities, healthcare, daily needs and transport — filter to see what matters to you."
          />
          <div className="mt-10">
            <NeighbourhoodExplorer
              mapEmbedUrl={branch.mapEmbedUrl}
              mapTitle={`Map showing ${branch.name}`}
            />
          </div>
        </Section>
      )}

      <ClosingCTA />
    </>
  );
}
