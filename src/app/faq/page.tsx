import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { faqCategories, faqsByCategory } from "@/data/faqs";
import { whatsappLink } from "@/data/site";
import { faqJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers to the questions people ask before moving into Riwaq Boys Hostel, G-11 Islamabad — WiFi, electricity, food, deposits, security, documents, universities and check-in.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())}
      />
      <PageHero
        breadcrumb="FAQ"
        path="/faq"
        eyebrow="Good to know"
        title="Everything you might want to ask."
        lede="Grouped by topic and kept up to date. If your question isn't here, send us a message — we're quick to reply."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          {/* Category nav */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 text-brass-600">On this page</p>
            <ul className="space-y-1">
              {faqCategories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-forest-50 hover:text-forest-800"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-forest-900/10 bg-forest-50 p-5">
              <p className="font-semibold text-forest-800">Still stuck?</p>
              <p className="mt-1 text-sm text-ink-soft">
                Message us and we&apos;ll answer straight away.
              </p>
              <Button
                href={whatsappLink("Hi Riwaq — I have a question about the hostel.")}
                variant="brass"
                size="sm"
                external
                className="mt-4"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp us
              </Button>
            </div>
          </aside>

          {/* Grouped FAQs */}
          <div className="space-y-14">
            {faqCategories.map((c) => {
              const items = faqsByCategory(c.id);
              if (items.length === 0) return null;
              return (
                <div key={c.id} id={c.id} className="scroll-mt-28">
                  <h2 className="text-display mb-5 text-2xl text-forest-800">
                    {c.label}
                  </h2>
                  <FaqAccordion items={items} defaultOpen={null} />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
