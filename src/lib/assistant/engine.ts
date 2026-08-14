import { roomTypes, roomMap, formatPrice, priceFrom } from "@/data/rooms";
import { brandFaqs } from "@/data/faqs";
import { pricing } from "@/data/booking";
import { site, whatsappLink } from "@/data/site";
import {
  statusLabel,
  relativeTime,
  type AvailabilitySnapshot,
  type RoomAvailability,
} from "@/lib/availability/shared";
import { isSeed } from "@/data/availability";

/**
 * The on-site assistant's answer engine.
 *
 * Deterministic and dependency-free: it matches the visitor's message against a
 * small set of intents and the existing FAQ/room/pricing data, and reads live
 * availability from the snapshot passed in. No external AI call, so it's free,
 * private and predictable. Anything it can't answer confidently is handed off
 * to WhatsApp with the question pre-filled — never a dead end.
 */

export interface AssistantRoomView {
  name: string;
  status: RoomAvailability["status"];
  statusText: string;
  bedsAvailable?: number;
  note?: string;
  price: string;
  priceNote?: string;
}

export interface AssistantAnswer {
  /** Paragraphs of the reply (rendered with spacing between them). */
  text: string[];
  /** Optional structured availability cards. */
  rooms?: AssistantRoomView[];
  /** Handoff to a human on WhatsApp — always offered so it's never a dead end. */
  whatsapp: { label: string; message: string };
  /** Follow-up chips. */
  suggestions?: string[];
}

type Intent =
  | "greeting"
  | "availability"
  | "price"
  | "location"
  | "booking"
  | "contact"
  | "faq"
  | "fallback";

// --- text utilities -------------------------------------------------------

function normalize(input: string): string {
  return ` ${input.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim()} `;
}

/** Whole-word for single terms, substring for multi-word phrases. */
function contains(text: string, term: string): boolean {
  return term.includes(" ") ? text.includes(term) : text.includes(` ${term} `);
}

function hits(text: string, terms: string[]): number {
  return terms.reduce((n, t) => (contains(text, t) ? n + 1 : n), 0);
}

// --- keyword sets ---------------------------------------------------------

const AVAIL_KEYWORDS = [
  "seat", "seats", "bed", "beds", "vacancy", "vacancies", "vacant",
  "space", "spaces", "spot", "spots", "availability", "available",
  "any room", "rooms free", "room free", "free room", "occupancy",
  "is there room", "do you have", "any space", "still open", "full",
];
// Strong signals that this is definitely an availability question.
const AVAIL_STRONG = ["seat", "seats", "bed", "beds", "vacancy", "vacancies", "vacant", "spot", "spots"];

const PRICE_KEYWORDS = [
  "price", "prices", "pricing", "cost", "costs", "rent", "rents", "fee", "fees",
  "charge", "charges", "how much", "monthly", "deposit", "per month", "rate", "rates", "budget",
];

const LOCATION_KEYWORDS = [
  "where", "location", "located", "address", "near", "nearby", "distance",
  "directions", "map", "area", "university", "universities", "campus",
  "nust", "fast", "nuces", "air university", "ndu", "bahria", "riphah", "e 11", "e11",
];

const BOOKING_KEYWORDS = [
  "book", "booking", "reserve", "reservation", "check in", "checkin",
  "move in", "movein", "register", "registration", "admission", "documents",
  "how do i join", "how to join", "sign up", "process",
];

const CONTACT_KEYWORDS = [
  "call", "phone", "number", "contact", "talk to", "speak to", "human",
  "agent", "someone", "manager", "reach you", "get in touch",
];

const GREETINGS = ["hi", "hello", "hey", "salam", "asalam", "assalam", "assalamualaikum", "aoa", "yo", "hola"];

// Room-type aliases so "quad" or "4 bed" focuses the availability answer.
const ROOM_ALIASES: { id: string; terms: string[] }[] = [
  { id: "quad", terms: ["quad", "4 bed", "four bed", "4 sharing", "four sharing", "4 seater"] },
  { id: "triple", terms: ["triple", "3 bed", "three bed", "3 sharing", "three sharing"] },
  { id: "double", terms: ["double", "2 bed", "two bed", "2 sharing", "two sharing", "twin"] },
  { id: "single", terms: ["single", "private room", "1 bed", "one bed", "solo", "own room"] },
];

const DEFAULT_SUGGESTIONS = ["Seat availability", "Pricing", "Facilities", "Location", "How to book"];

// --- FAQ matching ---------------------------------------------------------

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "you", "your", "i", "we", "to", "of",
  "in", "on", "for", "and", "or", "at", "it", "my", "me", "can", "have", "has",
  "what", "how", "there", "any", "with", "this", "that", "about", "get",
]);

