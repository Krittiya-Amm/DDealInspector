import Link from "next/link";
import {
  ArrowIcon,
  BadgeCheckIcon,
  BoltIcon,
  BuildingIcon,
  CalendarIcon,
  CameraIcon,
  ChatIcon,
  CheckIcon,
  ClockIcon,
  ColumnsIcon,
  DocIcon,
  DropletIcon,
  ExternalIcon,
  FacebookIcon,
  HardHatIcon,
  HeartIcon,
  HomeIcon,
  KeyIcon,
  LevelIcon,
  LineIcon,
  PinIcon,
  PipeIcon,
  PlugIcon,
  QuoteIcon,
  RefreshIcon,
  RulerIcon,
  SofaIcon,
  ThermalIcon,
  UsersIcon,
  WrenchIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  Badge,
  CallButton,
  Container,
  IconBubble,
  Img,
  LineButton,
  Price,
  Section,
  SectionHeader,
  TextLink,
} from "@/components/ui";
import { getDict, getLang } from "@/content/dict";
import { articleCategories, articles, formatDate } from "@/lib/articles";
import { href } from "@/lib/i18n";
import { reviews, reviewsUrl } from "@/lib/reviews";
import {
  contact,
  credentials,
  inspectionIds,
  inspectionImages,
  interiorIds,
  interiorImages,
  prices,
  statValues,
  type InspectionId,
} from "@/lib/site";

