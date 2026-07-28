import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { branches } from "@/data/branches";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/rooms",
    "/branches",
    "/facilities",
    "/gallery",
    "/tour",
    "/reviews",
    "/parents",
    "/blog",
    "/updates",
    "/faq",
    "/contact",
  ];

  const priorityFor = (path: string) => {
    if (path === "") return 1;
    if (["/rooms", "/contact", "/branches"].includes(path)) return 0.9;
    return 0.7;
  };

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));

  const branchEntries: MetadataRoute.Sitemap = branches.map((b) => ({
    url: `${site.url}/branches/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...branchEntries, ...blogEntries];
}
