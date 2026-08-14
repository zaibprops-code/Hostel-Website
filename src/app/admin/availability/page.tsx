import type { Metadata } from "next";
import { cookies } from "next/headers";
import { roomTypes, formatPrice } from "@/data/rooms";
import { readAvailability } from "@/lib/availability/store";
import { isPersistent } from "@/lib/availability/store";
import {
  ADMIN_COOKIE,
  isAdminConfigured,
  verifyToken,
} from "@/lib/admin/auth";
import { AdminAvailability } from "./AdminAvailability";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Availability admin",
  robots: { index: false, follow: false },
};

export default async function AdminAvailabilityPage() {
  const cookieStore = await cookies();
  const authed = verifyToken(cookieStore.get(ADMIN_COOKIE)?.value);
  const snapshot = await readAvailability();

  const rooms = roomTypes.map((r) => ({
    id: r.id,
    name: r.name,
    occupancyLabel: r.occupancyLabel,
    price: formatPrice(r.priceMonthly, r.currency),
  }));

  return (
    <AdminAvailability
      authed={authed}
      configured={isAdminConfigured()}
      persistent={isPersistent()}
      rooms={rooms}
      initial={snapshot}
    />
  );
}
