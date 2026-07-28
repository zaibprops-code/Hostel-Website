import type { RoomType } from "@/types";

/**
 * Room categories offered across the brand.
 *
 * Prices are numeric (PKR / month) so they can be formatted, sorted and
 * compared. Every field a room card might need — photos, occupancy,
 * amenities, availability — is here, ready to scale to new categories.
 */
export const roomTypes: RoomType[] = [
  {
    id: "quad",
    slug: "quad-sharing",
    name: "Quad Sharing",
    occupancy: 4,
    occupancyLabel: "4 residents",
    description:
      "Our most social and best-value option. Four single beds with personal storage in a bright, well-ventilated room — ideal for students who want community and a lighter budget.",
    priceMonthly: 14000,
    currency: "PKR",
    priceNote: "per bed · per month",
    image: { src: "/images/rooms/quad.svg", alt: "Quad sharing room at Riwaq", tone: "sand" },
    amenities: [
      "Single bed & mattress each",
      "Personal wardrobe & lockable storage",
      "Shared study desk",
      "High-speed WiFi",
      "Attached washroom",
    ],
    facilityIds: ["wifi", "power", "housekeeping", "water", "washrooms"],
    availability: "available",
  },
  {
    id: "triple",
    slug: "triple-sharing",
    name: "Triple Sharing",
    occupancy: 3,
    occupancyLabel: "3 residents",
    description:
      "A balanced middle ground — more room to breathe than a quad, still friendly on the wallet. Three beds, individual storage and a shared study nook.",
    priceMonthly: 17000,
    currency: "PKR",
    priceNote: "per bed · per month",
    image: { src: "/images/rooms/triple.svg", alt: "Triple sharing room at Riwaq", tone: "forest" },
    amenities: [
      "Single bed & mattress each",
      "Personal wardrobe & lockable storage",
      "Individual study desk",
      "High-speed WiFi",
      "Attached washroom",
    ],
    facilityIds: ["wifi", "power", "housekeeping", "water", "washrooms", "study"],
    availability: "available",
    popular: true,
  },
  {
    id: "double",
    slug: "double-sharing",
    name: "Double Sharing",
    occupancy: 2,
    occupancyLabel: "2 residents",
    description:
      "Quiet, private and productive. Share with just one roommate — perfect for focused study, with your own desk and generous storage.",
    priceMonthly: 22000,
    currency: "PKR",
    priceNote: "per bed · per month",
    image: { src: "/images/rooms/double.svg", alt: "Double sharing room at Riwaq", tone: "brass" },
    amenities: [
      "Single bed & mattress each",
      "Large personal wardrobe",
      "Individual study desk & chair",
      "High-speed WiFi",
      "Attached washroom",
      "Air conditioning available",
    ],
    facilityIds: ["wifi", "power", "housekeeping", "water", "washrooms", "study", "ac"],
    availability: "limited",
  },
  {
    id: "single",
    slug: "single-room",
    name: "Single Room",
    occupancy: 1,
    occupancyLabel: "Private room",
    description:
      "Complete privacy for professionals and postgraduates. A private room with your own desk, storage and — where available — an attached washroom and AC.",
    priceMonthly: 35000,
    currency: "PKR",
    priceNote: "per room · per month",
    image: { src: "/images/rooms/single.svg", alt: "Single private room at Riwaq", tone: "night" },
    amenities: [
      "Private single room",
      "Comfortable single / queen bed",
      "Dedicated study desk & chair",
      "Large wardrobe",
      "High-speed WiFi",
      "Air conditioning",
    ],
    facilityIds: ["wifi", "power", "housekeeping", "water", "washrooms", "study", "ac"],
    availability: "waitlist",
  },
];

export const roomMap: Record<string, RoomType> = Object.fromEntries(
  roomTypes.map((r) => [r.id, r]),
);

export function getRooms(ids: string[]): RoomType[] {
  return ids.map((id) => roomMap[id]).filter(Boolean);
}

export function formatPrice(value: number, currency = "PKR"): string {
  return `${currency} ${value.toLocaleString("en-PK")}`;
}

/** Lowest advertised price across all room types — for "from" pricing. */
export const priceFrom = Math.min(...roomTypes.map((r) => r.priceMonthly));
