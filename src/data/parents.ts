import type { ParentAssurance, EmergencyContact } from "@/types";

/**
 * Parent-facing reassurance. Parents often make or approve the decision, and
 * their concerns are specific: safety, supervision, and knowing who to call.
 * We answer those directly and without marketing gloss.
 */
export const parentAssurances: ParentAssurance[] = [
  {
    id: "security",
    icon: "cctv",
    title: "How security is managed",
    body: "Entry is controlled through a single point and HD CCTV covers the entrances and shared corridors. It's a calm, monitored environment where residents and visitors are accounted for.",
  },
  {
    id: "supervision",
    icon: "users",
    title: "Who supervises residents",
    body: "The hostel manager is on site day to day and reachable when needed — a real person who knows the residents and is the first point of contact if anything comes up.",
  },
  {
    id: "visitors",
    icon: "clock",
    title: "Visitor policy",
    body: "Guests are welcome in the common areas during the day and are signed in. Overnight guests are not permitted — a simple rule that keeps the building secure for everyone.",
  },
  {
    id: "payments",
    icon: "check",
    title: "How payments work",
    body: "Clear monthly rent with no hidden charges, plus a one-time refundable deposit. Every payment is receipted, and we're always happy to speak with parents directly about the arrangement.",
  },
  {
    id: "cleanliness",
    icon: "sparkle",
    title: "Health & cleanliness",
    body: "Common areas are cleaned daily, washrooms are sanitised regularly, and filtered drinking water is available on every floor. A clean environment is treated as a basic standard, not an extra.",
  },
  {
    id: "contact",
    icon: "phone",
    title: "Staying in touch",
    body: "Parents can reach the front desk any time by phone or WhatsApp. If you ever can't get hold of your son, call us — we'll check in and get back to you.",
  },
];

/**
 * Emergency & essential contacts. Islamabad-wide services plus the hostel
 * desk, in one place parents can bookmark. National numbers are stable;
 * update the hostel and nearest-hospital entries per branch as you grow.
 */
export const emergencyContacts: EmergencyContact[] = [
  {
    id: "hostel",
    label: "Riwaq Hostels",
    value: "+92 314 6144997",
    href: "tel:+923146144997",
    icon: "phone",
    kind: "hostel",
  },
  {
    id: "rescue",
    label: "Rescue & ambulance",
    value: "1122",
    href: "tel:1122",
    icon: "phone",
    kind: "medical",
  },
  {
    id: "police",
    label: "Police emergency",
    value: "15",
    href: "tel:15",
    icon: "shield",
    kind: "police",
  },
  {
    id: "fire",
    label: "Fire brigade",
    value: "16",
    href: "tel:16",
    icon: "heating",
    kind: "fire",
  },
  {
    id: "hospital",
    label: "Nearest hospital",
    value: "Maroof International (F-10)",
    icon: "location",
    kind: "medical",
  },
];

/**
 * Everyday essentials around the hostel — helps a family picture daily life
 * and reassures them that the basics are all close by. Grouped so the map /
 * neighbourhood section can filter as it grows.
 */
export const nearbyEssentials: {
  category: string;
  icon: import("@/types").IconName;
  places: { name: string; distance: string }[];
}[] = [
  {
    category: "Universities",
    icon: "study",
    places: [
      { name: "NUST (H-12)", distance: "8 min" },
      { name: "FAST-NUCES (H-11)", distance: "10 min" },
      { name: "Air University (E-9)", distance: "9 min" },
      { name: "Bahria University (E-8)", distance: "12 min" },
      { name: "International Islamic University", distance: "15 min" },
    ],
  },
  {
    category: "Health & pharmacy",
    icon: "shield",
    places: [
      { name: "Maroof International (F-10)", distance: "12 min" },
      { name: "PIMS Hospital", distance: "16 min" },
      { name: "Pharmacies (E-11 Markaz)", distance: "5 min" },
    ],
  },
  {
    category: "Daily needs",
    icon: "coffee",
    places: [
      { name: "E-11 Markaz (shops & food)", distance: "5 min" },
      { name: "Grocery & general stores", distance: "5 min" },
      { name: "ATMs & banks", distance: "6 min" },
    ],
  },
  {
    category: "Transport",
    icon: "location",
    places: [
      { name: "Metro Bus (Kashmir Hwy)", distance: "6 min" },
      { name: "Blue Area business district", distance: "18 min" },
    ],
  },
];
