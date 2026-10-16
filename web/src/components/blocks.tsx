import Link from "next/link";
import {
  ArrowIcon,
  BadgeCheckIcon,
  BoltIcon,
  BuildingIcon,
  CurtainIcon,
  ExtendHomeIcon,
  FloorIcon,
  PartitionIcon,
  ShieldIcon,
  SunIcon,
  WallpaperIcon,
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
  PhoneIcon,
  PlugIcon,
  QuoteIcon,
  RefreshIcon,
  RulerIcon,
  SofaIcon,
  ThermalIcon,
  WrenchIcon,
} from "@/components/icons";
import { Counter, Reveal } from "@/components/reveal";
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
  inspectionImages,
  interiorIds,
  interiorImages,
  prices,
  statValues,
  telHref,
  type InspectionId,
  type InteriorId,
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

/** ภาพประกอบขั้นตอน 1–4 (ทักไลน์ · ตรวจหน้างาน · รายงาน · ตรวจซ้ำหลังแก้) — TODO: CLIENT-ASSET */
const stepImages = ["article-condo.jpg", "hero-inspector.jpg", "report.jpg", "article-crack.jpg"];
/** ไอคอนบนภาพขั้นตอน (เลขขั้นย้ายไปอยู่หน้าหัวข้อแทน) */
const stepIcons: IconT[] = [ChatIcon, HardHatIcon, DocIcon, RefreshIcon];

/** ไอคอนงานตกแต่ง 9 บริการ — ใช้แทนเลขลำดับบนภาพผลงาน */
const interiorIcon: Record<InteriorId, IconT> = {
  curtain: CurtainIcon,
  wallpaper: WallpaperIcon,
  "spc-floor": FloorIcon,
  "window-film": SunIcon,
  "bird-net": ShieldIcon,
  extension: ExtendHomeIcon,
  "glass-partition": PartitionIcon,
  "drying-rack": DropletIcon,
  "built-in": ColumnsIcon,
};

const equipmentIcons: IconT[] = [ThermalIcon, DropletIcon, CameraIcon, LevelIcon, PlugIcon, RulerIcon];

/* ───────────────────────── Hero หน้าแรก ─────────────────────────
 * โครงตามภาพ reference (กรอบภาพมน + แผงลอยแถวล่าง) ปรับตามหลัก Trust & Authority (ui-ux-pro-max):
 *   1) ความน่าเชื่อถือขึ้นก่อน — บรรทัดบนสุดคือป้ายใบ กว. (ตัดชื่อสภาวิศวกร + ลิงก์ตรวจสอบออกตามคำขอ ต.ค. 2569 — มีใน section มาตรฐานวิชาชีพแล้ว)
 *   2) ปุ่มหลักปุ่มเดียวต่อจอ (LINE)
 *   3) แถบความน่าเชื่อถือแถบเดียวลอยบนภาพ — ม่านเงาบางที่ขอบล่างภาพให้แถบขาวแยกจากพื้นห้อง
 * ภาพ: ห้องคอนโดใหม่ก่อนรับโอน (ไม่มีลายน้ำ) · TODO: CLIENT-ASSET รอภาพหน้างานจริงของทีม */
