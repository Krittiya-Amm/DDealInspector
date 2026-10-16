import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PlainHero } from "@/components/blocks";
import { ArrowIcon, CalendarIcon, ClockIcon } from "@/components/icons";
import { Container, Img, Section } from "@/components/ui";
import { dictFor, getDict, getLang } from "@/content/dict";
import { articleCategories, articles, formatDate, type ArticleCategory, type Lang } from "@/lib/articles";
import { hasLocale, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/articles">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).articlesPage;
  return pageMeta({ lang, path: "/articles", title: p.metaTitle, description: p.metaDescription });
}

/** วันที่ + เวลาอ่าน — ใช้ทั้งชิ้นเด่นและแถวสารบัญ */
function Meta({ date, time, lang }: { date: string; time: string; lang: Lang }) {
  return (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon className="size-4" />
        <time dateTime={date}>{formatDate(date, lang)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className="size-4" />
        {time}
      </span>
    </span>
  );
}

/* หน้ารวมบทความ — layout แบบนิตยสาร (ต่างจากแถวการ์ดบนหน้าแรก)
 *   บทความล่าสุดเป็นชิ้นเด่น ภาพใหญ่ซ้าย-ข้อความขวา · ที่เหลือเป็นสารบัญแถวมีเส้นคั่น ภาพเล็กด้านขวา
 * ทุกชิ้นยังมีภาพปก + หมวด + วันที่ (ข้อ 33)
 * แท็บกรองหมวดใน hero ถูกเอาออกตามคำขอ (ต.ค. 2569) — ?cat= ยังกรองได้ถ้ามีลิงก์เข้ามาตรง ๆ
 * /en/articles แสดงฉบับภาษาอังกฤษของทุกบทความ (ข้อ 50) */
export default async function ArticlesPage({ searchParams }: PageProps<"/[lang]/articles">) {
  const d = await getDict();
  const lang = await getLang();
  const p = d.articlesPage;
  const raw = (await searchParams).cat;
  const cat = typeof raw === "string" && raw in articleCategories ? (raw as ArticleCategory) : null;
  const list = cat ? articles.filter((a) => a.category === cat) : articles;
  const [lead, ...rest] = list;


  return (
    <>
      <PlainHero title={p.title} lead={p.lead} current={p.title} />

      <Section tone="white">
        <Container>
          {lead ? (
            <article className="group relative grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <Img
                  src={lead.image}
                  alt={lead[lang].title}
                  zoom
                  priority
                  className="aspect-[16/10] rounded-[1.75rem]"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-gold-text">{articleCategories[lead.category][lang]}</p>
                <h2 className="mt-2 text-[1.625rem] leading-snug font-bold transition-colors group-hover:text-brand sm:text-[2rem]">
                  <Link href={href(lang, `/articles/${lead.slug}`)} className="after:absolute after:inset-0">
                    {lead[lang].title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted sm:text-lg">{lead[lang].excerpt}</p>
                <div className="mt-5">
                  <Meta date={lead.date} time={lead[lang].readingTime} lang={lang} />
                </div>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand">
                  {d.cta.readArticle}
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ) : null}

          {rest.length ? (
            <ol className="mt-12 border-t border-ink/10 sm:mt-16">
              {rest.map((a, i) => {
                const t = a[lang];
                return (
                  <li key={a.slug} className="border-b border-ink/10">
                    <article className="group relative grid grid-cols-[1fr_auto] items-start gap-5 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-8 sm:py-8">
                      <span className="tnum hidden pt-1 text-sm font-semibold text-subtle sm:block">{String(i + 2).padStart(2, "0")}</span>
                      <div>
                        <p className="text-sm font-semibold text-gold-text">{articleCategories[a.category][lang]}</p>
                        <h3 className="mt-1 text-lg leading-snug font-bold transition-colors group-hover:text-brand sm:text-xl">
                          <Link href={href(lang, `/articles/${a.slug}`)} className="after:absolute after:inset-0">
                            {t.title}
                          </Link>
                        </h3>
                        <p className="mt-2 hidden max-w-2xl text-[0.9375rem] text-muted sm:line-clamp-2">{t.excerpt}</p>
                        <div className="mt-3">
                          <Meta date={a.date} time={t.readingTime} lang={lang} />
                        </div>
                      </div>
                      <Img
                        src={a.image}
                        alt=""
                        zoom
                        className="aspect-square w-24 rounded-2xl sm:aspect-[4/3] sm:w-56"
                        sizes="(min-width: 640px) 224px, 96px"
                      />
                    </article>
                  </li>
                );
              })}
            </ol>
          ) : null}
        </Container>
      </Section>

      <FinalCta title={p.ctaTitle} flush />
    </>
  );
}
