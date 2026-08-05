import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { Frame } from "./Frame";
import { Badge } from "./Badge";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article data-reveal className="group flex flex-col overflow-hidden rounded-3xl border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block">
        <Frame
          asset={{ src: `/images/blog/${post.slug}.svg`, alt: post.title, tone: post.cover }}
          rounded="rounded-none"
          ratio="aspect-[16/9]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <Badge tone="forest">{post.category}</Badge>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-forest-800">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brass-600"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-forest-900/8 pt-4 text-xs text-ink-muted">
          <span>{post.author}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  );
}
