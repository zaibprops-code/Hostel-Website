import { roomTypes } from "./rooms";
import type { AvailabilitySnapshot } from "@/lib/availability/shared";

/**
 * The default availability snapshot, derived from each room's static
 * `availability` flag. This is what visitors see before the front desk has
 * saved any live update — and the fallback if the KV store is unreachable.
 */
export function seedAvailability(): AvailabilitySnapshot {
  return {
    rooms: roomTypes.map((r) => ({
      roomId: r.id,
      status: r.availability ?? "available",
    })),
    // Epoch marks this as "seed, never edited" so the UI can hide the
    // "updated X ago" line until a real edit has happened.
    updatedAt: new Date(0).toISOString(),
  };
}

/** Whether a snapshot is still the untouched seed (no admin edit yet). */
export function isSeed(snap: AvailabilitySnapshot): boolean {
  return new Date(snap.updatedAt).getTime() === 0;
}
