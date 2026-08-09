import type { IconName } from "@/types";

/**
 * Announcements keep the site feeling live and current. The newest drives a
 * slim strip on the homepage; the full list has its own page. Ready to be
 * fed from a CMS or an admin panel later.
 */
export interface Announcement {
  id: string;
  date: string;
  title: string;
  body: string;
  icon: IconName;
  tag: string;
  featured?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "a1",
    date: "2026-07-15",
    title: "Limited beds open for the autumn intake",
    body: "A few beds have opened across triple and double sharing for the new semester. Enquire early — they go quickly during admission season.",
    icon: "bed",
    tag: "Availability",
    featured: true,
  },
  {
    id: "a2",
    date: "2026-06-28",
    title: "New quiet study room now open",
    body: "We've added a dedicated, low-noise study room with proper desks and lighting — perfect for exam season.",
    icon: "study",
    tag: "Facilities",
  },
  {
    id: "a3",
    date: "2026-06-01",
    title: "Girls hostel — join the waitlist",
    body: "Planning for our first dedicated girls hostel is underway. Add your name to the waitlist to hear first when it opens.",
    icon: "sparkle",
    tag: "Expansion",
  },
  {
    id: "a4",
    date: "2026-05-10",
    title: "On-site laundry now available",
    body: "Self-service washing and drying is now available on site, so laundry is one less thing to plan your week around.",
    icon: "laundry",
    tag: "Facilities",
  },
];

export const latestAnnouncement = announcements[0];
