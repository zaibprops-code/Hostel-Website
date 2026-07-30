import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

/**
 * The single WhatsApp action for the whole site — a persistent, floating
 * button, the highest-intent conversion path for hostel enquiries in Pakistan.
 * This is intentionally the only WhatsApp entry point across the site.
 *
 * Clean gradient pill with contained, tasteful motion: a soft entrance, a
 * gentle float, a subtle light sweep, an icon heartbeat and a breathing
 * "online" dot. No expanding rings. Motion is disabled for users who prefer
 * reduced motion.
 */
export function FloatingContact() {
  return (
    <div className="fc-enter fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      <div className="fc-float relative">
        <a
          href={whatsappLink("Hi Riwaq — I'd like to ask about availability and pricing.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Riwaq on WhatsApp"
          className="fc-shine group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#29d96e] to-[#1cae52] px-4 py-3.5 text-white shadow-[0_10px_26px_rgba(37,211,102,0.45)] ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_34px_rgba(37,211,102,0.6)]"
        >
          <Icon
            name="whatsapp"
            size={24}
            className="fc-beat relative shrink-0 drop-shadow-sm group-hover:[animation-play-state:paused]"
          />
          <span className="relative hidden pr-1 text-sm font-semibold tracking-tight sm:inline">
            Chat with us
          </span>
        </a>

        {/* Breathing "online" indicator */}
        <span
          aria-hidden
          className="fc-dot absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"
        />
      </div>
    </div>
  );
}
