/**
 * Full-colour brand social icons, rendered on light tiles in the footer.
 * Each glyph keeps the platform's official brand colour so the row reads as
 * recognisable app icons rather than monochrome line art.
 */
export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "x"
  | "linkedin"
  | "youtube"
  | "tiktok";

/** Map a social's label to a known platform key. */
export function platformFromLabel(label: string): SocialPlatform | undefined {
  const key = label.trim().toLowerCase();
  const known: SocialPlatform[] = [
    "instagram",
    "facebook",
    "whatsapp",
    "x",
    "linkedin",
    "youtube",
    "tiktok",
  ];
  return known.find((k) => key === k || key.includes(k));
}

export function SocialIcon({
  platform,
  size = 20,
}: {
  platform: SocialPlatform;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false as const,
  };

  switch (platform) {
    case "instagram":
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="140%">
              <stop offset="0" stopColor="#fdf497" />
              <stop offset="0.05" stopColor="#fdf497" />
              <stop offset="0.45" stopColor="#fd5949" />
              <stop offset="0.6" stopColor="#d6249f" />
              <stop offset="0.9" stopColor="#285aeb" />
            </radialGradient>
          </defs>
          <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#ig-grad)" />
          <g
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6.3" y="6.3" width="11.4" height="11.4" rx="3.6" />
            <circle cx="12" cy="12" r="3.1" />
          </g>
          <circle cx="16.3" cy="7.7" r="1.1" fill="#ffffff" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path
            fill="#1877F2"
            d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path
            fill="#25D366"
            d="M.06 24l1.68-6.16A11.9 11.9 0 0 1 .13 11.9C.13 5.34 5.47 0 12.04 0a11.8 11.8 0 0 1 8.42 3.49 11.8 11.8 0 0 1 3.48 8.42c0 6.57-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24Zm6.6-3.8c1.68.98 3.28 1.57 5.38 1.57 5.46 0 9.9-4.44 9.9-9.9a9.9 9.9 0 0 0-16.9-7 9.82 9.82 0 0 0-1.5 12.05l-.99 3.6 3.7-.96.41.24Zm11.38-5.6c-.07-.12-.26-.19-.55-.34-.29-.14-1.7-.84-1.96-.94-.26-.09-.46-.14-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.62.07-.29-.14-1.21-.45-2.3-1.42a8.6 8.6 0 0 1-1.6-1.98c-.16-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.4 0 1.41 1.02 2.77 1.17 2.96.14.19 2.02 3.08 4.88 4.32.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36Z"
          />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path
            fill="#000000"
            d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path
            fill="#0A66C2"
            d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path
            fill="#FF0000"
            d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path
            fill="#000000"
            d="M16.6 0h-3.3v13.35a2.4 2.4 0 1 1-2.4-2.4c.25 0 .5.04.72.11V7.72a5.72 5.72 0 0 0-.72-.05 5.72 5.72 0 1 0 5.72 5.72V7.6a7.3 7.3 0 0 0 4.28 1.38V5.68A4.28 4.28 0 0 1 16.6 0Z"
          />
        </svg>
      );
    default:
      return null;
  }
}