export async function HomeHero() {
  const d = await getDict();
  const lang = await getLang();
  const h = d.home.hero;
  const statOrder = [0, 2, 1, 3]; // หลังที่ตรวจ · โครงการ · ปี · แนะนำต่อ

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-paper sm:rounded-[2rem]">
        <div className="absolute inset-x-0 top-0 -z-10 h-[23rem] sm:h-[33rem] lg:inset-y-0 lg:left-[36%] lg:h-auto">
          <Img
            src="article-condo.jpg"
            alt={h.imageAlt}
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="hero-img h-full w-full [&_img]:object-[60%_center]"
          />
          {/* ม่านเงาบางที่ขอบล่างภาพ (จอใหญ่) — ให้แผงขาวแถวล่างลอยเด่นจากพื้นห้อง */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-ink/35 to-transparent lg:block" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/0 from-[7rem] via-paper/85 via-[14.5rem] to-paper to-[19rem] sm:from-[9rem] sm:via-[24rem] sm:to-[29rem] lg:bg-gradient-to-r lg:from-paper lg:from-[38%] lg:via-paper/70 lg:via-[48%] lg:to-paper/0 lg:to-[64%]"
        />

        <Container className="relative pt-[12rem] pb-4 sm:pt-[20rem] lg:pt-20 lg:pb-8">
          <div className="max-w-[40rem]">
            {/* 1) ความน่าเชื่อถือขึ้นก่อน */}
            <p className="hero-in flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pr-3.5 pl-1 font-semibold text-ink ring-1 ring-ink/10">
                <span className="grid size-7 place-items-center rounded-full bg-gold text-ink">
                  <BadgeCheckIcon className="size-4" />
                </span>
                {d.common.licenceBadge}
              </span>
            </p>

            {/* บรรทัดแรกภาษาไทยห้ามตัดกลางคำ ("คอน/โด") */}
            <h1 style={{ "--d": "80ms" } as React.CSSProperties} className="hero-in mt-5 text-[clamp(1.6rem,8.4vw,2.25rem)] leading-[1.14] font-bold text-ink sm:text-5xl lg:text-[4rem]">
              <span className={`block ${lang === "th" ? "whitespace-nowrap" : ""}`}>{h.title}</span>
              <span className="block text-brand">{h.titleAccent}</span>
            </h1>
            <p style={{ "--d": "180ms" } as React.CSSProperties} className="hero-in mt-5 max-w-[30rem] text-base leading-relaxed text-muted sm:text-lg">{h.lead}</p>

            {/* 2) ปุ่มหลักปุ่มเดียว (ตัดปุ่ม "ดูขั้นตอนการตรวจ" ออกตามคำขอ) */}
            <div style={{ "--d": "280ms" } as React.CSSProperties} className="hero-in mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
              <LineButton label={d.cta.lineBook} size="lg" />
            </div>
          </div>

          {/* แถบความน่าเชื่อถือแถบเดียว: ตัวเลขจริง 4 ตัว + ส่งรายงานภายใน 3 วัน
              (ตัดการ์ดสไลด์บริการและการ์ดรายงานออก — มี section ของตัวเองถัดลงไปอยู่แล้ว
              hero จึงเหลือ "หลักฐาน" ชิ้นเดียวที่อ่านจบในแวบเดียว) */}
          <dl style={{ "--d": "420ms" } as React.CSSProperties} className="hero-in mt-12 grid grid-cols-2 gap-y-5 rounded-[1.5rem] bg-white/90 p-5 shadow-[0_20px_50px_-24px_rgb(16_35_26/0.45)] ring-1 ring-black/5 backdrop-blur-md sm:grid-cols-3 sm:p-6 lg:mt-24 lg:grid-cols-[1fr_1fr_1fr_1fr_1.45fr] lg:gap-y-0 lg:px-8 lg:py-6">
            {statOrder.map((k, n) => (
              <div key={k} className={`flex flex-col-reverse justify-end px-3 lg:px-6 lg:first:pl-0 ${n > 0 ? "lg:border-l lg:border-ink/10" : ""}`}>
                {/* dt ต้องมาก่อน dd ตามโครง <dl> — กลับลำดับการแสดงผลด้วย flex-col-reverse ให้ตัวเลขอยู่บน */}
                <dt className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{d.stats[k]}</dt>
                <dd className="tnum text-[1.75rem] leading-none font-bold text-ink">
                  <Counter value={statValues[k]} />
                </dd>
              </div>
            ))}
            <div className="col-span-2 flex items-center gap-3 border-t border-ink/10 px-3 pt-5 sm:col-span-1 sm:border-t-0 sm:pt-0 lg:border-l lg:px-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <ClockIcon className="size-5" />
              </span>
              <div>
                <dt className="sr-only">{h.reportCardTitle}</dt>
                <dd className="font-bold leading-snug whitespace-nowrap text-ink">{d.common.reportIn}</dd>
                <dd>
                  <Link href={href(lang, "/#report")} className="inline-flex min-h-8 items-center gap-1 text-[0.8125rem] font-semibold whitespace-nowrap text-brand hover:underline">
                    {h.reportCardLink}
                    <ArrowIcon className="size-3.5" />
                  </Link>
                </dd>
              </div>
            </div>
          </dl>
        </Container>
      </div>
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
                  <IconBubble icon={Icon} tone="soft" />
                </span>
                <div>
                  <p className="tnum text-[1.75rem] leading-none font-bold text-ink sm:text-4xl">{v}</p>
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

/* ───────────────────────── บริการตรวจ 6 ตัว — Service Showcase ─────────────────────────
 * รอบ Premium Architectural (ต.ค. 2569): editorial แทนการ์ดหน้าตาเดียวกัน
 *   แถว 1: บริการหลัก 2 ตัว เป็นภาพใหญ่สองขนาด (7/5 คอลัมน์) + แผงข้อมูลลอยบนภาพ
 *   แถว 2: ตรวจต่อเติม/ระหว่างก่อสร้าง แบบ split (ภาพซ้าย ข้อความขวา) — งานคนละลักษณะกับรับโอน
 *   แถว 3: บริการเฉพาะกรณีอีก 3 ตัว เป็นคอลัมน์เลขลำดับ เส้นบาง ไม่มีกล่อง
 * ข้อ 3, 4, 9: บริการเฉพาะกรณีไม่มีราคา มีแค่ปุ่มทักไลน์ · ราคาเฉพาะบ้าน/คอนโด
 * detailed = หน้า /services/inspection: ทุกบริการมี id เป็น anchor และบริการหลักแสดงจุดที่ตรวจ */
export async function InspectionServices({ tone = "white" }: { tone?: "white" | "surface" | "paper" }) {
  const d = await getDict();
  const lang = await getLang();
  const main = ["house", "condo"] as const;
  const special = ["construction", "secondhand", "recheck", "repair"] as const;

  /* layout รอบ ต.ค. 2569 (คำขอ "ปรับ layout ใหม่")
   *   ชั้น 1: บริการหลักสองใบเท่ากัน — ภาพบน ข้อมูลล่าง (ไม่มีแผงลอยทับภาพ)
   *           ราคา + เวลาในแถบเดียว · จุดที่ตรวจ 3 ข้อแรก · ปุ่ม LINE + ลิงก์รายละเอียด
   *   ชั้น 2: บริการเฉพาะกรณีทั้ง 4 รวมในแผงพื้นเขียวอ่อนแผงเดียว อ่านเป็น "ทางเลือกเสริม" ชัดเจน */
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader
          label={d.labels.services}
          title={d.home.services.title}
          lead={d.home.services.lead}
          action={<TextLink href={href(lang, "/services/inspection")}>{d.cta.seeServices}</TextLink>}
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {main.map((id, n) => {
            const s = d.inspection[id];
            const Icon = serviceIcon[id];
            return (
              <Reveal as="article" key={id} delay={n * 80} className="group flex flex-col">
                <div className="relative">
                  <Img
                    src={inspectionImages[id] ?? "article-condo.jpg"}
                    alt={s.name}
                    zoom
                    className="aspect-[16/10] rounded-[1.75rem]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <h3 className="mt-6 flex items-center gap-3 text-2xl font-bold text-ink">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Icon className="size-5" />
                  </span>
                  {s.name}
                </h3>
                <p className="mt-2 text-muted">{s.short}</p>

                <dl className="mt-5 grid grid-cols-2 divide-x divide-brand/20 rounded-2xl bg-brand-soft">
                  <div className="px-5 py-4">
                    <dt className="text-sm text-muted">{d.labels.pricing}</dt>
                    <dd className="mt-1">{s.price ? <Price from={d.common.from} value={s.price} unit={d.common.baht} size="sm" /> : null}</dd>
                  </div>
                  <div className="px-5 py-4">
                    <dt className="text-sm text-muted">{d.home.hero.rateHead[1]}</dt>
                    <dd className="mt-1 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-ink sm:text-base">
                      <ClockIcon className="mt-1 size-4 shrink-0 text-brand" />
                      {/* ตัดบรรทัดเฉพาะตรงเว้นวรรค กัน "3.5 / ชม." แยกบรรทัด */}
                      <span>
                        {s.timeShort.split(" ").map((w, k) => (
                          <span key={k} className="inline-block whitespace-nowrap">
                            {w}&nbsp;
                          </span>
                        ))}
                      </span>
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 flex-1 space-y-2 text-[0.9375rem] text-ink">
                  {s.bullets.slice(0, 3).map((bl) => (
                    <li key={bl} className="flex gap-2.5">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                      {bl}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <LineButton label={d.cta.linePrice} />
                  <TextLink href={href(lang, `/services/inspection#${id}`)}>{d.cta.seeDetail}</TextLink>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* บริการเฉพาะกรณี */}
        <div className="mt-14 rounded-[1.75rem] bg-brand-soft p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-bold text-ink sm:text-2xl">{d.home.services.specialTitle}</h3>
            <p className="text-sm text-muted">{d.inspectionPage.specialNote}</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {special.map((id, n) => {
              const s = d.inspection[id];
              const Icon = serviceIcon[id];
              return (
                <Reveal as="li" key={id} delay={n * 60} className="flex flex-col rounded-[1.25rem] bg-white p-5">
                  <span className="grid size-11 place-items-center rounded-full bg-brand text-white">
                    <Icon className="size-5" />
                  </span>
                  <h4 className="mt-4 font-bold text-ink">{s.name}</h4>
                  <p className="mt-1.5 flex-1 text-sm text-muted">{s.short}</p>
                  <a
                    href={contact.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-line-btn hover:underline"
                  >
                    <LineIcon className="size-4" />
                    {id === "recheck" ? d.cta.linePackage : d.cta.lineAsk}
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ใบ กว. ─────────────────────────
 * ข้อ 35: ไม่ใช้คำ "อย่าเพิ่งเชื่อเรา" (ยังรอลูกค้ายืนยัน) · ตราทองแทนโลโก้สภาวิศวกร
 * แผงสีหมึกทึบแผงเดียวของ section — ไม่มีแสงฟุ้ง วงกลมตกแต่ง หรือไล่เฉด (brief รอบ Premium Architectural)
 * TODO: CLIENT-ASSET — ภาพตัวอย่างใบ กว. (เบลอเลขได้) รอจากลูกค้า */
export async function LicenceCard({ className = "" }: { className?: string }) {
  const d = await getDict();
  return (
    <div className={`flex flex-col rounded-[1.5rem] bg-ink p-7 text-white sm:p-9 ${className}`}>
      <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
        <BadgeCheckIcon className="size-8" />
      </span>
      <p className="mt-6 text-sm font-semibold text-gold">{d.common.licenceBadge}</p>
      <h3 className="mt-1.5 text-2xl leading-snug font-bold sm:text-[1.75rem]">
        {d.home.why.licenceTitle.split(" ").map((w, k) => (
          <span key={k} className="inline-block">
            {w}&nbsp;
          </span>
        ))}
      </h3>
      <p className="mt-3 text-white/75">{d.common.licenceBody}</p>
      <p className="mt-2 text-white/75">{d.home.why.licenceBody}</p>
      {credentials.licenseNo ? (
        <p className="tnum mt-5 rounded-xl bg-white/10 px-4 py-3 font-bold">{credentials.licenseNo}</p>
      ) : null}
      <a
        href={credentials.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-semibold text-ink transition-colors hover:bg-gold-light sm:self-start"
      >
        {d.cta.verify}
        <ExternalIcon className="size-4" />
      </a>
    </div>
  );
}

/* ───────────────────────── ทำไมต้องเรา (มาตรฐานวิชาชีพ) ─────────────────────────
 * ชั้นเดียว: ใบรับรอง (ซ้าย) คู่กับเหตุผล 4 ข้อ (ขวา)
 * ตัดชั้น "อุปกรณ์ตรวจของทีมเรา" ออกจากหน้าแรก — มีหัวข้อของตัวเองจนอ่านเหมือนคนละ section
 * และซ้ำกับเหตุผลข้อ 2 · รายการอุปกรณ์เต็มอยู่ที่หน้าตรวจ (EquipmentGrid)
 * ข้อความทุกบรรทัดมาจาก dict ที่ยืนยันแล้ว ไม่มีตัวเลขเพิ่ม */
export async function WhyUs() {
  const d = await getDict();
  const icons: IconT[] = [BadgeCheckIcon, ThermalIcon, DocIcon, SofaIcon];
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader label={d.labels.why} title={d.home.why.title} lead={d.home.why.lead} ruleClass="border-brand/20" />

        {/* ชั้น 1 — ใบรับรอง + เหตุผล */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="scale" className="lg:col-span-5">
            {/* การ์ดพื้นเขียวเข้ม brand-dark (ทอง 6.9:1 ขาว 9.9:1 ผ่าน AA) — สีหลักของ section · ทองใช้กับตราและปุ่มตรวจสอบ (คู่สี CI) */}
            <div className="rounded-[1.5rem] bg-brand-dark text-white">
              <div className="p-6 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-full bg-gold text-ink">
                    <BadgeCheckIcon className="size-7" />
                  </span>
                  <span className="max-w-[15rem] pt-1 text-right text-sm leading-snug text-white/75">
                    {/* ตัดบรรทัดเฉพาะตรงเว้นวรรค กัน "สภา/วิศวกร" */}
                    {d.common.licenceBody.split(" ").map((w, k) => (
                      <span key={k} className="inline-block">
                        {w}&nbsp;
                      </span>
                    ))}
                  </span>
                </div>
                <p className="mt-7 text-sm font-semibold text-gold">{d.common.licenceBadge}</p>
                <h3 className="mt-1.5 text-2xl leading-snug font-bold text-white sm:text-[1.75rem]">
                  {d.home.why.licenceTitle.split(" ").map((w, k) => (
                    <span key={k} className="inline-block">
                      {w}&nbsp;
                    </span>
                  ))}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">{d.home.why.licenceBody}</p>
                {credentials.licenseNo ? (
                  <p className="tnum mt-5 rounded-xl bg-white/10 px-4 py-3 font-bold text-white">{credentials.licenseNo}</p>
                ) : null}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
                  <span className="text-sm font-semibold text-white">{d.common.coe}</span>
                  <a
                    href={credentials.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-ink transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-gold-light"
                  >
                    {d.cta.verify}
                    <ExternalIcon className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <ol className="border-t border-brand/20 lg:col-span-7">
            {d.whyUs.map((w, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  as="li"
                  key={w.title}
                  delay={i * 70}
                  className="group grid grid-cols-[3rem_1fr] items-start gap-x-4 border-b border-brand/20 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-x-5 sm:py-6"
                >
                  {/* ไอคอนแทนเลขลำดับ — วงพื้นขาวเส้นบาง สีเขียวแบรนด์ เข้มขึ้นตอน hover */}
                  <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white sm:size-14">
                    <Icon className="size-5 sm:size-6" />
                  </span>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg font-bold text-ink sm:text-xl">{w.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-muted">{w.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

      </Container>
    </Section>
  );
}

/* ───────────────────────── ขั้นตอน 4 ขั้น ─────────────────────────
 * ข้อ 30 + brief Premium Architectural: คอลัมน์ตัวเลขใหญ่แบบ editorial เส้นบนบาง ๆ
 * (desktop เรียงแนวนอน 4 คอลัมน์ · มือถือเรียงลงมา) ไม่มีวงกลมไล่เฉด
 * ทุกขั้นมีหัวข้อสั้น + คำอธิบาย + เวลา · ขั้น 04 มีลิงก์สอบถามแพ็กเกจ */
export async function Stepper({
  id,
  tone = "white",
  variant = "row",
}: {
  id?: string;
  tone?: "white" | "surface" | "paper";
  /** row = 4 คอลัมน์แนวนอน (หน้าแรก) · timeline = เส้นเวลาแนวตั้ง + คอลัมน์อธิบาย (หน้าตรวจ — ไม่ซ้ำหน้าแรก) */
  variant?: "row" | "timeline";
}) {
  const d = await getDict();
  if (variant === "timeline") {
    return (
      <Section id={id} tone={tone}>
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionHeader label={d.labels.steps} title={d.home.steps.title} lead={d.home.steps.lead} rule={false} />
            <div className="mt-8">
              <LineButton label={d.cta.lineBook} size="lg" />
            </div>
          </div>
          <ol className="relative lg:col-span-7">
            {/* เส้นเวลาแนวตั้ง */}
            <Reveal as="span" variant="line" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-ink/15" />
            {d.steps.map((st, i) => (
              <Reveal as="li" key={st.title} delay={i * 80} className="relative pb-10 pl-16 last:pb-0">
                <span
                  className={`tnum absolute top-0 left-0 grid size-11 place-items-center rounded-full bg-brand text-sm font-bold text-white ring-8 ${
                    tone === "surface" ? "ring-surface" : tone === "paper" ? "ring-paper" : "ring-white"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="pt-2 text-lg font-bold sm:text-xl">{st.title}</h3>
                <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-muted">{st.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {st.badges.map((b) => (
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
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    );
  }
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeader
          label={d.labels.steps}
          title={d.home.steps.title}
          lead={d.home.steps.lead}
        />
        {/* แต่ละขั้นมีภาพประกอบ + ป้ายเลขขั้นบนภาพ · ใต้ภาพเป็นเส้นเวลา (วาดตอนเลื่อนถึง) + เนื้อหา
            TODO: CLIENT-ASSET — ภาพทั้ง 4 เป็น stock รอภาพจริง (แชทไลน์ · หน้างาน · รายงาน · ตรวจซ้ำ) */}
        <ol className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {d.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="group flex flex-col">
              <div className="relative">
                <Img src={stepImages[i]} alt={s.title} zoom className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                {(() => {
                  const Icon = stepIcons[i];
                  return (
                    <span aria-hidden className="absolute top-3 left-3 grid size-11 place-items-center rounded-full bg-white text-brand">
                      <Icon className="size-5" />
                    </span>
                  );
                })()}
              </div>
              <div className="relative mt-5 flex flex-1 flex-col pt-5">
                <span aria-hidden className="reveal-rule absolute inset-x-0 top-0 h-0.5 bg-brand/25" />
                <span
                  aria-hidden
                  className={`reveal-pop absolute -top-[5px] left-0 size-3 rounded-full bg-gold ring-4 ${
                    tone === "surface" ? "ring-surface" : tone === "paper" ? "ring-paper" : "ring-white"
                  }`}
                />
                <h3 className="flex items-center gap-2.5 text-lg font-bold text-ink">
                  <span className="tnum grid size-7 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.badges.map((b) => (
                    <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[0.8125rem] font-semibold text-brand">
                      <ClockIcon className="size-3.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                {i === d.steps.length - 1 ? (
                  <a
                    href={contact.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-line-btn hover:underline"
                  >
                    <LineIcon className="size-4" />
                    {d.cta.linePackage}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ───────────────────────── ตัวอย่างรายงาน ─────────────────────────
 * ข้อ 36, 41 + brief: ภาพรายงานใหญ่ + แผงข้อมูลลอย 2 แผง (สิ่งที่อยู่ในรายงาน · ส่งภายใน 3 วัน)
 * ข้อความในแผงมาจาก reportPoints (ยืนยันแล้ว) ไม่มีรายการ defect หรือตัวเลขแต่งขึ้น
 * ตัดแถบภาพเล็ก 3 ใบเดิมออก (มีภาพติดลายน้ำ Unsplash+)
 * TODO: CLIENT-ASSET — ภาพหน้ารายงานจริง (ปิดข้อมูลลูกค้า) รอจากลูกค้า */
export async function ReportPreview({ id, tone = "paper" }: { id?: string; tone?: "white" | "surface" | "paper" }) {
  const d = await getDict();
  const icons: IconT[] = [CameraIcon, PinIcon, CheckIcon, DocIcon];
  /* แบบ case study: ภาพใหญ่เป็นจุดสนใจหลัก · ข้อความสั้นด้านข้างเป็นรายการ 01–04 มีเส้นคั่น
   * ตัดแผงลอยโปร่งแสง (backdrop-blur) ออกตามบรีฟ "ห้าม glassmorphism"
   * TODO: CLIENT-ASSET — report.jpg ยังเป็นภาพ stock ต้องเปลี่ยนเป็นหน้ารายงานจริง (ปิดข้อมูลลูกค้า) ที่อ่านได้ */
  return (
    <Section id={id} tone={tone}>
      {/* สองคอลัมน์ 6/6 สูงเท่ากัน: ภาพยืดเต็มความสูงคอลัมน์ข้อความ (จอใหญ่) ขอบบน-ล่างจึงตรงกันพอดี */}
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
        <figure className="lg:h-full">
          <Reveal variant="scale" className="relative h-full">
            <Img src="report.jpg" alt={d.home.report.title} zoom className="group aspect-[4/3] rounded-[1.75rem] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[28rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
            <p className="absolute top-4 left-4 inline-flex items-center gap-2.5 rounded-full bg-ink py-2 pr-4 pl-2 text-sm font-semibold text-white">
              <span className="grid size-8 place-items-center rounded-full bg-gold text-ink">
                <ClockIcon className="size-4" />
              </span>
              {d.common.reportIn}
            </p>
          </Reveal>
        </figure>
        <div className="lg:py-2">
          <SectionHeader label={d.labels.report} title={d.home.report.title} lead={d.home.report.lead} rule={false} />
          <ol className="mt-8 border-t border-ink/10">
            {d.reportPoints.map((pt, k) => {
              const Icon = icons[k];
              return (
                <li key={pt} className="flex items-center gap-4 border-b border-ink/10 py-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-semibold text-ink">{pt}</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-8">
            <LineButton label={d.cta.lineReport} size="lg" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── รีวิว ─────────────────────────
 * แบบบทสัมภาษณ์ในนิตยสาร: รีวิวแรกเป็นคำพูดเด่นตัวใหญ่ · ที่เหลือเป็นรายการมีเส้นคั่น ไม่มีกรอบ/เงา
 * ข้อความรีวิวคัดลอกตามตัวอักษร (lib/reviews.ts) · ฉบับไทยแสดงเฉพาะรีวิวภาษาไทย (ข้อ 34)
 * TODO: CLIENT-ASSET รอรูป/ชื่อย่อผู้รีวิว */
export async function Reviews() {
  const d = await getDict();
  const lang = await getLang();
  const list = lang === "th" ? reviews.filter((r) => r.lang === "th") : [...reviews].sort((a) => (a.lang === "en" ? -1 : 1));
  /* layout รอบ ต.ค. 2569 (คำขอ: การ์ดไม่เท่ากันแล้วอ่านยาก)
   * กริด 2×2 การ์ดสูงเท่ากันทุกใบ (grid stretch) · โครงในการ์ดเหมือนกันทุกใบ:
   *   แถวบน = เครื่องหมายคำพูด + ป้ายบริการ · กลาง = รีวิวตัวอักษร 16px บรรทัดห่าง · ล่าง = แหล่งที่มา ชิดก้นการ์ด
   * ไม่ตัดข้อความรีวิว (เป็นคำพูดจริง ต้องอ่านได้ครบ) */
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
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-paper"
            >
              <FacebookIcon className="size-5 text-[#0866ff]" />
              {d.home.reviews.more}
            </a>
          }
        />
        <ul className="mt-10 grid gap-5 md:auto-rows-fr md:grid-cols-2">
          {list.slice(0, 4).map((r, n) => (
            <Reveal as="li" key={r.quote} delay={n * 70} className="flex">
              <figure className="flex w-full flex-col rounded-[1.5rem] bg-paper p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-brand text-gold">
                    <QuoteIcon aria-hidden className="size-5" />
                  </span>
                  {r.service ? (
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-[0.8125rem] font-semibold text-brand">{d.inspection[r.service].name}</span>
                  ) : null}
                </div>
                <blockquote lang={r.lang} className="mt-5 flex-1 text-base leading-[1.8] text-ink">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-sm text-muted">
                  <FacebookIcon className="size-4 text-[#0866ff]" />
                  {d.common.reviewSource}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
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
                {(() => {
                  const Icon = interiorIcon[id];
                  return (
                    <span aria-hidden className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-white text-brand sm:size-10">
                      <Icon className="size-[1.125rem] sm:size-5" />
                    </span>
                  );
                })()}
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent p-3 pt-12 text-sm font-semibold text-white sm:p-4 sm:text-base">
                  {d.interior[id].name}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white group-hover:text-ink">
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
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="size-4" />
            <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-4" />
            {t.readingTime}
          </span>
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

/* บทความบนหน้าแรก — ชิ้นนำภาพใหญ่ซ้าย + อีกสองชิ้นเป็นแถวมีเส้นคั่นด้านขวา (แบบหน้าแรกนิตยสาร)
 * ไม่ใช้การ์ดเท่ากันสามใบ เพื่อให้ section นี้ต่างจากกริดผลงานตกแต่งที่อยู่ก่อนหน้า */
export async function ArticlesTeaser() {
  const d = await getDict();
  const lang = await getLang();
  const [lead, ...rest] = articles.slice(0, 4);
  const meta = (a: (typeof articles)[number]) => (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon className="size-4" />
        <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className="size-4" />
        {a[lang].readingTime}
      </span>
    </span>
  );
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          label={d.labels.articles}
          title={d.home.articles.title}
          lead={d.home.articles.lead}
          action={<TextLink href={href(lang, "/articles")}>{d.cta.seeAll}</TextLink>}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="group relative lg:col-span-7">
            <Img src={lead.image} alt={lead[lang].title} zoom className="aspect-[16/10] rounded-[1.5rem]" sizes="(min-width: 1024px) 58vw, 100vw" />
            <p className="mt-5 text-sm font-semibold text-gold-text">{articleCategories[lead.category][lang]}</p>
            <h3 className="mt-1.5 text-xl leading-snug font-bold transition-colors group-hover:text-brand sm:text-2xl">
              <Link href={href(lang, `/articles/${lead.slug}`)} className="after:absolute after:inset-0">
                {lead[lang].title}
              </Link>
            </h3>
            <p className="mt-2 max-w-xl text-muted">{lead[lang].excerpt}</p>
            <div className="mt-4">{meta(lead)}</div>
          </article>
          <ul className="border-t border-ink/10 lg:col-span-5">
            {rest.map((a) => (
              <li key={a.slug} className="border-b border-ink/10">
                <article className="group relative grid grid-cols-[1fr_auto] items-start gap-5 py-6">
                  <div>
                    <p className="text-sm font-semibold text-gold-text">{articleCategories[a.category][lang]}</p>
                    <h3 className="mt-1 text-lg leading-snug font-bold transition-colors group-hover:text-brand">
                      <Link href={href(lang, `/articles/${a.slug}`)} className="after:absolute after:inset-0">
                        {a[lang].title}
                      </Link>
                    </h3>
                    <div className="mt-3">{meta(a)}</div>
                  </div>
                  <Img src={a.image} alt="" zoom className="aspect-square w-24 rounded-2xl sm:w-28" sizes="112px" />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── CTA ปิดท้ายทุกหน้า ─────────────────────────
 * แผงสีหมึกมุมมนลอยบนพื้นขาว — จุดเข้มจุดเดียวก่อนถึง footer · ไม่มีลาย แสงฟุ้ง หรือตราตกแต่ง */
export async function FinalCta({ title, flush = false }: { title?: string; flush?: boolean }) {
  const d = await getDict();
  // flush = section ก่อนหน้าเป็นพื้นขาวอยู่แล้ว ตัด padding บนทิ้ง ไม่ให้ช่องว่างซ้อนสองชั้น
  /* สีรอบ ต.ค. 2569: แผงเขียวแบรนด์ (แทนสีหมึก) ให้ปิดท้ายด้วยสี CI · ทองที่ไอคอนข้อมูลติดต่อ
   * ปุ่มสองปุ่มกว้างเท่ากันเสมอ (grid คอลัมน์เท่ากัน / จอใหญ่ซ้อนกันในคอลัมน์กว้างคงที่) */
  return (
    <section className={`bg-white pb-14 sm:pb-20 ${flush ? "pt-0" : "pt-14 sm:pt-20"}`}>
      <Container>
        <div className="grid items-center gap-10 rounded-[2rem] bg-brand px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <h2 className="text-[1.75rem] leading-tight font-bold sm:text-[2.5rem]">{title ?? d.finalCta.title}</h2>
            <p className="mt-4 max-w-xl text-white/85 sm:text-lg">{d.finalCta.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-5 text-sm text-white/85">
              <li className="inline-flex items-center gap-2">
                <PhoneIcon className="size-4 text-gold" />
                <a href={telHref()} className="tnum hover:text-white">{contact.phones[0]}</a>
              </li>
              <li className="inline-flex items-center gap-2">
                <ClockIcon className="size-4 text-gold" />
                {d.contactInfo.hours}
              </li>
              <li className="inline-flex items-start gap-2">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                {d.common.serviceArea}
              </li>
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
            <LineButton label={d.cta.lineBook} size="lg" variant="white" full />
            <CallButton label={d.cta.callUs} variant="white" size="lg" full />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── หน้าตรวจ: จุดที่ตรวจ ─────────────────────────
 * การ์ดเรียบ ไม่ยกตอน hover (ไม่ใช่ลิงก์) · ตัดเลขจางตกแต่งออก */
export async function ScopeGrid() {
  const d = await getDict();
  const p = d.inspectionPage;
  const icons: IconT[] = [ColumnsIcon, HomeIcon, BoltIcon, PipeIcon];
  /* แถบเขียวเข้มแถบเดียวของหน้า — 4 ระบบเป็นคอลัมน์คั่นเส้นตั้ง ไอคอนทอง เครื่องมือที่ใช้เป็นรายการเช็ก */
  return (
    <Section id="scope" tone="forest">
      <Container>
        <SectionHeader label={p.scopeLabel} title={p.scopeTitle} lead={p.scopeLead} invert />
        <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {d.scope.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 70}
                className="flex flex-col border-white/15 sm:px-6 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-gold">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">{s.body}</p>
                <ul className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm text-white">
                  {s.tools.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckIcon className="size-4 text-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หน้าตรวจ: อุปกรณ์ 6 ชิ้น ─────────────────────────
 * ข้อ 32: 6 รายการ (desktop 3×2 · มือถือเรียงลงมา) ชื่อ 1 บรรทัด + ใช้ตรวจอะไร 1 บรรทัด
 * พื้นขาว เส้นบนบาง แบบหน้าสเปก — ไม่ใช่ section เข้ม (brief: ไม่ทำเว็บให้มืด)
 * TODO: CLIENT-ASSET — รูปอุปกรณ์จริงของทีม (คำถามรอลูกค้า ข้อ 15) ตอนนี้ใช้ไอคอนแทน */
export async function EquipmentGrid() {
  const d = await getDict();
  const p = d.inspectionPage;
  /* แผ่นเครื่องมือ 6 ใบบนพื้น paper — ไอคอนใหญ่ในวงเขียวอ่อน ชื่อ + ใช้ตรวจอะไร · hover ยกเล็กน้อย */
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader label={d.labels.tools} title={p.toolsTitle} lead={p.toolsLead} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.equipment.map((e, i) => {
            const Icon = equipmentIcons[i];
            return (
              <Reveal
                as="li"
                key={e.name}
                delay={i * 50}
                className="group flex items-center gap-5 rounded-[1.25rem] bg-white p-5 ring-1 ring-ink/5 transition-transform duration-200 hover:-translate-y-0.5 sm:p-6"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-7" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{e.name}</h3>
                  <p className="mt-0.5 text-[0.9375rem] text-muted">{e.use}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หน้าตรวจ: ค่าบริการ ─────────────────────────
 * ข้อ 10, 11: แสดงเฉพาะราคาเริ่มต้น ตัดราคาแยกขนาด ตัดบริการต่อเติมออกจากตาราง
 * ใต้ราคา "ราคาจริงขึ้นกับขนาดพื้นที่" + ปุ่มทักไลน์สอบถามราคา · ข้อ 15, 16 เงื่อนไขที่ถูกต้อง */
export async function PricingBlock({ tone = "paper" }: { tone?: "white" | "paper" }) {
  const d = await getDict();
  const p = d.inspectionPage;
  const incIcons: IconT[] = [BadgeCheckIcon, ClockIcon, DocIcon, RefreshIcon];
  return (
    <Section id="pricing" tone={tone}>
      <Container>
        <SectionHeader label={d.labels.pricing} title={p.pricingTitle} lead={p.pricingLead} align="center" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {(["condo", "house"] as const).map((id) => {
            const s = d.inspection[id];
            return (
              <div key={id} className="relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-7 text-center ring-1 ring-ink/10">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gold" />
                <span className="mx-auto">
                  <IconBubble icon={serviceIcon[id]} tone="soft" size="lg" />
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

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.25rem] bg-white p-6 ring-1 ring-ink/10 sm:p-9">
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
          <p className="mt-7 flex items-start gap-2 rounded-xl bg-paper p-4 text-sm text-muted">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            {d.common.serviceArea} {d.common.travelFee}
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หน้าตรวจ: แคตตาล็อกบริการ ─────────────────────────
 * แทน showcase แบบหน้าแรก (ลูกค้า: หน้าบริการเหมือนหน้าแรก) — อ่านแบบ "สเปกบริการ"
 *   บริการหลัก 2 ตัว: แถวละเอียด — ภาพเล็ก · ชื่อ+คำอธิบาย · จุดที่ตรวจครบ · เวลาหน้างาน · ราคาเริ่มต้น · LINE
 *   บริการเฉพาะกรณี 4 ตัว: ตารางกระชับ ชื่อ · รายละเอียด · ปุ่มสอบถาม (ไม่มีราคา — ข้อ 3, 9)
 * ทุกแถวมี id เป็น anchor (#house #condo #construction #secondhand #recheck #repair) ให้เมนู/footer ลิงก์ตรง */
export async function ServiceCatalog() {
  const d = await getDict();
  const p = d.inspectionPage;
  const heads = d.home.hero.rateHead; // บริการ · เวลาหน้างาน · ราคาเริ่มต้น
  const main = ["house", "condo"] as const;
  const special = ["construction", "secondhand", "recheck", "repair"] as const;
  const rowLabels = [heads[2], heads[1], p.scopeLabel];
  const cell = "border-t border-ink/10 px-6 py-5";
  /* ตารางเปรียบเทียบบ้าน vs คอนโด (จอใหญ่) — คอลัมน์ป้ายซ้าย + สองคอลัมน์บริการ แถวตรงกันด้วย subgrid
   * มือถือ/แท็บเล็ต: เป็นการ์ดสองใบ แต่ละช่องมีป้ายของตัวเอง (ป้ายคอลัมน์ซ้ายซ่อน) */
  return (
    <Section id="services" tone="white">
      <Container>
        <SectionHeader label={d.labels.services} title={p.servicesTitle} lead={p.servicesLead} />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-[13rem_1fr_1fr] lg:gap-0 lg:overflow-hidden lg:rounded-[1.75rem] lg:ring-1 lg:ring-ink/10">
          <div aria-hidden className="hidden bg-paper lg:row-span-5 lg:grid lg:grid-rows-subgrid">
            <div />
            {rowLabels.map((l) => (
              <div key={l} className={`${cell} text-sm font-semibold text-ink`}>
                {l}
              </div>
            ))}
            <div className={cell} />
          </div>
          {main.map((id) => {
            const s = d.inspection[id];
            const Icon = serviceIcon[id];
            return (
              <article
                key={id}
                id={id}
                className="grid scroll-mt-28 overflow-hidden rounded-[1.75rem] ring-1 ring-ink/10 lg:row-span-5 lg:grid-rows-subgrid lg:rounded-none lg:border-l lg:border-ink/10 lg:ring-0"
              >
                <div className="p-6">
                  <Img src={inspectionImages[id] ?? "article-condo.jpg"} alt={s.name} className="aspect-[16/9] rounded-[1.125rem]" sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw" />
                  <h3 className="mt-5 flex items-center gap-3 text-xl font-bold sm:text-2xl">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Icon className="size-5" />
                    </span>
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{s.short}</p>
                </div>
                <div className={cell}>
                  <p className="mb-1 text-sm text-muted lg:hidden">{heads[2]}</p>
                  {s.price ? <Price from={d.common.from} value={s.price} unit={d.common.baht} /> : null}
                </div>
                <div className={cell}>
                  <p className="mb-1 text-sm text-muted lg:hidden">{heads[1]}</p>
                  <p className="flex items-start gap-2 text-[0.9375rem] font-semibold text-ink">
                    <ClockIcon className="mt-1 size-4 shrink-0 text-brand" />
                    {s.time}
                  </p>
                </div>
                <div className={cell}>
                  <p className="mb-2 text-sm text-muted lg:hidden">{p.scopeLabel}</p>
                  <ul className="grid gap-2 text-[0.9375rem] text-ink">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <CheckIcon className="mt-1 size-4 shrink-0 text-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${cell} self-end`}>
                  <LineButton label={d.cta.linePrice} full />
                </div>
              </article>
            );
          })}
        </div>

        {/* บริการเฉพาะกรณี — กริด 2×2 แผ่นพื้นสว่าง ไอคอนวงเขียว */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-xl font-bold sm:text-2xl">{d.home.services.specialTitle}</h3>
          <p className="text-sm text-muted">{p.specialNote}</p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {special.map((id) => {
            const s = d.inspection[id];
            const Icon = serviceIcon[id];
            return (
              <li key={id} id={id} className="flex scroll-mt-28 gap-4 rounded-[1.25rem] bg-paper p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-1 flex-col">
                  <h4 className="font-bold text-ink">{s.name}</h4>
                  <p className="mt-1 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                  <a
                    href={contact.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-line-btn hover:underline"
                  >
                    <LineIcon className="size-4" />
                    {id === "recheck" ? d.cta.linePackage : d.cta.lineAsk}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ───────────────────────── หัวหน้าเพจย่อย ─────────────────────────
 * ต้อง "ไม่เหมือนหน้าแรก" (ลูกค้า: กดหน้าบริการแล้วเหมือนอยู่หน้าแรก)
 * hero หน้าแรก = กรอบภาพเต็มจอ + แถบลอย · หน้าย่อยทุกหน้า = หัวเพจแบบหน้าเอกสาร/แคตตาล็อก:
 *   breadcrumb บอกตำแหน่ง · หัวข้อขนาดกลาง · พื้น paper แถบตรงมีเส้นล่าง
 * ระดับความสำคัญจึงอ่านออกทันทีว่า "นี่คือหน้ารายละเอียด" ไม่ใช่หน้าเปิดเว็บอีกรอบ */
export type Crumb = { label: string; path: string };

/** breadcrumb — หน้าแรกใส่ให้อัตโนมัติ ตามด้วย crumbs แล้วจบที่หน้าปัจจุบัน (ไม่เป็นลิงก์)
 *  invert = บนพื้นเข้ม/ภาพ (hero หน้าตรวจ) */
export async function Breadcrumb({ crumbs = [], current, invert = false }: { crumbs?: Crumb[]; current: string; invert?: boolean }) {
  const d = await getDict();
  const lang = await getLang();
  const trail = [{ label: d.nav.home, path: "/" }, ...crumbs];
  return (
    <nav aria-label={d.common.breadcrumb}>
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${invert ? "text-white/75" : "text-muted"}`}>
        {trail.map((c) => (
          <li key={c.path} className="inline-flex items-center gap-2">
            <Link href={href(lang, c.path)} className={`inline-flex min-h-8 items-center ${invert ? "hover:text-white" : "hover:text-ink"}`}>
              {c.label}
            </Link>
            <span aria-hidden className={invert ? "text-white/40" : "text-ink/30"}>/</span>
          </li>
        ))}
        <li aria-current="page" className={`font-semibold ${invert ? "text-white" : "text-ink"}`}>
          {current}
        </li>
      </ol>
    </nav>
  );
}

export async function PageHero({
  title,
  lead,
  image,
  imageAlt,
  crumbs = [],
  current,
  children,
}: {
  title: string;
  /** ชื่อสั้นของหน้านี้ใน breadcrumb (ค่าตั้งต้น = title) */
  current?: string;
  lead: string;
  image: string;
  imageAlt: string;
  /** เส้นทางก่อนหน้านี้ (ไม่รวมหน้าปัจจุบัน) */
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <Container className="pt-6 pb-10 sm:pt-8 sm:pb-14">
        <Breadcrumb crumbs={crumbs} current={current ?? title} />
        <div className="mt-6 grid items-center gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[1.875rem] leading-[1.2] font-bold text-ink sm:text-[2.5rem] lg:text-[2.75rem]">{title}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
            {children}
          </div>
          <div className="lg:col-span-5">
            <Img
              src={image}
              alt={imageAlt}
              priority
              className="aspect-[16/10] rounded-[1.25rem] lg:aspect-[4/3]"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* หัวหน้าเพจแบบไม่มีภาพ (ติดต่อ บทความ กฎหมาย) — ชุดเดียวกับ PageHero: breadcrumb + เส้นล่าง
 * aside = ช่องขวาบนจอใหญ่ (เช่น ข้อมูลประกอบ) · children = ใต้คำโปรย (เช่น แท็บหมวด) */
export async function PlainHero({
  title,
  lead,
  crumbs = [],
  current,
  aside,
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  current?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <Container className="pt-6 pb-10 sm:pt-8 sm:pb-12">
        <Breadcrumb crumbs={crumbs} current={current ?? title} />
        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[1.875rem] leading-[1.2] font-bold text-ink sm:text-[2.5rem] lg:text-[2.75rem]">{title}</h1>
            {lead ? <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
