import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { site } from "@/data/site";
import { averageRating, reviewCount } from "@/data/reviews";
import { priceFrom } from "@/data/rooms";
import { formatPrice } from "@/data/rooms";
import { flagshipBranch } from "@/data/branches";

/**
 * The hero. First impression, value proposition, location and the two
 * clearest actions — book, or explore — above the fold on every device.
 */

// The headline, split into words so each can rise in sequence. `accent` words
// carry the shimmering brass highlight.
const headline: { text: string; accent?: boolean }[] = [
  { text: "A" },
  { text: "hostel" },
  { text: "that" },
  { text: "finally" },
  { text: "feels" },
  { text: "like", accent: true },
  { text: "home.", accent: true },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-950 pt-24 pb-5 text-ivory sm:pt-28 sm:pb-7">
      {/* Ambient background — a luminous green wash: lighter toward the centre,
          deep at the edges, with a warm brass glow behind the photo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_60%_-10%,#347059_0%,#163a30_42%,#0c211b_78%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_84%_16%,rgba(201,162,75,0.18),transparent_55%)]" />
        <div className="orb-drift-a absolute -left-24 top-6 h-[26rem] w-[26rem] rounded-full bg-forest-400/25 blur-3xl" />
        <div className="orb-drift-b absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brass-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-3.5 py-1.5 text-xs font-medium text-ivory/80">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Now open in {flagshipBranch.area}, {site.address.city}
            </span>

            <h1 className="word-rise text-display mt-6 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              {headline.map((w, i) => (
                <span key={i} style={{ animationDelay: `${120 + i * 80}ms` }}>
                  {w.accent ? (
                    <span className="text-shimmer">{w.text}</span>
                  ) : (
                    w.text
                  )}
                </span>
              ))}
            </h1>

            <p
              className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ivory/80"
              style={{ animationDelay: "760ms" }}
            >
              <strong className="font-semibold text-ivory">
                Riwaq Boys Hostel
              </strong>{" "}
              is spotless, thoughtfully run accommodation in {flagshipBranch.area},{" "}
              {site.address.city} — for students and young professionals.
              Premium comfort, a genuine community, and a price that makes sense.
            </p>

            <div
              className="reveal mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "880ms" }}
            >
              <Button href="/rooms" variant="brass" size="lg">
                Explore rooms
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="border border-ivory/25 bg-transparent text-ivory hover:bg-ivory/10"
              >
                Contact us
              </Button>
            </div>

            {/* Inline trust row */}
            <div
              className="reveal mt-16 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: "1000ms" }}
            >
              <div className="flex items-center gap-2.5">
                <Stars rating={averageRating} size={18} />
                <span className="text-sm text-ivory/80">
                  <span className="font-semibold text-ivory">{averageRating}</span>{" "}
                  from {reviewCount} residents
                </span>
              </div>
              <div className="h-8 w-px bg-ivory/15" />
              <div className="text-sm text-ivory/80">
                From{" "}
                <span className="font-semibold text-ivory">
                  {formatPrice(priceFrom)}
                </span>{" "}
                / month
              </div>
            </div>
          </div>

          {/* Visual */}
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
