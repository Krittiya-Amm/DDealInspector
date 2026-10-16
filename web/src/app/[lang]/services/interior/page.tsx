import type { Metadata } from "next";
import { FinalCta, PageHero } from "@/components/blocks";
import { CalendarIcon, ChatIcon, DocIcon, ToolIcon } from "@/components/icons";
import { Badge, Container, Img, LineButton, Section, SectionHeader } from "@/components/ui";
import { dictFor, getDict } from "@/content/dict";
import { hasLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { interiorIds, interiorImages } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/interior">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).interiorPage;
  return pageMeta({ lang, path: "/services/interior", title: p.metaTitle, description: p.metaDescription });
}

/* หน้างานตกแต่ง — นำด้วยภาพผลงาน (บรีฟ) · แสดงครบ 9 บริการ ชื่อตามบรีฟ ไม่ยุบรวม "อื่น ๆ" (ข้อ 20)
 * ไม่แสดงราคา ใช้ "ประเมินราคาจากหน้างาน" + ทักไลน์ (ข้อมูลที่ถูกต้อง: ราคางานตกแต่ง)
 * TODO: CLIENT-ASSET — ภาพทุกใบเป็น stock รอภาพผลงานจริงจากเพจ Interior */
export default async function InteriorPage() {
  const d = await getDict();
  const p = d.interiorPage;
  const processIcons = [ChatIcon, CalendarIcon, DocIcon, ToolIcon];
  return (
    <>
      <PageHero
        title={p.title}
        lead={p.lead}
        image="interior-hero.jpg"
        imageAlt={p.imageAlt}
        crumbs={[{ label: d.nav.services, path: "/services" }]}
        current={d.nav.interior}
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="gold">{d.servicesPage.count(interiorIds.length)}</Badge>
          <Badge tone="line">{d.common.onsiteAssess}</Badge>
        </div>
        <div className="mt-6">
          <LineButton label={d.cta.lineInterior} size="lg" />
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <SectionHeader label={d.labels.interior} title={p.servicesTitle} lead={p.servicesLead} />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {interiorIds.map((id, i) => {
              const s = d.interior[id];
              return (
                <article key={id} id={id} className="group flex scroll-mt-28 flex-col">
                  <Img src={interiorImages[id]} alt={s.name} zoom className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  {/* เลขลำดับ + เส้นคั่น — แบบแคตตาล็อก ต่างจากการ์ดหน้าแรก */}
                  <div className="mt-5 flex flex-1 flex-col border-t border-ink/10 pt-4">
                    <p className="tnum text-sm font-semibold text-gold-text">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-1 text-lg font-bold">{s.name}</h2>
                    <p className="mt-1 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                    <p className="mt-4 text-sm font-semibold text-ink">{d.common.onsiteAssess}</p>
                    <LineButton label={d.cta.linePrice} size="sm" variant="outline" className="mt-3 self-start" />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader label={d.labels.process} title={p.processTitle} align="center" />
          <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.map((s, i) => {
              const Icon = processIcons[i];
              return (
                <li key={s.title} className="border-t-2 border-ink pt-5">
                  <div className="flex items-center justify-between">
                    <span className="tnum text-sm font-semibold text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="size-5 text-brand" />
                  </div>
                  <h3 className="mt-3 font-bold">{s.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{s.body}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 flex justify-center">
            <LineButton label={d.cta.lineInterior} size="lg" />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
