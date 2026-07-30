import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { SocialIcon, platformFromLabel } from "@/components/brand/SocialIcon";
import { Container } from "@/components/ui/Container";
import { site, telLink } from "@/data/site";
import { branches } from "@/data/branches";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-ivory/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo tone="light" showTagline />
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">
              A growing family of premium student and professional hostels
              across Islamabad — built on safety, cleanliness and genuine care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => {
                const platform = platformFromLabel(s.label);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {platform ? (
                      <SocialIcon platform={platform} size={24} />
                    ) : (
                      <span className="text-sm font-semibold text-forest-800">
                        {s.label[0]}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ivory">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav
                .filter((l) => l.href !== "/")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ivory/70 transition-colors hover:text-brass-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Discover */}
          <nav aria-label="Footer — discover">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ivory">
              Discover
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {site.secondaryNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors hover:text-brass-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Branches */}
          <nav aria-label="Footer — branches">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ivory">
              Branches
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {branches.map((b) => {
                const open = b.status === "open";
                return (
                  <li key={b.id}>
                    <Link
                      href={`/branches/${b.slug}`}
                      className="flex items-center gap-2 text-ivory/70 transition-colors hover:text-brass-300"
                    >
                      <span
                        className={
                          open
                            ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                            : "h-1.5 w-1.5 rounded-full bg-brass-400/70"
                        }
                      />
                      {b.shortName}
                      <span
                        className={
                          open
                            ? "text-[0.65rem] uppercase tracking-wide text-emerald-300/80"
                            : "text-[0.65rem] uppercase tracking-wide text-brass-300/70"
                        }
                      >
                        {open ? "Open" : "Soon"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ivory">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              {site.contacts.map((c) => (
                <li key={c.phone}>
                  <a
                    href={telLink(c.phone)}
                    className="flex items-start gap-3 text-ivory/70 transition-colors hover:text-brass-300"
                  >
                    <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-brass-300" />
                    <span>
                      {c.phoneDisplay}
                      <span className="block text-xs text-ivory/45">{c.role}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 text-ivory/70">
                <Icon name="location" size={18} className="mt-0.5 shrink-0 text-brass-300" />
                <span>
                  {site.address.line}, {site.address.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <Icon name="leaf" size={14} className="text-brass-300" />
            Made with care in Islamabad, Pakistan.
          </p>
        </div>
      </Container>
    </footer>
  );
}
