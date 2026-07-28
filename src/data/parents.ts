import type { ParentAssurance, EmergencyContact } from "@/types";

/**
 * Parent-facing reassurance. Parents often make or approve the decision, and
 * their concerns are specific: safety, supervision, and knowing who to call.
 * We answer those directly and without marketing gloss.
 */
export const parentAssurances: ParentAssurance[] = [
  {
    id: "security",
    icon: "shield",
    title: "How security is managed",
    body: "A trained guard and a staffed front desk operate 24 hours a day. Entry is through a single monitored point, and every resident and visitor is logged. HD CCTV covers all entrances and shared corridors.",
  },
  {
    id: "supervision",
    icon: "users",
    title: "Who supervises residents",
    body: "A resident hostel manager lives on-site and is reachable at any hour. Staff know residents by name, keep an eye on wellbeing, and are the first point of contact if anything is needed.",
  },
  {
    id: "visitors",
    icon: "clock",
    title: "Visitor policy",
    body: "Guests are welcome in common areas during visiting hours (9:00 AM – 9:00 PM) and must sign in at the desk. Overnight guests are not permitted — a simple rule that keeps the building secure for everyone.",
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
    label: "Hostel front desk (24/7)",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
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
    value: "PIMS / Shifa International",
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
      { name: "NUST", distance: "10 min" },
      { name: "FAST-NUCES", distance: "12 min" },
      { name: "Bahria University", distance: "15 min" },
      { name: "COMSATS", distance: "18 min" },
      { name: "Air University", distance: "16 min" },
    ],
  },
  {
    category: "Health & pharmacy",
    icon: "shield",
    places: [
      { name: "Shifa International", distance: "12 min" },
      { name: "PIMS Hospital", distance: "14 min" },
      { name: "Pharmacies (G-11 Markaz)", distance: "5 min" },
    ],
  },
  {
    category: "Daily needs",
    icon: "coffee",
    places: [
      { name: "G-11 Markaz (shops & food)", distance: "5 min" },
      { name: "Grocery & general stores", distance: "5 min" },
      { name: "ATMs & banks", distance: "6 min" },
    ],
  },
  {
    category: "Transport",
    icon: "location",
    places: [
      { name: "Metro Bus (G-11)", distance: "5 min" },
      { name: "Blue Area business district", distance: "12 min" },
    ],
  },
];
