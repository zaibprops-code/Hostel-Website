import { seedAvailability } from "@/data/availability";
import {
  reconcile,
  type AvailabilitySnapshot,
  type RoomAvailability,
} from "./shared";

/**
 * Server-only persistence for live availability.
 *
 * In production it uses Vercel KV (Upstash Redis REST API) when the standard
 * `KV_REST_API_URL` + `KV_REST_API_TOKEN` env vars are present — set these up
 * once from the Vercel dashboard (Storage → KV) and admin edits persist across
 * deploys and serverless instances.
 *
 * Without those vars (e.g. local dev), it falls back to a module-level cache so
 * the feature still works end-to-end while you're building. That cache is
 * per-instance and resets on cold starts, so it is NOT suitable for production
 * persistence — configure KV before going live.
 */

const KEY = "riwaq:availability";
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const kvEnabled = Boolean(KV_URL && KV_TOKEN);

/** Dev/preview fallback store (not durable — see note above). */
let memory: AvailabilitySnapshot | null = null;

/** True when edits are durably persisted (KV configured). */
export function isPersistent(): boolean {
  return kvEnabled;
}

async function kvGet(): Promise<AvailabilitySnapshot | null> {
  const res = await fetch(`${KV_URL}/get/${KEY}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV read failed: ${res.status}`);
  const data = (await res.json()) as { result: string | null };
  if (!data.result) return null;
  try {
    return JSON.parse(data.result) as AvailabilitySnapshot;
  } catch {
    return null;
  }
}

async function kvSet(snap: AvailabilitySnapshot): Promise<void> {
  const res = await fetch(`${KV_URL}/set/${KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snap),
  });
  if (!res.ok) throw new Error(`KV write failed: ${res.status}`);
}

/** Read the current availability, reconciled against the room catalog. */
export async function readAvailability(): Promise<AvailabilitySnapshot> {
  const seed = seedAvailability();
  let stored: AvailabilitySnapshot | null = null;
  try {
    stored = kvEnabled ? await kvGet() : memory;
  } catch (err) {
    // Never let a store hiccup break the page — fall back to the seed.
    console.error("[availability] read failed, using seed:", err);
    stored = null;
  }
  return reconcile(stored, seed);
}

/** Persist a new set of room availabilities and return the reconciled result. */
export async function writeAvailability(
  rooms: RoomAvailability[],
): Promise<AvailabilitySnapshot> {
  const snap: AvailabilitySnapshot = {
    rooms,
    updatedAt: new Date().toISOString(),
  };
  if (kvEnabled) {
    await kvSet(snap);
  } else {
    memory = snap;
  }
  return reconcile(snap, seedAvailability());
}
