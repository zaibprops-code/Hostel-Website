"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
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
        <Logo tone={light ? "light" : "dark"} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {site.nav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  light
                    ? active
                      ? "text-ivory"
                      : "text-ivory/70 hover:text-ivory"
                    : active
                      ? "text-forest-800"
                      : "text-ink-soft hover:text-forest-800",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-brass-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={whatsappLink("Hi Riwaq — I'd like to ask about availability.")}
            variant="brass"
            size="sm"
            external
          >
            <Icon name="whatsapp" size={16} />
            Book a bed
          </Button>
        </div>

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
                <Link
                  key={link.href}
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
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              href={whatsappLink("Hi Riwaq — I'd like to ask about availability.")}
              variant="brass"
              size="lg"
              external
            >
              <Icon name="whatsapp" size={18} />
              Book a bed on WhatsApp
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
