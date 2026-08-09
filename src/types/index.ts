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
  /**
   * The branch this review is about. Omit for brand-level testimonials that
   * apply to Riwaq as a whole. Lets the same review system serve both the
   * brand and individual branch pages.
   */
  branchId?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: "booking" | "facilities" | "policies" | "location" | "payments";
  /**
   * The branch this question is specific to. Omit for brand-level FAQs that
   * apply everywhere. Branch pages can then surface their own FAQs (and emit
   * branch-scoped FAQPage structured data) on top of the brand ones.
   */
  branchId?: string;
}

/** An image or video belonging to a branch's media library. */
export interface MediaAsset {
  id: string;
  type: "image" | "video";
  /** Path under /public or a remote URL (image src, or video/embed URL). */
  src: string;
  alt: string;
  /** Optional poster/thumbnail for videos. */
  poster?: string;
  tone?: "forest" | "brass" | "sand" | "night";
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

/**
 * A branch — one Riwaq hostel. This is the single source of truth for a
 * location. Everything specific to a hostel (address, contacts, rooms,
 * facilities, media, reviews, SEO) lives here so that opening a new branch is
 * a data edit — add one object to the registry — not a code change.
 *
 * Required fields are the minimum to render a branch today. Optional fields
 * are progressive enhancements a branch can fill in over time (or that a CMS
 * will populate later) without any component changes.
 */
export interface Branch {
  // --- Identity ---
  id: string;
  slug: string;
  name: string;
  shortName: string;
  gender: Gender;
  tier: BranchTier;
  status: BranchStatus;
  tagline: string;
  description: string;

  // --- Location ---
  city: string;
  area: string;
  address: string;
  /** Postal code — improves NAP consistency and LocalBusiness schema. */
  postalCode?: string;
  geo?: GeoPoint;
  mapEmbedUrl?: string;

  // --- Contact ---
  phone: string;
  whatsapp: string;
  email: string;
  /** On-site manager for this branch. */
  manager?: { name: string; phone?: string; whatsapp?: string };
  /** All reachable lines for this branch (bookings, manager, etc.). */
  contacts?: ContactPerson[];

  // --- Offering (references the shared catalogs by id) ---
  /** Room type ids offered at this branch. */
  roomTypeIds: string[];
  /** Facility ids present at this branch. */
  facilityIds: string[];
  priceFrom: number;
  currency: string;
  /**
   * SEAM (not wired yet — pricing is currently global). Per-branch price and
   * availability overrides for specific room types. When populated later, the
   * rooms UI reads these in preference to the shared catalog, enabling
   * different rates per branch without touching components.
   */
  pricingOverrides?: {
    roomTypeId: string;
    priceMonthly: number;
    availability?: Availability;
  }[];

  // --- Media (organised per branch) ---
  gallery: GalleryItem[];
  videos?: MediaAsset[];
  virtualTourUrl?: string;

  // --- Neighbourhood ---
  /** Nearby universities / landmarks — a key decision factor for students. */
  nearby: { name: string; distance: string }[];
  /** Transport options serving the branch (metro, stops, ride-hail notes). */
  transport?: { name: string; detail: string }[];

  // --- Lifecycle ---
  /** ISO date the branch opened (or is expected to). */
  openedOn?: string;

  // --- Per-branch SEO overrides (optional; sensible defaults derived) ---
  seo?: { title?: string; description?: string; ogImage?: string };

  // --- Booking SEAM (documented, not built) ---
  booking?: BranchBookingConfig;
}

/**
 * SEAM: how a branch takes bookings. Not implemented yet — declared so the
 * booking flow can be added later as pure data + one form, per branch, with
 * no redesign. See ARCHITECTURE.md.
 */
export interface BranchBookingConfig {
  /** "inquiry" = WhatsApp/enquiry only (today). Future: request/instant. */
  mode: "inquiry" | "request" | "instant";
  /** External booking/reservation URL, if the branch uses one. */
  url?: string;
  /** Whether live availability is tracked for this branch. */
  liveAvailability?: boolean;
}

/**
 * SEAM: a structured booking/room inquiry for a branch. Not persisted yet —
 * the enquiry form can adopt this shape when a backend/CMS is connected.
 */
export interface BranchInquiry {
  branchId: string;
  roomTypeId?: string;
  name: string;
  phone: string;
  email?: string;
  moveInDate?: string;
  message?: string;
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

/** A named person/line people can call or WhatsApp. */
export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  /**
   * Alternate brand names people actually search for (e.g. "Riwaq Boys
   * Hostel"). Surfaced in structured data so Google connects those queries
   * to the brand.
   */
  alternateNames?: string[];
  tagline: string;
  description: string;
  /** Canonical production URL. */
  url: string;
  locale: string;
  /**
   * Google Search Console verification token — the `content` value from the
   * "HTML tag" method. Leave empty until you've claimed the property.
   */
  googleSiteVerification?: string;
  /** Primary contact — used by the global CTAs (floating button, enquiries). */
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
  };
  /** All the ways to reach us, shown on the Contact page. */
  contacts: ContactPerson[];
  address: {
    line: string;
    area: string;
    city: string;
    country: string;
  };
  socials: { label: string; href: string; icon?: IconName }[];
  nav: NavLink[];
  secondaryNav: NavLink[];
}
