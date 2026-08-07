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
    "Riwaq Boys Hostel E-11",
    "Riwaq Hostel Islamabad",
  ],
  tagline: "Considered living for Islamabad's students & professionals",
  description:
    "Riwaq Boys Hostel offers spotless, thoughtfully-run accommodation in E-11/2, Islamabad. Premium comfort at a student-friendly price — high-speed WiFi, CCTV security, daily housekeeping and a genuine community.",
  url: "https://riwaqhostels.com",
  locale: "en_PK",
  // Paste the token from Google Search Console → "HTML tag" verification
  // method here (the content="..." value only). Leave "" until then.
  googleSiteVerification: "1Mjhm45gDhHMFLYaxo4Xtj9AxRHK-0EAZBtyuxYKVA4",
  // Primary line — the floating WhatsApp button and booking CTAs point here.
  // WhatsApp enquiries route to the on-site E-11/2 Markaz manager, who handles
  // bookings and visits. Calls still ring the primary line above.
  contact: {
    phone: "+923146144997",
    phoneDisplay: "+92 314 6144997",
    whatsapp: "+923358067753",
  },
  contacts: [
    {
      name: "Riwaq Hostels",
      role: "Bookings & enquiries",
      phone: "+923146144997",
      phoneDisplay: "+92 314 6144997",
      whatsapp: "+923146144997",
    },
    {
      name: "Hostel Manager",
      role: "Front desk & on-site help",
      phone: "+923333638543",
      phoneDisplay: "+92 333 3638543",
      whatsapp: "+923333638543",
    },
  ],
  address: {
    line: "House No. 241, Street 70B, E-11/2 Services Society",
    area: "E-11/2",
    city: "Islamabad",
    country: "Pakistan",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/riwaq_hostels" },
    // TODO: replace with the real Facebook page URL once the account is ready.
    { label: "Facebook", href: "https://facebook.com/riwaqhostels" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms", href: "/rooms" },
    { label: "Branches", href: "/branches" },
    { label: "Facilities", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "Parents", href: "/parents" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  /** Secondary destinations surfaced in the footer, not the primary nav. */
  secondaryNav: [
    { label: "Virtual tour", href: "/tour" },
    { label: "Guides & blog", href: "/blog" },
    { label: "Updates", href: "/updates" },
    { label: "Pricing", href: "/rooms#pricing" },
    { label: "Hostel near NUST", href: "/hostels/hostel-near-nust" },
    { label: "Hostel near FAST", href: "/hostels/hostel-near-fast-nuces" },
    { label: "Boys hostel in E-11", href: "/hostels/boys-hostel-in-e-11-islamabad" },
    { label: "Student accommodation", href: "/hostels/student-accommodation-in-islamabad" },
  ],
};

/** Headline trust numbers shown on the homepage. */
export const brandStats: Stat[] = [
  { value: "24/7", label: "CCTV monitoring" },
  { value: "10+", label: "Facilities included" },
  { value: "8 min", label: "To NUST & FAST" },
  { value: "1", label: "Standard, every branch" },
];

/** Helper: a pre-filled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(phone: string = site.contact.phone): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

/** WhatsApp deep link for a specific number (defaults to the primary line). */
export function whatsappTo(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
