import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, FinalCta } from "@/components/blocks";
import { ArrowIcon, CalendarIcon, ClockIcon, DocIcon } from "@/components/icons";
import { Container, Img, LineButton, TextLink } from "@/components/ui";
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
 * ปุ่มสลับภาษาจึงพาไปบทความเดียวกันอีกภาษาได้ตรงตัว (ข้อ 50)
 * layout แบบหน้าอ่าน: breadcrumb + หัวเรื่อง → ภาพปกกว้าง → เนื้อหา 8 คอลัมน์ + แถบข้างติดหน้าจอ
 *   (ข้อมูลบทความ · ปุ่ม LINE · บทความถัดไป) — คนอ่านจบตรงไหนก็เห็นปุ่มทักไลน์ */
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
  const cta = a.category === "interior" ? d.cta.lineInterior : d.cta.lineBook;

  return (
    <>
      <article>
        <header className="border-b border-ink/10 bg-paper">
          <Container className="pt-6 pb-10 sm:pt-8 sm:pb-12">
            <Breadcrumb crumbs={[{ label: d.articlesPage.title, path: "/articles" }]} current={articleCategories[a.category][lang]} />
            <div className="mt-6 max-w-3xl lg:mt-8">
              <h1 className="text-[1.75rem] leading-tight font-bold sm:text-[2.5rem]">{t.title}</h1>
              <p className="mt-4 text-muted sm:text-lg">{t.excerpt}</p>
            </div>
          </Container>
        </header>

        <Container className="py-10 sm:py-14">
          <Img
            src={a.image}
            alt={t.title}
            priority
            className={`rounded-[1.75rem] ${a.portrait ? "mx-auto aspect-[3/4] max-w-md" : "aspect-[16/9] lg:aspect-[21/9]"}`}
            sizes="(min-width: 1280px) 1200px, 100vw"
          />

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
            <div className="text-[1.0625rem] lg:col-span-8">
              <Body />
              <div className="mt-10 flex flex-col items-start gap-4 rounded-[1.5rem] bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="text-lg font-bold">{d.articlesPage.ctaTitle}</p>
                <LineButton label={cta} />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">
                <dl className="divide-y divide-ink/10 rounded-[1.5rem] ring-1 ring-ink/10">
                  {[
                    { Icon: DocIcon, label: d.labels.category, value: articleCategories[a.category][lang] },
                    { Icon: CalendarIcon, label: d.articlesPage.published, value: <time dateTime={a.date}>{formatDate(a.date, lang)}</time> },
                    { Icon: ClockIcon, label: d.labels.readTime, value: t.readingTime },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 px-5 py-4">
                      <Icon className="size-4 shrink-0 text-brand" />
                      <dt className="flex-1 text-sm text-muted">{label}</dt>
                      <dd className="text-sm font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="rounded-[1.5rem] bg-ink p-6 text-white">
                  <p className="font-bold">{d.articlesPage.ctaTitle}</p>
                  <p className="mt-2 text-sm text-white/75">{d.contactInfo.hours}</p>
                  <LineButton label={cta} variant="white" full className="mt-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">{d.articlesPage.related}</p>
                  <ul className="mt-2 border-t border-ink/10">
                    {more.map((x) => (
                      <li key={x.slug} className="border-b border-ink/10">
                        <Link href={href(lang, `/articles/${x.slug}`)} className="group flex min-h-14 items-center gap-3 py-3 text-[0.9375rem] leading-snug font-semibold hover:text-brand">
                          <span className="flex-1">{x[lang].title}</span>
                          <ArrowIcon className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <TextLink href={href(lang, "/articles")} className="mt-4 text-sm">
                    {d.cta.seeAll}
                  </TextLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      <FinalCta />
    </>
  );
}
