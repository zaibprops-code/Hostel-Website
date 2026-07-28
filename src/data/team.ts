import type { ImageAsset } from "@/types";

/**
 * The people behind Riwaq. Real names and faces build trust — replace the
 * placeholders with actual staff details and photos as you're ready. The
 * structure supports one team today and per-branch teams as you grow.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Riwaq Management",
    role: "Founder & Management",
    bio: "Sets the standard for every branch and is accountable for the promises we make — safety, cleanliness and fair dealing.",
    image: { src: "/images/team/founder.svg", alt: "Riwaq founder & management", tone: "forest" },
  },
  {
    id: "manager",
    name: "Hostel Manager",
    role: "Resident Hostel Manager",
    bio: "Lives on-site and runs day-to-day operations. Your first point of contact for anything you need, at any hour.",
    image: { src: "/images/team/manager.svg", alt: "Resident hostel manager", tone: "brass" },
  },
  {
    id: "reception",
    name: "Front Desk Team",
    role: "Reception & Security",
    bio: "Staffs the desk around the clock, welcomes visitors, and keeps a watchful eye so residents can rest easy.",
    image: { src: "/images/team/reception.svg", alt: "Front desk and security team", tone: "night" },
  },
  {
    id: "housekeeping",
    name: "Housekeeping Team",
    role: "Housekeeping & Maintenance",
    bio: "Keeps common areas spotless every day and responds quickly when something needs fixing.",
    image: { src: "/images/team/housekeeping.svg", alt: "Housekeeping and maintenance team", tone: "sand" },
  },
];
