import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArchMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-forest-900 text-ivory">
      <Container className="py-24 text-center">
        <ArchMark className="mx-auto h-14 w-14 text-brass-300" />
        <p className="eyebrow mt-8 text-brass-300">Error 404</p>
        <h1 className="text-display mt-3 text-4xl sm:text-5xl">
          This page checked out.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ivory/75">
          The page you&apos;re looking for isn&apos;t here — but your next room
          might be. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="brass" size="lg">
            Back to home
          </Button>
          <Button
            href="/rooms"
            size="lg"
            className="border border-ivory/25 bg-transparent text-ivory hover:bg-ivory/10"
          >
            Explore rooms
          </Button>
        </div>
      </Container>
    </section>
  );
}
