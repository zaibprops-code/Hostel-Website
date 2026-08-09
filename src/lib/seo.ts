import type { Metadata } from "next";
import type { Branch, FaqItem, Review } from "@/types";
import { site } from "@/data/site";
import { flagshipBranch } from "@/data/branches";
import {
  brandReviews,
  reviewsForBranch,
  reviewStats,
  hasOwnReviews,
} from "@/data/reviews";
import { brandFaqs } from "@/data/faqs";
import { priceFrom, getRooms } from "@/data/rooms";
import { getFacilities } from "@/data/facilities";

const url = site.url;

/** Absolute canonical URL for a branch. */
export function branchUrl(slug: string): string {
  return `${url}/branches/${slug}`;
}

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
    ...(site.alternateNames?.length && {
      alternateName: site.alternateNames,
    }),
    description: site.description,
    url,
    logo: `${url}/icon.svg`,
    image: `${url}/opengraph-image`,
    telephone: site.contact.phone,
    // Links the brand to its official profiles — a key entity/trust signal.
    sameAs: site.socials
      .map((s) => s.href)
      .filter((href) => /^https?:\/\//.test(href) && !href.includes("wa.me")),
    priceRange: "₨₨",
    currenciesAccepted: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: flagshipBranch.address,
      addressLocality: site.address.city,
      addressRegion: "Islamabad Capital Territory",
      postalCode: "44000",
      addressCountry: "PK",
    },
    areaServed: { "@type": "City", name: "Islamabad" },
    ...(flagshipBranch.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: flagshipBranch.geo.lat,
        longitude: flagshipBranch.geo.lng,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${flagshipBranch.geo.lat},${flagshipBranch.geo.lng}`,
    }),
    // Note: aggregateRating/review markup is intentionally omitted until real
    // (e.g. Google) reviews are connected — fabricated review data violates
    // Google's structured-data policies and risks a manual penalty.
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: priceFrom,
      description: "Monthly hostel accommodation, per bed",
    },
    amenityFeature: flagshipBranch.facilityIds.slice(0, 8).map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
  };
}

/**
 * WebSite schema — declares the site's canonical name and the alternate
 * brand names people search for, so Google can resolve queries like
 * "riwaq boys hostel" to this site.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: site.name,
    ...(site.alternateNames?.length && {
      alternateName: site.alternateNames,
    }),
    description: site.description,
    inLanguage: "en-PK",
    publisher: { "@id": `${url}#organization` },
  };
}

/**
 * BreadcrumbList schema for an interior page — powers the breadcrumb trail
 * Google can show under a result.
 */
export function breadcrumbJsonLd(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${url}${path}`,
      },
    ],
  };
}

export function reviewsJsonLd(list: Review[] = brandReviews()) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((r, i) => ({
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

export function faqJsonLd(items: FaqItem[] = brandFaqs()) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * Per-branch LodgingBusiness structured data — the key to letting each branch
 * rank independently in local search. Each branch gets its own @id, NAP, geo,
 * hours, amenities and rating, and is linked back to the parent brand
 * Organization. Adding a branch to the registry produces this automatically.
 */
export function branchJsonLd(branch: Branch) {
  const canonical = branchUrl(branch.slug);
  const branchReviews = reviewsForBranch(branch.id);
  const stats = reviewStats(branchReviews);
  const rooms = getRooms(branch.roomTypeIds);
  const facilities = getFacilities(branch.facilityIds);
  const isOpen = branch.status === "open";

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${canonical}#branch`,
    name: branch.name,
    description: branch.description,
    url: canonical,
    image: `${canonical}/opengraph-image`,
    telephone: branch.phone,
    priceRange: "₨₨",
    currenciesAccepted: branch.currency,
    parentOrganization: { "@id": `${url}#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: "Islamabad Capital Territory",
      ...(branch.postalCode && { postalCode: branch.postalCode }),
      addressCountry: "PK",
    },
    areaServed: { "@type": "City", name: branch.city },
    ...(branch.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: branch.geo.lat,
        longitude: branch.geo.lng,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${branch.geo.lat},${branch.geo.lng}`,
    }),
    ...(isOpen && {
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    }),
    makesOffer: {
      "@type": "Offer",
      priceCurrency: branch.currency,
      price: branch.priceFrom,
      description: "Monthly hostel accommodation, per bed",
    },
    // Only claim a rating when the branch has genuinely earned its own.
    ...(hasOwnReviews(branch.id) &&
      stats.reviewCount > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: stats.averageRating,
          reviewCount: stats.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    numberOfRooms: rooms.length,
    amenityFeature: facilities.slice(0, 10).map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f.name,
      value: true,
    })),
  };
}

/** Serialise JSON-LD for injection into a <script> tag. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
