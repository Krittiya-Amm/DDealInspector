import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PageHero } from "@/components/blocks";
import { ArrowIcon, BadgeCheckIcon, SofaIcon } from "@/components/icons";
import { Container, Img, LineButton, Price, Section, TextLink } from "@/components/ui";
import { dictFor, getDict, getLang } from "@/content/dict";
import { hasLocale, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { inspectionIds, interiorIds, prices } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).servicesPage;
  return pageMeta({ lang, path: "/services", title: p.metaTitle, description: p.metaDescription });
}

/* หน้ารวมบริการ — ตอบคำถามเดียว "ต้องการฝั่งไหน"
 * layout แบบสารบัญ: สองแถบใหญ่ (ตรวจ / ตกแต่ง) ภาพสลับซ้าย-ขวา แต่ละแถบมีรายชื่อบริการครบในตัว
 * รวมการ์ดภาพรวมกับ "รายการบริการทั้งหมด" ที่เคยซ้ำกันสองชั้นเป็นชั้นเดียว
 * จำนวนบริการคำนวณจาก id list (6 + 9 = 15) ไม่พิมพ์ตัวเลขเอง (ข้อ 2) */
export default async function ServicesPage() {
  const d = await getDict();
  const lang = await getLang();
  const p = d.servicesPage;

  const worlds = [
    {
      key: "inspection",
      href: href(lang, "/services/inspection"),
      title: d.nav.inspectionGroup,
      lead: p.inspectionLead,
      image: "hero-inspector.jpg",
      Icon: BadgeCheckIcon,
      price: true,
      cta: d.cta.lineBook,
      items: inspectionIds.map((id) => ({ id, name: d.inspection[id].name, href: href(lang, `/services/inspection#${id}`) })),
    },
    {
      key: "interior",
      href: href(lang, "/services/interior"),
      title: d.nav.interiorGroup,
      lead: p.interiorLead,
      image: "interior-hero.jpg",
      Icon: SofaIcon,
      price: false,
      cta: d.cta.lineInterior,
      items: interiorIds.map((id) => ({ id, name: d.interior[id].name, href: href(lang, `/services/interior#${id}`) })),
    },
  ];

  return (
    <>
      <PageHero title={p.title} lead={p.lead} image="article-condo.jpg" imageAlt={p.title} current={d.nav.servicesAll}>
        {/* สารบัญกระโดดไปแต่ละฝั่ง — แทนป้ายนับจำนวนเฉย ๆ */}
        <ul className="mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
          {worlds.map((w) => (
            <li key={w.key}>
              <a href={`#${w.key}`} className="group flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-ink/10 transition-colors hover:ring-ink/30">
                <w.Icon className="size-5 shrink-0 text-brand" />
                <span className="flex-1 font-semibold text-ink">{w.title}</span>
                <span className="tnum text-sm text-muted">{p.count(w.items.length)}</span>
                <ArrowIcon className="size-4 rotate-90 text-subtle transition-transform group-hover:translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <LineButton label={d.cta.linePrice} size="lg" />
        </div>
      </PageHero>

      {worlds.map((w, i) => (
        <Section key={w.key} tone={i === 0 ? "white" : "paper"}>
          <Container>
            <article id={w.key} className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="lg:sticky lg:top-28">
                  <Img src={w.image} alt={w.title} className="aspect-[4/3] rounded-[1.75rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
              </div>
              <div className="lg:col-span-6">
                <p className="tnum text-sm font-semibold text-gold-text">{String(i + 1).padStart(2, "0")} / {String(worlds.length).padStart(2, "0")}</p>
                <h2 className="mt-2 flex items-center gap-3 text-[1.75rem] leading-tight font-bold sm:text-[2.25rem]">
                  <w.Icon className="size-7 shrink-0 text-brand" />
                  {w.title}
                </h2>
                <p className="mt-3 max-w-lg text-muted sm:text-lg">{w.lead}</p>

                {/* แถบสรุป: จำนวน · ราคาเริ่มต้น (เฉพาะงานตรวจ) */}
                <dl className="mt-6 grid grid-cols-2 divide-x divide-ink/10 rounded-2xl bg-white ring-1 ring-ink/10">
                  <div className="p-4 sm:p-5">
                    <dt className="text-sm text-muted">{d.labels.directory}</dt>
                    <dd className="mt-1 text-lg font-bold text-ink">{p.count(w.items.length)}</dd>
                  </div>
                  <div className="p-4 sm:p-5">
                    <dt className="text-sm text-muted">{d.labels.pricing}</dt>
                    <dd className="mt-1">
                      {w.price ? (
                        <Price from={d.common.from} value={prices.condo} unit={d.common.baht} />
                      ) : (
                        <span className="text-[0.9375rem] font-semibold text-ink">{d.common.onsiteAssess}</span>
                      )}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-6 border-t border-ink/10">
                  {w.items.map((it, n) => (
                    <li key={it.id} className="border-b border-ink/10">
                      <Link href={it.href} className="group flex min-h-14 items-center gap-4 py-2 hover:text-brand">
                        <span className="tnum w-6 text-sm text-subtle">{String(n + 1).padStart(2, "0")}</span>
                        <span className="flex-1 font-semibold">{it.name}</span>
                        <ArrowIcon className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <LineButton label={w.cta} />
                  <TextLink href={w.href}>{d.cta.seeDetail}</TextLink>
                </div>
              </div>
            </article>
          </Container>
        </Section>
      ))}

      <FinalCta />
    </>
  );
}
