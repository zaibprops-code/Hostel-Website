import type { FaqItem } from "@/types";

/**
 * FAQs are categorised so the list can grow into a searchable, grouped help
 * section without restructuring. The homepage shows a curated subset; the
 * /faq page renders everything grouped by category and emits FAQ structured
 * data for SEO.
 */
export const faqs: FaqItem[] = [
  {
    id: "wifi",
    question: "Is WiFi included in the rent?",
    answer:
      "Yes. High-speed fibre WiFi is included in every room and common area at no extra cost — no separate internet bill and no data caps.",
    category: "facilities",
  },
  {
    id: "electricity",
    question: "Is electricity included in the rent?",
    answer:
      "Yes — electricity is included in the monthly rent (heavy personal appliances may be metered separately). Air conditioning and heating are available as optional add-ons.",
    category: "facilities",
  },
  {
    id: "food",
    question: "Is food available?",
    answer:
      "We provide a clean, well-equipped shared kitchen so you can cook your own meals, and there are trusted local tiffin services and eateries within walking distance. Managed meal plans are on our roadmap as we grow.",
    category: "facilities",
  },
  {
    id: "furnished",
    question: "Are the rooms furnished?",
    answer:
      "Fully furnished. Every bed comes with a mattress, a personal wardrobe with lockable storage, and a study desk. You only need to bring your bedding and personal belongings.",
    category: "facilities",
  },
  {
    id: "deposit",
    question: "Is there a security deposit?",
    answer:
      "Yes — a one-time, refundable security deposit equal to half of one month's rent is collected at check-in. It's returned in full when you leave, less any damages beyond normal wear.",
    category: "payments",
  },
  {
    id: "visitors",
    question: "Are visitors allowed?",
    answer:
      "Guests are welcome in the common areas during the day and must be signed in. This keeps the building secure for everyone. Overnight guests are not permitted.",
    category: "policies",
  },
  {
    id: "security",
    question: "How is security managed?",
    answer:
      "Entry is controlled through a single point, HD CCTV covers the entrances and shared corridors, and the hostel manager is on site day to day. It's a calm, monitored environment.",
    category: "policies",
  },
  {
    id: "documents",
    question: "What documents are required to check in?",
    answer:
      "A copy of your CNIC (or B-Form / passport), your student ID or a letter from your employer, and one recent photograph. A local guardian or emergency contact is also noted for your file.",
    category: "booking",
  },
  {
    id: "universities",
    question: "Which universities are nearby?",
    answer:
      "We're within a short commute of NUST, FAST-NUCES, Bahria University, Riphah, and the Blue Area business district, with regular transport on the main routes. See the Contact page for the map and directions.",
    category: "location",
  },
  {
    id: "checkin",
    question: "What is the check-in procedure?",
    answer:
      "Reserve your bed with a WhatsApp message or a quick call, complete a short registration with your documents, pay the first month's rent and the refundable deposit, and you can move in the same day where a bed is ready.",
    category: "booking",
  },
  {
    id: "minimum-stay",
    question: "Is there a minimum stay?",
    answer:
      "Our minimum contract is one semester (about six months). Longer stays are very welcome, and we're happy to discuss the details with you.",
    category: "policies",
  },
  {
    id: "girls",
    question: "Do you have accommodation for girls?",
    answer:
      "Our first branch is a boys hostel. A dedicated girls hostel is part of our near-term expansion plan — join the waitlist via the contact form and we'll notify you the moment it opens.",
    category: "booking",
  },
];

export const faqCategories: { id: NonNullable<FaqItem["category"]>; label: string }[] = [
  { id: "booking", label: "Booking & check-in" },
  { id: "facilities", label: "Facilities & services" },
  { id: "payments", label: "Pricing & payments" },
  { id: "policies", label: "House policies" },
  { id: "location", label: "Location" },
];

export function faqsByCategory(category: FaqItem["category"]): FaqItem[] {
  return brandFaqs().filter((f) => f.category === category);
}

/** Brand-level FAQs (apply to every Riwaq branch). */
export function brandFaqs(): FaqItem[] {
  return faqs.filter((f) => !f.branchId);
}

/** FAQs specific to one branch (excludes brand-level ones). */
export function faqsForBranch(branchId: string): FaqItem[] {
  return faqs.filter((f) => f.branchId === branchId);
}
