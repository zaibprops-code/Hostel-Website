import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { latestAnnouncement } from "@/data/announcements";

/**
 * A slim, current-events strip. Signals that the hostel is active and things
 * are happening — and points to the full updates feed.
 */
export function AnnouncementBar() {
  const a = latestAnnouncement;
  if (!a) return null;

  return (
    <div className="bg-brass-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/updates"
          className="group flex items-center gap-3 py-3 text-sm"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brass-200/70 px-2.5 py-1 text-xs font-semibold text-brass-800">
            <Icon name={a.icon} size={13} />
            {a.tag}
          </span>
          <span className="min-w-0 flex-1 truncate font-medium text-forest-800">
            {a.title}
          </span>
          <span className="hidden shrink-0 items-center gap-1 font-medium text-brass-700 transition-colors group-hover:text-brass-800 sm:inline-flex">
            All updates
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
