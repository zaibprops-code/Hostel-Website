import { ImageResponse } from "next/og";

/**
 * Apple touch icon (iOS home screen) — also a favicon signal Google accepts.
 * Renders the Riwaq arch mark, brass on forest, at 180×180.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const arch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="#d7ba70" fill-rule="evenodd" d="M7 33V18a13 13 0 0 1 26 0V33H27V18a7 7 0 0 0-14 0V33Z"/><rect x="6" y="31.4" width="28" height="3.4" rx="1.7" fill="#d7ba70"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#163a30",
        }}
      >
        <img
          width={116}
          height={116}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(arch)}`}
        />
      </div>
    ),
    size,
  );
}
