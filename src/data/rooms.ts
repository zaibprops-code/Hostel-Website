import type { RoomType, ComparisonFeature } from "@/types";

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
    image: { src: "/images/room-quad.jpg", alt: "Quad sharing room at Riwaq Boys Hostel, E-11/2 Islamabad — four single beds with wooden frames and blue sheets", tone: "sand", blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwX/xAAhEAADAAEEAQUAAAAAAAAAAAABAgMRAAQFITESEzJhof/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAYEQEBAAMAAAAAAAAAAAAAAAABAAIDQf/aAAwDAQACEQMRAD8ASHIO2zj7pooTIoWIIYHx0e9UF5PbtGghF6YTBCMDjz96U7eNKTpSSs6fEkZxqfzu2kYPb0AUXoMOj+aE2HSVwv/Z" },
    amenities: [
      "Single bed & mattress each",
      "Personal wardrobe & lockable storage",
      "Shared study desk",
      "High-speed WiFi",
      "Attached washroom",
    ],
    facilityIds: ["wifi", "power", "housekeeping", "water", "washrooms"],
    availability: "available",
    specs: {
      privacy: "Shared · 4 beds",
      attachedBath: true,
      ac: false,
      studyDesk: false,
      storage: true,
      wifi: true,
      housekeeping: true,
      bestFor: "Budget & social living",
    },
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
    specs: {
      privacy: "Shared · 3 beds",
      attachedBath: true,
      ac: false,
      studyDesk: true,
      storage: true,
      wifi: true,
      housekeeping: true,
      bestFor: "Balance & value",
    },
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
    specs: {
      privacy: "Semi-private · 2 beds",
      attachedBath: true,
      ac: "optional",
      studyDesk: true,
      storage: true,
      wifi: true,
      housekeeping: true,
      bestFor: "Quiet & focused study",
    },
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
    specs: {
      privacy: "Fully private",
      attachedBath: true,
      ac: true,
      studyDesk: true,
      storage: true,
      wifi: true,
      housekeeping: true,
      bestFor: "Privacy & professionals",
    },
  },
];

/**
 * Rows for the room comparison table. Kept separate from the room records so
 * new comparable attributes can be added in one place; a room simply provides
 * a value in its `specs` for each id.
 */
export const comparisonFeatures: ComparisonFeature[] = [
  { id: "privacy", label: "Privacy" },
  { id: "attachedBath", label: "Attached washroom" },
  { id: "ac", label: "Air conditioning" },
  { id: "studyDesk", label: "Personal study desk" },
  { id: "storage", label: "Lockable storage" },
  { id: "wifi", label: "High-speed WiFi" },
  { id: "housekeeping", label: "Daily housekeeping" },
  { id: "bestFor", label: "Best for" },
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
