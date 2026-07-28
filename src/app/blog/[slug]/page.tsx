import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Badge } from "@/components/ui/Badge";
import { BlogCard } from "@/components/ui/BlogCard";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { getPost, getAllSlugs, getAllPosts, formatDate } from "@/lib/blog";
import { pageMeta, jsonLdScript } from "@/lib/seo";
import { site } from "@/data/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMeta({ title: "Guide not found", path: `/blog/${slug}` });
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)}
      />
      <PageHero
        breadcrumb="Guides"
        eyebrow={post.category}
        title={post.title}
        lede={post.excerpt}
      />

      <article className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
            <span className="font-medium text-forest-800">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <Frame
            asset={{ src: `/images/blog/${slug}.svg`, alt: post.title, tone: post.cover }}
            ratio="aspect-[16/9]"
            rounded="rounded-2xl"
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="mt-8 shadow-lg"
          />

          <div className="mt-4">{content}</div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-forest-900/10 pt-8">
              {post.tags.map((t) => (
                <Badge key={t} tone="neutral">
                  #{t}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 transition-colors hover:text-brass-600"
            >
              ← All guides
            </Link>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-forest-900/8 bg-sand py-16 sm:py-20">
          <Container>
            <h2 className="text-display text-2xl text-forest-800 sm:text-3xl">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
