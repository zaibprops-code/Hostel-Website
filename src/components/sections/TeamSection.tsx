import { Section, SectionHeading } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { team } from "@/data/team";

/**
 * Meet the Team. Seeing the real people responsible for the place — not a
 * faceless "management" — is a genuine trust signal.
 */
export function TeamSection() {
  return (
    <Section id="team">
      <SectionHeading
        align="center"
        eyebrow="Meet the team"
        title="The people who make Riwaq, Riwaq."
        lede="A hostel is only as good as the people running it. Ours are on hand around the clock, and they take real pride in the place."
        className="mx-auto"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <figure
            key={member.id}
            className="overflow-hidden rounded-2xl border border-forest-900/8 bg-white"
          >
            <Frame
              asset={member.image}
              rounded="rounded-none"
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 22vw, 45vw"
            />
            <figcaption className="p-5">
              <p className="font-semibold text-forest-800">{member.name}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-brass-600">
                {member.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {member.bio}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
