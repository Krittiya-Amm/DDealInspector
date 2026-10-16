import type { Metadata } from "next";
import {
  EquipmentGrid,
  FinalCta,
  ServiceCatalog,
  LicenceCard,
  PageHero,
  PricingBlock,
  ReportPreview,
  ScopeGrid,
  Stepper,
} from "@/components/blocks";
import { PhotoGallery } from "@/components/photo-gallery";
import { Badge, Container, LineButton, Price, Section, SectionHeader } from "@/components/ui";
import { BadgeCheckIcon, ClockIcon } from "@/components/icons";
import { dictFor, getDict } from "@/content/dict";
import { hasLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { prices } from "@/lib/site";

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
      <PageHero
        title={p.title}
        lead={p.lead}
        image="hero-inspector.jpg"
        imageAlt={p.imageAlt}
        crumbs={[{ label: d.nav.services, path: "/services" }]}
        current={d.nav.inspection}
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="gold">
            <BadgeCheckIcon className="size-4" />
            {d.common.licenceBadge}
          </Badge>
          <Badge tone="line">
            <ClockIcon className="size-4" />
            {d.common.reportIn}
          </Badge>
        </div>
        <div className="mt-6 inline-flex flex-wrap gap-x-8 gap-y-2 rounded-2xl bg-white/90 px-5 py-3 ring-1 ring-ink/10">
          <div>
            <p className="text-sm font-medium text-muted">{d.home.hero.condoFrom}</p>
            <Price from={d.common.from} value={prices.condo} unit={d.common.baht} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">{d.home.hero.houseFrom}</p>
            <Price from={d.common.from} value={prices.house} unit={d.common.baht} />
          </div>
        </div>
        <div className="mt-6">
          <LineButton label={d.cta.linePrice} size="lg" />
        </div>
      </PageHero>

      <ServiceCatalog />
      <ScopeGrid />
      <EquipmentGrid />
      <Stepper id="process" tone="paper" variant="timeline" />
      <ReportPreview id="report" />

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

      <PricingBlock />

      <Section tone="white">
        <Container className="max-w-3xl">
          <LicenceCard />
        </Container>
      </Section>

      <FinalCta flush />
    </>
  );
}
