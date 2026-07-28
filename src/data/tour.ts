import type { ImageAsset } from "@/types";

/**
 * The virtual tour walks a visitor through the hostel in the order they'd
 * experience it on arrival. Each stop is ready to carry a photo today, a short
 * video next, and a 360° view later — flags below drive the UI without any
 * structural change when that media arrives.
 */
export interface TourStop {
  id: string;
  title: string;
  description: string;
  image: ImageAsset;
  hasVideo?: boolean;
  has360?: boolean;
}

export const tourStops: TourStop[] = [
  {
    id: "arrival",
    title: "Arrival & entrance",
    description:
      "A single, guarded entrance with a staffed front desk — the first thing you'll notice is that it feels secure and looked-after.",
    image: { src: "/images/tour/entrance.svg", alt: "The guarded entrance and reception", tone: "night" },
    has360: true,
  },
  {
    id: "lounge",
    title: "The common lounge",
    description:
      "A comfortable shared space to relax, watch the match and meet the people you live with.",
    image: { src: "/images/tour/lounge.svg", alt: "The common lounge with seating", tone: "brass" },
    hasVideo: true,
  },
  {
    id: "room",
    title: "A resident room",
    description:
      "Furnished, bright and well-ventilated, with a bed, personal storage and a study space for each resident.",
    image: { src: "/images/tour/room.svg", alt: "A furnished resident room", tone: "forest" },
    hasVideo: true,
    has360: true,
  },
  {
    id: "study",
    title: "The quiet study room",
    description:
      "A dedicated, low-noise room with proper desks and lighting — for when you need to focus.",
    image: { src: "/images/tour/study.svg", alt: "The quiet study room", tone: "sand" },
  },
  {
    id: "kitchen",
    title: "The shared kitchen",
    description:
      "Clean and well-equipped, for when you'd rather cook your own — hobs, fridge and storage.",
    image: { src: "/images/tour/kitchen.svg", alt: "The shared kitchen", tone: "sand" },
  },
  {
    id: "washroom",
    title: "Washrooms",
    description:
      "Modern, frequently-sanitised washrooms with reliable hot water, morning and night.",
    image: { src: "/images/tour/washroom.svg", alt: "A clean modern washroom", tone: "forest" },
  },
  {
    id: "rooftop",
    title: "The rooftop terrace",
    description:
      "Fresh air and a view over Islamabad — a favourite spot for evening chai.",
    image: { src: "/images/tour/rooftop.svg", alt: "The rooftop terrace at dusk", tone: "night" },
    has360: true,
  },
];
