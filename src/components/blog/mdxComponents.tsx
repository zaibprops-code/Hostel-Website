import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Element-level styling for MDX article bodies. Doing it here (rather than via
 * a typography plugin) keeps the prose visually on-brand and dependency-free.
 * Internal links route through next/link; external links open safely.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="text-display mt-12 text-2xl text-forest-800 sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold text-forest-800" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-relaxed text-ink-soft" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 space-y-2 pl-1 [&>li]:relative [&>li]:pl-6" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 marker:text-brass-500" {...props} />
  ),
  li: (props) => (
    <li
      className="leading-relaxed text-ink-soft before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brass-400 [ol>&]:before:hidden [ol>&]:pl-1"
      {...props}
    />
  ),
  a: ({ href = "#", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-forest-700 underline decoration-brass-300 underline-offset-2 transition-colors hover:text-brass-600"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-forest-700 underline decoration-brass-300 underline-offset-2 transition-colors hover:text-brass-600"
        {...rest}
      >
        {children}
      </a>
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-7 border-l-2 border-brass-400 bg-sand py-2 pl-5 pr-4 text-lg italic leading-relaxed text-forest-800"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-forest-800" {...props} />
  ),
  hr: () => <hr className="my-10 border-forest-900/10" />,
};
