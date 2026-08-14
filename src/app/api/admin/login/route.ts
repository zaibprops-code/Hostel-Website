import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  checkPassword,
  cookieOptions,
  isAdminConfigured,
  makeToken,
} from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

/** Exchange the admin password for a signed session cookie. */
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin access isn't set up yet. Add an ADMIN_PASSWORD environment variable.",
      },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), cookieOptions);
  return res;
}