function tokens(text: string): string[] {
  return text.trim().split(" ").filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function bestFaq(text: string): { answer: string; question: string; score: number } | null {
  const qTokens = tokens(text);
  if (!qTokens.length) return null;
  let best: { answer: string; question: string; score: number } | null = null;
  for (const faq of brandFaqs()) {
    const haystack = normalize(`${faq.question} ${faq.answer}`);
    let score = 0;
    for (const w of qTokens) if (contains(haystack, w)) score += 1;
    if (!best || score > best.score) {
      best = { answer: faq.answer, question: faq.question, score };
    }
  }
  return best;
}

// --- intent detection -----------------------------------------------------

function detectIntent(text: string): { intent: Intent; faqAnswer?: string } {
  const words = text.trim().split(" ").filter(Boolean);
  if (words.length <= 2 && words.some((w) => GREETINGS.includes(w))) {
    return { intent: "greeting" };
  }

  const scores: Record<Exclude<Intent, "greeting" | "faq" | "fallback">, number> = {
    availability: hits(text, AVAIL_KEYWORDS) + hits(text, AVAIL_STRONG) * 2,
    price: hits(text, PRICE_KEYWORDS),
    location: hits(text, LOCATION_KEYWORDS),
    booking: hits(text, BOOKING_KEYWORDS),
    contact: hits(text, CONTACT_KEYWORDS),
  };

  const faq = bestFaq(text);
  const faqScore = faq?.score ?? 0;

  let topIntent: Intent = "fallback";
  let topScore = 0;
  (Object.keys(scores) as (keyof typeof scores)[]).forEach((k) => {
    if (scores[k] > topScore) {
      topScore = scores[k];
      topIntent = k;
    }
  });

  // A strong, specific FAQ match beats a weak generic intent.
  if (faqScore >= 2 && faqScore > topScore) {
    return { intent: "faq", faqAnswer: faq!.answer };
  }
  if (topScore > 0) return { intent: topIntent };
  if (faqScore >= 1) return { intent: "faq", faqAnswer: faq!.answer };
  return { intent: "fallback" };
}

function mentionedRoomId(text: string): string | null {
  for (const { id, terms } of ROOM_ALIASES) {
    if (terms.some((t) => contains(text, t))) return id;
  }
  return null;
}

// --- answer builders ------------------------------------------------------

function roomView(a: RoomAvailability): AssistantRoomView {
  const room = roomMap[a.roomId];
  return {
    name: room?.name ?? a.roomId,
    status: a.status,
    statusText: statusLabel(a.status),
    bedsAvailable: a.bedsAvailable,
    note: a.note,
    price: room ? formatPrice(room.priceMonthly, room.currency) : "",
    priceNote: room?.priceNote,
  };
}

function availabilityAnswer(
  text: string,
  snap: AvailabilitySnapshot,
): AssistantAnswer {
  const focusId = mentionedRoomId(text);
  const list = focusId
    ? snap.rooms.filter((r) => r.roomId === focusId)
    : snap.rooms;
  const views = (list.length ? list : snap.rooms).map(roomView);

  const updatedLine = isSeed(snap)
    ? "Availability changes quickly — confirm the exact bed with the team before you come."
    : `Updated ${relativeTime(snap.updatedAt)}. It changes quickly, so confirm the exact bed with the team.`;

  const anyOpen = views.some((v) => v.status === "available" || v.status === "limited");
  const head = focusId
    ? `Here's the latest on our ${roomMap[focusId]?.name ?? "room"}:`
    : anyOpen
      ? "Here's what's open right now:"
      : "Here's the current status of every room:";

  return {
    text: [head, updatedLine],
    rooms: views,
    whatsapp: {
      label: "Reserve a bed on WhatsApp",
      message: focusId
        ? `Hi Riwaq — is the ${roomMap[focusId]?.name} still available? I'd like to book a bed.`
        : "Hi Riwaq — I'd like to check seat availability and reserve a bed.",
    },
    suggestions: ["Pricing", "How to book", "Facilities", "Location"],
  };
}

function priceAnswer(snap: AvailabilitySnapshot): AssistantAnswer {
  const deposit = pricing.find((p) => p.id === "deposit");
  const lines = roomTypes.map(
    (r) => `• ${r.name}: ${formatPrice(r.priceMonthly, r.currency)} ${r.priceNote ?? ""}`.trim(),
  );
  return {
    text: [
      `Rooms start from ${formatPrice(priceFrom)} / month. Here's the full range:`,
      lines.join("\n"),
      deposit
        ? `${deposit.label}: ${deposit.amount.toLowerCase()} — ${deposit.note}`
        : "WiFi, electricity, water, housekeeping and laundry are included in the rent.",
    ],
    rooms: snap.rooms.map(roomView),
    whatsapp: {
      label: "Ask about pricing on WhatsApp",
      message: "Hi Riwaq — could you share the current pricing and any offers?",
    },
    suggestions: ["Seat availability", "What's included", "How to book"],
  };
}

function locationAnswer(): AssistantAnswer {
  const uni = brandFaqs().find((f) => f.id === "universities");
  return {
    text: [
      `We're at ${site.address.line}, ${site.address.city}.`,
      uni?.answer ??
        "We're a short commute from NUST, FAST-NUCES, Air University, NDU and Bahria University.",
    ],
    whatsapp: {
      label: "Get directions on WhatsApp",
      message: "Hi Riwaq — could you share directions / the map pin to the hostel?",
    },
    suggestions: ["Seat availability", "Pricing", "Book a visit"],
  };
}

function bookingAnswer(): AssistantAnswer {
  const checkin = brandFaqs().find((f) => f.id === "checkin");
  const docs = brandFaqs().find((f) => f.id === "documents");
  return {
    text: [
      "Booking is quick:",
      "1. Send an enquiry (right here on WhatsApp)\n2. We confirm your room and, if you like, arrange a visit\n3. Register and pay the first month's rent + refundable deposit\n4. Move in — often the same day a bed is ready",
      docs?.answer ?? "",
    ].filter(Boolean),
    whatsapp: {
      label: "Start booking on WhatsApp",
      message: "Hi Riwaq — I'd like to book a bed. What are the next steps?",
    },
    suggestions: ["Seat availability", "Pricing", "What documents do I need?"],
  };
}

function contactAnswer(): AssistantAnswer {
  return {
    text: [
      "Happy to connect you with the team directly.",
      `📞 ${site.contact.phoneDisplay}\n💬 WhatsApp is usually fastest — tap below and the front desk normally replies within the hour.`,
    ],
    whatsapp: {
      label: "Chat with the team",
      message: "Hi Riwaq — I'd like to speak with someone about the hostel.",
    },
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

function greetingAnswer(): AssistantAnswer {
  return {
    text: [
      `Assalam-o-alaikum! I'm the Riwaq assistant 👋`,
      "I can check live seat availability, pricing, facilities, location and how to book. What would you like to know?",
    ],
    whatsapp: {
      label: "Chat with us on WhatsApp",
      message: "Hi Riwaq — I'd like to ask about the hostel.",
    },
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

function faqAnswer(answer: string): AssistantAnswer {
  return {
    text: [answer],
    whatsapp: {
      label: "Ask a follow-up on WhatsApp",
      message: "Hi Riwaq — I have a question about the hostel.",
    },
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

function fallbackAnswer(original: string): AssistantAnswer {
  return {
    text: [
      "I want to get this exactly right — the front desk can answer that best.",
      "Tap below and I'll open WhatsApp with your question ready to send. They usually reply within the hour.",
    ],
    whatsapp: {
      label: "Ask the team on WhatsApp",
      message: original.trim()
        ? `Hi Riwaq — ${original.trim()}`
        : "Hi Riwaq — I have a question about the hostel.",
    },
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

// --- entry point ----------------------------------------------------------

/** Answer a visitor message using the FAQ/room data and live availability. */
export function answer(
  message: string,
  snapshot: AvailabilitySnapshot,
): AssistantAnswer {
  const text = normalize(message);
  const { intent, faqAnswer: fa } = detectIntent(text);
  switch (intent) {
    case "greeting":
      return greetingAnswer();
    case "availability":
      return availabilityAnswer(text, snapshot);
    case "price":
      return priceAnswer(snapshot);
    case "location":
      return locationAnswer();
    case "booking":
      return bookingAnswer();
    case "contact":
      return contactAnswer();
    case "faq":
      return faqAnswer(fa!);
    default:
      return fallbackAnswer(message);
  }
}

/** Map a suggestion chip to the query it should run. */
export const SUGGESTION_QUERIES: Record<string, string> = {
  "Seat availability": "Do you have any seats available right now?",
  Pricing: "How much is the rent?",
  Facilities: "What facilities are included?",
  Location: "Where are you located and which universities are nearby?",
  "How to book": "How do I book a bed?",
  "Book a visit": "I'd like to book a visit.",
  "What's included": "What is included in the rent?",
  "What documents do I need?": "What documents do I need to check in?",
};

export { DEFAULT_SUGGESTIONS };
