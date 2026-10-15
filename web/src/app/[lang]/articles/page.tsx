import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard, FinalCta, PlainHero } from "@/components/blocks";
import { Container, Section } from "@/components/ui";
import { dictFor, getDict, getLang } from "@/content/dict";
import { articleCategories, articles, type ArticleCategory } from "@/lib/articles";
import { hasLocale, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/articles">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).articlesPage;
  return pageMeta({ lang, path: "/articles", title: p.metaTitle, description: p.metaDescription });
}

/* หน้ารวมบทความ — การ์ดมีภาพปก + หมวด + วันที่ (ข้อ 33)
 * กรองหมวดด้วย ?cat= เป็นลิงก์ธรรมดา ใช้ได้โดยไม่ต้องมี JS และแชร์ลิงก์หมวดได้
 * /en/articles แสดงฉบับภาษาอังกฤษของทุกบทความ (ข้อ 50) */
export default async function ArticlesPage({ searchParams }: PageProps<"/[lang]/articles">) {
  const d = await getDict();
  const lang = await getLang();
  const p = d.articlesPage;
  const raw = (await searchParams).cat;
  const cat = typeof raw === "string" && raw in articleCategories ? (raw as ArticleCategory) : null;
  const list = cat ? articles.filter((a) => a.category === cat) : articles;

  const tabs: { key: ArticleCategory | null; label: string }[] = [
    { key: null, label: p.all },
    ...(Object.keys(articleCategories) as ArticleCategory[]).map((k) => ({ key: k, label: articleCategories[k][lang] })),
  ];

  return (
    <>
      <PlainHero title={p.title} lead={p.lead}>
          <nav className="scroller -mx-4 mt-6 gap-2 px-4 sm:mx-0 sm:px-0" aria-label={p.title}>
            {tabs.map((t) => {
              const active = t.key === cat;
              return (
                <Link
                  key={t.label}
                  href={t.key ? `${href(lang, "/articles")}?cat=${t.key}` : href(lang, "/articles")}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold ${
                    active
                      ? "bg-gradient-to-r from-gold-light to-gold text-brand-deep"
                      : "bg-white/[0.07] text-white ring-1 ring-white/20 hover:bg-white/15"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
      </PlainHero>

      <Section tone="white">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.slug} slug={a.slug} />
          ))}
        </Container>
      </Section>

      <FinalCta title={p.ctaTitle} flush />
    </>
  );
}
