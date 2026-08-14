import { NextResponse, type NextRequest } from "next/server";
import { readAvailability, writeAvailability } from "@/lib/availability/store";
import {
  AVAILABILITY_STATUSES,
  type RoomAvailability,
} from "@/lib/availability/shared";
import { roomTypes } from "@/data/rooms";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin/auth";

// This route reads/writes a runtime store, so it must never be statically
// cached — always run per request.
export const dynamic = "force-dynamic";

const VALID_ROOM_IDS = new Set(roomTypes.map((r) => r.id));

/** Public: the current availability snapshot for the assistant / room cards. */
export async function GET() {
  const snapshot = await readAvailability();
  return NextResponse.json(snapshot, {
    headers: { "Cache-Control": "no-store" },
  });
}

/** Admin: replace the availability snapshot. Requires a valid session cookie. */
export async function PUT(req: NextRequest) {
  if (!verifyToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawRooms = (body as { rooms?: unknown })?.rooms;
  if (!Array.isArray(rawRooms)) {
    return NextResponse.json(
      { error: "Expected a `rooms` array" },
      { status: 400 },
    );
  }

  const rooms: RoomAvailability[] = [];
  for (const item of rawRooms) {
    const r = item as Partial<RoomAvailability>;
    if (typeof r.roomId !== "string" || !VALID_ROOM_IDS.has(r.roomId)) {
      return NextResponse.json(
        { error: `Unknown roomId: ${String(r.roomId)}` },
        { status: 400 },
      );
    }
    if (!AVAILABILITY_STATUSES.includes(r.status as never)) {
      return NextResponse.json(
        { error: `Invalid status for ${r.roomId}` },
        { status: 400 },
      );
    }
    const entry: RoomAvailability = { roomId: r.roomId, status: r.status! };
    if (r.bedsAvailable !== undefined && r.bedsAvailable !== null) {
      const n = Number(r.bedsAvailable);
      if (!Number.isInteger(n) || n < 0 || n > 999) {
        return NextResponse.json(
          { error: `Invalid bedsAvailable for ${r.roomId}` },
          { status: 400 },
        );
      }
      entry.bedsAvailable = n;
    }
    if (typeof r.note === "string" && r.note.trim()) {
      entry.note = r.note.trim().slice(0, 140);
    }
    rooms.push(entry);
  }

  try {
    const snapshot = await writeAvailability(rooms);
    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[availability] write failed:", err);
    return NextResponse.json(
      { error: "Could not save — check the KV store configuration." },
      { status: 500 },
    );
  }
}
