import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { announcements } from "@/data/announcements";
import { formatDate } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Updates & Announcements",
  description:
    "The latest from Riwaq Hostels — new availability, facility upgrades, expansion news and seasonal notices.",
  path: "/updates",
});

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Updates"
        eyebrow="Updates & announcements"
        title="What's new at Riwaq."
        lede="Availability, new facilities, expansion news and seasonal notices — the latest, in one place."
      />
      <Section>
        <ol className="mx-auto max-w-3xl space-y-6">
          {announcements.map((a) => (
            <li
              key={a.id}
              className="flex gap-5 rounded-2xl border border-forest-900/8 bg-white p-6"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                <Icon name={a.icon} size={24} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="brass">{a.tag}</Badge>
                  <time dateTime={a.date} className="text-xs text-ink-muted">
                    {formatDate(a.date)}
                  </time>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-forest-800">
                  {a.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {a.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
