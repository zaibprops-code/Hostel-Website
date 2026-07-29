import type { Review } from "@/types";

/**
 * Testimonials. Structured with a `source` so the same component can later
 * render a live Google Reviews feed alongside curated resident quotes — no
 * markup changes required, just more items in this array.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    author: "Hamza Iqbal",
    role: "CS student · FAST-NUCES",
    rating: 5,
    quote:
      "I moved in expecting a typical hostel and got something far better. It's clean, genuinely quiet when you need to study, and the WiFi actually holds up during online exams. My parents stopped worrying after the first week.",
    date: "2026-05",
    source: "resident",
  },
  {
    id: "r2",
    author: "Bilal Ahmed",
    role: "Software Engineer · Systems Ltd",
    rating: 5,
    quote:
      "As someone working full-time, reliable internet and a quiet, clean room are non-negotiable — Riwaq delivers on both. The single room is worth every rupee for the peace and quiet.",
    date: "2026-04",
    source: "resident",
  },
  {
    id: "r3",
    author: "Mr. Naveed (Parent)",
    role: "Parent of a resident",
    rating: 5,
    quote:
      "What sold me was the security — CCTV and one controlled entrance. I can see my son is somewhere organised and safe. The management actually answers the phone when I call.",
    date: "2026-03",
    source: "parent",
  },
  {
    id: "r4",
    author: "Usman Tariq",
    role: "Medical student · Shifa",
    rating: 5,
    quote:
      "The housekeeping is what surprised me most — common areas are cleaned every single day. Coming back from a long hospital shift to a tidy place makes a real difference.",
    date: "2026-05",
    source: "resident",
  },
  {
    id: "r5",
    author: "Abdul Rehman",
    role: "MBA student · NUST",
    rating: 5,
    quote:
      "Fair pricing, no hidden charges, and everything they showed me on the tour was exactly what I got. The study room is a lifesaver during finals. Highly recommend to anyone new to Islamabad.",
    date: "2026-02",
    source: "resident",
  },
  {
    id: "r6",
    author: "Saad Malik",
    role: "Resident since 2025",
    rating: 5,
    quote:
      "It's the little things — filtered water on every floor, hot water that actually works in the morning, staff who know your name. It feels less like a hostel and more like a well-run home.",
    date: "2026-01",
    source: "google",
  },
];

export const averageRating =
  Math.round(
    (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10,
  ) / 10;

export const reviewCount = reviews.length;
