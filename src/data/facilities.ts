import type { Facility } from "@/types";

/**
 * The full facilities catalogue for the brand.
 *
 * Branches reference these by id (see data/branches.ts) so a facility is
 * defined once and reused everywhere. Add a new amenity here and it becomes
 * available to every branch, room and page instantly.
 */
export const facilities: Facility[] = [
  {
    id: "wifi",
    name: "High-speed WiFi",
    description:
      "Fibre internet across every room and common area — built for online classes, deadlines and streaming.",
    icon: "wifi",
    category: "essentials",
    featured: true,
  },
  {
    id: "security",
    name: "24/7 Security",
    description:
      "Trained guards and a staffed front desk around the clock, with a monitored single point of entry.",
    icon: "shield",
    category: "safety",
    featured: true,
  },
  {
    id: "cctv",
    name: "CCTV Coverage",
    description:
      "HD cameras on entrances, corridors and shared spaces, recorded and reviewed for everyone's safety.",
    icon: "cctv",
    category: "safety",
    featured: true,
  },
  {
    id: "power",
    name: "Electricity Backup",
    description:
      "Uninterrupted power through load-shedding with generator and UPS backup on essential circuits.",
    icon: "power",
    category: "essentials",
    featured: true,
  },
  {
    id: "housekeeping",
    name: "Daily Housekeeping",
    description:
      "Common areas cleaned daily and rooms serviced on a regular schedule, so you come home to order.",
    icon: "housekeeping",
    category: "comfort",
    featured: true,
  },
  {
    id: "laundry",
    name: "Laundry",
    description:
      "On-site washing and drying facilities so laundry is never a reason to leave the building.",
    icon: "laundry",
    category: "comfort",
    featured: true,
  },
  {
    id: "kitchen",
    name: "Shared Kitchen",
    description:
      "A clean, well-equipped kitchen for when you'd rather cook your own — hobs, fridge and storage.",
    icon: "kitchen",
    category: "essentials",
  },
  {
    id: "washrooms",
    name: "Spotless Washrooms",
    description:
      "Modern, frequently-sanitised washrooms with reliable hot water, morning and night.",
    icon: "bath",
    category: "comfort",
  },
  {
    id: "water",
    name: "Filtered Water",
    description:
      "Clean, filtered drinking water on tap on every floor — no bottles to lug up the stairs.",
    icon: "water",
    category: "essentials",
  },
  {
    id: "study",
    name: "Quiet Study Area",
    description:
      "A dedicated, low-noise study room with proper desks and lighting for focused work.",
    icon: "study",
    category: "community",
  },
  {
    id: "lounge",
    name: "Common Lounge",
    description:
      "A comfortable shared lounge to unwind, watch the match and meet the people you live with.",
    icon: "lounge",
    category: "community",
  },
  {
    id: "prayer",
    name: "Prayer Area",
    description:
      "A clean, quiet dedicated space for prayer, with wudu facilities close by.",
    icon: "prayer",
    category: "community",
  },
  {
    id: "parking",
    name: "Parking",
    description:
      "Secure on-site parking for bikes and cars within the guarded compound.",
    icon: "parking",
    category: "essentials",
  },
  {
    id: "ac",
    name: "Air Conditioning",
    description:
      "Air-conditioned rooms available so Islamabad summers stay comfortable.",
    icon: "ac",
    category: "comfort",
  },
  {
    id: "heating",
    name: "Heating",
    description:
      "Warm rooms through the cold Islamabad winters, with heating available where you need it.",
    icon: "heating",
    category: "comfort",
  },
];

export const facilityMap: Record<string, Facility> = Object.fromEntries(
  facilities.map((f) => [f.id, f]),
);

export function getFacilities(ids: string[]): Facility[] {
  return ids.map((id) => facilityMap[id]).filter(Boolean);
}

export const featuredFacilities = facilities.filter((f) => f.featured);
