import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { averageRating, reviewCount } from "@/data/reviews";
import { priceFrom, formatPrice } from "@/data/rooms";

/**
 * Dynamically-generated Open Graph / social share card. Renders at build
 * time to a 1200×630 image so every link to the site — WhatsApp, Facebook,
 * X, Google — previews as a branded, on-brand card rather than a bare URL.
 */
export const alt =
  "Riwaq Boys Hostel — secure student accommodation in G-11, Islamabad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#faf7f0",
            }}
          >
            Riwaq Boys Hostel
          </div>
          <div style={{ fontSize: "40px", color: "#e7d9a8", fontWeight: 600 }}>
            Secure student accommodation · G-11, Islamabad
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#c9a24b" }}>
              {`Rated ${averageRating} / 5`}
            </div>
            <div style={{ fontSize: "24px", color: "#cdd9d2" }}>
              {`from ${reviewCount} residents`}
            </div>
          </div>
          <div style={{ width: "2px", height: "56px", background: "#ffffff22" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#faf7f0" }}>
              {`From ${formatPrice(priceFrom)}`}
            </div>
            <div style={{ fontSize: "24px", color: "#cdd9d2" }}>per month</div>
          </div>
          <div style={{ width: "2px", height: "56px", background: "#ffffff22" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#faf7f0" }}>
              24/7
            </div>
            <div style={{ fontSize: "24px", color: "#cdd9d2" }}>
              security &amp; staff
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
