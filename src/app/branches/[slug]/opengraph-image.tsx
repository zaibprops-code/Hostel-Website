import { ImageResponse } from "next/og";
import { branches, getBranch } from "@/data/branches";
import { formatPrice } from "@/data/rooms";

/**
 * Per-branch Open Graph card. Every branch link previews as its own branded
 * card — generated automatically from the branch record, no per-branch work.
 */
export const alt = "Riwaq Hostels branch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export default async function BranchOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranch(slug);
  const name = branch?.name ?? "Riwaq Hostels";
  const location = branch ? `${branch.area}, ${branch.city}` : "Islamabad";
  const isOpen = branch?.status === "open";
  const statusLabel = isOpen ? "Open now" : "Opening soon";
  const priceLine = branch
    ? `From ${formatPrice(branch.priceFrom, branch.currency)} / month`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0e2721",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, #1c4a3d 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(201,162,75,0.35) 0%, transparent 45%)",
          color: "#faf7f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#c9a24b",
              color: "#0e2721",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: 1 }}>
            Riwaq Hostels
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: isOpen
                ? "rgba(52,211,153,0.18)"
                : "rgba(201,162,75,0.2)",
              color: isOpen ? "#6ee7b7" : "#e7d9a8",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            {statusLabel}
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#faf7f0",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: "38px", color: "#e7d9a8", fontWeight: 600 }}>
            {location}
          </div>
        </div>

        <div style={{ fontSize: "34px", fontWeight: 700, color: "#faf7f0" }}>
          {priceLine}
        </div>
      </div>
    ),
    size,
  );
}
