import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ImageAsset } from "@/types";

/**
 * A tiny file-based content layer for the blog. Posts are MDX files with
 * frontmatter in `src/content/blog`. This keeps authoring simple and the site
 * static, while mapping cleanly to a headless CMS later (frontmatter → fields).
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  cover: ImageAsset["tone"];
}

export interface Post extends PostMeta {
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Estimate reading time from word count (~200 wpm). */
function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    author: data.author ?? "Riwaq Hostels",
    category: data.category ?? "Guides",
    tags: data.tags ?? [],
    readingTime: readingTime(content),
    cover: (data.cover as ImageAsset["tone"]) ?? "forest",
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const post = getPost(slug)!;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
