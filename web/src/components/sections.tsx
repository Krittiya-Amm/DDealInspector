import Link from "next/link";
import {
  ArrowIcon,
  CheckIcon,
  CurtainIcon,
  ExtendHomeIcon,
  ExternalIcon,
  FacebookIcon,
  FloorIcon,
  PartitionIcon,
  SunIcon,
  WallpaperIcon,
} from "@/components/icons";
import { Counter, Reveal } from "@/components/reveal";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import {
  BookCta,
  Container,
  DrawnRule,
  Eyebrow,
  GhostLink,
  IndexLabel,
  MockImage,
  QuoteCta,
  rhythm,
  SectionHeading,
  TechLabel,
} from "@/components/ui";
import { articleCategories, formatThaiDate, type Article } from "@/lib/articles";
import {
  contact,
  credentials,
  equipment,
  featuredServices,
  inspectionServices,
  priceIncludes,
  pricing,
  reportHighlights,
  reviewsUrl,
  stats,
  testimonials,
  timeline,
  whyChooseUs,
  whyInspect,
} from "@/lib/site";

/** บล็อกตรวจสอบใบอนุญาต — วางเป็น "บันทึกการตรวจสอบ" แบบเอดิทอเรียล
 *  ไม่ใช่แบนเนอร์+ปุ่มการตลาด และไม่ใช่การ์ด dashboard
 *
 *  หน้านี้พาดหัวว่า "อย่าเพิ่งเชื่อเรา เช็กเองได้" สิ่งที่ต้องเด่นจึงไม่ใช่คำโฆษณา
 *  แต่คือ "ที่มาที่ผู้อ่านไปพิสูจน์เองจากข้างนอกได้" — จัดเป็นสองคอลัมน์ไม่สมมาตร
 *  ซ้าย 55% เป็นถ้อยแถลง (พาดหัว+คำอธิบาย) ขวา 45% เป็นบันทึกที่ชี้ไประบบสาธารณะ
 *  ของสภาวิศวกร น้ำหนักมาจาก typography กริด และเส้นคั่นบาง ไม่ใช่จากเงา/มน/ไล่สี
 *
 *  ── ความซื่อสัตย์ของข้อมูล (สำคัญกว่าความเต็มของ layout) ──
 *  credentials.licenseNo ยังเป็น null → ไม่ใส่เลขปลอมและไม่ตีตรา "VERIFIED"
 *  ทับเลขที่ไม่มีจริง เพราะเลขที่ค้นในระบบสภาวิศวกรแล้วไม่เจอ ทำลายพาดหัวของบล็อกนี้
 *  แรงกว่าการไม่โชว์เลข — ช่องเลขจึงขึ้น "แจ้งก่อนนัด" (ตรงกับที่เว็บบอกว่าขอเลข
 *  ทางไลน์ได้ก่อนนัด) และสถานะใช้คำว่า "ตรวจสอบได้" (verifiable) ไม่ใช่ "ยืนยันแล้ว"
 *  ส่วนสาขา "วิศวกรโยธา" เป็นข้อมูลจริงที่เว็บระบุอยู่แล้ว ไม่ใช่ชื่อคนที่แต่งขึ้น
 *  ได้เลขจริงเมื่อไหร่ ใส่ที่ credentials.licenseNo ที่เดียว เลขจะขึ้นเด่นเองและ
 *  คำอธิบายฝั่งซ้ายจะสลับเป็นแบบ "เอาเลขไปค้นได้เลย" อัตโนมัติ */
