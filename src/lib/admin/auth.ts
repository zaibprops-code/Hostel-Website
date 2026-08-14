import crypto from "node:crypto";

/**
 * Minimal admin session handling for the availability panel.
 *
 * Auth is a single shared password (`ADMIN_PASSWORD`). On login we hand back a
 * short HMAC-signed token stored in an httpOnly cookie; write requests verify
 * it. This is deliberately lightweight — right-sized for one front desk
 * updating vacancies, not a multi-user CMS. Swap in a real identity provider
 * later without touching the API surface.
 */

export const ADMIN_COOKIE = "riwaq_admin";
/** Session lifetime — the front desk re-enters the password after this. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

function sessionSecret(): string {
  // A dedicated secret is preferred; fall back to the password so the feature
  // works with a single env var configured.
  return (
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""
  );
}

/** True only if an admin password is configured at all. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Constant-time compare of the submitted password. */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("hex");
}

/** Issue a signed session token. */
export function makeToken(): string {
  const payload = `admin.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token: correct signature and not expired. */
export function verifyToken(token: string | undefined): boolean {
  if (!token || !sessionSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, ts, sig] = parts;
  if (role !== "admin") return false;
  const expected = sign(`${role}.${ts}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;
  const issued = Number(ts);
  if (!issued || Number.isNaN(issued)) return false;
  return Date.now() - issued < MAX_AGE_SECONDS * 1000;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
