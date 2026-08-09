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
import type { Metadata } from "next";
import { site } from "@/data/site";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Riwaq Boys Hostel Islamabad — Student Accommodation in E-11/2",
  },
  description:
    "Riwaq Boys Hostel in E-11/2, Islamabad — spotless, thoughtfully-run accommodation for students and young professionals. High-speed WiFi, CCTV security, daily housekeeping and a genuine community. Book a bed or arrange a visit today.",
  alternates: { canonical: site.url },
  openGraph: {
    title:
      "Riwaq Boys Hostel Islamabad — Student Accommodation in E-11/2",
    description:
      "Spotless, well-run boys hostel in E-11/2, Islamabad — minutes from NUST & FAST. WiFi, CCTV security, housekeeping and a real community.",
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
