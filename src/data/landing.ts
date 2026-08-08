import { flagshipBranch } from "./branches";

/**
 * SEO landing pages targeting the exact, high-intent searches prospective
 * residents actually type into Google ("boys hostel near NUST", "hostel in
 * E-11 Islamabad", etc.). Each page has genuinely distinct, useful content —
 * real commute info, who it suits, what's nearby — so they add value rather
 * than being thin "doorway" pages Google would penalise. Add a query here and
 * a fully-formed, indexable page appears at /hostels/<slug>.
 */
export interface LandingSection {
  heading: string;
  body: string;
}

export interface LandingPage {
  slug: string;
  /** The search phrase this page targets. */
  query: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Highlighted distance/stat, e.g. "8 minutes". */
  stat?: { value: string; label: string };
  sections: LandingSection[];
  keywords: string[];
}

const addr = flagshipBranch.address;

export const landingPages: LandingPage[] = [
  {
    slug: "hostel-near-nust",
    query: "boys hostel near NUST",
    metaTitle: "Boys Hostel Near NUST, Islamabad — 8 Minutes from H-12",
    metaDescription:
      "Riwaq Boys Hostel in E-11/2 is about 8 minutes from NUST (H-12), Islamabad. Furnished rooms, high-speed WiFi, CCTV and daily housekeeping — all-inclusive. Book a bed or arrange a visit.",
    eyebrow: "For NUST students",
    h1: "Boys Hostel Near NUST, Islamabad",
    intro:
      "Looking for a boys hostel close to NUST? Riwaq sits in E-11/2, about 8 minutes from the NUST H-12 campus — close enough to roll out of bed and still make an 8 a.m. class, far enough to actually rest. It's a calm, well-run home built for students who'd rather focus on their degree than on their accommodation.",
    stat: { value: "8 min", label: "to NUST (H-12)" },
    sections: [
      {
        heading: "Getting to campus",
        body: "NUST's main H-12 campus is a short 8-minute drive from E-11/2 along the Kashmir Highway corridor, with the Metro Bus and ride-hailing both easy to reach. No more hour-long commutes from far sectors or Rawalpindi — you get that time back for study, sleep and everything else.",
      },
      {
        heading: "Built for how NUST students live",
        body: "Fibre WiFi that holds up during LMS quizzes and online submissions, a quiet environment for exam season, clean washrooms with reliable hot water, and daily housekeeping so your energy goes into your semester — not chores. Single, double, triple and quad-sharing rooms are all furnished and move-in ready.",
      },
      {
        heading: "One honest, all-inclusive rent",
        body: "WiFi, electricity, water, housekeeping and laundry are part of one monthly rent — no surprise bills at the end of the month. A small, refundable deposit (half a month's rent) secures your bed. Message us for current availability and pricing.",
      },
    ],
    keywords: [
      "boys hostel near NUST",
      "hostel near NUST",
      "hostel near NUST H-12",
      "NUST hostel Islamabad",
      "boys hostel near NUST Islamabad",
    ],
  },
  {
    slug: "hostel-near-fast-nuces",
    query: "boys hostel near FAST",
    metaTitle: "Boys Hostel Near FAST-NUCES, Islamabad (H-11) — Riwaq E-11/2",
    metaDescription:
      "Riwaq Boys Hostel in E-11/2 is roughly 10 minutes from FAST-NUCES (H-11), Islamabad. All-inclusive, furnished rooms with WiFi, CCTV and housekeeping. Enquire on WhatsApp.",
    eyebrow: "For FAST-NUCES students",
    h1: "Boys Hostel Near FAST-NUCES, Islamabad",
    intro:
      "Studying at FAST-NUCES? Riwaq Boys Hostel in E-11/2 is about 10 minutes from the FAST H-11 campus — a genuinely short commute for a genuinely well-run hostel. Secure, spotless and all-inclusive, it's made for students who want the details handled so they can get on with a demanding degree.",
    stat: { value: "10 min", label: "to FAST-NUCES (H-11)" },
    sections: [
      {
        heading: "A short hop to H-11",
        body: "FAST-NUCES in H-11 is around 10 minutes from E-11/2. That short, predictable commute means more time for coursework, group projects and rest — and far less stress than travelling in from distant sectors every morning.",
      },
      {
        heading: "Everything a CS/engineering student needs",
        body: "High-speed fibre WiFi for online submissions and late-night debugging, a quiet space to focus, and reliable, clean facilities. Rooms are furnished with a bed, storage and study space, in single through to quad-sharing to suit your budget.",
      },
      {
        heading: "No hidden charges",
        body: "One monthly rent covers WiFi, electricity, water, housekeeping and laundry. A refundable half-month deposit secures your place. WhatsApp us for live availability.",
      },
    ],
    keywords: [
      "boys hostel near FAST",
      "hostel near FAST NUCES",
      "hostel near FAST Islamabad",
      "FAST hostel Islamabad",
      "boys hostel near FAST H-11",
    ],
  },
  {
    slug: "hostel-near-air-university-islamabad",
    query: "boys hostel near Air University",
    metaTitle: "Boys Hostel Near Air University, Islamabad (E-9) — Riwaq E-11/2",
    metaDescription:
      "Riwaq Boys Hostel in E-11/2 is about 9 minutes from Air University (E-9), Islamabad. Furnished, all-inclusive rooms with WiFi, CCTV and daily housekeeping. Enquire on WhatsApp.",
    eyebrow: "For Air University students",
    h1: "Boys Hostel Near Air University, Islamabad",
    intro:
      "Studying at Air University? Riwaq Boys Hostel in E-11/2 is only about 9 minutes from the E-9 campus — a genuinely short commute to a calm, secure, well-run home. It's built for students on a demanding aviation, engineering or CS degree who want their accommodation handled so they can focus on the work.",
    stat: { value: "9 min", label: "to Air University (E-9)" },
    sections: [
      {
        heading: "A quick run to E-9",
        body: "Air University's PAF Complex campus in E-9 sits roughly 9 minutes from E-11/2, with the Kashmir Highway and Metro Bus close by. A short, predictable commute means more time for labs, projects and rest — and none of the daily grind of travelling in from far sectors.",
      },
      {
        heading: "Set up for engineering and aviation students",
        body: "High-speed fibre WiFi that holds up for online submissions and late-night lab work, a quiet space during exam season, and clean, reliable facilities. Rooms are furnished with a bed, storage and study space, in single through to quad-sharing to suit your budget.",
      },
      {
        heading: "One honest, all-inclusive rent",
        body: "WiFi, electricity, water, housekeeping and laundry are part of one monthly rent — no surprise bills. A refundable half-month deposit secures your bed. Message us on WhatsApp for current availability.",
      },
    ],
    keywords: [
      "boys hostel near Air University",
      "hostel near Air University Islamabad",
      "Air University hostel E-9",
      "hostel near Air University E-9",
      "boys hostel near Air University Islamabad",
    ],
  },
  {
    slug: "hostel-near-bahria-university-islamabad",
    query: "boys hostel near Bahria University",
    metaTitle:
      "Boys Hostel Near Bahria University, Islamabad (E-8) — Riwaq E-11/2",
    metaDescription:
      "Riwaq Boys Hostel in E-11/2 is roughly 12 minutes from Bahria University (E-8), Islamabad. All-inclusive furnished rooms with WiFi, CCTV, housekeeping and parking. Book or visit today.",
    eyebrow: "For Bahria University students",
    h1: "Boys Hostel Near Bahria University, Islamabad",
    intro:
      "Looking for a boys hostel close to Bahria University? Riwaq in E-11/2 is about 12 minutes from the E-8 campus — a short, easy commute to a spotless, secure and genuinely well-run home. A calm base whether you're on a business, engineering, computer science or social-sciences programme.",
    stat: { value: "12 min", label: "to Bahria University (E-8)" },
    sections: [
      {
        heading: "An easy commute to E-8",
        body: "Bahria University's E-8 campus is around 12 minutes from E-11/2 along the main avenues, with the Metro Bus and ride-hailing easy to reach. That short trip in each morning keeps your day yours — for classes, group work and rest.",
      },
      {
        heading: "Whatever you're studying",
        body: "Fibre WiFi for online submissions and research, a quiet environment for exam season, and clean, well-kept facilities. Furnished single, double, triple and quad-sharing rooms mean there's an option for every budget.",
      },
      {
        heading: "No hidden charges",
        body: "One monthly rent covers WiFi, electricity, water, housekeeping and laundry. A refundable half-month deposit holds your place. WhatsApp us for live availability and a visit.",
      },
    ],
    keywords: [
      "boys hostel near Bahria University",
      "hostel near Bahria University Islamabad",
      "Bahria University hostel E-8",
      "hostel near Bahria Islamabad",
      "boys hostel near Bahria",
    ],
  },
  {
    slug: "hostel-near-ndu-islamabad",
    query: "boys hostel near NDU",
    metaTitle:
      "Boys Hostel Near NDU, Islamabad (E-9) — Riwaq Boys Hostel E-11/2",
    metaDescription:
      "Riwaq Boys Hostel in E-11/2 is about 9 minutes from NDU (National Defence University, E-9), Islamabad. Furnished, all-inclusive rooms with WiFi, CCTV and housekeeping. Enquire today.",
    eyebrow: "For NDU students",
    h1: "Boys Hostel Near NDU, Islamabad",
    intro:
      "Enrolled at NDU (National Defence University)? Riwaq Boys Hostel in E-11/2 is roughly 9 minutes from the E-9 campus — a calm, secure and spotlessly-run base, close enough for an easy commute and quiet enough to actually study. Made for students who want the details handled.",
    stat: { value: "9 min", label: "to NDU (E-9)" },
    sections: [
      {
        heading: "Minutes from E-9",
        body: "NDU's campus in E-9 is about 9 minutes from E-11/2, with the Kashmir Highway and Metro Bus a short hop away. A quick, predictable commute leaves you more time for reading, coursework and rest instead of the road.",
      },
      {
        heading: "A calm base for serious study",
        body: "For students on Contemporary Studies programmes — international relations, strategic studies, public policy, economics and more — a quiet room and reliable fibre WiFi matter. You get both, plus clean facilities and furnished rooms from quad-sharing to a private single.",
      },
      {
        heading: "Everything in one rent",
        body: "WiFi, electricity, water, housekeeping and laundry are included in a single monthly rent, with no surprise bills. A refundable half-month deposit secures your bed. Message us on WhatsApp for availability.",
      },
    ],
    keywords: [
      "boys hostel near NDU",
      "hostel near National Defence University",
      "NDU hostel Islamabad",
      "hostel near NDU Islamabad",
      "boys hostel near National Defence University",
    ],
  },
  {
    slug: "boys-hostel-in-e-11-islamabad",
    query: "boys hostel in E-11 Islamabad",
    metaTitle: "Boys Hostel in E-11 Islamabad — Riwaq (E-11/2)",
    metaDescription:
      "Riwaq Boys Hostel is located in E-11/2, Islamabad — quiet, green and central. Furnished, all-inclusive rooms with WiFi, CCTV, housekeeping and parking. Book or visit today.",
    eyebrow: "In E-11/2, Islamabad",
    h1: "Boys Hostel in E-11, Islamabad",
    intro:
      "Riwaq Boys Hostel is right in E-11/2 — one of Islamabad's quietest, greenest and best-connected sectors. If you're searching for a boys hostel in E-11, this is a calm, secure, spotlessly-run home minutes from the western universities and easy transport.",
    stat: { value: "E-11/2", label: "Services Society, Islamabad" },
    sections: [
      {
        heading: "Why E-11 works",
        body: "E-11 is leafy, residential and central — close to NUST, FAST, Air University and Bahria, with the Kashmir Highway and Metro Bus a few minutes away, and everyday shops, pharmacies and eateries within walking distance of the hostel.",
      },
      {
        heading: "A hostel that's actually looked after",
        body: "Controlled entry and CCTV, daily housekeeping, clean washrooms, a shared kitchen, filtered water, laundry and parking — the essentials done properly. Furnished rooms from quad-sharing to a private single.",
      },
      {
        heading: "Come and see it",
        body: `We're at ${addr}. Message us on WhatsApp and we'll arrange a visit at a time that suits you, or answer any question about rooms and availability.`,
      },
    ],
    keywords: [
      "boys hostel in E-11 Islamabad",
      "hostel in E-11 Islamabad",
      "hostel E-11/2 Islamabad",
      "boys hostel E-11",
      "E-11 hostel Islamabad",
    ],
  },
  {
    slug: "student-accommodation-in-islamabad",
    query: "student accommodation Islamabad",
    metaTitle: "Student Accommodation in Islamabad — Riwaq Boys Hostel (E-11/2)",
    metaDescription:
      "Affordable, all-inclusive student accommodation in Islamabad. Riwaq Boys Hostel in E-11/2 offers furnished rooms, WiFi, CCTV, housekeeping and a genuine community — minutes from NUST & FAST.",
    eyebrow: "Student living, done properly",
    h1: "Student Accommodation in Islamabad",
    intro:
      "New to Islamabad for university or work? Riwaq Boys Hostel offers considered, all-inclusive student accommodation in E-11/2 — secure, spotless and genuinely well-run, at a price that makes sense. It's the easy answer to \"where will I live?\"",
    stat: { value: "From 6 months", label: "one-semester minimum" },
    sections: [
      {
        heading: "Everything included, nothing hidden",
        body: "One monthly rent covers WiFi, electricity, water, housekeeping and laundry — so there are no surprise bills. A refundable half-month deposit secures your bed, and the minimum contract is a single semester (about six months).",
      },
      {
        heading: "Close to the universities that matter",
        body: "From E-11/2 you're minutes from NUST (~8), FAST-NUCES (~10), Air University (~9), NDU (~9) and Bahria (~12), with the Metro Bus and Kashmir Highway close by — an easy base whichever campus you're headed to.",
      },
      {
        heading: "A real community, not just a room",
        body: "Quiet when you need to study, social when you don't. Furnished rooms, clean shared spaces and staff who actually respond — a home base you can settle into for the year.",
      },
    ],
    keywords: [
      "student accommodation Islamabad",
      "student hostel Islamabad",
      "accommodation for students Islamabad",
      "boys hostel Islamabad",
      "affordable hostel Islamabad",
    ],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}

export function getLandingSlugs(): string[] {
  return landingPages.map((p) => p.slug);
}
