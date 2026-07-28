import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** A vertical rhythm wrapper for page sections. */
export function Section({
  children,
  className,
  containerClassName,
  id,
  contained = true,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  contained?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16 scroll-mt-24", className)}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}

/** Eyebrow + heading + optional lede — the standard section intro. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow text-brass-600 mb-3 flex items-center gap-2 data-[center]:justify-center" data-center={align === "center" ? "" : undefined}>
          <span className="inline-block h-px w-6 bg-brass-400" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Heading className="text-display text-3xl text-forest-800 sm:text-4xl md:text-[2.75rem]">
        {title}
      </Heading>
      {lede && (
        <p className="text-ink-soft mt-5 text-lg leading-relaxed">{lede}</p>
      )}
    </div>
  );
}