export function VerifyLicense() {
  const licenseNo = credentials.licenseNo;
  /* โดเมนล้วน ๆ ของปลายทาง (เช่น service.coe.or.th) ตัด protocol และ / ท้ายทิ้ง
     โชว์ใต้ CTA เป็นหลักฐานว่าปุ่มพาไป "ระบบสภาวิศวกร" ตัวจริง ไม่ใช่หน้าเราเอง
     มาจาก credentials.verifyUrl ที่เดียว ไม่ได้พิมพ์โดเมนซ้ำให้หลุดกันได้ทีหลัง */
  const verifyHost = credentials.verifyUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    /* ── โครงคู่ "ถ้อยแถลง | ภาพหลักฐาน" บนแถบพื้นครีม ให้เข้าชุดกับแถบอื่นของหน้า ──
       เดิม section นี้เป็นแผ่นเข้ม (bg-ink) แทรกกลางหน้าสว่างจึงดูหลุด → เปลี่ยนมาใช้
       สูตรแถบครีมเดียวกับ WhyInspect / WhyChooseUs (border-y + bg-warm + rhythm.dense)
       รอบก่อนถอดการ์ดตารางบันทึกออก ทำให้ฝั่งขวาเหลือแค่ข้อความสั้น ๆ กับลิงก์ ขณะที่
       ฝั่งซ้ายมีทั้งพาดหัวใหญ่ + ภาพ กริดเดิม (1.1/0.9) จึงเสียสัดส่วน — ซ้ายสูง ขวาสั้น
       เหลือช่องว่างค้าง รอบนี้จัดองค์ประกอบใหม่ให้บาลานซ์:
         ซ้าย = ถ้อยแถลงครบชุด (ป้ายลำดับ → พาดหัว → คำอธิบาย → ลิงก์ตรวจสอบ)
         ขวา  = ภาพหน้างานจริง (หลักฐานเชิงมนุษย์) + คำกำกับใต้ภาพ
       ความสูงสองคอลัมน์ใกล้กัน (พาดหัว+ย่อหน้า ≈ ภาพ 4:3) จัดกึ่งกลางแนวตั้ง (items-center)
       จึงไม่มีช่องว่างค้างข้างใดข้างหนึ่ง · มือถือเรียงลง: ถ้อยแถลง → ภาพ
       สีทองใช้ gold-500 เฉพาะกราฟิก/ตัวใหญ่ ≥24px และ gold-700 กับข้อความ/ลิงก์ ผ่าน AA
       ความน่าเชื่อถือมาจากภาพจริง + ลิงก์ไประบบสาธารณะ ไม่ใช่ตราปลอมหรือเลขปลอม */
    <section className={`border-y border-line bg-warm ${rhythm.dense}`}>
      <Container>
        {/* แถบข้อมูลกำกับด้านบน — ป้ายเงียบ (muted) เข้าชุดกับหัว section อื่นในเว็บ */}
        <div className="flex items-center justify-between gap-6">
          <TechLabel>Verification</TechLabel>
          <TechLabel>Council Of Engineers</TechLabel>
        </div>
        {/* เส้นลากเข้าตอนเลื่อนถึง เข้าชุด motion กับ DrawnRule ทุกที่ในเว็บ */}
        <DrawnRule className="mt-3" />

        {/* กริดเอดิทอเรียลไม่สมมาตรเล็กน้อย (ซ้าย 0.95 / ขวา 1.05) จัดกึ่งกลางแนวตั้ง
            ซ้าย = ถ้อยแถลงครบชุด · ขวา = ภาพหน้างาน — สองฝั่งสูงพอ ๆ กัน ไม่มีช่องว่างค้าง
            มือถือ stack: ป้าย → พาดหัว → คำอธิบาย → ลิงก์ → ภาพ */}
        <div className="mt-10 grid gap-y-10 lg:mt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-x-16">
          {/* ── ซ้าย: ถ้อยแถลงครบชุด (ป้าย → พาดหัว → คำอธิบาย → ลิงก์ตรวจสอบ) ── */}
          <Reveal variant="up">
            {/* ป้ายลำดับแบบเอดิทอเรียลแทนไอคอนโล่ — บอกว่าเป็น "หัวข้อ" ไม่ใช่ตรา
                เป็นอังกฤษ/ตัวเลข จึงใส่ระยะห่างตัวอักษรได้ (ไทยห้าม)
                tone="accent" (gold-700) เป็นแอ็กเซนต์ประจำหัวข้อ ผ่าน AA บนพื้นครีม */}
            <TechLabel tone="accent" className="block">
              01 / Verify
            </TechLabel>
            {/* พาดหัวตัวเอกของ section — ตัดบรรทัดเองให้บรรทัดสองเน้นด้วยสีทอง
                บรรทัดแรกรับสี ink จาก body · gold-500 บรรทัดสองเป็นตัวใหญ่ ≥24px ผ่าน AA
                ลด lg เหลือ 3rem ให้พอดีคอลัมน์ที่แคบลงกว่าตอนกินเต็มฝั่งซ้าย */}
            <h3 className="mt-5 text-[2.25rem] leading-[1.18] font-semibold sm:text-[2.75rem] lg:text-[3rem]">
              <span className="block">อย่าเพิ่งเชื่อเรา —</span>
              <span className="block text-gold-500">เช็กเองได้</span>
            </h3>
            {/* คำอธิบาย "ทำไมเชื่อได้" — คุมความกว้างให้บรรทัดอ่านสบาย */}
            <div className="mt-6 max-w-[34rem] space-y-4 text-ink2 sm:text-lg sm:leading-[1.85]">
              <p>
                วิศวกรที่เข้าตรวจทุกงานเป็นวิศวกรควบคุม
                รับรองโดย{credentials.licenseBody} ของไทย
              </p>
              <p>
                {licenseNo
                  ? "เอาเลขใบอนุญาตในบันทึกนี้ไปค้นในระบบสาธารณะของสภาวิศวกรได้เลย ไม่ต้องเชื่อคำโฆษณาของเรา"
                  : "ก่อนนัดหมาย ขอเลขใบอนุญาตจากเราได้ แล้วเอาไปค้นในระบบสาธารณะของสภาวิศวกรเองได้เลย ไม่ต้องเชื่อคำโฆษณาของเรา"}
              </p>
            </div>
            {/* ลิงก์ตรวจสอบแบบข้อความ ไม่มีกรอบการ์ด — พาไปหน้าระบบสภาวิศวกรจริง
                ขีดล่างขยายตอน hover · ใต้ลิงก์กำกับที่มา (Public Record · โดเมนจริง)
                เป็นหลักฐานว่าปุ่มพาไปหน้าของจริง ไม่ใช่หน้าเราเอง */}
            <a
              href={credentials.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex flex-col gap-2.5"
            >
              <span className="flex items-center gap-3">
                <span className="relative text-[0.9375rem] font-semibold after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  ตรวจสอบกับสภาวิศวกร
                </span>
                <ExternalIcon className="size-4 shrink-0 text-ink3 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-700" />
              </span>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <TechLabel>Public Record</TechLabel>
                <span aria-hidden className="text-ink3">
                  ·
                </span>
                <span className="tnum text-[0.8125rem] text-ink3">
                  {verifyHost}
                </span>
              </span>
            </a>
          </Reveal>

          {/* ── ขวา: ภาพหน้างานจริง (หลักฐานเชิงมนุษย์) — เผยหลังฝั่งซ้ายเล็กน้อย (delay) ── */}
          <Reveal variant="up" delay={140}>
            {/* ภาพวิศวกรถือเอกสารรายงานหน้างาน = หลักฐานเชิงมนุษย์ ไม่ใช่ภาพตกแต่ง จึงมี
                คำกำกับใต้ภาพแบบบันทึกภาคสนาม · อัตราส่วน 4:3 ให้ความสูงใกล้กับถ้อยแถลง
                ฝั่งซ้าย สองคอลัมน์จึงบาลานซ์ · กรอบบาง line มุม 2px · ไม่ซูม hover เพราะ
                ไม่ใช่ภาพขายของ (ภาพยังเป็น stock ชั่วคราว ดู public/images/CREDITS.md ก่อนขึ้น production) */}
            <figure>
              <MockImage
                src="hero.jpg"
                alt="วิศวกรสวมหมวกนิรภัยถือเอกสารรายงานขณะเข้าตรวจหน้างานก่อนโอน"
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="aspect-[4/3] rounded-[2px] border border-line"
              />
              <figcaption className="mt-3 flex items-center gap-3 text-ink2">
                <TechLabel>On-Site</TechLabel>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="text-[0.8125rem]">
                  วิศวกรควบคุมเข้าตรวจหน้างานจริง
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Section 1 — แถบตัวเลขใต้ hero
 *  แบ่งช่องด้วยเส้นตั้งเส้นเดียว ไม่ใช่การ์ดสี่ใบ — การ์ดทำให้ตัวเลขดูเหมือน
 *  widget ของ dashboard ส่วนเส้นบางทำให้อ่านเป็น "ฐาน" ที่รองหัวเรื่องอยู่
 *  ตัวเลขนับขึ้นตอนเลื่อนถึง เป็นจุดเดียวในหน้าที่มีการเคลื่อนไหวแบบนับค่า
 *  ซึ่งตรงกับสิ่งที่บริษัทตรวจบ้านทำจริง คือวัดแล้วรายงานเป็นตัวเลข */
export function TrustBar() {
  return (
    <section className="border-b border-line">
      <Container>
        <div className="flex items-baseline justify-between gap-6 pt-5 sm:pt-6">
          <TechLabel>Field Record</TechLabel>
          {/* ปีจากนาฬิกาเครื่อง ไม่ใช่ตัวเลขที่ตั้งขึ้นเอง */}
          <TechLabel>DD / {new Date().getFullYear()}</TechLabel>
        </div>
        <DrawnRule className="mt-2.5" />

        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 py-5 sm:grid-cols-4 sm:gap-x-10 sm:py-5">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              variant="rise"
              className="relative sm:border-l sm:border-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <TechLabel className="block">{`0${i + 1}`}</TechLabel>
                <Counter
                  value={s.value}
                  className="tnum mt-2 block font-display text-[2.75rem] leading-[0.9] font-semibold text-gold-500 sm:text-[3.5rem] lg:text-[4rem]"
                />
                <span className="mt-2 block text-[0.9375rem] text-ink2">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Section 2 — บริการเด่นเป็น "สารบัญ" ไม่ใช่กริดการ์ด
 *  ทุกบริการมีน้ำหนักเท่ากันในสายตา แต่ไล่ลำดับด้วยเลข 01-04 เหมือนสารบัญรายงาน
 *  บนจอใหญ่ ภาพของแถวที่ชี้อยู่จะขึ้นมาเต็มคอลัมน์ขวา — สายตาจึงอยู่ที่รายการ
 *  ไม่ใช่กระจายไปตามการ์ดสี่ใบ · บนมือถือไม่มี hover จึงกลับไปเป็นภาพย่อในแถว */
export function FeaturedServices() {
  return (
    /* ── ความสูงถูกบีบลงจาก ~1303px → ~1010px บนจอใหญ่ (~22%) ──
       ไม่ย่อฟอนต์และไม่ตัดแถวบริการออก — บีบสามจุดที่กินความสูงจริง:
       padding ของ section (รอบก่อน py-28 = 112px ต่อด้าน → py-12 = 48px
       เท่ากับ section VERIFICATION ที่อยู่ถัดลงไป จังหวะหน้าจึงต่อเนื่องกัน),
       ระยะก่อนแถบ Inspection Scopes (mt-16 → mt-10) และจังหวะ padding ของ
       แต่ละแถวในรายการ (sm:py-9 = 36px ต่อด้าน → sm:py-6 = 24px)
       รายการสี่แถวเป็นตัวกำหนดความสูงหลัก จึงบีบ padding แถวเป็นสำคัญ
       แต่ยังคงพื้นที่ให้แต่ละแถวหายใจ (แถวยังสูงพอเป็นเป้าแตะสบายบนมือถือ) */
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            eyebrow="Featured Services"
            title="เลือกตามสถานการณ์ของคุณ"
            lead="กำลังจะรับบ้านใหม่ รับคอนโด ดูบ้านมือสอง หรือรอตรวจซ้ำหลังโครงการแก้ — ขอบเขตการตรวจต่างกัน"
          />
          <GhostLink href="/services/inspection">ดูบริการทั้งหมด</GhostLink>
        </div>

        <div className="mt-8 lg:mt-10">
          <TechLabel>Inspection Scopes</TechLabel>
        </div>

        <ul className="group/list relative mt-3.5 border-t border-line">
          {/* ภาพตั้งต้นของคอลัมน์ขวา จางหายเมื่อเริ่มชี้แถวใดแถวหนึ่ง
              อยู่ก่อนภาพของแถวใน DOM ภาพแถวจึงทับได้โดยไม่ต้องใช้ z-index */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 hidden h-full w-[36%] overflow-hidden rounded-sm transition-opacity duration-500 ease-out group-hover/list:opacity-0 lg:block"
          >
            <MockImage
              src={featuredServices[0].image}
              alt=""
              className="h-full w-full"
              sizes="36vw"
            />
          </div>

          {featuredServices.map((s, i) => (
            <Reveal
              as="li"
              key={s.name}
              delay={i * 70}
              // ตั้งใจใช้ fade ล้วน — ท่าที่มี transform จะทำให้ <li> กลายเป็น
              // containing block แล้วภาพคอลัมน์ขวาจะไปอิง <li> แทน <ul>
              variant="fade"
              className="group border-b border-line"
            >
              <Link
                href={s.href}
                className="flex flex-col gap-4 py-5 transition-colors duration-300 ease-out sm:flex-row sm:items-start sm:gap-8 sm:py-5 lg:pr-[40%]"
              >
                {/* ที่ 375px การวาง เลข + ภาพ + ข้อความ เรียงนอนเหลือความกว้าง
                    ให้ข้อความราว 170px คือ ~14 ตัวอักษรต่อบรรทัด อ่านสะดุดมาก
                    มือถือจึงยกเลขกับลูกศรขึ้นเป็นบรรทัดหัวแถว แล้วปล่อยข้อความเต็มความกว้าง */}
                <span className="flex items-center justify-between gap-4 sm:block sm:w-12 sm:shrink-0 sm:pt-1">
                  <span
                    aria-hidden
                    className="tnum font-display text-lg font-semibold text-ink3 transition-[color,transform] duration-300 ease-out group-hover:-translate-y-1 group-hover:text-gold-700 sm:text-xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowIcon
                    aria-hidden
                    className="size-5 shrink-0 text-ink3 transition-[transform,color] duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-gold-700 sm:hidden"
                  />
                </span>

                {/* ภาพย่อในแถว — เฉพาะจอเล็กที่ไม่มี hover ให้ใช้
                    มือถือใช้ภาพกว้างเต็มแถว จอ sm ขึ้นไปค่อยหดเป็นสี่เหลี่ยมข้างข้อความ */}
                <MockImage
                  src={s.image}
                  alt=""
                  className="aspect-[16/9] w-full rounded-sm sm:size-24 sm:shrink-0 lg:hidden"
                  sizes="(min-width: 640px) 96px, 100vw"
                />

                <span className="min-w-0 flex-1">
                  <span className="block text-[1.25rem] font-semibold transition-colors duration-300 ease-out group-hover:text-gold-700 sm:text-[1.625rem] lg:text-[1.875rem]">
                    {s.name}
                  </span>
                  <span className="mt-2 block max-w-md text-base leading-[1.75] text-ink2 sm:text-[1.0625rem]">
                    {s.short}
                  </span>
                  {/* meta เป็นภาษาไทย จึงห้ามใช้ TechLabel ที่ถ่าง letter-spacing */}
                  <span className="mt-2.5 block text-[0.8125rem] text-ink3">
                    {s.meta}
                  </span>
                </span>

                <ArrowIcon
                  aria-hidden
                  className="mt-1.5 hidden size-5 shrink-0 text-ink3 transition-[transform,color] duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-gold-700 sm:block"
                />
              </Link>

              {/* คอลัมน์ภาพร่วม: ทุกแถววางภาพซ้อนตำแหน่งเดียวกัน (อิง <ul> ที่ relative)
                  แล้วเผยเฉพาะใบของแถวที่ชี้อยู่ */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 hidden h-full w-[36%] overflow-hidden rounded-sm opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 lg:block"
              >
                <MockImage
                  src={s.image}
                  alt=""
                  className="h-full w-full scale-[1.06] transition-transform duration-[900ms] ease-out group-hover:scale-100"
                  sizes="36vw"
                />
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Section 3 — ทำไมต้องตรวจ
 *  หัวเรื่องหนึบอยู่ทางซ้ายตอนเลื่อน ส่วนเหตุผลไล่ลงทางขวาเป็นรายการเลขใหญ่
 *  เป็นจังหวะเดียวในหน้าที่ตัวเลขทำหน้าที่เป็นภาพ ไม่ใช่ข้อมูล */
export function WhyInspect() {
  return (
    <section className={`border-y border-line bg-warm ${rhythm.dense}`}>
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Why Inspect"
            title="บ้านใหม่ไม่ได้แปลว่า"
            accent="ไม่มี Defect"
            lead="ไม่ใช่เพราะโครงการตั้งใจทำไม่ดี แต่เพราะงานก่อสร้างมีตัวแปรเยอะเกินกว่าจะสมบูรณ์เองโดยไม่มีคนตรวจ"
          />
          <Reveal variant="clip" className="mt-10 hidden lg:block">
            <MockImage
              src="article-crack.jpg"
              alt="รอยร้าวบนผนังที่ต้องประเมินว่าเป็นรอยร้าวโครงสร้างหรือรอยร้าวผิวปูน"
              className="aspect-[4/3] rounded-sm"
              sizes="40vw"
            />
          </Reveal>
        </div>

        <ol className="border-t border-line">
          {whyInspect.map((w, i) => (
            <Reveal
              as="li"
              key={w.step}
              delay={i * 60}
              variant="right"
              className="group grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-8 sm:gap-x-10 sm:py-11"
            >
              <span
                aria-hidden
                className="tnum font-display text-[2.5rem] leading-[0.85] font-semibold text-gold-500 sm:text-[3.75rem]"
              >
                {w.step}
              </span>
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{w.title}</h3>
                <p className="mt-3 max-w-xl text-[1.0625rem] leading-[1.8] text-ink2">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Section 3 — ขั้นตอนการตรวจ ย้ายไป components/process.tsx
 *  เพราะต้องอ่านตำแหน่ง scroll จึงเป็น client component
 *  re-export ไว้ตรงนี้เพื่อให้ call site ยังเรียกจากที่เดียวกับ section อื่น */
export { InspectionProcess } from "@/components/process";

/** Section 4 — ตัวอย่างรายงาน
 *  ทำให้เป็น "ช่วงเวลาของตัวสินค้า" — รายงานคือสิ่งเดียวที่ลูกค้าได้ถือกลับบ้าน
 *  จึงวางเป็นเอกสารจริงที่มีเลขอ้างอิง มีหมุดชี้จุด และมีหน้าซ้อนกันอยู่
 *  เลขรายงานเป็น placeholder ที่อ่านออกว่าเป็น placeholder ไม่ใช่เลขที่แต่งให้ดูจริง */
export function ReportShowcase() {
  return (
    /* items-start ไม่ใช่ items-center — ของเดิมสองคอลัมน์สูงไม่เท่ากันมาก
       (แผ่นภาพ 459px กับรายการ 712px) พอสั่ง center แผ่นภาพเลยถูกดันลงไป 126px
       หัวข้อฝั่งขวาจึงเริ่มสูงกว่าขอบบนของภาพครึ่งจอ ไม่มีเส้นไหนตรงกันสักเส้น
       ตาอ่านเป็นของสองชิ้นที่บังเอิญอยู่ข้างกัน ไม่ใช่หน้าเดียวกัน
       งานเอกสารแขวนทุกคอลัมน์จากเส้นบนเส้นเดียวเสมอ ส่วนที่เหลือไม่เท่ากันข้างล่าง
       เรียกว่า rag ซึ่งเป็นเรื่องปกติ แต่ช่องว่างกลางคอลัมน์ไม่ใช่ */
    <section
      id="report"
      className={`scroll-mt-32 border-t border-line ${rhythm.open}`}
    >
      <Container className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal variant="scale" className="group relative">
          {/* แถบเลขรายงานอยู่เหนือภาพ ไม่ใช่ใต้ภาพ — ภาพที่วางซ้อนมุมขวาล่าง
              กินพื้นที่ใต้ภาพเสมอ ป้ายที่ชิดขวาจึงถูกบังจนอ่านไม่ออก
              และหัวกระดาษด้านบนก็อ่านเป็นเอกสารจริงมากกว่าคำบรรยายใต้ภาพอยู่แล้ว */}
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-line pb-2.5">
            {/* TODO: CLIENT-DATA — รูปแบบเลขรายงานจริงรอจากลูกค้า
                จงใจใช้ XXXX ให้เห็นชัดว่ายังไม่ใช่ของจริง */}
            <TechLabel>Report No. DD-XXXX</TechLabel>
            <TechLabel>Sample Document</TechLabel>
          </div>

          <div className="overflow-hidden rounded-sm">
            <MockImage
              src="report.jpg"
              alt="ตัวอย่างรายงานตรวจบ้านพร้อมภาพประกอบทุกจุด"
              zoom
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>

          {/* ภาพที่สองเคยลอยทับมุมขวาล่างของภาพหลักแล้วยื่นพ้นคอลัมน์ลงไปอีก 48px
              ผลคือมันบังเนื้อภาพหลักไปราวหนึ่งในสี่ และห้อยอยู่นอกกรอบทุกอย่าง
              อ่านเป็นภาพที่วางผิดที่มากกว่าการจัดหน้า (กรอบขาว 4px ที่ตั้งใจให้
              เห็นเป็นขอบรูปก็มองไม่เห็น เพราะพื้น section ขาวอยู่แล้ว)

              ย้ายลงมาเป็น "แผ่นที่สอง" ของเอกสาร คั่นด้วยเส้นและป้ายกำกับชุดเดียว
              กับหัวแผ่นแรก จังหวะของคอลัมน์จึงเป็น เส้น→ภาพ→เส้น→ภาพ เหมือน
              หน้ารายงานจริงที่มีภาพรวมแล้วตามด้วยภาพขยาย · ครอปเป็นแถบยาว
              เพราะเป็น "ภาพขยายรายละเอียด" ไม่ใช่ภาพเต็มใบที่ต้องเห็นทั้งกรอบ
              และความสูงที่เพิ่มมา ~250px พอดีกับส่วนที่คอลัมน์ซ้ายเคยสั้นกว่าขวา
              ช่องว่างที่เคยค้างท้ายคอลัมน์จึงหายไปด้วยเนื้อหาจริง ไม่ใช่การยืดกล่อง */}
          <div className="mt-3 flex items-center justify-between gap-4 border-b border-line pb-2.5">
            <TechLabel>Detail View</TechLabel>
            <TechLabel>Defect Close-up</TechLabel>
          </div>
          <MockImage
            src="article-defect.jpg"
            alt=""
            zoom
            className="aspect-[16/6] w-full rounded-sm"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Detailed Inspection Report"
            title="เห็นทุกจุด ก่อนตัดสินใจรับบ้าน"
            lead="รายงานของเราไม่ใช่เช็กลิสต์ติ๊กถูก แต่เป็นเอกสารที่ระบุตำแหน่ง มีภาพประกอบ และจัดลำดับความเร่งด่วน ให้คุณใช้คุยกับโครงการได้จริง"
          />
          <dl className="mt-10 border-t border-line">
            {reportHighlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 60}
                variant="right"
                className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-5"
              >
                <TechLabel className="pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </TechLabel>
                <div>
                  <dt className="flex items-center gap-2 font-semibold">
                    <CheckIcon className="size-4 shrink-0 text-gold-500" />
                    {h.title}
                  </dt>
                  <dd className="mt-1.5 text-base leading-[1.75] text-ink2">
                    {h.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          {/* เดิมลิงก์นี้เขียนว่า "ดูตัวอย่าง Report" แล้วพาไป /services/inspection
              ซึ่งไม่มีตัวอย่างรายงานอยู่เลย — ตัวอย่างที่มีคือภาพในบล็อกนี้เอง
              สิ่งที่คนกดปุ่มนี้อยากได้จริงคือ "ฉบับเต็ม" ซึ่งต้องทักมาขอ
              จึงเปลี่ยนทั้งคำและปลายทางให้ตรงกับสิ่งที่ได้จริง
              TODO: CLIENT-ASSET — ถ้าได้ไฟล์ PDF ตัวอย่างที่ปิดข้อมูลลูกค้าแล้ว
              ให้เปลี่ยนเป็นลิงก์ดาวน์โหลดตรง จะดีกว่าบังคับให้ทักก่อน */}
          <div className="mt-8">
            <GhostLink href="/contact">ขอตัวอย่างรายงานฉบับเต็ม</GhostLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section 5 — เกี่ยวกับเรา: ภาพเต็มคอลัมน์ซ้าย เนื้อหาขวา
 *  การ์ดใบประกอบวิชาชีพลอยคร่อมขอบภาพ เป็นชิ้นเดียวในบล็อกนี้ที่พื้นเข้ม
 *  จึงดึงสายตาไปที่ "ใครเป็นคนตรวจ" ซึ่งคือสิ่งที่ลูกค้าอยากรู้ที่สุด */
export function WhyChooseUs() {
  return (
    <section id="about" className={`scroll-mt-32 border-y border-line bg-warm ${rhythm.dense}`}>
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div className="relative">
          <MockImage
            src="inspection-hero.jpg"
            alt="วิศวกรโยธาพร้อมอุปกรณ์ตรวจสอบหน้างาน"
            className="aspect-[5/6] rounded-sm"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          {/* มือถือ: ต่อท้ายภาพตามปกติ · sm ขึ้นไป: ลอยทับมุมล่างขวาของภาพ
              lg: เลื่อนออกไปคร่อมขอบขวาเข้าไปในช่องว่างระหว่างคอลัมน์ */}
          <div className="mt-4 rounded-sm bg-ink p-6 text-white sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-64 sm:shadow-lift lg:-right-12 lg:bottom-12 lg:w-72">
            {/* การ์ดนี้พูดเรื่อง "เครื่องมือ" ไม่ใช่ "ใบอนุญาต" เพราะบล็อก VerifyLicense
                ที่อยู่ถัดลงไปพูดเรื่องใบอนุญาตอยู่แล้ว พูดซ้ำสองที่ติดกันแล้วทั้งคู่จะเบา */}
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              Inspection Toolkit
            </p>
            <p className="mt-2.5 text-base leading-[1.7] text-white/85">
              กล้องถ่ายภาพความร้อน เครื่องวัดความชื้น กล้องส่องท่อ
              และเครื่องมือมาตรฐานอีก {equipment.length - 3} ชนิด
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="About Us"
            title="เราตรวจเพื่อให้คุณ"
            accent="ตัดสินใจได้เอง"
            lead="ลูกค้าเลือกเราไม่ใช่เพราะราคาถูกที่สุด แต่เพราะรายงานที่ได้เอาไปคุยกับโครงการได้จริง"
          />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {whyChooseUs.map((w, i) => (
              <Reveal
                key={w.title}
                delay={i * 70}
                variant="rise"
                className="border-t-2 border-ink pt-5"
              >
                <TechLabel className="block">
                  {String(i + 1).padStart(2, "0")}
                </TechLabel>
                <h3 className="mt-2 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2.5 text-base leading-[1.75] text-ink2">
                  {w.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section 9 — รีวิว: รีวิวจริงจากเพจ Facebook (ดูข้อมูลใน site.ts)
 *
 *  ไม่มีดาว — ดาวคือภาษาของ marketplace ไม่ใช่ของงานวิชาชีพ
 *  และเราไม่มีระบบให้คะแนนจริงรองรับ จะใส่ก็เป็นการกล่าวอ้างลอย ๆ
 *  ป้ายกำกับจึงเป็น FIELD NOTE ตามลำดับรายการ ซึ่งเป็นข้อมูลที่มีอยู่จริง
 *
 *  ไม่มีอวาตาร์อักษรย่อ/ชื่อผู้พูดอีกต่อไป — เพจไม่ได้ให้ชื่อผู้รีวิวมา
 *  การใส่ชื่อหรืออักษรย่อจึงเท่ากับแต่งตัวตนขึ้นเอง ผิดทั้งความจริงและความเป็นส่วนตัว
 *
 *  ที่มา Facebook ไม่ต้องกำกับซ้ำใต้ทุกใบอีกต่อไป — เดิมทุกใบมีบรรทัด
 *  "รีวิวบน Facebook" พร้อมไอคอน ซึ่งเป็นข้อความเดียวกันห้ารอบ กินพื้นที่
 *  บรรทัดละใบโดยไม่เพิ่มข้อมูล · ย้ายไปรวมไว้ที่ลิงก์เดียวท้าย section
 *  (มีไอคอน Facebook นำ) ที่กดไปอ่านรีวิวจริงบนเพจเพื่อยืนยันเองได้ */

export function Testimonials() {
  return (
    <section id="reviews" className={`scroll-mt-24 border-t border-line ${rhythm.dense}`}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <SectionHeading eyebrow="Client Reviews" title="เสียงจากลูกค้าของเรา" />
          <IndexLabel
            current={testimonials.length}
            total={testimonials.length}
            label="Field Notes"
          />
        </div>

        {/* เดิมกางรีวิวทั้งห้าใบพร้อมกันแบบเมสันรี กินความสูงทั้ง section — ลูกค้าขอ
            ให้โชว์ทีละ 3 ใบแล้วเลื่อนดูใบถัดไป และเอาพื้นครีม (bg-warm) ออก
            ย้ายเป็น ReviewsCarousel (client) ที่ถือ ref ของรางไว้เลื่อนเอง
            การ์ดในสไลเดอร์จึงพื้นใส เหลือแค่กรอบบางเป็นขอบเขต · ส่งเข้าไปแค่ข้อความ
            รีวิว (string ล้วน) เพราะข้าม client boundary ต้อง serialize ได้
            ที่มา Facebook ยังอยู่ที่ลิงก์เดียวท้าย section เหมือนเดิม */}
        <ReviewsCarousel quotes={testimonials.map((t) => t.quote)} />

        {/* ลิงก์ยืนยันที่มา — เราแสดงรีวิวโดยไม่มีชื่อผู้พูด ลิงก์นี้คือสิ่งที่ทำให้
            รีวิวตรวจสอบได้จริง ผู้อ่านกดไปเห็นรีวิวเดียวกันบนเพจพร้อมชื่อคนโพสต์เอง
            ไอคอน Facebook นำหน้า = ป้ายที่มาของรีวิวทั้งชุด (คอนทราสต์ไอคอนบนพื้น
            ครีม ~3.8:1 ผ่านเกณฑ์กราฟิก 3:1) แทนบรรทัดที่เคยซ้ำใต้ทุกใบ */}
        <div className="mt-5 border-t border-line pt-5">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-gold-700"
          >
            <FacebookIcon className="size-4 shrink-0 text-[#1877f2]" />
            อ่านรีวิวจริงทั้งหมดบนเพจ Facebook
            <ExternalIcon className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ตารางราคาผูกกับ inspectionServices ด้วย "ชื่อบริการ" ตัวเดียวกับที่หน้า
   /services/inspection ใช้ — คำโปรยกับลิงก์ปลายทางจึงมาจากข้อมูลจริงชุดเดิม
   ไม่ต้องเขียนคำใหม่ให้หลุดจากกัน ถ้าชื่อไม่ตรง (เช่นเพิ่มราคาบริการใหม่
   โดยยังไม่มีหน้ารายละเอียด) แถวนั้นจะแสดงแค่ราคา ไม่พาไปหน้าที่ไม่มีอยู่ */
const serviceByName = new Map(inspectionServices.map((s) => [s.name, s]));

/** ตารางเรตค่าตรวจ — อยู่ที่ /services/inspection ไม่ใช่หน้าแรก
 *
 *  เคยอยู่หน้าแรกตอนที่เว็บนี้ยังเป็น landing page แต่การ์ด WMMT-1599 ไม่ได้ขอ
 *  เรื่องราคาไว้บนหน้าแรก และเว็บข้อมูลควรเก็บราคาไว้กับบริการที่มันคิดเงิน
 *  ไม่ใช่โยนขึ้นหน้าแรกเพื่อเร่งให้ตัดสินใจ
 *
 *  ราคาเป็นตารางเรตแบบเอกสาร ไม่ใช่การ์ดแพ็กเกจแบบ SaaS
 *  ไม่มีป้าย "ยอดนิยม" ไม่มีเงาลอย ไม่มีกรอบมนใหญ่ — สิ่งเหล่านั้นอ่านเป็นการกดดันให้ซื้อ
 *
 *  โครงนี้รื้อมาจากแบบเดิม (ชื่อบริการซ้าย-เรตขวา ทำซ้ำ 3 ชุด) ซึ่งมีปัญหา
 *  เชิงโครงสร้าง 3 ข้อที่แก้ด้วยการขยับระยะไม่ได้ ต้องเปลี่ยนการจัดวาง:
 *
 *  (1) ชื่อบริการอยู่คนละคอลัมน์กับเรตของตัวเอง มีช่องว่าง 64px คั่นกลาง
 *      "ตรวจคอนโดก่อนโอน" กับ "฿3,500" จึงไม่ได้อยู่ในก้อนสายตาเดียวกัน
 *      ทั้งที่มันคือของชิ้นเดียวกัน — ตอนนี้ชื่ออยู่เหนือเรตของมันโดยตรง
 *  (2) คอลัมน์ซ้ายมีตัวหนังสือจริงแค่ ~130px ในกล่องสูง 255px ที่เหลือคือที่ว่าง
 *      คูณสามกลุ่ม = ครึ่งซ้ายของ section แทบไม่มีเนื้อหา · เคยดันลิงก์ลงไป
 *      เกาะขอบล่างเพื่อให้ที่ว่างดูตั้งใจ แต่นั่นคือการจัดระยะให้ความว่าง
 *      ไม่ใช่การให้เนื้อหา — ตอนนี้ที่ว่างนั้นกลายเป็นแผงเงื่อนไขที่ใช้ร่วมกันทุกเรต
 *  (3) คำว่า "ดูรายละเอียดบริการ" ซ้ำสามครั้งในบล็อกเดียว และคำโปรยของบริการ
 *      ก็ยาวพอ ๆ กันทั้งสาม อ่านรวดเดียวแล้วเหมือนย่อหน้าเดิมวนสามรอบ
 *
 *  โครงใหม่ = แผงเงื่อนไข (ซ้าย, ติดหนึบตอนเลื่อน) + ตารางเรตต่อเนื่อง (ขวา)
 *  เนื้อหาในแผงไม่ใช่ของแต่งใหม่ — ดู priceIncludes ใน site.ts ที่อ้างที่มาไว้ทุกข้อ */
export function PricingTable() {
  return (
    <section id="pricing" className={`scroll-mt-32 border-t border-line ${rhythm.base}`}>
      <Container>
        {/* ป้าย Rate Card · THB ชิดขวาเพราะราคาทุกตัวข้างล่างชิดขอบขวาของ container
            เส้นเดียวกัน ป้ายจึงเป็นหัวคอลัมน์ที่บอกหน่วยของตัวเลข
            ไม่ใช่ข้อความลอยที่บังเอิญอยู่มุมขวา */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="ราคาชัดเจน"
            accent=" ตั้งแต่ก่อนนัด"
            lead="คิดตามขนาดพื้นที่ใช้สอย ไม่มีค่าใช้จ่ายแอบแฝง และไม่คิดเพิ่มสำหรับการตรวจซ้ำ"
          />
          {/* ml-auto มีผลเฉพาะตอนป้ายตกบรรทัดใหม่บนจอแคบ — ให้ไปชิดขวาตาม
              คอลัมน์ราคาเหมือนจอกว้าง ไม่ใช่ไหลไปชิดซ้ายจนไม่ตรงกับอะไรเลย */}
          <TechLabel className="ml-auto">Rate Card · THB</TechLabel>
        </div>

        {/* items-start จำเป็นสองเรื่อง: กันรูโหว่แบบที่เจอมาทั้งหน้า และทำให้
            sticky ของแผงซ้ายมีระยะวิ่ง — กล่องหดเท่าเนื้อหา (~470px) แต่ช่องกริด
            ยังสูงเท่าตารางเรต (~900px) ส่วนต่างคือระยะที่มันเลื่อนตามได้ */}
        <div className="mt-12 grid items-start gap-x-16 gap-y-14 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-x-20">
          {/* ตารางเรตมาก่อนใน DOM เพราะเป็นคำตอบของคำถามที่พาคนมาที่ section นี้
              ("ของฉันเท่าไหร่") บนมือถือจึงเจอราคาก่อนเงื่อนไข
              จอใหญ่ค่อยสลับให้แผงไปอยู่ซ้ายด้วย order — แผงไม่มีอะไรให้โฟกัส
              ลำดับ tab จึงไม่เปลี่ยนตาม ไม่ขัดกับลำดับที่มองเห็น */}
          <div>
            {pricing.map((group, gi) => {
              const service = serviceByName.get(group.service);
              return (
                <div key={group.service} className={gi ? "pt-10 sm:pt-12" : ""}>
                  {/* เส้นหัวกลุ่มลากจากซ้ายไปขวาตอนเลื่อนถึง (variant line)
                      แทน fade-up ที่ทั้งเว็บใช้จนซ้ำ — จังหวะ "ขีดเส้นแล้วค่อยลงรายการ"
                      คือจังหวะของการตีตาราง ซึ่งตรงกับสิ่งที่บล็อกนี้เป็นจริง ๆ
                      border ธรรมดาทำท่านี้ไม่ได้ ต้องเป็น element ของตัวเอง */}
                  <DrawnRule tone="ink" />
                  {/* ลำดับใน DOM คือ ชื่อ → คำโปรย → ตารางเรต → ลิงก์
                      ซึ่งเป็นลำดับที่ถูกบนมือถือพอดี (ดูราคาก่อน ค่อยกดเข้าไปอ่านต่อ)
                      จอ sm ขึ้นไปค่อยย้ายลิงก์ไปมุมขวาบนด้วย col/row-start ที่ระบุตรง ๆ

                      เหตุผลที่ไม่ใช้ flex-wrap + justify-between แบบบรรทัดเดียว:
                      ชื่อบริการยาวไม่เท่ากัน ("ตรวจบ้านก่อนโอน" กับ
                      "ตรวจต่อเติม / ระหว่างก่อสร้าง") บนจอ 375px บางกลุ่มลิงก์จึงอยู่
                      ท้ายบรรทัดเดียวกัน บางกลุ่มตกลงไปชิดซ้ายบรรทัดใหม่ —
                      ตำแหน่งลิงก์เปลี่ยนไปมาระหว่างกลุ่มทั้งที่เป็นของชนิดเดียวกัน */}
                  <Reveal
                    variant="fade"
                    delay={120}
                    className="grid gap-x-8 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:pt-6"
                  >
                    <h3 className="text-[1.375rem] font-semibold sm:col-start-1 sm:row-start-1 sm:text-[1.625rem]">
                      <TechLabel className="mr-4 align-middle">
                        {String(gi + 1).padStart(2, "0")}
                      </TechLabel>
                      {group.service}
                    </h3>
                    {service ? (
                      <p className="mt-2 max-w-md text-ink2 sm:col-start-1 sm:row-start-2">
                        {service.short}
                      </p>
                    ) : null}

                    {/* ตารางเรตที่มี "หัวคอลัมน์" — ของเดิมชื่อเรตอยู่ซ้ายสุด ราคาอยู่ขวาสุด
                        คั่นกลางด้วยเส้นนำสายตา (leader) ที่พาดยาว ~380px และไม่มีหัวคอลัมน์
                        บอกว่าเลขแต่ละตัวคืออะไร ต้องเดาเองว่าซ้ายคือพื้นที่ ขวาคือราคา
                        ("ดูงงๆ") · โครงใหม่แบ่งเป็นสามคอลัมน์ชิดกัน มีหัวคอลัมน์กำกับ
                        (ประเภท / พื้นที่ใช้สอย / ราคา) และให้ตัวหนังสือ "พื้นที่ใช้สอย"
                        อยู่ตรงกลางเป็นตัวเชื่อมสายตาแทนเส้นนำที่ว่างเปล่า

                        คอลัมน์ชื่อกว้างคงที่ 13rem (ไม่ใช่ auto) เพราะแต่ละแถวเป็น grid
                        ของตัวเอง ถ้าใช้ auto ความกว้างคอลัมน์จะไม่เท่ากันข้ามแถว คอลัมน์
                        พื้นที่/ราคาจึงเยื้องกัน · ความกว้างคงที่ทำให้สามคอลัมน์ตรงกันทั้งชุด
                        ราคายังชิดขวาและเป็น tabular-nums หลักจึงตรงกัน เทียบข้ามแถวได้
                        ด้วยการกวาดตาลง · หัวคอลัมน์ไทยใช้ text ธรรมดา ไม่ใช่ TechLabel
                        (TechLabel ถ่าง letter-spacing ซึ่งภาษาไทยใช้ไม่ได้ สระ/วรรณยุกต์หลุด) */}
                    <dl className="mt-6 border-t border-line sm:col-span-2 sm:col-start-1 sm:row-start-3">
                      <div className="hidden grid-cols-[13rem_minmax(0,1fr)_auto] gap-x-6 border-b border-line py-2.5 text-xs text-ink3 sm:grid">
                        <span>ประเภท</span>
                        <span>พื้นที่ใช้สอย</span>
                        <span className="justify-self-end">ราคา</span>
                      </div>
                      {group.tiers.map((t) => (
                        <div
                          key={t.label}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 border-b border-line py-4 sm:grid-cols-[13rem_minmax(0,1fr)_auto] sm:gap-x-6"
                        >
                          {/* จอเล็ก: ชื่อกับราคาอยู่บรรทัดเดียวกัน พื้นที่ใช้สอยตกลงไปบรรทัดล่าง
                              เต็มความกว้าง (col-span-2) · จอ sm ขึ้นไปเรียงเป็นสามคอลัมน์
                              leading-normal (1.5) คือพื้นล่างสำหรับภาษาไทย ตอนจอแคบที่ชื่อ
                              ตัดลงสองบรรทัด ต่ำกว่านี้วรรณยุกต์บรรทัดล่างชนสระล่างบรรทัดบน */}
                          <dt className="font-medium leading-normal sm:col-start-1 sm:row-start-1">
                            {t.label}
                          </dt>
                          <dd className="col-span-2 mt-1 text-sm leading-normal text-ink3 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-0 sm:text-[0.9375rem] sm:text-ink2">
                            {t.scope}
                          </dd>
                          <dd className="tnum col-start-2 row-start-1 justify-self-end font-display text-[1.5rem] leading-none font-semibold whitespace-nowrap text-gold-700 sm:col-start-3 sm:text-[1.75rem]">
                            {/* ฿ (U+0E3F) ไม่มีใน Cormorant ที่โหลดมาเฉพาะ subset latin
                                เบราว์เซอร์จึงหยิบฟอนต์สำรองมาวาดให้ ได้สัญลักษณ์หนาทึบ
                                ยืนติดกับเลขเซริฟบาง ๆ — เห็นชัดว่าเป็นของหลุดชุด
                                แก้ด้วยการสั่งให้เป็นฟอนต์เนื้อความ ตัวเล็กลงและน้ำหนักปกติ
                                การที่คนละแบบจึงอ่านเป็น "หน่วยเงิน" ตามหลังด้วยจำนวน */}
                            <span className="font-head mr-[0.06em] align-baseline text-[0.58em] font-normal">
                              ฿
                            </span>
                            {t.price}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {service ? (
                      <GhostLink
                        href={`#${service.slug}`}
                        className="mt-5 sm:col-start-2 sm:row-start-1 sm:mt-0 sm:justify-self-end"
                      >
                        ดูรายละเอียด
                        {/* ลิงก์สามอันนี้คำเหมือนกันแต่ไปคนละที่ — คนที่ไล่ฟังรายการ
                            ลิงก์ด้วย screen reader จะได้ยินคำเดิมซ้ำสามครั้งโดยแยกไม่ออก
                            จึงต่อชื่อบริการไว้ให้เฉพาะเสียงอ่าน หน้าตาบนจอไม่เปลี่ยน
                            เพราะบนจอมีหัวข้อกำกับอยู่ในกลุ่มเดียวกันแล้ว */}
                        <span className="sr-only"> {group.service}</span>
                      </GhostLink>
                    ) : null}
                  </Reveal>
                </div>
              );
            })}
          </div>

          {/* แผงเงื่อนไขที่ใช้ร่วมกันทุกเรต — เขียนครั้งเดียวแทนที่จะพูดซ้ำสามกลุ่ม
              sticky เฉพาะจอใหญ่: ระหว่างกวาดตาไล่ราคาลงไป เงื่อนไขยังอยู่ในสายตา
              คนจึงไม่ต้องเลื่อนกลับขึ้นไปหาว่า "ราคานี้รวมรายงานหรือยัง"
              (มือถือไม่ sticky เพราะจะกินความสูงจอไปเปล่า ๆ) */}
          <Reveal variant="fade" className="lg:sticky lg:top-24 lg:order-first">
            {/* เส้นหัวแผงเป็น tone เดียวกับเส้นหัวกลุ่มของตารางเรต — สองคอลัมน์
                จึงแขวนจากเส้นเดียวกันตอนเข้า section (กติกาเดียวกับที่บันทึกไว้ใน
                README หัวข้อ "กติกาการวางคอลัมน์") ถ้าฝั่งหนึ่งเริ่มด้วยเส้น
                อีกฝั่งเริ่มด้วยตัวหนังสือ ขอบบนจะไม่ตรงกันและอ่านเป็นของคนละชุด */}
            <DrawnRule tone="ink" />
            <TechLabel className="mt-5 block">Included in Every Rate</TechLabel>
            <h3 className="mt-2 text-lg font-semibold sm:text-xl">
              รวมอยู่ในทุกราคาแล้ว
            </h3>
            <DrawnRule className="mt-5" />
            <dl className="divide-y divide-line">
              {priceIncludes.map((it) => (
                <div
                  key={it.term}
                  className="grid gap-x-6 gap-y-0.5 py-4 sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)]"
                >
                  <dt className="text-sm font-semibold">{it.term}</dt>
                  {/* leading-relaxed (1.625) ไม่ใช่ 1.75 ของ body — แผงนี้เป็นตาราง
                      เงื่อนไข ต้องอ่านเป็นก้อนสั้น ๆ ทีละข้อ ไม่ใช่ย่อหน้า
                      แต่ยังสูงกว่าพื้นล่าง 1.5 ที่ตั้งไว้สำหรับภาษาไทย */}
                  <dd className="text-base leading-relaxed text-ink2">
                    {it.detail}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line pt-5 text-sm text-ink3">
              พื้นที่นอกกรุงเทพฯ และปริมณฑลมีค่าเดินทางเพิ่ม
              แจ้งให้ทราบก่อนนัดเสมอ
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** ไทม์ไลน์ของงานหนึ่งงาน — แถวแบบเอกสาร ไม่ใช่การ์ดสี่ใบ
 *  ระยะเวลาอยู่คอลัมน์ขวาสุดเหมือนช่อง "กำหนดส่ง" ในตารางงาน
 *
 *  ไม่มีสาขาพิเศษสำหรับขั้นสุดท้ายแล้ว (เดิมมี isInterior ที่แทรกปุ่มไปหน้าตกแต่ง) —
 *  ข้อมูลไม่มีขั้นนั้นแล้ว และการยิงลิงก์ออกจากกลางไทม์ไลน์คือการพาคนออกจากหน้า
 *  ตรงจุดที่เขากำลังอ่านว่างานจบยังไง ทุกแถวจึงเป็นแถวเดียวกันหมด */
export function Timeline() {
  return (
    <ol className="border-t border-ink">
      {timeline.map((item, i) => (
        <Reveal
          as="li"
          key={item.step}
          delay={i * 70}
          variant="left"
          className="grid gap-x-8 gap-y-3 border-b border-line py-7 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-9"
        >
          <span
            aria-hidden
            className="tnum font-display text-[2rem] leading-none font-semibold text-gold-500 sm:w-12 sm:text-[2.75rem]"
          >
            {item.step}
          </span>
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
            <p className="mt-2 max-w-xl text-base leading-[1.75] text-ink2">
              {item.body}
            </p>
          </div>
          <p className="text-sm font-semibold text-ink3 sm:w-44 sm:shrink-0 sm:text-right">
            {item.duration}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

/** แถบข้อมูลกำกับบทความ — เลขลำดับเป็นอังกฤษถ่างกว้างได้ ส่วนหมวดกับวันที่เป็นไทย
 *  ไทยห้ามถ่าง letter-spacing เพราะสระกับวรรณยุกต์จะหลุดจากพยัญชนะ */
export function ArticleMeta({
  article,
  index,
  tone = "light",
}: {
  article: Article;
  index?: number;
  tone?: "light" | "dark";
}) {
  const cat = articleCategories[article.category];
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] ${
        tone === "dark" ? "text-white/60" : "text-ink3"
      }`}
    >
      {typeof index === "number" ? (
        <>
          <TechLabel tone={tone === "dark" ? "invert" : "accent"}>
            {String(index).padStart(2, "0")}
          </TechLabel>
          <span aria-hidden className="opacity-40">
            /
          </span>
        </>
      ) : null}
      {/* จุดคั่นต้องเดินทางไปกับ "ค่าที่ตามหลัง" เสมอ ไม่ใช่เป็น flex item เดี่ยว ๆ
          ในคอลัมน์แคบ (รางบทความรองกว้าง ~360px) แถวนี้ตัดบรรทัดแน่นอน
          ถ้าจุดเป็นชิ้นแยก มันจะค้างท้ายบรรทัดบนแล้วค่าตกลงไปบรรทัดล่าง
          ได้เป็น "หมวด · วันที่ ·" / "อ่าน 5 นาที" ซึ่งอ่านเหมือนข้อมูลขาด
          มัดคู่กันแล้ว whitespace-nowrap จุดกับค่าจึงขึ้นบรรทัดใหม่พร้อมกัน */}
      <span>{cat.label}</span>
      <span className="inline-flex items-center gap-x-2.5 whitespace-nowrap">
        <span aria-hidden className="opacity-40">
          ·
        </span>
        {formatThaiDate(article.date)}
      </span>
      <span className="inline-flex items-center gap-x-2.5 whitespace-nowrap">
        <span aria-hidden className="opacity-40">
          ·
        </span>
        อ่าน {article.readingTime}
      </span>
    </p>
  );
}

/** บทความเด่น — ภาพกว้างครึ่งหนึ่ง หัวเรื่องใหญ่ ให้อ่านเป็นปกนิตยสาร
 *  ไม่ใช่การ์ดใบแรกที่บังเอิญอยู่ซ้ายสุดของกริดสามช่อง */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    /* เคยเขียนไว้สำหรับกริดสามคอลัมน์ (lg:col-span-2 + lg:h-full + lg:aspect-auto)
       โดยให้ "คอลัมน์ข้าง ๆ" เป็นตัวกำหนดความสูงของภาพ พอย้ายมาใช้เดี่ยว ๆ
       ในหน้าดัชนีบทความ ไม่มีคอลัมน์ข้างมาดันความสูงอีกแล้ว ภาพจึงยุบเหลือ
       572x199 — เตี้ยกว่าการ์ดบทความรองที่อยู่ข้างล่าง (572x358) กลายเป็น
       "บทความเด่นที่เล็กกว่าบทความรอง" ซึ่งกลับหัวกลับหางกับหน้าที่ของมัน

       ตอนนี้กำหนดสัดส่วนของภาพเอง ไม่ยืมความสูงจากใคร และให้คอลัมน์ภาพ
       กว้างกว่าคอลัมน์ตัวหนังสือ (1.3fr ต่อ 1fr) ภาพจึงเป็นตัวนำจริง ๆ

       ถ้าภาพเป็นแนวตั้ง (article.portrait — ภาพผลงานจริงบางใบถ่ายแนวตั้ง) โชว์เต็ม
       สัดส่วนไม่ครอป จึงหุบคอลัมน์ภาพให้แคบลง (0.85fr) ไม่ให้ภาพสูงจนล้น และจัด
       ตัวหนังสือกึ่งกลางแนวตั้งข้างภาพ (items-center) แทนเกาะบน ให้สองฝั่งสมดุล */
    <Reveal as="article" variant="clip" className="group relative">
      <div
        className={`grid gap-7 sm:gap-10 lg:gap-14 ${
          article.portrait
            ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center"
            : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start"
        }`}
      >
        <MockImage
          src={article.image}
          alt={article.title}
          zoom
          className={
            article.portrait
              ? "aspect-[3/4] w-full rounded-sm"
              : "aspect-[4/3] w-full rounded-sm sm:aspect-[16/10]"
          }
          sizes={
            article.portrait
              ? "(min-width: 1024px) 26rem, 100vw"
              : "(min-width: 1024px) 41rem, 100vw"
          }
        />
        <div className="lg:pt-1">
          <ArticleMeta article={article} index={1} />
          <h3 className="mt-4 text-[1.5rem] leading-[1.3] font-semibold sm:text-[1.875rem] lg:text-[2.125rem]">
            <Link
              href={`/articles/${article.slug}`}
              className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-3.5 text-[1.0625rem] leading-[1.8] text-ink2">
            {article.excerpt}
          </p>
          <span
            aria-hidden
            className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-gold-700"
          >
            อ่านบทความ
            <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index?: number;
}) {
  const cat = articleCategories[article.category];
  return (
    <article className="group relative flex flex-col">
      <MockImage
        src={article.image}
        alt={article.title}
        zoom
        className="aspect-[16/10] rounded-sm"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-5 flex flex-1 flex-col">
        {typeof index === "number" ? (
          <ArticleMeta article={article} index={index} />
        ) : (
          <Eyebrow variant="pill">{cat.label}</Eyebrow>
        )}
        <h3 className="mt-3.5 text-lg font-semibold">
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-base leading-[1.75] text-ink2">
          {article.excerpt}
        </p>
        {/* 13px ไม่ใช่ 12px — บรรทัดนี้เป็นไทยปนตัวเลข ที่ 12px วรรณยุกต์
            เริ่มแยกไม่ออกบนจอความหนาแน่นต่ำ แต่ไม่ขึ้นไปถึง 14px
            เพราะต้องยังอ่านเป็น "ข้อมูลกำกับ" ไม่ใช่เนื้อความของการ์ด */}
        {typeof index === "number" ? null : (
          <p className="mt-5 text-[0.8125rem] text-ink3">
            {formatThaiDate(article.date)} · อ่าน {article.readingTime}
          </p>
        )}
      </div>
    </article>
  );
}

/** บริการตกแต่ง — ตั้งใจให้น้ำหนักน้อยกว่าฝั่งตรวจบ้านอย่างชัดเจน
 *  ภาพเล็กกว่า หัวเรื่องเล็กกว่า ไม่มี CTA หลัก มีแค่ลิงก์ข้อความ
 *  เพราะคนเข้าเว็บนี้มาเพื่อ "ตรวจบ้าน" การดันงานตกแต่งขึ้นมาเท่ากันจะทำให้สารหลักเบลอ */
export function InteriorCrossSell() {
  return (
    /* ลดความสูง section: ตัวขับความสูงเดิมคือภาพแนวตั้ง aspect-4/5 (สูง ~587px)
       ซึ่งสูงกว่าคอลัมน์ตัวหนังสือ (~428px) แล้ว items-center ก็ดันให้ทั้งแถว
       สูงตามภาพ · แก้สองจุด: (1) หุบ padding แนวตั้งจาก rhythm.dense (56/80px)
       เหลือ 48/64px (2) เลิกบังคับภาพเป็นแนวตั้ง — ให้คอลัมน์ยืดเท่ากัน
       (items-stretch) แล้วภาพ object-cover เต็มความสูงคอลัมน์ตัวหนังสือแทน
       (จอเล็กใช้ aspect 4/3 ที่เตี้ยกว่า 4/5 อยู่แล้ว) ความสูงทั้ง section
       จึงถูกกำหนดโดยตัวหนังสือ ไม่ใช่ภาพที่สูงเกิน */
    <section className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-16">
        <div>
          <TechLabel className="mb-5 block">Secondary Service</TechLabel>
          <SectionHeading
            eyebrow="After The Inspection"
            title="ตรวจเจอปัญหาแล้ว "
            accent="ซ่อมที่ไหน?"
            lead="ส่วนใหญ่โครงการจะแก้ให้ตามรายงาน แต่ส่วนที่คุณอยากปรับเพิ่มเอง — ม่าน พื้น บิวท์อิน ต่อเติม — ทีมเดียวกันทำต่อได้เลย ไม่ต้องเริ่มหาช่างใหม่ตั้งแต่ต้น"
          />
          {/* ไอคอนประจำแต่ละบริการ แทนเครื่องหมายถูกซ้ำ ๆ — บอกของจริงในบรรทัดนั้น
              (ม่าน / วอลเปเปอร์ / พื้น / ฟิล์มกรองแสง / กระจกกั้นห้อง / ต่อเติม)
              ทุกใบมาจากชุด Base เดียวกัน ภาษาภาพจึงเข้าชุดกับไอคอนที่เหลือทั้งเว็บ */}
          <ul className="mt-6 grid gap-2 text-base text-ink2 sm:grid-cols-2">
            {[
              { label: "ผ้าม่าน มู่ลี่ พรม", Icon: CurtainIcon },
              { label: "วอลเปเปอร์", Icon: WallpaperIcon },
              { label: "พื้น SPC", Icon: FloorIcon },
              { label: "ฟิล์มกรองแสง", Icon: SunIcon },
              { label: "กระจกกั้นห้อง", Icon: PartitionIcon },
              { label: "ต่อเติมบ้าน", Icon: ExtendHomeIcon },
            ].map(({ label, Icon }) => (
              <li key={label} className="flex gap-2.5">
                <Icon className="mt-0.5 size-5 shrink-0 text-gold-500" />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <GhostLink href="/services/interior">
              ดูบริการตกแต่งครบ 9 บริการ
            </GhostLink>
          </div>
        </div>
        {/* จอเล็ก: ภาพเป็น aspect-4/3 (เตี้ยกว่า 4/5 เดิม) · จอ lg: ปล่อย aspect
            แล้วยืดเต็มความสูงคอลัมน์ (h-full) ให้เท่าคอลัมน์ตัวหนังสือพอดี
            object-cover ใน MockImage ครอปให้เต็มกรอบเอง ไม่บิดสัดส่วน */}
        <Reveal variant="clip" className="lg:h-full">
          <MockImage
            src="cross-sell.jpg"
            alt="ห้องนั่งเล่นหลังตกแต่ง ผ้าม่านและพื้นไม้"
            className="aspect-[4/3] w-full rounded-sm sm:aspect-[16/10] lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/** Section 8 — CTA ปิดท้าย: ภาพบ้านเต็มความกว้าง คลุมด้วยถ่านเข้มให้ตัวอักษรอ่านออก
 *
 *  รับข้อความเข้ามาได้ทั้งชุด โดยค่าตั้งต้นเป็นสำนวนฝั่งตรวจบ้านเหมือนเดิม —
 *  หน้าตกแต่งปิดท้ายด้วยคำถามคนละคำถาม ("มีพื้นที่ที่อยากปรับ?" ไม่ใช่ "กำลังจะรับบ้าน?")
 *  ทางเลือกคือก๊อปทั้งบล็อกไปไว้ในหน้านั้นหรือเปิดช่องให้ส่งข้อความเข้ามา
 *  เลือกอย่างหลัง เพราะการตัดสินใจเรื่องเลย์เอาต์ (ภาพจาง 20%, ชิดซ้าย, เส้นคาด,
 *  ปุ่มเกาะขวาบนจอกว้าง) ควรอยู่ที่เดียว ไม่งั้นแก้ทีหลังแล้วสองหน้าจะเพี้ยนคนละทาง */
export function ContactCta({
  label = "Ready To Inspect",
  title = "กำลังจะรับบ้าน? ตรวจให้มั่นใจก่อนตัดสินใจ",
  lead = "วันตรวจก่อนโอนคือโอกาสสุดท้ายที่โครงการจะแก้ให้ฟรี ทักมาบอกวันโอนกับขนาดห้อง เดี๋ยวเราเช็กคิวให้",
  actions,
}: {
  label?: string;
  title?: string;
  lead?: string;
  /** ปุ่มปิดท้าย — ต้องเป็นโทน onDark / outlineDark เท่านั้น พื้นหลังเป็นสีกรมท่าเข้ม */
  actions?: React.ReactNode;
} = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* ภาพพื้นหลังต้องเป็น "ห้องว่าง" ไม่ใช่ภาพคน — ใบหน้าที่จางอยู่หลังหัวข้อ
          ดึงสายตาแย่งข้อความ และทำให้ลูมิแนนซ์ไม่สม่ำเสมอจนคุมคอนทราสต์ไม่ได้ */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <MockImage
          src="interior-hero.jpg"
          alt=""
          className="h-full w-full"
          sizes="100vw"
        />
      </div>
      <Container className={`relative ${rhythm.open}`}>
        {/* บล็อกปิดท้ายชิดซ้าย ไม่ใช่กึ่งกลาง — ทั้งหน้าอ่านจากขอบซ้ายมาตลอด
            การหักมาจัดกึ่งกลางเฉพาะตอนจบทำให้จังหวะที่สร้างมาทั้งหน้าขาด */}
        <div className="flex items-center justify-between gap-6">
          <TechLabel tone="invert">{label}</TechLabel>
          {/* เวลาทำการเป็นภาษาไทย จึงห้ามผ่าน TechLabel ที่ถ่าง letter-spacing 0.18em
              — สระกับวรรณยุกต์จะหลุดจากพยัญชนะ ใช้ข้อความเล็กธรรมดาแทน */}
          <span className="text-[0.8125rem] text-white/55">{contact.hours}</span>
        </div>
        <span aria-hidden className="mt-4 block h-px w-full bg-white/15" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-[1.875rem] leading-[1.3] font-semibold text-white sm:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.8] text-white/75">
              {lead}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            {actions ?? (
              <>
                <BookCta tone="onDark" />
                <QuoteCta tone="outlineDark" />
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
