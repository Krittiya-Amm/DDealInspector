import type { MDXComponents } from "mdx/types";

/* สไตล์เนื้อหาบทความและหน้ากฎหมาย — โทนเดียวกับระบบดีไซน์รอบใหม่ */
const components: MDXComponents = {
  h2: ({ children }) => <h2 className="mt-10 text-2xl font-bold text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-lg font-bold text-ink">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-muted">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-brand">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted marker:font-semibold marker:text-brand">{children}</ol>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 rounded-xl border-l-4 border-brand bg-brand-soft p-5 [&>p]:mt-0 [&>p]:text-ink">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="font-semibold text-brand underline underline-offset-4 hover:text-brand-dark">
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
