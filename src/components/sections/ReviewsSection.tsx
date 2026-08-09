import { Section, SectionHeading } from "@/components/ui/Section";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { reviews, averageRating, reviewCount } from "@/data/reviews";

export function ReviewsSection() {
  return (
    <Section id="reviews" className="bg-sand">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Reviews"
            title="Trusted by residents and their parents."
            lede="We'd rather let the people who actually live here do the talking. Here's what residents — and the families who send them — say about Riwaq."
          />
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-forest-900/10 bg-white px-5 py-4">
            <span className="text-display text-4xl text-forest-800">
              {averageRating}
            </span>
            <div>
              <Stars rating={averageRating} size={18} />
              <p className="mt-1 text-sm text-ink-muted">
                Average from {reviewCount} residents
              </p>
            </div>
          </div>
        </div>

        <div data-reveal-group className="columns-1 gap-6 sm:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {reviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </Section>
  );
}
