import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ArchMark } from "@/components/brand/Logo";
import { whatsappLink } from "@/data/site";
import { priceFrom, formatPrice } from "@/data/rooms";

/**
 * The final push. One clear promise, one clear action — placed where an
 * engaged visitor is most ready to reach out.
 */
export function ClosingCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-800 px-6 py-16 text-center text-ivory sm:px-16 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-brass-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-forest-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-grain opacity-50" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <ArchMark className="mx-auto h-12 w-12 text-brass-300" />
            <h2 className="text-display mt-6 text-3xl sm:text-4xl md:text-5xl">
              Your room in Islamabad is ready.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/80">
              Beds from {formatPrice(priceFrom)} a month. Send us a message and
              we&apos;ll check availability, answer your questions and arrange a
              visit — usually within the hour.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink("Hi Riwaq — I'd like to book a bed. What's available?")}
                variant="brass"
                size="lg"
                external
              >
                <Icon name="whatsapp" size={18} />
                Book on WhatsApp
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="border border-ivory/25 bg-transparent text-ivory hover:bg-ivory/10"
              >
                All the ways to reach us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
