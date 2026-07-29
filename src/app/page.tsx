import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { RoomsPreview } from "@/components/sections/RoomsPreview";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { LocationCTA } from "@/components/sections/LocationCTA";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { reviewsJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Riwaq Boys Hostel Islamabad — Secure Student Accommodation in G-11",
  },
  description:
    "Riwaq Boys Hostel in G-11, Islamabad — secure, spotless and thoughtfully-run accommodation for students and young professionals. High-speed WiFi, 24/7 security, housekeeping and a genuine community. Book a bed or arrange a visit today.",
  alternates: { canonical: site.url },
  openGraph: {
    title:
      "Riwaq Boys Hostel Islamabad — Secure Student Accommodation in G-11",
    description:
      "Secure, spotless and well-run boys hostel in G-11, Islamabad. WiFi, 24/7 security, housekeeping and a real community — from PKR 14,000/month.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

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
      <AboutIntro />
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
