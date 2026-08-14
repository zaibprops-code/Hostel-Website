import type { Availability } from "@/types";

/**
 * Live seat/bed availability — the source of truth for "is there space right
 * now?". Kept deliberately small and framework-free so it can be imported from
 * the server (API routes, admin page) and the client (assistant widget) alike.
 *
 * The seed comes from each room's static `availability` flag in data/rooms.ts;
 * the admin panel then overrides it at runtime (persisted via Vercel KV), so
 * the front desk can update vacancies without a redeploy.
 */

export interface RoomAvailability {
  /** Matches RoomType.id in data/rooms.ts. */
  roomId: string;
  /** Coarse booking state, shown as a coloured pill everywhere. */
  status: Availability;
  /** Optional exact number of open beds — omit if you only track status. */
  bedsAvailable?: number;
  /** Optional one-line note from the front desk (e.g. "1 opening on 5th"). */
  note?: string;
}

export interface AvailabilitySnapshot {
  rooms: RoomAvailability[];
  /** ISO timestamp of the last update. */
  updatedAt: string;
}

export const AVAILABILITY_STATUSES: Availability[] = [
  "available",
  "limited",
  "waitlist",
  "full",
];

export type StatusTone = "green" | "amber" | "red";

/** Human label for a status — used in the assistant and admin UI. */
export function statusLabel(status: Availability): string {
  switch (status) {
    case "available":
      return "Beds available";
    case "limited":
      return "Limited — a few left";
    case "waitlist":
      return "Waitlist";
    case "full":
      return "Full";
    default:
      return "Ask us";
  }
}

/** Traffic-light tone for a status, so every surface colours it consistently. */
export function statusTone(status: Availability): StatusTone {
  switch (status) {
    case "available":
      return "green";
    case "limited":
    case "waitlist":
      return "amber";
    case "full":
      return "red";
    default:
      return "amber";
  }
}

/** True when at least one bed can be booked right now. */
export function isBookable(a: RoomAvailability): boolean {
  if (a.status === "full") return false;
  if (a.status === "waitlist") return false;
  if (typeof a.bedsAvailable === "number") return a.bedsAvailable > 0;
  return a.status === "available" || a.status === "limited";
}

/**
 * Merge a stored snapshot over the seed. The seed defines the canonical room
 * list (so newly-added room types always appear); any stored override wins.
 */
export function reconcile(
  stored: AvailabilitySnapshot | null,
  seed: AvailabilitySnapshot,
): AvailabilitySnapshot {
  if (!stored) return seed;
  const byId = new Map(stored.rooms.map((r) => [r.roomId, r]));
  return {
    rooms: seed.rooms.map((s) => byId.get(s.roomId) ?? s),
    updatedAt: stored.updatedAt || seed.updatedAt,
  };
}

/** "just now" / "3 hours ago" / "2 days ago" — for the "updated …" line. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (!then || Number.isNaN(then)) return "recently";
  const diff = Date.now() - then;
  if (diff < 60_000) return "just now";
  const mins = Math.round(diff / 60_000);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