type IconT = (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;

const serviceIcon: Record<InspectionId, IconT> = {
  house: HomeIcon,
  condo: BuildingIcon,
  construction: HardHatIcon,
  secondhand: KeyIcon,
  recheck: RefreshIcon,
  repair: WrenchIcon,
};

/* ───────────────────────── Hero หน้าแรก ─────────────────────────
 * ข้อ 24, 25, 43: ชูจุดขาย "ตรวจบ้าน-คอนโดก่อนโอน โดยวิศวกรโยธามีใบ กว." + badge สภาวิศวกร
 * + ราคาเริ่มต้น + ปุ่มทักไลน์ — มือถือต้องเห็นปุ่ม LINE โดยไม่ต้องเลื่อน
 * ภาพเต็มพื้นหลังทับด้วยไล่เฉดเขียวเข้ม ตัวหนังสือขาวอ่านได้ทุกจุดของภาพ */
export async function HomeHero() {
  const d = await getDict();
  const lang = await getLang();
  const h = d.home.hero;
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep text-white">
      {/* TODO: CLIENT-ASSET — ภาพ stock รอภาพวิศวกรหน้างานจริงจากเพจ (ข้อ 24) */}
      <Img
        src="hero-inspector.jpg"
        alt={h.imageAlt}
        priority
        sizes="100vw"
        className="!absolute inset-0 -z-10 h-full w-full"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-deep/95 via-brand-deep/85 to-brand-deep/70 lg:bg-gradient-to-r lg:from-brand-deep lg:via-brand-deep/90 lg:to-brand-deep/20" />
      <Container className="py-8 sm:py-16 lg:py-24">
        <div className="max-w-2xl">
          <Badge tone="gold">
            <BadgeCheckIcon className="size-4" />
            {d.common.licenceBadge} · {d.common.coe}
          </Badge>
          <h1 className="mt-4 text-[1.875rem] leading-tight font-bold sm:text-5xl lg:text-[3.5rem]">
            <span className="block">{h.title}</span>
            <span className="block text-gold">{h.titleAccent}</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/90 sm:mt-5 sm:text-lg">{h.lead}</p>

          {/* ราคาเริ่มต้นเป็นการ์ดขาวสองใบ เห็นชัดตั้งแต่ hero (ข้อ 6, 7) */}
          <div className="mt-5 grid max-w-md grid-cols-2 gap-3">
            {(["condo", "house"] as const).map((id) => (
              <div key={id} className="rounded-2xl bg-white px-4 py-3 text-ink">
                <p className="text-sm font-semibold text-muted">
                  {id === "condo" ? h.condoFrom : h.houseFrom}
                </p>
                <Price from={d.common.from} value={prices[id]} unit={d.common.baht} size="sm" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <LineButton label={d.cta.lineBook} size="lg" />
            <Link
              href={href(lang, "/services/inspection#pricing")}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-white/60 px-6 font-semibold hover:bg-white/10"
            >
              {d.cta.seeStartPrice}
              <ArrowIcon className="size-4" />
            </Link>
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/85">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-gold" />
            {d.common.serviceArea}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── แถบตัวเลข ─────────────────────────
 * ข้อ 5, 28: ตัวเลขชุดที่ลูกค้ายืนยัน · แถบสีแบรนด์ มีไอคอน ตัวเลขเด่นกว่าคำอธิบาย */
export async function StatsBand() {
  const d = await getDict();
  const icons: IconT[] = [HomeIcon, CalendarIcon, BuildingIcon, HeartIcon];
  return (
    <section className="bg-brand text-white">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:py-10 lg:grid-cols-4">
        {statValues.map((v, i) => {
          const Icon = icons[i];
          return (
            <div key={v} className="flex items-center gap-3 sm:gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-gold sm:size-14">
                <Icon className="size-6 sm:size-7" />
              </span>
              <div>
                <p className="tnum text-2xl leading-none font-bold sm:text-4xl">{v}</p>
                <p className="mt-1 text-sm text-white/85">{d.stats[i]}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

/* ───────────────────────── บริการตรวจ 6 ตัว ─────────────────────────
 * ข้อ 4, 29: การ์ดใหญ่ 2 ใบ (บ้าน/คอนโด พร้อมราคา) + การ์ดเล็ก 4 ใบ (เฉพาะกรณี)
 * บริการเฉพาะกรณีไม่มีราคา มีแค่ปุ่มทักไลน์ (ข้อ 3, 9) · มือถือเลื่อนแนวนอน
 * detailed = หน้า /services/inspection: การ์ดมี id เป็น anchor และแสดงจุดที่ตรวจ */
export async function InspectionServices({
  detailed = false,
  tone = "white",
}: {
  detailed?: boolean;
  tone?: "white" | "surface";
}) {
  const d = await getDict();
  const lang = await getLang();
  const main = inspectionIds.slice(0, 2);
  const special = inspectionIds.slice(2);
  const headTitle = detailed ? d.inspectionPage.servicesTitle : d.home.services.title;
  const headLead = detailed ? d.inspectionPage.servicesLead : d.home.services.lead;

  return (
    <Section id={detailed ? "services" : undefined} tone={tone}>
      <Container>
        <SectionHeader
          title={headTitle}
          lead={headLead}
          action={
            detailed ? undefined : (
              <TextLink href={href(lang, "/services/inspection")}>{d.cta.seeServices}</TextLink>
            )
          }
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {main.map((id, i) => {
            const s = d.inspection[id];
            const Icon = serviceIcon[id];
            return (
              <Reveal key={id} delay={i * 80}>
                <article
                  id={detailed ? id : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line"
                >
                  <div className="relative">
                    <Img
                      src={inspectionImages[id] ?? "hero.jpg"}
                      alt={s.name}
                      zoom
                      className="aspect-[2/1] sm:aspect-[16/9]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <span className="absolute top-3 left-3">
                      <Badge tone="line">
                        <ClockIcon className="size-4 text-brand" />
                        {s.timeShort}
                      </Badge>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <IconBubble icon={Icon} />
                      <h3 className="text-xl font-bold sm:text-2xl">{s.name}</h3>
                    </div>
                    <p className="mt-3 text-muted">{s.short}</p>
                    {detailed ? (
                      <ul className="mt-4 grid gap-2 text-[0.9375rem]">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                      {s.price ? (
                        <Price from={d.common.from} value={s.price} unit={d.common.baht} />
                      ) : null}
                      {detailed ? (
                        <p className="text-sm text-muted">{s.time}</p>
                      ) : (
                        <TextLink href={href(lang, `/services/inspection#${id}`)}>{d.cta.seeDetail}</TextLink>
                      )}
                    </div>
                    <LineButton label={d.cta.linePrice} full className="mt-4" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <h3 className="mt-12 text-xl font-bold sm:text-2xl">{d.home.services.specialTitle}</h3>
        <div className="scroller -mx-4 mt-5 gap-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {special.map((id) => {
            const s = d.inspection[id];
            return (
              <article
                key={id}
                id={detailed ? id : undefined}
                className="flex w-[78%] flex-col rounded-[var(--radius-card)] bg-white p-5 shadow-card ring-1 ring-line sm:w-auto"
              >
                <IconBubble icon={serviceIcon[id]} />
                <h4 className="mt-4 text-lg font-bold">{s.name}</h4>
                <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                {id === "recheck" ? (
                  <LineButton label={d.cta.linePackage} size="sm" full className="mt-5" />
                ) : (
                  <LineButton label={d.cta.lineAsk} size="sm" full className="mt-5" />
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ใบ กว. ─────────────────────────
 * ข้อ 35: ไม่ใช้คำ "อย่าเพิ่งเชื่อเรา" (ยังรอลูกค้ายืนยัน) · ไอคอนรับรองแทนโลโก้สภาวิศวกร
 * TODO: CLIENT-ASSET — ภาพตัวอย่างใบ กว. (เบลอเลขได้) รอจากลูกค้า */
export async function LicenceCard({ className = "" }: { className?: string }) {
  const d = await getDict();
  return (
    <div className={`flex flex-col rounded-[var(--radius-card)] bg-brand-deep p-6 text-white sm:p-8 ${className}`}>
      <span className="grid size-16 place-items-center rounded-2xl bg-gold text-brand-deep">
        <BadgeCheckIcon className="size-9" />
      </span>
      <p className="mt-5 text-sm font-semibold text-gold">{d.common.licenceBadge}</p>
      <h3 className="mt-1 text-2xl font-bold">{d.home.why.licenceTitle}</h3>
      <p className="mt-3 text-white/85">{d.common.licenceBody}</p>
      <p className="mt-2 text-white/85">{d.home.why.licenceBody}</p>
      {credentials.licenseNo ? (
        <p className="tnum mt-4 rounded-xl bg-white/10 px-4 py-3 font-bold">{credentials.licenseNo}</p>
      ) : null}
      <a
        href={credentials.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 font-semibold text-brand hover:bg-brand-soft sm:self-start"
      >
        {d.cta.verify}
        <ExternalIcon className="size-4" />
      </a>
    </div>
  );
}

const equipmentIcons: IconT[] = [ThermalIcon, DropletIcon, CameraIcon, LevelIcon, PlugIcon, RulerIcon];

/* ───────────────────────── ทำไมต้องเรา (หน้าแรก) ───────────────────────── */
export async function WhyUs() {
  const d = await getDict();
  const icons: IconT[] = [BadgeCheckIcon, ThermalIcon, DocIcon, SofaIcon];
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader title={d.home.why.title} lead={d.home.why.lead} />
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <LicenceCard />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {d.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="h-full rounded-[var(--radius-card)] bg-white p-4 shadow-card ring-1 ring-line sm:p-5">
                  <IconBubble icon={icons[i]} />
                  <h3 className="mt-3 font-bold sm:mt-4 sm:text-lg">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted sm:text-[0.9375rem]">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* อุปกรณ์จริงของทีม — แถบชิปไอคอน ไม่ใช่รายการตัวหนังสือ */}
        <ul className="scroller -mx-4 mt-6 gap-3 px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {d.equipment.map((e, i) => {
            const Icon = equipmentIcons[i];
            return (
              <li key={e.name} className="flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 text-sm font-semibold shadow-card ring-1 ring-line">
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="size-4" />
                </span>
                {e.name}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ───────────────────────── Stepper 4 ขั้น ─────────────────────────
 * ข้อ 30: desktop เรียงแนวนอนมีเส้นเชื่อม · มือถือ timeline แนวตั้ง
 * แต่ละขั้น: วงกลมเลข + ไอคอน + หัวข้อสั้น + คำอธิบาย + badge เวลา
 * ขั้น 04 มีลิงก์สอบถามแพ็กเกจ · จบด้วยปุ่มทักไลน์นัดวันตรวจ */
export async function Stepper({ id, tone = "white" }: { id?: string; tone?: "white" | "surface" }) {
  const d = await getDict();
  const icons: IconT[] = [ChatIcon, UsersIcon, DocIcon, RefreshIcon];
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeader title={d.home.steps.title} lead={d.home.steps.lead} align="center" />
        <ol className="relative mt-10 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* เส้นเชื่อมแนวนอน (desktop) */}
          <span aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 bg-brand/20 lg:block" />
          {d.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                {/* เส้นเชื่อมแนวตั้ง (มือถือ) */}
                {i < d.steps.length - 1 ? (
                  <span aria-hidden className="absolute top-14 bottom-[-2rem] left-7 w-0.5 bg-brand/20 lg:hidden" />
                ) : null}
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-brand text-white ring-8 ring-white">
                  <Icon className="size-6" />
                  <span className="tnum absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-gold text-xs font-bold text-brand-deep">
                    {i + 1}
                  </span>
                </span>
                <div className="lg:mt-4">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{s.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2 lg:justify-center">
                    {s.badges.map((b) => (
                      <Badge key={b}>
                        <ClockIcon className="size-3.5" />
                        {b}
                      </Badge>
                    ))}
                  </div>
                  {i === d.steps.length - 1 ? (
                    <a
                      href={contact.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold text-line-btn hover:underline"
                    >
                      <LineIcon className="size-4" />
                      {d.cta.linePackage}
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-10 flex justify-center">
          <LineButton label={d.cta.lineBook} size="lg" />
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ตัวอย่างรายงาน ─────────────────────────
 * ข้อ 36, 41: mockup รายงานในหน้าแรก + ปุ่มทักไลน์ขอดูตัวอย่าง (เปิดแท็บใหม่)
 * กรอบเป็นกระดาษสองแผ่นซ้อนแบบกล่องปิดสนิท ไม่มีข้อความทับบนภาพ */
export async function ReportPreview({ id }: { id?: string }) {
  const d = await getDict();
  const icons: IconT[] = [CameraIcon, PinIcon, CheckIcon, DocIcon];
  return (
    <Section id={id} tone="soft">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl bg-white shadow-card ring-1 ring-line" />
          <div className="relative rounded-2xl bg-white p-3 shadow-lift ring-1 ring-line">
            {/* TODO: CLIENT-ASSET — ภาพหน้ารายงานจริง (ปิดข้อมูลลูกค้า) รอจากลูกค้า */}
            <Img
              src="report.jpg"
              alt={d.home.report.title}
              className="aspect-[4/3] rounded-xl"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden>
              {["article-defect.jpg", "article-crack.jpg", "article-condo.jpg"].map((s) => (
                <Img key={s} src={s} alt="" className="aspect-[4/3] rounded-lg" sizes="15vw" />
              ))}
            </div>
          </div>
        </div>
        <div>
          <SectionHeader title={d.home.report.title} lead={d.home.report.lead} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {d.reportPoints.map((p, i) => {
              const Icon = icons[i];
              return (
                <li key={p} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold shadow-card ring-1 ring-line">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <LineButton label={d.cta.lineReport} size="lg" />
            <Badge>
              <ClockIcon className="size-4" />
              {d.common.reportIn}
            </Badge>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── รีวิว ─────────────────────────
 * ข้อ 34: ขนาดการ์ดเท่ากันทุกใบ (ไม่มีใบแรกตัวใหญ่) · ฉบับไทยแสดงเฉพาะรีวิวภาษาไทย
 * มือถือเลื่อนแนวนอน · TODO: CLIENT-ASSET รอรูป/ชื่อย่อผู้รีวิว */
export async function Reviews() {
  const d = await getDict();
  const lang = await getLang();
  const list = lang === "th" ? reviews.filter((r) => r.lang === "th") : [...reviews].sort((a) => (a.lang === "en" ? -1 : 1));
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          title={d.home.reviews.title}
          lead={d.home.reviews.lead}
          action={
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"
            >
              <FacebookIcon className="size-5 text-[#0866ff]" />
              {d.home.reviews.more}
            </a>
          }
        />
        <div className="scroller -mx-4 mt-8 gap-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {list.slice(0, 4).map((r) => (
            <figure
              key={r.quote}
              className="flex w-[82%] flex-col rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line sm:w-auto"
            >
              <div className="flex items-start justify-between gap-2">
                <QuoteIcon className="size-7 text-gold" />
                {r.service ? <Badge>{d.inspection[r.service].name}</Badge> : null}
              </div>
              <blockquote lang={r.lang} className="mt-3 flex-1 text-[0.9375rem] text-ink">
                {r.quote}
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm text-muted">
                <FacebookIcon className="size-4 text-[#0866ff]" />
                {d.common.reviewSource}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ผลงานตกแต่ง (gallery) ─────────────────────────
 * ข้อ 26: Interior นำด้วยภาพผลงาน 8 ภาพแบบ bento · TODO: CLIENT-ASSET รอภาพจากเพจ Interior */
export async function InteriorShowcase() {
  const d = await getDict();
  const lang = await getLang();
  // ใหญ่ 1 (2×2) + เล็ก 8 = 12 ช่อง เต็ม 3 แถวพอดีบน desktop · มือถือแสดง 5 ภาพแรก
  const ids = interiorIds;
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          title={d.home.interior.title}
          lead={d.home.interior.lead}
          action={<TextLink href={href(lang, "/services/interior")}>{d.cta.seeAll}</TextLink>}
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ids.map((id, i) => (
            <li key={id} className={i === 0 ? "col-span-2 row-span-2" : i >= 5 ? "hidden lg:block" : ""}>
              <Link
                href={href(lang, `/services/interior#${id}`)}
                className="group relative block h-full overflow-hidden rounded-[var(--radius-card)]"
              >
                <Img
                  src={interiorImages[id]}
                  alt={d.interior[id].name}
                  zoom
                  className={i === 0 ? "aspect-square h-full" : "aspect-square"}
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-sm font-semibold text-white sm:text-base">
                  {d.interior[id].name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <LineButton label={d.cta.lineInterior} size="lg" />
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── บทความ (การ์ดมีภาพปก) ───────────────────────── */
export async function ArticleCard({ slug }: { slug: string }) {
  const d = await getDict();
  const lang = await getLang();
  const a = articles.find((x) => x.slug === slug);
  if (!a) return null;
  const t = a[lang];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-line">
      <Img src={a.image} alt={t.title} zoom className="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Badge>{articleCategories[a.category][lang]}</Badge>
          <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          <span aria-hidden>·</span>
          <span>{t.readingTime}</span>
        </div>
        <h3 className="mt-3 text-lg leading-snug font-bold group-hover:text-brand">
          <Link href={href(lang, `/articles/${a.slug}`)} className="after:absolute after:inset-0">
            {t.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] text-muted">{t.excerpt}</p>
      </div>
      <span className="sr-only">{d.cta.readArticle}</span>
    </article>
  );
}

export async function ArticlesTeaser() {
  const d = await getDict();
  const lang = await getLang();
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          title={d.home.articles.title}
          lead={d.home.articles.lead}
          action={<TextLink href={href(lang, "/articles")}>{d.cta.seeAll}</TextLink>}
        />
        <div className="scroller -mx-4 mt-8 gap-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <div key={a.slug} className="w-[82%] sm:w-auto">
              <ArticleCard slug={a.slug} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── CTA ปิดท้ายทุกหน้า ───────────────────────── */
export async function FinalCta({ title }: { title?: string }) {
  const d = await getDict();
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep text-white">
      <Img src="inspection-hero.jpg" alt="" sizes="100vw" className="!absolute inset-0 -z-10 h-full w-full opacity-25" />
      <Container className="py-14 text-center sm:py-20">
        <h2 className="text-[1.75rem] font-bold sm:text-4xl">{title ?? d.finalCta.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85 sm:text-lg">{d.finalCta.lead}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LineButton label={d.cta.lineBook} size="lg" />
          <CallButton label={d.cta.callUs} variant="white" size="lg" />
        </div>
        <p className="mx-auto mt-6 flex max-w-xl items-start justify-center gap-2 text-sm text-white/80">
          <PinIcon className="mt-0.5 size-4 shrink-0 text-gold" />
          {d.common.serviceArea}
        </p>
      </Container>
    </section>
  );
}

/* ───────────────────────── หน้าตรวจ: จุดที่ตรวจ ───────────────────────── */
export async function ScopeGrid() {
  const d = await getDict();
  const p = d.inspectionPage;
  const icons: IconT[] = [ColumnsIcon, HomeIcon, BoltIcon, PipeIcon];
  return (
    <Section id="scope" tone="surface">
      <Container>
        <SectionHeader label={p.scopeLabel} title={p.scopeTitle} lead={p.scopeLead} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.scope.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="h-full rounded-[var(--radius-card)] bg-white p-5 shadow-card ring-1 ring-line">
                <IconBubble icon={icons[i]} size="lg" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tools.map((t) => (
                    <Badge key={t} tone="gold">
                      + {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หน้าตรวจ: อุปกรณ์ 6 ชิ้น ─────────────────────────
 * ข้อ 32: การ์ด 6 ใบ (desktop 3×2 · มือถือเลื่อนแนวนอน) ชื่อ 1 บรรทัด + ใช้ตรวจอะไร 1 บรรทัด
 * TODO: CLIENT-ASSET — รูปอุปกรณ์จริงของทีม (คำถามรอลูกค้า ข้อ 15) ตอนนี้ใช้ไอคอนแทน */
export async function EquipmentGrid() {
  const d = await getDict();
  const p = d.inspectionPage;
  return (
    <Section tone="white">
      <Container>
        <SectionHeader title={p.toolsTitle} lead={p.toolsLead} />
        <div className="scroller -mx-4 mt-8 gap-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {d.equipment.map((e, i) => {
            const Icon = equipmentIcons[i];
            return (
              <div key={e.name} className="flex w-[70%] items-center gap-4 rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line sm:w-auto">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                  <Icon className="size-8" />
                </span>
                <div>
                  <h3 className="font-bold">{e.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">{e.use}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หน้าตรวจ: ค่าบริการ ─────────────────────────
 * ข้อ 10, 11: แสดงเฉพาะราคาเริ่มต้น ตัดราคาแยกขนาด ตัดบริการต่อเติมออกจากตาราง
 * ใต้ราคา "ราคาจริงขึ้นกับขนาดพื้นที่" + ปุ่มทักไลน์สอบถามราคา · ข้อ 15, 16 เงื่อนไขที่ถูกต้อง */
export async function PricingBlock() {
  const d = await getDict();
  const p = d.inspectionPage;
  const incIcons: IconT[] = [BadgeCheckIcon, ClockIcon, DocIcon, RefreshIcon];
  return (
    <Section id="pricing" tone="soft">
      <Container>
        <SectionHeader title={p.pricingTitle} lead={p.pricingLead} align="center" />
        <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
          {(["condo", "house"] as const).map((id) => {
            const s = d.inspection[id];
            return (
              <div key={id} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card ring-1 ring-line">
                <span className="mx-auto">
                  <IconBubble icon={serviceIcon[id]} size="lg" />
                </span>
                <h3 className="mt-4 text-xl font-bold">{s.name}</h3>
                <div className="mt-3 flex justify-center">
                  <Price from={d.common.from} value={prices[id]} unit={d.common.baht} size="lg" />
                </div>
                <p className="mt-2 text-sm text-muted">{s.time}</p>
                <LineButton label={d.cta.linePrice} full className="mt-5" />
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          {d.common.priceBySize} · {p.specialNote}
        </p>

        <div className="mx-auto mt-10 max-w-4xl rounded-[var(--radius-card)] bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
          <h3 className="text-lg font-bold">{p.includesTitle}</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {p.includes.map((inc, i) => {
              const Icon = incIcons[i];
              return (
                <div key={inc.term} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <dt className="font-semibold">{inc.term}</dt>
                    <dd className="text-[0.9375rem] text-muted">{inc.detail}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-surface p-4 text-sm text-muted">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            {d.common.serviceArea} {d.common.travelFee}
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หัวหน้าเพจย่อย ─────────────────────────
 * ตัวหนังสือซ้าย ภาพขวา · มือถือภาพอยู่ล่างแบบสั้น ปุ่มต้องเห็นโดยไม่เลื่อน */
export async function PageHero({
  title,
  lead,
  image,
  imageAlt,
  children,
}: {
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-brand-soft">
      <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-16">
        <div>
          <h1 className="text-[1.875rem] leading-tight font-bold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">{lead}</p>
          {children}
        </div>
        <Img
          src={image}
          alt={imageAlt}
          priority
          className="aspect-[16/10] rounded-[var(--radius-card)] shadow-lift lg:aspect-[4/3]"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </Container>
    </section>
  );
}
