import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { site, whatsappLink, telLink } from "@/data/site";
import { flagshipBranch } from "@/data/branches";

export function LocationCTA() {
  return (
    <Section id="location" className="bg-sand">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Find us"
            title="Well-placed for campus and the city."
            lede="Set in the quiet, green surroundings of E-11/2, we're a short commute from NUST, FAST and the western universities."
          />

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <Icon name="location" size={20} className="mt-0.5 shrink-0 text-brass-500" />
              <span className="text-ink-soft">{flagshipBranch.address}</span>
            </li>
          </ul>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
              Nearby
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={whatsappLink("Hi Riwaq — I'd like to arrange a visit.")} variant="primary" external>
              <Icon name="whatsapp" size={18} />
              Arrange a visit
            </Button>
            <Button href={telLink()} variant="secondary" external>
              <Icon name="phone" size={18} />
              {site.contact.phoneDisplay}
            </Button>
          </div>
        </div>

        <MapEmbed
          src={flagshipBranch.mapEmbedUrl}
          title={`Map showing ${flagshipBranch.name}`}
        />
      </div>
    </Section>
  );
}
