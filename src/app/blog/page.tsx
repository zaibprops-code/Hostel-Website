import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/ui/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Guides & Blog",
  description:
    "Practical guides for students and young professionals in Islamabad — choosing a hostel, budgeting, packing, safety and settling in.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        breadcrumb="Guides"
        path="/blog"
        eyebrow="Guides & blog"
        title="Helpful reading for life in Islamabad."
        lede="Honest, practical guides for students and young professionals — from choosing a hostel to budgeting, packing and settling in."
      />
      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-ink-muted">
            New guides are on the way — check back soon.
          </p>
        ) : (
          <div data-reveal-group className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
