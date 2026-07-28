import type { GalleryItem, GalleryCategory } from "@/types";

/**
 * Gallery is fully data-driven and category-aware so it can grow into a
 * large, filterable library (and later support video via the `type` field).
 * Images point at lightweight in-repo SVG placeholders today; swap the
 * `src` values for real photography and nothing else needs to change.
 */
export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "rooms", label: "Rooms" },
  { id: "common", label: "Common areas" },
  { id: "amenities", label: "Amenities" },
  { id: "exterior", label: "The building" },
  { id: "neighbourhood", label: "Neighbourhood" },
];

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/room-triple.svg",
    alt: "A bright triple-sharing room with made beds and study desks",
    caption: "Triple sharing — bright and well-ventilated",
    category: "rooms",
    tone: "forest",
  },
  {
    id: "g2",
    src: "/images/gallery/lounge.svg",
    alt: "The common lounge with comfortable seating",
    caption: "The lounge — where residents unwind",
    category: "common",
    tone: "brass",
  },
  {
    id: "g3",
    src: "/images/gallery/study.svg",
    alt: "The quiet study area with desks and good lighting",
    caption: "Quiet study room",
    category: "common",
    tone: "sand",
  },
  {
    id: "g4",
    src: "/images/gallery/exterior.svg",
    alt: "The exterior of the Riwaq hostel building",
    caption: "Riwaq Boys Hostel, E-11/2",
    category: "exterior",
    tone: "night",
  },
  {
    id: "g5",
    src: "/images/gallery/kitchen.svg",
    alt: "The shared kitchen with modern fittings",
    caption: "Shared kitchen",
    category: "amenities",
    tone: "sand",
  },
  {
    id: "g6",
    src: "/images/gallery/washroom.svg",
    alt: "A clean, modern washroom",
    caption: "Spotless washrooms",
    category: "amenities",
    tone: "forest",
  },
  {
    id: "g7",
    src: "/images/gallery/room-double.svg",
    alt: "A double-sharing room with two beds and desks",
    caption: "Double sharing",
    category: "rooms",
    tone: "brass",
  },
  {
    id: "g8",
    src: "/images/gallery/rooftop.svg",
    alt: "The rooftop terrace with a view over Islamabad",
    caption: "Rooftop terrace",
    category: "common",
    tone: "night",
  },
  {
    id: "g9",
    src: "/images/gallery/neighbourhood.svg",
    alt: "Tree-lined streets of the E-11 neighbourhood",
    caption: "Green, quiet E-11/2",
    category: "neighbourhood",
    tone: "forest",
  },
];

export function galleryByCategory(category: GalleryCategory): GalleryItem[] {
  return gallery.filter((g) => g.category === category);
}
