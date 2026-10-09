import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PageHero } from "@/components/blocks";
import { ArrowIcon, BadgeCheckIcon, SofaIcon } from "@/components/icons";
import { Badge, Container, Img, LineButton, Price, Section, SectionHeader, TextLink } from "@/components/ui";
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
      count: inspectionIds.length,
      image: "inspection-hero.jpg",
      Icon: BadgeCheckIcon,
      price: true,
    },
    {
      key: "interior",
      href: href(lang, "/services/interior"),
      title: d.nav.interiorGroup,
      lead: p.interiorLead,
      count: interiorIds.length,
      image: "interior-hero.jpg",
      Icon: SofaIcon,
      price: false,
    },
  ];

  const directory = [
    {
      title: d.nav.inspectionGroup,
      items: inspectionIds.map((id) => ({ id, name: d.inspection[id].name, href: href(lang, `/services/inspection#${id}`) })),
    },
    {
      title: d.nav.interiorGroup,
      items: interiorIds.map((id) => ({ id, name: d.interior[id].name, href: href(lang, `/services/interior#${id}`) })),
    },
  ];

  return (
    <>
      <PageHero title={p.title} lead={p.lead} image="cross-sell.jpg" imageAlt={p.title}>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="gold">{p.count(inspectionIds.length + interiorIds.length)}</Badge>
          <Badge>{`${d.nav.inspectionGroup} ${inspectionIds.length}`}</Badge>
          <Badge>{`${d.nav.interiorGroup} ${interiorIds.length}`}</Badge>
        </div>
        <div className="mt-6">
          <LineButton label={d.cta.linePrice} size="lg" />
        </div>
      </PageHero>

      <Section tone="white">
        <Container className="grid gap-6 md:grid-cols-2">
          {worlds.map((w) => (
            <article key={w.key} className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line">
              <Img src={w.image} alt={w.title} zoom className="aspect-[16/10]" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <w.Icon className="size-6" />
                  </span>
                  <h2 className="text-2xl font-bold">
                    <Link href={w.href} className="after:absolute after:inset-0">
                      {w.title}
                    </Link>
                  </h2>
                </div>
                <p className="mt-3 flex-1 text-muted">{w.lead}</p>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                  <Badge>{p.count(w.count)}</Badge>
                  {w.price ? (
                    <Price from={d.common.from} value={prices.condo} unit={d.common.baht} />
                  ) : (
                    <span className="text-sm font-semibold text-muted">{d.common.onsiteAssess}</span>
                  )}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand">
                  {d.cta.seeDetail}
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader title={p.directory} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {directory.map((g) => (
              <div key={g.title} className="rounded-[var(--radius-card)] bg-white p-6 shadow-card ring-1 ring-line">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold">{g.title}</h3>
                  <Badge>{p.count(g.items.length)}</Badge>
                </div>
                <ul className="mt-3 divide-y divide-line">
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <Link href={it.href} className="group flex min-h-12 items-center justify-between gap-4 hover:text-brand">
                        {it.name}
                        <ArrowIcon className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <TextLink href={href(lang, "/services/inspection#pricing")}>{d.cta.seeStartPrice}</TextLink>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
