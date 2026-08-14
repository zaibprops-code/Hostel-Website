"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  AVAILABILITY_STATUSES,
  statusLabel,
  statusTone,
  relativeTime,
  type AvailabilitySnapshot,
  type RoomAvailability,
} from "@/lib/availability/shared";
import { isSeed } from "@/data/availability";
import type { Availability } from "@/types";

/**
 * Front-desk panel to update live seat availability. Lives at /admin/availability
 * (noindex, password-gated). The public assistant and room cards read whatever
 * is saved here — no redeploy needed once Vercel KV is configured.
 */

interface RoomMeta {
  id: string;
  name: string;
  occupancyLabel: string;
  price: string;
}

interface Props {
  authed: boolean;
  configured: boolean;
  persistent: boolean;
  rooms: RoomMeta[];
  initial: AvailabilitySnapshot;
}

const toneRing: Record<string, string> = {
  green: "text-emerald-700",
  amber: "text-amber-700",
  red: "text-rose-700",
};

export function AdminAvailability(props: Props) {
  const [authed, setAuthed] = useState(props.authed);
  if (!props.configured) return <Shell><NotConfigured /></Shell>;
  if (!authed) return <Shell><Login onSuccess={() => setAuthed(true)} /></Shell>;
  return (
    <Shell>
      <Editor {...props} />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-4 py-12">
      {children}
    </main>
  );
}

function NotConfigured() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
      <h1 className="text-lg font-semibold">Admin not set up yet</h1>
      <p className="mt-2 text-sm">
        Add an <code className="rounded bg-amber-100 px-1">ADMIN_PASSWORD</code>{" "}
        environment variable (and a Vercel KV store for durable saves), then
        reload this page to sign in.
      </p>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Sign-in failed.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-sm rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 text-forest-800">
        <Icon name="shield" size={22} />
        <h1 className="text-lg font-semibold">Availability admin</h1>
      </div>
      <p className="mt-1 text-sm text-ink-muted">
        Enter the front-desk password to update seat availability.
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
        className="mt-4 w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-900 focus:border-brass-400 focus:outline-none focus:ring-2 focus:ring-brass-400/30"
      />
      {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-4 w-full rounded-full bg-forest-700 px-5 py-3 font-medium text-ivory transition-colors hover:bg-forest-800 disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function Editor({ rooms, initial, persistent }: Props) {
  const byId = useMemo(
    () => new Map(initial.rooms.map((r) => [r.roomId, r])),
    [initial],
  );
  const [state, setState] = useState<Record<string, RoomAvailability>>(() => {
    const seed: Record<string, RoomAvailability> = {};
    for (const r of rooms) {
      const cur = byId.get(r.id);
      seed[r.id] = {
        roomId: r.id,
        status: cur?.status ?? "available",
        bedsAvailable: cur?.bedsAvailable,
        note: cur?.note,
      };
    }
    return seed;
  });
  const [updatedAt, setUpdatedAt] = useState(initial.updatedAt);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function patch(id: string, next: Partial<RoomAvailability>) {
    setState((s) => ({ ...s, [id]: { ...s[id], ...next } }));
    setMsg(null);
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rooms: Object.values(state) }),
      });
      if (res.ok) {
        const snap = (await res.json()) as AvailabilitySnapshot;
        setUpdatedAt(snap.updatedAt);
        setMsg({ ok: true, text: "Saved — the site is now live with these numbers." });
      } else if (res.status === 401) {
        setMsg({ ok: false, text: "Session expired — please reload and sign in again." });
      } else {
        const data = await res.json().catch(() => ({}));
        setMsg({ ok: false, text: data.error ?? "Could not save." });
      }
    } catch {
      setMsg({ ok: false, text: "Network error — please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.reload();
  }

  return (
    <div className="w-full">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-forest-800">Seat availability</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {isSeed({ rooms: [], updatedAt })
              ? "Not edited yet — showing catalog defaults."
              : `Last updated ${relativeTime(updatedAt)}.`}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-forest-700/25 px-3 py-1.5 text-sm text-forest-800 transition-colors hover:bg-forest-700/5"
        >
          Sign out
        </button>
      </header>

      {!persistent && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Preview mode:</strong> no Vercel KV store is configured, so
          saves won&apos;t persist across deploys or server restarts. Add{" "}
          <code className="rounded bg-amber-100 px-1">KV_REST_API_URL</code> and{" "}
          <code className="rounded bg-amber-100 px-1">KV_REST_API_TOKEN</code> to
          go live.
        </div>
      )}

      <ul className="space-y-3">
        {rooms.map((room) => {
          const cur = state[room.id];
          return (
            <li
              key={room.id}
              className="rounded-2xl border border-forest-900/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-forest-900">{room.name}</p>
                  <p className="text-xs text-ink-muted">
                    {room.occupancyLabel} · {room.price}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    toneRing[statusTone(cur.status)],
                  )}
                >
                  {statusLabel(cur.status)}
                </span>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABILITY_STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => patch(room.id, { status: s as Availability })}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors",
                        cur.status === s
                          ? "bg-forest-700 text-ivory ring-forest-700"
                          : "bg-white text-forest-800 ring-forest-700/25 hover:bg-forest-700/5",
                      )}
                    >
                      {statusLabel(s as Availability)}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-ink-muted">
                  Beds open
                  <input
                    type="number"
                    min={0}
                    max={999}
                    value={cur.bedsAvailable ?? ""}
                    onChange={(e) =>
                      patch(room.id, {
                        bedsAvailable:
                          e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    placeholder="—"
                    className="w-16 rounded-lg border border-forest-900/15 px-2 py-1.5 text-center text-sm text-forest-900 focus:border-brass-400 focus:outline-none focus:ring-2 focus:ring-brass-400/30"
                  />
                </label>
              </div>

              <input
                type="text"
                value={cur.note ?? ""}
                maxLength={140}
                onChange={(e) => patch(room.id, { note: e.target.value })}
                placeholder="Optional note (e.g. 1 bed opening on the 5th)"
                className="mt-3 w-full rounded-lg border border-forest-900/15 px-3 py-2 text-sm text-forest-900 placeholder:text-ink-muted/70 focus:border-brass-400 focus:outline-none focus:ring-2 focus:ring-brass-400/30"
              />
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-4 mt-5 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="flex-1 rounded-full bg-brass-400 px-5 py-3 font-semibold text-forest-900 shadow-sm transition-colors hover:bg-brass-300 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save availability"}
        </button>
      </div>

      {msg && (
        <p
          role="status"
          className={cn(
            "mt-3 rounded-xl px-4 py-3 text-sm font-medium",
            msg.ok
              ? "bg-emerald-50 text-emerald-800"
              : "bg-rose-50 text-rose-700",
          )}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}
