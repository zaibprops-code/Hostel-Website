import type { Metadata } from "next";
import { site } from "@/data/site";
import { primaryBranch } from "@/data/branches";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { priceFrom } from "@/data/rooms";

const url = site.url;

/** Per-page metadata helper — keeps titles, canonicals and OG tags consistent. */
export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? site.description;
  const canonical = path === "/" ? url : `${url}${path}`;
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: desc,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description: desc,
    },
  };
}

/**
 * Organisation + LodgingBusiness structured data (JSON-LD). Rich, accurate
 * schema helps search engines understand Riwaq as a real, rated, located
 * business — a genuine ranking and trust signal.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "Organization"],
    "@id": `${url}#organization`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: "₨₨",
    currenciesAccepted: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryBranch.address,
      addressLocality: site.address.city,
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK",
    },
    ...(primaryBranch.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: primaryBranch.geo.lat,
        longitude: primaryBranch.geo.lng,
      },
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount,
      bestRating: 5,
    },
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: priceFrom,
      description: "Monthly hostel accommodation, per bed",
    },
    amenityFeature: primaryBranch.facilityIds.slice(0, 8).map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
  };
}

export function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
        reviewBody: r.quote,
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Serialise JSON-LD for injection into a <script> tag. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
