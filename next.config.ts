import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Ready for remote CMS / real photography later.
    // Add production image hosts here (e.g. an S3 bucket or a headless CMS).
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    // Allow higher-quality encodings for real photography (default is 75).
    qualities: [75, 90, 100],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
