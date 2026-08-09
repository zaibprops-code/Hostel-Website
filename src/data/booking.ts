import type { PriceLine, ChecklistGroup } from "@/types";
import { priceFrom, formatPrice } from "./rooms";

/**
 * Transparent pricing. We state plainly what is charged, what is one-time,
 * what is already included in the rent, and what is genuinely optional — so
 * there are no surprises after move-in. Trust is built here.
 */
export const pricing: PriceLine[] = [
  {
    id: "rent",
    label: "Monthly rent",
    amount: `From ${formatPrice(priceFrom)}`,
    note: "Depends on room type — see the rooms above",
    kind: "recurring",
    icon: "bed",
  },
  {
    id: "deposit",
    label: "Security deposit",
    amount: "Half of one month's rent",
    note: "One-time & fully refundable at check-out, less any damages",
    kind: "one-time",
    icon: "shield",
  },
  {
    id: "wifi",
    label: "High-speed WiFi",
    amount: "Included",
    kind: "included",
    icon: "wifi",
  },
  {
    id: "electricity",
    label: "Electricity",
    amount: "Included",
    note: "Normal usage; heavy personal appliances may be metered",
    kind: "included",
    icon: "power",
  },
  {
    id: "water",
    label: "Water & housekeeping",
    amount: "Included",
    kind: "included",
    icon: "water",
  },
  {
    id: "laundry",
    label: "Laundry",
    amount: "Included",
    note: "Self-service washing & drying on site",
    kind: "included",
    icon: "laundry",
  },
  {
    id: "ac",
    label: "Air conditioning",
    amount: "Optional",
    note: "Available in select rooms for a small add-on",
    kind: "optional",
    icon: "ac",
  },
  {
    id: "meals",
    label: "Meal plan",
    amount: "Optional",
    note: "Shared kitchen is free; managed meals coming soon",
    kind: "optional",
    icon: "kitchen",
  },
];

/**
 * The digital admission checklist — everything a new resident needs to move
 * in smoothly, so the same questions aren't asked over and over.
 */
export const admissionChecklist: ChecklistGroup[] = [
  {
    id: "documents",
    title: "Documents to bring",
    icon: "check",
    items: [
      { id: "d1", title: "CNIC / B-Form / Passport", detail: "A clear copy of your national ID (or passport for international students)." },
      { id: "d2", title: "Student ID or employer letter", detail: "Proof of your university enrolment or a letter from your workplace." },
      { id: "d3", title: "Passport-size photograph", detail: "One recent photo for your resident file." },
      { id: "d4", title: "Guardian / emergency contact", detail: "Name and phone number of a parent or local guardian." },
    ],
  },
  {
    id: "steps",
    title: "How to book — step by step",
    icon: "clock",
    items: [
      { id: "s1", title: "1. Send an enquiry", detail: "Message us on WhatsApp or submit the reservation form with your details." },
      { id: "s2", title: "2. Confirm availability & visit", detail: "We confirm your preferred room and, if you like, arrange a visit." },
      { id: "s3", title: "3. Register & pay", detail: "Complete a short registration, then pay the first month's rent and the refundable deposit." },
      { id: "s4", title: "4. Move in", detail: "Collect your keys and settle in — often the same day where a bed is ready." },
    ],
  },
  {
    id: "bring",
    title: "What to bring",
    icon: "bed",
    items: [
      { id: "b1", title: "Bedding & linens", detail: "Your own bedsheets, pillow and blanket (beds & mattresses are provided)." },
      { id: "b2", title: "Toiletries & towels", detail: "Personal care items and towels for daily use." },
      { id: "b3", title: "Study essentials", detail: "Laptop, chargers and anything you need for classes or work." },
      { id: "b4", title: "A padlock", detail: "For your personal lockable storage, if you'd like your own." },
    ],
  },
  {
    id: "rules",
    title: "House rules, in short",
    icon: "shield",
    items: [
      { id: "r1", title: "Visitors", detail: "Guests are welcome in the common areas during the day and are signed in. No overnight guests." },
      { id: "r2", title: "Quiet hours", detail: "We keep noise down late at night so everyone can rest and study." },
      { id: "r3", title: "Shared spaces", detail: "Clean up after yourself in the kitchen and lounge — housekeeping does the rest." },
      { id: "r4", title: "Respect & safety", detail: "A respectful, smoke-free environment. Security is everyone's responsibility." },
    ],
  },
];
