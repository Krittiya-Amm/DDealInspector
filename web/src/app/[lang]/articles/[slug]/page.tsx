import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, FinalCta } from "@/components/blocks";
import { Badge, Container, Img, LineButton, Section, SectionHeader, TextLink } from "@/components/ui";
import { getDict, getLang } from "@/content/dict";
import { articleCategories, articles, formatDate, getArticle } from "@/lib/articles";
import { hasLocale, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = getArticle(slug);
  if (!a || !hasLocale(lang)) return {};
  return pageMeta({ lang, path: `/articles/${slug}`, title: a[lang].title, description: a[lang].excerpt });
}

/* slug เดียวกันทั้งสองภาษา ไฟล์เนื้อหาแยกเป็น <slug>.th.mdx / <slug>.en.mdx
 * ปุ่มสลับภาษาจึงพาไปบทความเดียวกันอีกภาษาได้ตรงตัว (ข้อ 50) */
export default async function ArticlePage({ params }: PageProps<"/[lang]/articles/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const d = await getDict();
  const lang = await getLang();
  const t = a[lang];
  const { default: Body } = await import(`@/content/articles/${slug}.${lang}.mdx`);
  const related = articles.filter((x) => x.slug !== slug && x.category === a.category).slice(0, 3);
  const more = related.length ? related : articles.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-brand-soft">
          <Container className="max-w-3xl py-10 sm:py-14">
            <TextLink href={href(lang, "/articles")} className="text-sm">
              {d.articlesPage.title}
            </TextLink>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
              <Badge>{articleCategories[a.category][lang]}</Badge>
              <span>
                {d.articlesPage.published} <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
              </span>
              <span aria-hidden>·</span>
              <span>{t.readingTime}</span>
            </div>
            <h1 className="mt-4 text-[1.75rem] leading-tight font-bold sm:text-[2.5rem]">{t.title}</h1>
            <p className="mt-4 text-muted sm:text-lg">{t.excerpt}</p>
          </Container>
        </header>

        <Container className="max-w-3xl py-10 sm:py-14">
          <Img
            src={a.image}
            alt={t.title}
            priority
            className={`rounded-[var(--radius-card)] ${a.portrait ? "mx-auto aspect-[3/4] max-w-sm" : "aspect-[16/9]"}`}
            sizes="(min-width: 768px) 768px, 100vw"
          />
          <div className="mt-8 text-[1.0625rem]">
            <Body />
          </div>
          <div className="mt-10 flex flex-col items-start gap-3 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">{d.articlesPage.ctaTitle}</p>
            <LineButton label={a.category === "interior" ? d.cta.lineInterior : d.cta.lineBook} />
          </div>
        </Container>
      </article>

      <Section tone="surface">
        <Container>
          <SectionHeader title={d.articlesPage.related} action={<TextLink href={href(lang, "/articles")}>{d.cta.seeAll}</TextLink>} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <ArticleCard key={x.slug} slug={x.slug} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
