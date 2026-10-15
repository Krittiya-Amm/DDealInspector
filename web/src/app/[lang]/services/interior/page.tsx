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
      <PageHero title={p.title} lead={p.lead} image="interior-hero.jpg" imageAlt={p.imageAlt}>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="gold">{d.servicesPage.count(interiorIds.length)}</Badge>
          <Badge tone="white">{d.common.onsiteAssess}</Badge>
        </div>
        <div className="mt-6">
          <LineButton label={d.cta.lineInterior} size="lg" />
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <SectionHeader label={d.labels.interior} title={p.servicesTitle} lead={p.servicesLead} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {interiorIds.map((id) => {
              const s = d.interior[id];
              return (
                <article
                  key={id}
                  id={id}
                  className="card card-hover group flex flex-col overflow-hidden"
                >
                  <Img src={interiorImages[id]} alt={s.name} zoom className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold">{s.name}</h2>
                    <p className="mt-1 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                    <p className="mt-4 text-sm font-semibold text-gold-text">{d.common.onsiteAssess}</p>
                    <LineButton label={d.cta.linePrice} size="sm" full className="mt-3" />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeader label={d.labels.process} title={p.processTitle} align="center" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.map((s, i) => {
              const Icon = processIcons[i];
              return (
                <li key={s.title} className="card card-hover p-6">
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-gold">
                    <Icon className="size-6" />
                    <span className="tnum absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep text-sm font-bold text-brand-deep shadow-gold">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
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
