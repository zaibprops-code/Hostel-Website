import Link from "next/link";
import { Container } from "./Container";

/**
 * The shared banner at the top of every interior page — keeps a consistent
 * sense of place, with breadcrumbs for orientation and SEO.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-900 pt-28 pb-14 text-ivory sm:pt-36 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-16 h-80 w-80 rounded-full bg-brass-500/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-forest-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ivory/60">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-brass-300">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ivory/90">{breadcrumb}</li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow mb-3 flex items-center gap-2 text-brass-300">
            <span className="inline-block h-px w-6 bg-brass-400" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h1 className="text-display max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/80">
            {lede}
          </p>
        )}
      </Container>
    </section>
  );
}
