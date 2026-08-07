import type { Branch } from "@/types";
import { gallery } from "./gallery";

/**
 * The branch registry — the backbone of Riwaq's multi-branch architecture,
 * and the single DATA-PROVIDER BOUNDARY for locations.
 *
 * Today the brand operates one hostel. Tomorrow it may run many, across
 * sectors and cities. Every branch is a self-contained record with its own
 * rooms, facilities, gallery, contact routes and location — so launching a
 * new hostel means appending one object here, not rebuilding the site: its
 * page, SEO/structured data, OG image, sitemap entry and locator card all
 * generate automatically from this data.
 *
 * ── Adding a branch ──
 *   1. Append one object to `branches` below (copy an existing one).
 *   2. Optionally give it a `gallery` (see ./gallery) and per-branch reviews
 *      / FAQs (tag them with this branch's `id` in ./reviews and ./faqs).
 *   Nothing else needs to change.
 *
 * ── CMS / admin readiness ──
 *   Everything downstream consumes branches through the accessors in this
 *   file (`getBranch`, `getAllBranchSlugs`, `flagshipBranch`, …). To move to a
 *   headless CMS or an admin API later, swap the `branches` source here for a
 *   fetch/query — no page or component needs to change. See ARCHITECTURE.md.
 *
 * `status` lets us surface future branches as "Opening soon" to build a
 * waitlist before a single brick is laid.
 */
export const branches: Branch[] = [
  {
    id: "boys-e11",
    slug: "boys-e11-islamabad",
    name: "Riwaq Boys Hostel — E-11/2",
    shortName: "Boys · E-11/2",
    gender: "boys",
    tier: "standard",
    status: "open",
    tagline: "Our flagship — secure, spotless living in the heart of Islamabad",
    description:
      "Our founding hostel sits in the quiet, green surroundings of E-11/2, minutes from NUST, FAST and the western universities. It's a calm, well-run home for students and young professionals who want their accommodation handled so they can focus on everything else.",
    city: "Islamabad",
    area: "E-11/2",
    address: "House No. 241, Street 70B, E-11/2 Services Society, Islamabad, Pakistan",
    postalCode: "44000",
    geo: { lat: 33.701, lng: 72.9535 },
    mapEmbedUrl:
      "https://www.google.com/maps?q=Riwaq%20Boys%20Hostel%20E-11%2F2%20Islamabad&output=embed",
    phone: "+923146144997",
    // E-11/2 Markaz manager — handles WhatsApp enquiries, bookings and visits.
    whatsapp: "+923358067753",
    email: "",
    manager: { name: "Hostel Manager", phone: "+923333638543", whatsapp: "+923333638543" },
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
    openedOn: "2025-01-01",
    transport: [
      { name: "Metro Bus", detail: "Kashmir Highway station — 6 min" },
      { name: "Ride-hail", detail: "Careem / inDrive widely available" },
    ],
    booking: { mode: "inquiry", liveAvailability: false },
    roomTypeIds: ["quad", "triple", "double", "single"],
    // Facilities actually offered at this branch today. Each branch keeps its
    // own list, so future branches can add or drop amenities independently.
    facilityIds: [
      "wifi",
      "cctv",
      "housekeeping",
      "laundry",
      "kitchen",
      "washrooms",
      "water",
      "parking",
      "ac",
      "heating",
    ],
    gallery,
    nearby: [
      { name: "NUST (H-12)", distance: "8 min" },
      { name: "FAST-NUCES (H-11)", distance: "10 min" },
      { name: "Air University (E-9)", distance: "9 min" },
      { name: "Bahria University (E-8)", distance: "12 min" },
      { name: "Metro Bus (Kashmir Hwy)", distance: "6 min" },
    ],
    priceFrom: 14000,
    currency: "PKR",
  },
  // --- Future branches (kept here to model the brand's roadmap) ---
  {
    id: "boys-f10",
    slug: "boys-f10-islamabad",
    name: "Riwaq Boys Hostel — F-10",
    shortName: "Boys · F-10",
    gender: "boys",
    tier: "standard",
    status: "opening-soon",
    tagline: "A second boys hostel, coming to F-10",
    description:
      "Our next boys hostel brings the Riwaq standard to F-10. Join the waitlist to be first in line when doors open.",
    city: "Islamabad",
    area: "F-10",
    address: "Sector F-10, Islamabad, Pakistan",
    phone: "+923146144997",
    whatsapp: "+923146144997",
    email: "",
    roomTypeIds: ["quad", "triple", "double"],
    facilityIds: ["wifi", "security", "cctv", "power", "housekeeping", "laundry"],
    gallery: [],
    nearby: [{ name: "Centaurus", distance: "8 min" }],
    priceFrom: 15000,
    currency: "PKR",
  },
  {
    id: "girls-g10",
    slug: "girls-g10-islamabad",
    name: "Riwaq Girls Hostel — G-10",
    shortName: "Girls · G-10",
    gender: "girls",
    tier: "standard",
    status: "opening-soon",
    tagline: "A secure, welcoming girls hostel is on the way",
    description:
      "A dedicated girls hostel built to the same standard of safety and comfort, planned for G-10. Add your name to the waitlist and we'll be in touch first.",
    city: "Islamabad",
    area: "G-10",
    address: "Sector G-10, Islamabad, Pakistan",
    phone: "+923146144997",
    whatsapp: "+923146144997",
    email: "",
    roomTypeIds: ["quad", "triple", "double"],
    facilityIds: ["wifi", "security", "cctv", "power", "housekeeping"],
    gallery: [],
    nearby: [],
    priceFrom: 15000,
    currency: "PKR",
  },
];

export const openBranches = branches.filter((b) => b.status === "open");
export const upcomingBranches = branches.filter((b) => b.status !== "open");

/**
 * The flagship branch — the open branch featured on the brand homepage and
 * used as the brand's primary physical location in Organization structured
 * data. Because brand pages reference this *concept* (not a hardcoded id),
 * the "featured branch" can be changed in one place as the brand grows.
 */
export const flagshipBranch: Branch = openBranches[0] ?? branches[0];

/**
 * @deprecated Use `flagshipBranch`. Kept as an alias for backwards
 * compatibility while call sites migrate.
 */
export const primaryBranch: Branch = flagshipBranch;

/** Count of live branches — for brand-level "N locations" copy. */
export const openBranchCount = openBranches.length;

/** Distinct areas/sectors Riwaq operates in (or is opening in). */
export const brandAreas: string[] = Array.from(
  new Set(branches.map((b) => b.area)),
);

/** Distinct cities Riwaq operates in. */
export const brandCities: string[] = Array.from(
  new Set(branches.map((b) => b.city)),
);

/**
 * The brand-standard facility set — the union of everything offered across
 * branches. Powers the brand /facilities page so it describes "what to expect
 * at any Riwaq" rather than one building's list. Individual branch pages still
 * show their own `facilityIds`.
 */
export const brandFacilityIds: string[] = Array.from(
  new Set(branches.flatMap((b) => b.facilityIds)),
);

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

/** Every branch slug — powers static generation and sitemap entries. */
export function getAllBranchSlugs(): string[] {
  return branches.map((b) => b.slug);
}
