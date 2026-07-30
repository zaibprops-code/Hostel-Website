import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

/**
 * The single WhatsApp action for the whole site — a persistent, floating
 * button, the highest-intent conversion path for hostel enquiries in Pakistan.
 * This is intentionally the only WhatsApp entry point across the site.
 *
 * Styled as a premium gradient pill with layered, tasteful motion: a soft
 * entrance, dual ripple rings, a breathing glow, an occasional light sweep
 * and a gentle icon bob. All motion is paused on hover and disabled for
 * users who prefer reduced motion.
 */
export function FloatingContact() {
  return (
    <div className="fc-enter group fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      {/* Ripple rings radiating from the button */}
      <span aria-hidden className="fc-ripple pointer-events-none group-hover:[animation-play-state:paused]" />
      <span aria-hidden className="fc-ripple fc-ripple-2 pointer-events-none group-hover:[animation-play-state:paused]" />

      <a
        href={whatsappLink("Hi Riwaq — I'd like to ask about availability and pricing.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Riwaq on WhatsApp"
        className="fc-glow fc-shine relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#2be873] to-[#1cb454] px-4 py-3.5 text-white ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:brightness-105"
      >
        <Icon
          name="whatsapp"
          size={24}
          className="fc-bob relative shrink-0 drop-shadow-sm group-hover:[animation-play-state:paused]"
        />
        <span className="relative hidden pr-1 text-sm font-semibold tracking-tight sm:inline">
          Chat with us
        </span>
      </a>
    </div>
  );
}
