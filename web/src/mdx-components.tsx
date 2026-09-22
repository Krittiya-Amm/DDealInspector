import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-semibold">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-semibold">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-4 text-ink2">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-ink2 marker:text-gold-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink2 marker:text-gold-500">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 rounded-sm border-l-4 border-ink bg-white p-5 text-ink2">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-gold-700 underline underline-offset-4"
    >
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
