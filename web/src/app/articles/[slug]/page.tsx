import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, ContactCta } from "@/components/sections";
import { Container, Eyebrow, GhostLink, MockImage } from "@/components/ui";
import { articleCategories, articles, formatThaiDate } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMeta({
    path: `/articles/${article.slug}`,
    title: article.title,
    description: article.excerpt,
  });
}

export default async function ArticlePage({
  params,
}: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/articles/${slug}.mdx`);
  const category = articleCategories[article.category];
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line bg-white py-10 sm:py-14">
          <Container className="max-w-3xl">
            <Eyebrow variant="pill">
              {category.label}
            </Eyebrow>
            <h1 className="mt-5 text-3xl font-semibold sm:text-[2.5rem]">
              {article.title}
            </h1>
            <p className="mt-5 text-ink2 sm:text-lg sm:leading-[1.75]">
              {article.excerpt}
            </p>
            <p className="mt-6 text-sm text-ink3">
              เผยแพร่ {formatThaiDate(article.date)} · อ่าน {article.readingTime}
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl py-10 sm:py-14">
          <MockImage
            src={article.image}
            alt={article.title}
            className="aspect-[16/9] w-full rounded-sm shadow-lift"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
          <div className="mt-8">
            <Body />
          </div>
        </Container>
      </article>

      <section className="border-t border-line bg-paper py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">บทความอื่น</h2>
            <GhostLink href="/articles">ดูทั้งหมด</GhostLink>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
