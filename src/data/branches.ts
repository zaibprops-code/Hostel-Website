import type { Branch } from "@/types";
import { gallery } from "./gallery";

/**
 * The branch registry — the backbone of Riwaq's multi-branch architecture.
 *
 * Today the brand operates one hostel. Tomorrow it may run many, across
 * sectors and cities. Every branch is a self-contained record with its own
 * rooms, facilities, gallery, contact routes and location — so launching a
 * new hostel means appending one object here, not rebuilding the site.
 *
 * `status` lets us surface future branches as "Opening soon" to build a
 * waitlist before a single brick is laid.
 */
export const branches: Branch[] = [
  {
    id: "boys-g11",
    slug: "boys-g11-islamabad",
    name: "Riwaq Boys Hostel — G-11",
    shortName: "Boys · G-11",
    gender: "boys",
    tier: "standard",
    status: "open",
    tagline: "Our flagship — secure, spotless living in the heart of Islamabad",
    description:
      "Our founding hostel sits in the quiet, green surroundings of G-11, minutes from Islamabad's major universities and the Blue Area. It's a calm, well-run home for students and young professionals who want their accommodation handled so they can focus on everything else.",
    city: "Islamabad",
    area: "G-11",
    address: "Street 12, Sector G-11/3, Islamabad, Pakistan",
    geo: { lat: 33.6668, lng: 72.9962 },
    mapEmbedUrl:
      "https://www.google.com/maps?q=G-11%20Islamabad&output=embed",
    phone: "+923001234567",
    whatsapp: "+923001234567",
    email: "hello@riwaqhostels.com",
    roomTypeIds: ["quad", "triple", "double", "single"],
    facilityIds: [
      "wifi",
      "security",
      "cctv",
      "power",
      "housekeeping",
      "laundry",
      "kitchen",
      "washrooms",
      "water",
      "study",
      "lounge",
      "prayer",
      "parking",
      "ac",
      "heating",
    ],
    gallery,
    nearby: [
      { name: "NUST", distance: "10 min" },
      { name: "FAST-NUCES", distance: "12 min" },
      { name: "Bahria University", distance: "15 min" },
      { name: "Blue Area", distance: "12 min" },
      { name: "Metro Bus (G-11)", distance: "5 min" },
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
    phone: "+923001234567",
    whatsapp: "+923001234567",
    email: "hello@riwaqhostels.com",
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
    phone: "+923001234567",
    whatsapp: "+923001234567",
    email: "hello@riwaqhostels.com",
    roomTypeIds: ["quad", "triple", "double"],
    facilityIds: ["wifi", "security", "cctv", "power", "housekeeping"],
    gallery: [],
    nearby: [],
    priceFrom: 15000,
    currency: "PKR",
  },
];

/** The primary, live branch — used as the default across the marketing site. */
export const primaryBranch: Branch =
  branches.find((b) => b.status === "open") ?? branches[0];

export const openBranches = branches.filter((b) => b.status === "open");
export const upcomingBranches = branches.filter((b) => b.status !== "open");

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}
