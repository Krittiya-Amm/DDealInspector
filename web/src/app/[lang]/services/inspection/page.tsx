import type { Metadata } from "next";
import {
  EquipmentGrid,
  FinalCta,
  LicenceCard,
  PageHero,
  ServiceCatalog,
  PricingBlock,
  ReportPreview,
  ScopeGrid,
  Stepper,
} from "@/components/blocks";
import { PhotoGallery } from "@/components/photo-gallery";
import { Badge, Container, LineButton, Section, SectionHeader } from "@/components/ui";
import { dictFor, getDict } from "@/content/dict";
import { hasLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/inspection">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).inspectionPage;
  return pageMeta({ lang, path: "/services/inspection", title: p.metaTitle, description: p.metaDescription });
}

export default async function InspectionPage() {
  const d = await getDict();
  const p = d.inspectionPage;
  return (
    <>
      {/* หัวเพจชุดเดียวกับหน้างานตกแต่ง (PageHero) — breadcrumb · หัวข้อ · ป้าย · ปุ่ม LINE · ภาพกรอบขวา */}
      <PageHero
        title={p.title}
        lead={p.lead}
        image="hero-inspector.jpg"
        imageAlt={p.imageAlt}
        crumbs={[{ label: d.nav.services, path: "/services" }]}
        current={d.nav.inspection}
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="gold">{d.common.licenceBadge}</Badge>
          <Badge tone="line">{d.common.reportIn}</Badge>
        </div>
        <div className="mt-6">
          <LineButton label={d.cta.linePrice} size="lg" />
        </div>
      </PageHero>

      <ServiceCatalog />
      <ScopeGrid />
      <EquipmentGrid />
      <Stepper id="process" tone="white" variant="timeline" />
      <ReportPreview id="report" tone="paper" />

      <Section tone="white">
        <Container>
          <SectionHeader label={d.labels.gallery} title={p.galleryTitle} lead={p.galleryLead} />
          <div className="mt-6">
            <PhotoGallery
              photos={d.gallery}
              cats={d.galleryCats}
              text={{ zoom: d.common.imageZoom, prev: d.common.prev, next: d.common.next, close: d.common.closeDialog }}
            />
          </div>
        </Container>
      </Section>

      <PricingBlock tone="paper" />

      {/* จังหวะพื้น: บริการ white → จุดที่ตรวจ forest → อุปกรณ์ paper → ขั้นตอน white → รายงาน paper
          → ภาพหน้างาน white → ราคา paper → ใบ กว. white */}
      <Section tone="white">
        <Container className="max-w-3xl">
          <LicenceCard />
        </Container>
      </Section>

      <FinalCta flush />
    </>
  );
}
