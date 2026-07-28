import { Section, SectionHeading } from "@/components/ui/Section";
import { RoomCard } from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/Button";
import { roomTypes } from "@/data/rooms";

export function RoomsPreview() {
  // Show the three most representative categories on the homepage.
  const featured = roomTypes.filter((r) =>
    ["triple", "double", "single"].includes(r.id),
  );

  return (
    <Section id="rooms" className="bg-sand">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Rooms & pricing"
          title="Choose the room that fits your life."
          lede="From sociable quad-sharing to a private single, every room is furnished, well-lit and ready to move into. Transparent monthly pricing — no hidden charges."
        />
        <Button href="/rooms" variant="ghost" className="shrink-0 self-start sm:self-auto">
          View all rooms →
        </Button>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </Section>
  );
}
