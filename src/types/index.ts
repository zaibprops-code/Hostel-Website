/**
 * Domain model for the Riwaq Hostels platform.
 *
 * Everything the brand will grow into — more branches, more room types,
 * more facilities, more reviews — is modelled here so that adding content
 * later is a data edit, never a redesign. A single hostel today; a
 * multi-branch, multi-city chain tomorrow.
 */

export type Gender = "boys" | "girls" | "co-ed";
export type BranchTier = "standard" | "executive" | "premium";
export type BranchStatus = "open" | "opening-soon" | "waitlist";

/** A named icon from our in-house line-icon set (see components/ui/Icon). */
export type IconName =
  | "wifi"
  | "shield"
  | "cctv"
  | "laundry"
  | "kitchen"
  | "bath"
  | "housekeeping"
  | "water"
  | "power"
  | "parking"
  | "study"
  | "lounge"
  | "prayer"
  | "ac"
  | "heating"
  | "bed"
  | "users"
  | "location"
  | "phone"
  | "whatsapp"
  | "mail"
  | "clock"
  | "check"
  | "star"
  | "sparkle"
  | "leaf"
  | "coffee";

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  /** Optional grouping so facilities can be organised as the list grows. */
  category?: "essentials" | "comfort" | "safety" | "community";
  /** Flag a headline amenity for compact "top facilities" displays. */
  featured?: boolean;
}

/** Occupancy / booking state for a room category or branch. */
export type Availability = "available" | "limited" | "waitlist" | "full";

/** A value in the room comparison matrix. */
export type RoomSpecValue = boolean | "optional" | string;

/** One comparable attribute (a row in the comparison table). */
export interface ComparisonFeature {
  id: string;
  label: string;
}

export interface RoomType {
  id: string;
  slug: string;
  name: string;
  occupancy: number;
  /** Short, human label e.g. "Double sharing". */
  occupancyLabel: string;
  description: string;
  /** Monthly price, in PKR. Kept numeric so we can format / compare / sort. */
  priceMonthly: number;
  currency: string;
  priceNote?: string;
  image: ImageAsset;
  amenities: string[];
  /** Facility ids available in this room category. */
  facilityIds?: string[];
  availability?: Availability;
  popular?: boolean;
  /** Values keyed by ComparisonFeature.id — powers the comparison table. */
  specs?: Record<string, RoomSpecValue>;
}

export interface ImageAsset {
  /** Path under /public, or a remote URL once real photography exists. */
  src: string;
  alt: string;
  /** Placeholder generator hint until real photos are added. */
  tone?: "forest" | "brass" | "sand" | "night";
  category?: GalleryCategory;
}

export type GalleryCategory =
  | "rooms"
  | "common"
  | "exterior"
  | "amenities"
  | "neighbourhood";

export interface GalleryItem extends ImageAsset {
  id: string;
  caption?: string;
  category: GalleryCategory;
  /** Reserved for future video support in the gallery. */
  type?: "image" | "video";
}

export interface Review {
  id: string;
  author: string;
  /** e.g. "Software Engineering student · NUST". */
  role?: string;
  rating: number;
  quote: string;
  date?: string;
  /** Where this testimonial came from — supports a future Google Reviews feed. */
  source?: "resident" | "google" | "parent";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: "booking" | "facilities" | "policies" | "location" | "payments";
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  gender: Gender;
  tier: BranchTier;
  status: BranchStatus;
  tagline: string;
  description: string;
  city: string;
  area: string;
  address: string;
  geo?: GeoPoint;
  mapEmbedUrl?: string;
  phone: string;
  whatsapp: string;
  email: string;
  /** Room type ids offered at this branch. */
  roomTypeIds: string[];
  /** Facility ids present at this branch. */
  facilityIds: string[];
  gallery: GalleryItem[];
  /** Nearby universities / landmarks — a key decision factor for students. */
  nearby: { name: string; distance: string }[];
  priceFrom: number;
  currency: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** A single line in the transparent pricing breakdown. */
export interface PriceLine {
  id: string;
  label: string;
  amount: string;
  note?: string;
  kind: "recurring" | "one-time" | "included" | "optional";
  icon?: IconName;
}

/** A step or item in the admission / move-in checklist. */
export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  icon: IconName;
  items: ChecklistItem[];
}

/** A reassurance point for the parent-facing page. */
export interface ParentAssurance {
  id: string;
  icon: IconName;
  title: string;
  body: string;
}

/** An emergency / essential contact number. */
export interface EmergencyContact {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: IconName;
  kind: "hostel" | "medical" | "police" | "fire" | "utility";
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Canonical production URL. */
  url: string;
  locale: string;
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    hours: string;
  };
  address: {
    line: string;
    area: string;
    city: string;
    country: string;
  };
  socials: { label: string; href: string; icon?: IconName }[];
  nav: NavLink[];
}
