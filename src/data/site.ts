import type { SiteConfig, Stat } from "@/types";

/**
 * Brand-level configuration for Riwaq Hostels.
 *
 * This is the single source of truth for brand identity, contact routes and
 * navigation. Update once here and it propagates across every page, the
 * footer, structured data and the sitemap.
 */
export const site: SiteConfig = {
  name: "Riwaq Hostels",
  legalName: "Riwaq Hostels",
  alternateNames: [
    "Riwaq Boys Hostel",
    "Riwaq Boys Hostel Islamabad",
    "Riwaq Boys Hostel G-11",
    "Riwaq Hostel Islamabad",
  ],
  tagline: "Considered living for Islamabad's students & professionals",
  description:
    "Riwaq Boys Hostel offers secure, spotless and thoughtfully-run accommodation in G-11, Islamabad. Premium comfort at a student-friendly price — high-speed WiFi, 24/7 security, housekeeping and a genuine community.",
  url: "https://riwaqhostels.com",
  locale: "en_PK",
  // Paste the token from Google Search Console → "HTML tag" verification
  // method here (the content="..." value only). Leave "" until then.
  googleSiteVerification: "",
  contact: {
    phone: "+923001234567",
    phoneDisplay: "+92 300 1234567",
    whatsapp: "+923001234567",
    email: "hello@riwaqhostels.com",
    hours: "Front desk staffed 24/7 · Visits 9:00 AM – 9:00 PM",
  },
  address: {
    line: "Riwaq Boys Hostel, Street 12, Sector G-11/3",
    area: "G-11",
    city: "Islamabad",
    country: "Pakistan",
  },
  socials: [
    { label: "WhatsApp", href: "https://wa.me/923001234567", icon: "whatsapp" },
    { label: "Instagram", href: "https://instagram.com/riwaqhostels" },
    { label: "Facebook", href: "https://facebook.com/riwaqhostels" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms", href: "/rooms" },
    { label: "Facilities", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};

/** Headline trust numbers shown on the homepage. */
export const brandStats: Stat[] = [
  { value: "24/7", label: "On-site security & staff" },
  { value: "120+", label: "Residents at home with us" },
  { value: "4.9", label: "Average resident rating" },
  { value: "5 min", label: "To major universities" },
];

/** Helper: a pre-filled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`;
}

export function mailLink(subject?: string): string {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
