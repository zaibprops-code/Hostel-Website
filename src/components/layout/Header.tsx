"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { branches } from "@/data/branches";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // JS-driven hover for the nav. Tailwind's `hover:`/`group-hover:` are gated
  // behind `@media (hover: hover)`, which fails on touchscreen laptops (coarse
  // pointer) — so both the Branches dropdown and per-item hover colours are
  // driven by real pointer/focus state instead, working on any device.
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock scroll while it's open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // "light" = header sitting transparently over a page's dark hero.
  const light = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-forest-900/10 bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        {/* Over the dark hero the header is transparent, so the mark goes
            light; once scrolled it sits on ivory and returns to dark. */}
        <Logo tone={light ? "light" : "dark"} size="lg" />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 lg:mr-6 lg:flex xl:mr-16 xl:gap-1.5"
        >
          {site.nav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isBranches =
              link.href === "/branches" && branches.length > 0;
            const open = isBranches && branchesOpen;
            const isHovered = hovered === link.href || open;

            // Colour states: active = solid brand colour; hovered/menu-open =
            // brass accent; resting = muted. The brass underline marks both the
            // current page and the branch whose dropdown is showing, so the
            // menu is clearly tied to "Branches".
            const color = active
              ? light
                ? "text-ivory"
                : "text-forest-800"
              : isHovered
                ? light
                  ? "text-brass-300"
                  : "text-brass-600"
                : light
                  ? "text-ivory/75"
                  : "text-ink-soft";
            const linkClass = cn(
              "relative rounded-full px-2.5 py-2 text-[15px] font-medium transition-colors xl:px-3.5 xl:text-base",
              color,
            );
            // A single, consistent underline for every state — it animates in
            // from the centre on hover and stays put for the active page and
            // the open Branches menu. Same treatment everywhere, so it reads as
            // part of the design rather than an add-on.
            const showUnderline = active || isHovered;
            const underline = (
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-2.5 bottom-1 h-0.5 origin-center rounded-full bg-brass-400 transition-transform duration-200 xl:inset-x-3.5",
                  showUnderline ? "scale-x-100" : "scale-x-0",
                )}
              />
            );

            // The Branches item reveals a dropdown of every branch on hover /
            // focus. It's data-driven, so new branches appear automatically.
            if (isBranches) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setBranchesOpen(true)}
                  onMouseLeave={() => setBranchesOpen(false)}
                  onFocus={() => setBranchesOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setBranchesOpen(false);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={branchesOpen}
                    className={linkClass}
                  >
                    {link.label}
                    {underline}
                  </Link>
                  <BranchesDropdown open={branchesOpen} activeSlug={pathname} />
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() =>
                  setHovered((h) => (h === link.href ? null : h))
                }
                onFocus={() => setHovered(link.href)}
                onBlur={() =>
                  setHovered((h) => (h === link.href ? null : h))
                }
                className={linkClass}
              >
                {link.label}
                {underline}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
            light
              ? "text-ivory hover:bg-ivory/10"
              : "text-forest-800 hover:bg-forest-700/5",
          )}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="border-t border-forest-900/10 bg-ivory px-5 pb-8 pt-2">
          <nav aria-label="Mobile" className="flex flex-col">
            {site.nav.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-forest-900/5 py-3.5 text-lg",
                      active ? "text-forest-800" : "text-ink-soft",
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
                    )}
                  </Link>
                  {/* Branch sublist — mirrors the desktop dropdown. */}
                  {link.href === "/branches" && branches.length > 0 && (
                    <ul className="border-b border-forest-900/5 py-1.5">
                      {branches.map((b) => (
                        <li key={b.id}>
                          <Link
                            href={`/branches/${b.slug}`}
                            className="flex items-center gap-2.5 py-2 pl-4 text-sm text-ink-soft"
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 shrink-0 rounded-full",
                                b.status === "open"
                                  ? "bg-emerald-500"
                                  : "bg-brass-400",
                              )}
                            />
                            {b.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/rooms" variant="brass" size="lg">
              Explore rooms
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * The Branches mega-menu. Data-driven from the branch registry, so new
 * branches appear here automatically. Revealed on hover and on keyboard focus
 * (focus-within); the transparent padding at the top bridges the gap so the
 * menu doesn't close as the pointer travels from the trigger to the panel.
 */
function BranchesDropdown({
  open,
  activeSlug,
}: {
  open: boolean;
  activeSlug: string;
}) {
  // JS hover for the rows too (CSS :hover is gated behind @media (hover:hover)).
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 pt-3 transition-all duration-200",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-1 opacity-0",
      )}
    >
      <div className="w-80 overflow-hidden rounded-2xl border border-forest-900/10 bg-ivory p-2 shadow-xl shadow-forest-950/10">
        <p className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Our branches
        </p>
        <ul className="space-y-0.5">
          {branches.map((b) => {
            const isOpen = b.status === "open";
            const isActive = activeSlug === `/branches/${b.slug}`;
            const highlighted = isActive || hoveredKey === b.id;
            return (
              <li key={b.id}>
                <Link
                  href={`/branches/${b.slug}`}
                  onMouseEnter={() => setHoveredKey(b.id)}
                  onMouseLeave={() =>
                    setHoveredKey((k) => (k === b.id ? null : k))
                  }
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors",
                    highlighted ? "bg-forest-50" : "",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        isOpen ? "bg-emerald-500" : "bg-brass-400",
                      )}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-forest-800">
                        {b.name}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {b.area}, {b.city}
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-[0.6rem] font-semibold uppercase tracking-wide",
                      isOpen ? "text-emerald-600" : "text-brass-600",
                    )}
                  >
                    {isOpen ? "Open" : "Soon"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-1 border-t border-forest-900/8 pt-1">
          <Link
            href="/branches"
            onMouseEnter={() => setHoveredKey("all")}
            onMouseLeave={() =>
              setHoveredKey((k) => (k === "all" ? null : k))
            }
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              hoveredKey === "all"
                ? "bg-forest-50 text-forest-900"
                : "text-forest-700",
            )}
          >
            View all branches
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? "M6 6l12 12" : "M4 7h16"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d={open ? "M18 6L6 18" : "M4 12h16"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={open ? "" : ""}
      />
      {!open && (
        <path
          d="M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
