"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { roomTypes } from "@/data/rooms";
import { site } from "@/data/site";
import { branches } from "@/data/branches";
import { cn } from "@/lib/cn";

/**
 * Booking-enquiry form.
 *
 * With no backend yet, it composes a complete, structured message and hands
 * off to WhatsApp — the channel residents in Pakistan actually use, and an
 * instant, trackable lead for the front desk. The shape of the form (and its
 * validation) is ready to POST to a `/api/enquiry` route or a CRM the moment
 * one exists; only `handleSubmit` would change.
 */

const fieldBase =
  "w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-900 placeholder:text-ink-muted/70 transition-colors focus:border-brass-400 focus:outline-none focus:ring-2 focus:ring-brass-400/30";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    if (!name || !phone) {
      setError("Please share your name and a phone number so we can reach you.");
      return;
    }
    setError(null);

    const room = data.get("room") as string;
    const branch = data.get("branch") as string;
    const moveIn = data.get("moveIn") as string;
    const message = (data.get("message") as string)?.trim();

    const lines = [
      `New enquiry via riwaqhostels.com`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      branch && `Branch: ${branch}`,
      room && `Room: ${room}`,
      moveIn && `Preferred move-in: ${moveIn}`,
      message && `Message: ${message}`,
    ].filter(Boolean);

    const wa = `https://wa.me/${site.contact.whatsapp.replace(
      /[^0-9]/g,
      "",
    )}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.open(wa, "_blank", "noopener,noreferrer");
    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Icon name="check" size={30} />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-forest-800">
          Your enquiry is on its way.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
          We&apos;ve opened WhatsApp with your details — just hit send. The front
          desk usually replies within the hour.
        </p>
        <Button
          onClick={() => setSent(false)}
          variant="secondary"
          size="sm"
          className="mt-6"
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input name="name" type="text" required autoComplete="name" className={fieldBase} placeholder="Your name" />
        </Field>
        <Field label="Phone / WhatsApp" required>
          <input name="phone" type="tel" required autoComplete="tel" className={fieldBase} placeholder="+92 3XX XXXXXXX" />
        </Field>
        <Field label="Branch">
          <select name="branch" className={cn(fieldBase, "appearance-none")} defaultValue={branches[0].shortName}>
            {branches.map((b) => (
              <option key={b.id} value={b.shortName}>
                {b.name}
                {b.status !== "open" ? " (opening soon)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Room type">
          <select name="room" className={cn(fieldBase, "appearance-none")} defaultValue="">
            <option value="">No preference</option>
            {roomTypes.map((r) => (
              <option key={r.id} value={`${r.name} (${r.occupancyLabel})`}>
                {r.name} — {r.occupancyLabel}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred move-in">
          <input name="moveIn" type="month" className={fieldBase} />
        </Field>
        <Field label="Anything else?" className="sm:col-span-2">
          <textarea
            name="message"
            rows={4}
            className={cn(fieldBase, "resize-y")}
            placeholder="Tell us a little about what you're looking for…"
          />
        </Field>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="brass" size="lg">
          <Icon name="whatsapp" size={18} />
          Send enquiry
        </Button>
        <p className="text-xs text-ink-muted">
          We&apos;ll only use your details to reply to this enquiry.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-forest-800">
        {label}
        {required && <span className="text-brass-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
