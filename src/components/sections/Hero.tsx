import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { site, whatsappLink } from "@/data/site";
import { averageRating, reviewCount } from "@/data/reviews";
import { priceFrom } from "@/data/rooms";
import { formatPrice } from "@/data/rooms";
import { primaryBranch } from "@/data/branches";

/**
 * The hero. First impression, value proposition, location and the two
 * clearest actions — book, or explore — above the fold on every device.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-900 pt-28 pb-16 text-ivory sm:pt-36 sm:pb-24">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-forest-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-brass-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-60" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="reveal lg:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-3.5 py-1.5 text-xs font-medium text-ivory/80">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Now open in {primaryBranch.area}, {site.address.city}
            </span>

            <h1 className="text-display mt-6 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              A hostel that finally feels{" "}
              <span className="text-brass-300">like home.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
              Secure, spotless and thoughtfully run accommodation for
              Islamabad&apos;s students and young professionals. Premium comfort,
              a genuine community, and a price that makes sense.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={whatsappLink(
                  "Hi Riwaq — I'd like to book a bed. Can you share availability?",
                )}
                variant="brass"
                size="lg"
                external
              >
                <Icon name="whatsapp" size={18} />
                Book a bed
              </Button>
              <Button
                href="/rooms"
                size="lg"
                className="border border-ivory/25 bg-transparent text-ivory hover:bg-ivory/10"
              >
                Explore rooms
              </Button>
            </div>

            {/* Inline trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
          <div className="reveal relative" style={{ animationDelay: "120ms" }}>
            <div className="relative">
              <Frame
                asset={{
                  src: "/images/hero.svg",
                  alt: "A calm, bright room at Riwaq Boys Hostel",
                  tone: "brass",
                }}
                ratio="aspect-[4/5]"
                rounded="rounded-[2rem]"
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="shadow-2xl shadow-forest-950/40 ring-1 ring-ivory/10"
              />

              {/* Floating credential card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-forest-900/10 bg-ivory p-4 text-forest-900 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                    <Icon name="shield" size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">24/7 security</p>
                    <p className="text-xs text-ink-muted">CCTV · staffed desk</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-6 hidden rounded-2xl border border-forest-900/10 bg-ivory px-4 py-3 text-forest-900 shadow-xl md:block">
                <div className="flex items-center gap-2">
                  <Icon name="wifi" size={20} className="text-brass-500" />
                  <span className="text-sm font-semibold">Fibre WiFi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
