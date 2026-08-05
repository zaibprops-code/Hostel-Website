import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Resident Reviews",
  description:
    "Read what residents and parents say about living at Riwaq Boys Hostel, E-11/2 Islamabad — safety, cleanliness, facilities and community.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Reviews"
        path="/reviews"
        eyebrow="Reviews"
        title="Don't take our word for it."
        lede="The most honest picture of a hostel comes from the people who live there — and the parents who trust it with their children."
      />

      <Section>
        <div className="mb-12 flex flex-col items-center gap-4 rounded-2xl border border-forest-900/10 bg-sand px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex items-center gap-4">
            <span className="text-display text-5xl text-forest-800">
              {averageRating}
            </span>
            <div className="text-left">
              <Stars rating={averageRating} size={20} />
              <p className="mt-1 text-sm text-ink-muted">
                Based on {reviewCount} verified residents & parents
              </p>
            </div>
          </div>
        </div>

        <div data-reveal-group className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Reviews are from current and former residents. We&apos;re working to
          bring our Google Reviews feed here directly.
        </p>
      </Section>
    </>
  );
}
