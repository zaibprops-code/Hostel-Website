import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { faqs } from "@/data/faqs";
import { whatsappLink } from "@/data/site";

export function FaqPreview() {
  const top = faqs.slice(0, 6);

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered."
            lede="The things people usually ask before they move in. Can't find yours? We're a message away."
          />
          <div className="mt-8 rounded-2xl border border-forest-900/10 bg-forest-50 p-6">
            <p className="font-semibold text-forest-800">Still deciding?</p>
            <p className="mt-1 text-sm text-ink-soft">
              Ask us anything — or arrange a visit to see it for yourself.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                href={whatsappLink("Hi Riwaq — I have a quick question.")}
                variant="brass"
                size="sm"
                external
              >
                <Icon name="whatsapp" size={16} />
                Ask on WhatsApp
              </Button>
              <Button href="/faq" variant="secondary" size="sm">
                All FAQs
              </Button>
            </div>
          </div>
        </div>

        <FaqAccordion items={top} />
      </div>
    </Section>
  );
}
