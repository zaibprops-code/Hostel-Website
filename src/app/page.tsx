import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { RoomsPreview } from "@/components/sections/RoomsPreview";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { LocationCTA } from "@/components/sections/LocationCTA";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { reviewsJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(reviewsJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())}
      />
      <Hero />
      <TrustBar />
      <AnnouncementBar />
      <AboutIntro />
      <LifestyleSection />
      <RoomsPreview />
      <FacilitiesSection />
      <GalleryPreview />
      <ReviewsSection />
      <FaqPreview />
      <LocationCTA />
      <ClosingCTA />
    </>
  );
}
