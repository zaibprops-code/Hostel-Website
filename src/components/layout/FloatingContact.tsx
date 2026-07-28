import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/data/site";

/**
 * A persistent WhatsApp action — the highest-intent conversion path for
 * hostel enquiries in Pakistan. Kept unobtrusive and out of the way of
 * content, with a large, thumb-friendly tap target on mobile.
 */
export function FloatingContact() {
  return (
    <a
      href={whatsappLink("Hi Riwaq — I'd like to ask about availability and pricing.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Riwaq on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-lg shadow-forest-900/20 transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <Icon name="whatsapp" size={24} />
      <span className="hidden pr-1 text-sm font-semibold sm:inline">
        Chat with us
      </span>
    </a>
  );
}
