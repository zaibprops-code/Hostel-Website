import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/rooms", "/facilities", "/gallery", "/reviews", "/parents", "/faq", "/contact"];

  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/rooms" || path === "/contact" ? 0.9 : 0.7,
  }));
}
