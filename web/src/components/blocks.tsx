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

/* บล็อกเนื้อหาทั้งเว็บ — รอบพรีเมียม (ต.ค. 2569, ui-ux-pro-max: Trust & Authority)
 *
 * ภาษาภาพที่ใช้ซ้ำทั้งเว็บ:
 *   - พื้นเข้ม = เขียวป่า brand-deep + ตารางพิมพ์เขียว + แสงทองนวลที่มุม (hero, ทำไมต้องเรา, CTA, footer)
 *   - ทอง = "ตราประทับรับรอง" ใช้กับใบ กว. ตัวเลข และคำเน้นบนพื้นเข้มเท่านั้น
 *   - การ์ดขาวมุมมน 20px เส้นบาง เงานุ่ม ยกขึ้นเล็กน้อยตอน hover (utility card / card-hover)
 *   - ไอคอนสำคัญอยู่ในก้อนเขียวไล่เฉด ไอคอนทอง (IconBubble tone="premium") */

type IconT = (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;

const serviceIcon: Record<InspectionId, IconT> = {
  house: HomeIcon,
  condo: BuildingIcon,
  construction: HardHatIcon,
  secondhand: KeyIcon,
  recheck: RefreshIcon,
  repair: WrenchIcon,
};

const equipmentIcons: IconT[] = [ThermalIcon, DropletIcon, CameraIcon, LevelIcon, PlugIcon, RulerIcon];

/* ───────────────────────── Hero หน้าแรก ─────────────────────────
 * ข้อ 24, 25, 43: จุดขาย "ตรวจบ้าน-คอนโดก่อนโอน โดยวิศวกรโยธามีใบ กว." + badge สภาวิศวกร
 * + ราคาเริ่มต้น + ปุ่มทักไลน์ — มือถือต้องเห็นปุ่ม LINE โดยไม่ต้องเลื่อน
 * จอใหญ่: ตัวหนังสือซ้าย ภาพในกรอบขวาพร้อมป้ายลอย · มือถือ: ภาพตามหลังปุ่ม
 * เว้นขอบล่างเผื่อการ์ดตัวเลข (StatsBand) ที่ขึ้นมาคร่อมขอบ hero */
export async function HomeHero() {
  const d = await getDict();
  const lang = await getLang();
  const h = d.home.hero;
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep bg-blueprint text-white">
      <div aria-hidden className="glow-gold absolute inset-0 -z-10" />
      <Container className="grid items-center gap-10 pt-8 pb-24 sm:pt-14 sm:pb-32 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:pt-20 lg:pb-36">
        <div>
          <Badge tone="gold">
            <BadgeCheckIcon className="size-4" />
            {d.common.licenceBadge} · {d.common.coe}
          </Badge>
          {/* บรรทัดแรกห้ามตัดกลางคำ ("คอน/โด") ตั้งแต่ sm ขึ้นไป — ไทยไม่มีเว้นวรรคให้เบราว์เซอร์เลือกจุดตัด */}
          <h1 className="mt-5 text-[2rem] leading-[1.2] font-bold sm:text-5xl lg:text-[3.125rem] xl:text-[3.375rem]">
            <span className="block sm:whitespace-nowrap">{h.title}</span>
            <span className="text-gold-gradient block pb-1">{h.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-[33rem] text-base text-white/80 sm:mt-5 sm:text-lg">{h.lead}</p>

          {/* ราคาเริ่มต้นเป็นการ์ดกระจกสองใบ ตัวเลขทอง (ข้อ 6, 7) */}
          <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
            {(["condo", "house"] as const).map((id) => (
              <div key={id} className="rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm">
                <p className="text-sm font-medium text-white/75">{id === "condo" ? h.condoFrom : h.houseFrom}</p>
                <Price from={d.common.from} value={prices[id]} unit={d.common.baht} size="sm" invert />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LineButton label={d.cta.lineBook} size="lg" />
            <Link
              href={href(lang, "/services/inspection#pricing")}
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 font-semibold ring-1 ring-white/35 transition-colors hover:bg-white/10 hover:ring-white/60"
            >
              {d.cta.seeStartPrice}
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm text-white/75">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-gold" />
            {d.common.serviceArea}
          </p>
        </div>

        {/* TODO: CLIENT-ASSET — ภาพ stock รอภาพวิศวกรหน้างานจริงจากเพจ (ข้อ 24) */}
        <div className="relative">
          <div className="rounded-[1.75rem] bg-white/[0.06] p-2 ring-1 ring-white/15">
            <Img
              src="hero-inspector.jpg"
              alt={h.imageAlt}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[16/9] rounded-[1.4rem] sm:aspect-[16/11] lg:aspect-[4/5]"
            />
          </div>
          {/* ป้ายลอย: ใบ กว. (ล่างซ้าย) และรายงานภายใน 3 วัน (บนขวา) */}
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-lift sm:left-6 lg:-left-8">
            <IconBubble icon={BadgeCheckIcon} tone="premium" />
            <div>
              <p className="font-bold">{d.common.licenceBadge}</p>
              <p className="text-sm text-muted">{d.common.coe}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 hidden sm:block lg:-right-4">
            <Badge tone="gold" className="px-4 py-2 text-sm">
              <ClockIcon className="size-4" />
              {d.common.reportIn}
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── แถบตัวเลข ─────────────────────────
 * ข้อ 5, 28: ตัวเลขชุดที่ลูกค้ายืนยัน · การ์ดขาวลอยคร่อมขอบล่าง hero
 * ตัวเลขใหญ่หนาเด่นกว่าคำอธิบาย มีไอคอนต่อตัวเลข เส้นคั่นบาง ๆ ระหว่างช่อง */
export async function StatsBand() {
  const d = await getDict();
  const icons: IconT[] = [HomeIcon, CalendarIcon, BuildingIcon, HeartIcon];
  return (
    <section className="relative z-10 -mt-16 sm:-mt-20">
      <Container>
        <div className="grid grid-cols-2 overflow-hidden rounded-[1.5rem] bg-white shadow-lift ring-1 ring-line lg:grid-cols-4">
          {statValues.map((v, i) => {
            const Icon = icons[i];
            return (
              <div
                key={v}
                className={`flex items-center gap-3 p-4 sm:gap-4 sm:p-6 lg:p-7 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                  i < 2 ? "border-b border-line lg:border-b-0" : ""
                } ${i === 1 ? "lg:border-r" : ""}`}
              >
                <span className="hidden sm:block">
                  <IconBubble icon={Icon} tone="premium" />
                </span>
                <div>
                  <p className="tnum text-[1.75rem] leading-none font-bold text-brand-deep sm:text-4xl">{v}</p>
                  <p className="mt-1.5 text-sm text-muted">{d.stats[i]}</p>
                </div>
              </div>
            );
          })}
        </div>
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
          label={d.labels.services}
          title={headTitle}
          lead={headLead}
          action={
            detailed ? undefined : <TextLink href={href(lang, "/services/inspection")}>{d.cta.seeServices}</TextLink>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {main.map((id, i) => {
            const s = d.inspection[id];
            const Icon = serviceIcon[id];
            return (
              <Reveal key={id} delay={i * 80}>
                <article id={detailed ? id : undefined} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <Img
                      src={inspectionImages[id] ?? "hero.jpg"}
                      alt={s.name}
                      zoom
                      className="aspect-[2/1] sm:aspect-[16/9]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/10 to-transparent" />
                    <span className="absolute top-3 left-3">
                      <Badge tone="line">
                        <ClockIcon className="size-4 text-brand" />
                        {s.timeShort}
                      </Badge>
                    </span>
                    <span className="absolute -bottom-6 left-6">
                      <IconBubble icon={Icon} tone="premium" size="lg" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-9 sm:p-7 sm:pt-10">
                    <h3 className="text-xl font-bold sm:text-2xl">{s.name}</h3>
                    <p className="mt-2 text-muted">{s.short}</p>
                    {detailed ? (
                      <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5">
                            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                              <CheckIcon className="size-3.5" />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="min-h-6 flex-1" aria-hidden />
                    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                      {s.price ? <Price from={d.common.from} value={s.price} unit={d.common.baht} /> : null}
                      {detailed ? (
                        <p className="text-sm text-muted">{s.time}</p>
                      ) : (
                        <TextLink href={href(lang, `/services/inspection#${id}`)}>{d.cta.seeDetail}</TextLink>
                      )}
                    </div>
                    <LineButton label={d.cta.linePrice} full className="mt-5" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 flex items-center gap-4">
          <h3 className="shrink-0 text-xl font-bold sm:text-2xl">{d.home.services.specialTitle}</h3>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <div className="scroller -mx-4 mt-6 gap-4 px-4 pt-1 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {special.map((id) => {
            const s = d.inspection[id];
            return (
              <article key={id} id={detailed ? id : undefined} className="card card-hover flex w-[78%] flex-col p-6 sm:w-auto">
                <IconBubble icon={serviceIcon[id]} tone="soft" />
                <h4 className="mt-5 text-lg font-bold">{s.name}</h4>
                <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                <LineButton label={id === "recheck" ? d.cta.linePackage : d.cta.lineAsk} size="sm" full className="mt-6" />
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ใบ กว. ─────────────────────────
 * ข้อ 35: ไม่ใช้คำ "อย่าเพิ่งเชื่อเรา" (ยังรอลูกค้ายืนยัน) · ตราประทับทองแทนโลโก้สภาวิศวกร
 * (โลโก้เป็นเครื่องหมายขององค์กร ไม่หยิบมาใช้เอง) · กรอบไล่ทองบางให้อ่านเป็น "เอกสารรับรอง"
 * TODO: CLIENT-ASSET — ภาพตัวอย่างใบ กว. (เบลอเลขได้) รอจากลูกค้า */
export async function LicenceCard({ className = "" }: { className?: string }) {
  const d = await getDict();
  return (
    <div className={`ring-gold relative flex flex-col overflow-hidden rounded-[var(--radius-card)] p-7 text-white shadow-lift sm:p-9 ${className}`}>
      <div aria-hidden className="glow-gold absolute inset-0" />
      <div aria-hidden className="absolute -right-10 -bottom-10 size-48 rounded-full border border-gold/20" />
      <div aria-hidden className="absolute -right-4 -bottom-4 size-32 rounded-full border border-gold/15" />
      <div className="relative">
        <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-deep text-brand-deep shadow-gold">
          <BadgeCheckIcon className="size-9" />
        </span>
        <p className="mt-6 text-sm font-semibold text-gold">{d.common.licenceBadge}</p>
        <h3 className="mt-1.5 text-2xl leading-snug font-bold sm:text-[1.75rem]">{d.home.why.licenceTitle}</h3>
        <p className="mt-3 text-white/80">{d.common.licenceBody}</p>
        <p className="mt-2 text-white/80">{d.home.why.licenceBody}</p>
        {credentials.licenseNo ? (
          <p className="tnum mt-5 rounded-xl bg-white/10 px-4 py-3 font-bold">{credentials.licenseNo}</p>
        ) : null}
        <a
          href={credentials.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-light to-gold px-5 font-semibold text-brand-deep shadow-gold transition-transform hover:-translate-y-0.5 sm:self-start"
        >
          {d.cta.verify}
          <ExternalIcon className="size-4" />
        </a>
      </div>
    </div>
  );
}

/* ───────────────────────── ทำไมต้องเรา (หน้าแรก) ─────────────────────────
 * section เข้มกลางหน้า — จังหวะพักสายตาระหว่างบริการกับขั้นตอน และเป็นที่ของ "ความน่าเชื่อถือ" */
export async function WhyUs() {
  const d = await getDict();
  const icons: IconT[] = [BadgeCheckIcon, ThermalIcon, DocIcon, SofaIcon];
  return (
    <Section tone="dark">
      <Container>
        <SectionHeader label={d.labels.why} title={d.home.why.title} lead={d.home.why.lead} invert />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          <LicenceCard />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {d.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="h-full rounded-[var(--radius-card)] bg-white/[0.05] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08] sm:p-6">
                  <IconBubble icon={icons[i]} tone="white" />
                  <h3 className="mt-4 font-bold sm:text-lg">{w.title}</h3>
                  <p className="mt-1.5 text-sm text-white/70 sm:text-[0.9375rem]">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* อุปกรณ์จริงของทีม — แถบชิปไอคอน ไม่ใช่รายการตัวหนังสือ */}
        <ul className="scroller -mx-4 mt-8 gap-3 px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {d.equipment.map((e, i) => {
            const Icon = equipmentIcons[i];
            return (
              <li key={e.name} className="flex items-center gap-2.5 rounded-full bg-white/[0.06] py-2 pr-4 pl-2 text-sm font-medium text-white ring-1 ring-white/10">
                <span className="grid size-8 place-items-center rounded-full bg-gold/15 text-gold">
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
 * ข้อ 30: desktop แนวนอนมีเส้นเชื่อม · มือถือ timeline แนวตั้ง
 * วงกลมเลข + ไอคอน + หัวข้อสั้น + คำอธิบาย + badge เวลา · ขั้น 04 มีลิงก์สอบถามแพ็กเกจ */
export async function Stepper({ id, tone = "white" }: { id?: string; tone?: "white" | "surface" }) {
  const d = await getDict();
  const icons: IconT[] = [ChatIcon, UsersIcon, DocIcon, RefreshIcon];
  const ringBg = tone === "surface" ? "ring-surface" : "ring-white";
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeader label={d.labels.steps} title={d.home.steps.title} lead={d.home.steps.lead} align="center" />
        <ol className="relative mt-12 grid gap-9 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r from-gold/70 via-brand/30 to-gold/70 lg:block"
          />
          {d.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                {i < d.steps.length - 1 ? (
                  <span aria-hidden className="absolute top-16 bottom-[-2.25rem] left-8 w-0.5 bg-gradient-to-b from-brand/30 to-transparent lg:hidden" />
                ) : null}
                <span
                  className={`relative z-10 grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-gold shadow-[0_12px_24px_-12px_rgb(11_42_27/0.9)] ring-8 ${ringBg}`}
                >
                  <Icon className="size-7" />
                  <span className="tnum absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep text-sm font-bold text-brand-deep shadow-gold">
                    {i + 1}
                  </span>
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-muted">{s.body}</p>
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
        <div className="mt-12 flex justify-center">
          <LineButton label={d.cta.lineBook} size="lg" />
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ตัวอย่างรายงาน ─────────────────────────
 * ข้อ 36, 41: mockup รายงาน + ปุ่มทักไลน์ขอดูตัวอย่าง (เปิดแท็บใหม่)
 * กระดาษสองแผ่นซ้อนแบบกล่องปิดสนิท ไม่มีข้อความทับบนภาพ */
export async function ReportPreview({ id }: { id?: string }) {
  const d = await getDict();
  const icons: IconT[] = [CameraIcon, PinIcon, CheckIcon, DocIcon];
  return (
    <Section id={id} tone="surface">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-soft via-white to-gold-soft" />
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl bg-white shadow-card ring-1 ring-line" />
          <div className="relative rounded-2xl bg-white p-3 shadow-lift ring-1 ring-line">
            {/* TODO: CLIENT-ASSET — ภาพหน้ารายงานจริง (ปิดข้อมูลลูกค้า) รอจากลูกค้า */}
            <Img src="report.jpg" alt={d.home.report.title} className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden>
              {["article-defect.jpg", "article-crack.jpg", "article-condo.jpg"].map((s) => (
                <Img key={s} src={s} alt="" className="aspect-[4/3] rounded-lg" sizes="15vw" />
              ))}
            </div>
          </div>
          <span className="absolute -top-4 -right-2 sm:-right-4">
            <Badge tone="gold" className="px-4 py-2 text-sm">
              <ClockIcon className="size-4" />
              {d.common.reportIn}
            </Badge>
          </span>
        </div>
        <div>
          <SectionHeader label={d.labels.report} title={d.home.report.title} lead={d.home.report.lead} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {d.reportPoints.map((p, i) => {
              const Icon = icons[i];
              return (
                <li key={p} className="card flex items-center gap-3 p-4 font-semibold">
                  <IconBubble icon={Icon} tone="soft" />
                  {p}
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <LineButton label={d.cta.lineReport} size="lg" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── รีวิว ─────────────────────────
 * ข้อ 34: การ์ดขนาดเท่ากันทุกใบ · ฉบับไทยแสดงเฉพาะรีวิวภาษาไทย · มือถือเลื่อนแนวนอน
 * TODO: CLIENT-ASSET รอรูป/ชื่อย่อผู้รีวิว */
export async function Reviews() {
  const d = await getDict();
  const lang = await getLang();
  const list = lang === "th" ? reviews.filter((r) => r.lang === "th") : [...reviews].sort((a) => (a.lang === "en" ? -1 : 1));
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          label={d.labels.reviews}
          title={d.home.reviews.title}
          lead={d.home.reviews.lead}
          action={
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 font-semibold text-brand ring-1 ring-line transition-colors hover:bg-surface"
            >
              <FacebookIcon className="size-5 text-[#0866ff]" />
              {d.home.reviews.more}
            </a>
          }
        />
        <div className="scroller -mx-4 mt-10 gap-4 px-4 pt-1 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {list.slice(0, 4).map((r) => (
            <figure key={r.quote} className="card card-hover relative flex w-[82%] flex-col p-6 sm:w-auto">
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-soft text-gold-deep">
                  <QuoteIcon className="size-5" />
                </span>
                {r.service ? <Badge>{d.inspection[r.service].name}</Badge> : null}
              </div>
              <blockquote lang={r.lang} className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                {r.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
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
 * ข้อ 26: Interior นำด้วยภาพผลงาน — bento ใหญ่ 1 (2×2) + เล็ก 8 = 12 ช่อง เต็ม 3 แถวพอดีบน desktop
 * มือถือแสดง 5 ภาพแรก · TODO: CLIENT-ASSET รอภาพจากเพจ Interior */
export async function InteriorShowcase() {
  const d = await getDict();
  const lang = await getLang();
  const ids = interiorIds;
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          label={d.labels.interior}
          title={d.home.interior.title}
          lead={d.home.interior.lead}
          action={<TextLink href={href(lang, "/services/interior")}>{d.cta.seeAll}</TextLink>}
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ids.map((id, i) => (
            <li key={id} className={i === 0 ? "col-span-2 row-span-2" : i >= 5 ? "hidden lg:block" : ""}>
              <Link
                href={href(lang, `/services/interior#${id}`)}
                className="group relative block h-full overflow-hidden rounded-[var(--radius-card)] shadow-card"
              >
                <Img
                  src={interiorImages[id]}
                  alt={d.interior[id].name}
                  zoom
                  className={i === 0 ? "aspect-square h-full" : "aspect-square"}
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-brand-night/85 via-brand-night/40 to-transparent p-3 pt-12 text-sm font-semibold text-white sm:p-4 sm:text-base">
                  {d.interior[id].name}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowIcon className="size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
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
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative">
        <Img src={a.image} alt={t.title} zoom className="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="absolute top-3 left-3">
          <Badge tone="line">{articleCategories[a.category][lang]}</Badge>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-subtle">
          <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          <span aria-hidden>·</span>
          <span>{t.readingTime}</span>
        </div>
        <h3 className="mt-2 text-lg leading-snug font-bold transition-colors group-hover:text-brand">
          <Link href={href(lang, `/articles/${a.slug}`)} className="after:absolute after:inset-0">
            {t.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] text-muted">{t.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand">
          {d.cta.readArticle}
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
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
          label={d.labels.articles}
          title={d.home.articles.title}
          lead={d.home.articles.lead}
          action={<TextLink href={href(lang, "/articles")}>{d.cta.seeAll}</TextLink>}
        />
        <div className="scroller -mx-4 mt-10 gap-4 px-4 pt-1 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-6">
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

/* ───────────────────────── CTA ปิดท้ายทุกหน้า ─────────────────────────
 * แผ่นเขียวเข้มมุมมนลอยบนพื้นขาว (ไม่ใช่แถบเต็มจอ) — อ่านเป็น "ข้อเสนอ" ที่ชัดเจนก่อนถึง footer */
export async function FinalCta({ title, flush = false }: { title?: string; flush?: boolean }) {
  const d = await getDict();
  // flush = section ก่อนหน้าเป็นพื้นขาวอยู่แล้ว ตัด padding บนทิ้ง ไม่ให้ช่องว่างซ้อนสองชั้น
  return (
    <section className={`bg-white pb-14 sm:pb-20 ${flush ? "pt-0" : "pt-14 sm:pt-20"}`}>
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-deep bg-blueprint px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-20">
          <div aria-hidden className="glow-gold absolute inset-0 -z-10" />
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-deep text-brand-deep shadow-gold">
            <BadgeCheckIcon className="size-8" />
          </span>
          <h2 className="mt-6 text-[1.75rem] leading-tight font-bold sm:text-[2.5rem]">{title ?? d.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80 sm:text-lg">{d.finalCta.lead}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LineButton label={d.cta.lineBook} size="lg" />
            <CallButton label={d.cta.callUs} variant="white" size="lg" />
          </div>
          <p className="mx-auto mt-7 flex max-w-xl items-start justify-center gap-2 text-sm text-white/70">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-gold" />
            {d.common.serviceArea}
          </p>
        </div>
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
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.scope.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card card-hover relative h-full overflow-hidden p-6">
                <span aria-hidden className="tnum absolute -top-3 right-3 text-[5rem] leading-none font-bold text-brand/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconBubble icon={icons[i]} tone="premium" size="lg" />
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tools.map((t) => (
                    <span key={t} className="inline-flex items-center rounded-full bg-gold-soft px-3 py-1 text-[0.8125rem] font-semibold text-gold-text ring-1 ring-gold/40">
                      + {t}
                    </span>
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
    <Section tone="dark">
      <Container>
        <SectionHeader label={d.labels.tools} title={p.toolsTitle} lead={p.toolsLead} invert />
        <div className="scroller -mx-4 mt-10 gap-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {d.equipment.map((e, i) => {
            const Icon = equipmentIcons[i];
            return (
              <div
                key={e.name}
                className="flex w-[72%] items-center gap-4 rounded-[var(--radius-card)] bg-white/[0.05] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08] sm:w-auto"
              >
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-deep text-brand-deep shadow-gold">
                  <Icon className="size-8" />
                </span>
                <div>
                  <h3 className="font-bold">{e.name}</h3>
                  <p className="mt-0.5 text-sm text-white/70">{e.use}</p>
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
        <SectionHeader label={d.labels.pricing} title={p.pricingTitle} lead={p.pricingLead} align="center" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {(["condo", "house"] as const).map((id) => {
            const s = d.inspection[id];
            return (
              <div key={id} className="card card-hover relative flex flex-col overflow-hidden p-7 text-center">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
                <span className="mx-auto">
                  <IconBubble icon={serviceIcon[id]} tone="premium" size="lg" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
                <div className="mt-3 flex justify-center">
                  <Price from={d.common.from} value={prices[id]} unit={d.common.baht} size="lg" />
                </div>
                <p className="mt-2 text-sm text-muted">{s.time}</p>
                <LineButton label={d.cta.linePrice} full className="mt-6" />
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-center text-sm text-muted">
          {d.common.priceBySize} · {p.specialNote}
        </p>

        <div className="card mx-auto mt-12 max-w-4xl p-6 sm:p-9">
          <h3 className="text-lg font-bold">{p.includesTitle}</h3>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {p.includes.map((inc, i) => {
              const Icon = incIcons[i];
              return (
                <div key={inc.term} className="flex gap-3.5">
                  <IconBubble icon={Icon} tone="soft" />
                  <div>
                    <dt className="font-semibold">{inc.term}</dt>
                    <dd className="text-[0.9375rem] text-muted">{inc.detail}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
          <p className="mt-7 flex items-start gap-2 rounded-xl bg-surface p-4 text-sm text-muted">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            {d.common.serviceArea} {d.common.travelFee}
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หัวหน้าเพจย่อย ─────────────────────────
 * พื้นเข้มแบบเดียวกับ hero หน้าแรก ให้ทุกหน้าเปิดด้วยน้ำหนักเดียวกัน
 * ตัวหนังสือซ้าย ภาพในกรอบขวา · มือถือภาพอยู่ล่าง ปุ่มต้องเห็นโดยไม่เลื่อน */
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
    <section className="relative isolate overflow-hidden bg-brand-deep bg-blueprint text-white">
      <div aria-hidden className="glow-gold absolute inset-0 -z-10" />
      <Container className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <h1 className="text-[2rem] leading-[1.2] font-bold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">{lead}</p>
          {children}
        </div>
        <div className="rounded-[1.75rem] bg-white/[0.06] p-2 ring-1 ring-white/15">
          <Img
            src={image}
            alt={imageAlt}
            priority
            className="aspect-[16/10] rounded-[1.4rem] lg:aspect-[4/3]"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}

/* หัวหน้าเพจแบบไม่มีภาพ (ติดต่อ บทความ กฎหมาย) — โทนเข้มเดียวกับ PageHero */
export function PlainHero({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep bg-blueprint text-white">
      <div aria-hidden className="glow-gold absolute inset-0 -z-10" />
      <Container className="py-12 sm:py-16">
        <h1 className="text-[2rem] leading-[1.2] font-bold sm:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-xl text-white/80 sm:text-lg">{lead}</p> : null}
        {children}
      </Container>
    </section>
  );
}
