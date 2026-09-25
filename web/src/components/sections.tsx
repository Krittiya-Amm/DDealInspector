import Link from "next/link";
import {
  ArrowIcon,
  CheckIcon,
  ExternalIcon,
  ShieldIcon,
} from "@/components/icons";
import { Counter, Reveal } from "@/components/reveal";
import {
  BookCta,
  Container,
  DrawnRule,
  Eyebrow,
  GhostLink,
  ImageMarker,
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
  stats,
  testimonials,
  timeline,
  whyChooseUs,
  whyInspect,
} from "@/lib/site";

/** บล็อกตรวจสอบใบอนุญาต — จงใจให้อ่านเป็น "ใบรับรอง" มากกว่า "แบนเนอร์"
 *  มีกรอบเทคนิค มุมกากบาท และป้ายอ้างอิงแบบเดียวกับหัวกระดาษราชการ
 *
 *  บล็อกนี้มีสองสถานะ ขึ้นกับว่ามีเลขใบอนุญาตจริงหรือยัง (credentials.licenseNo)
 *  ตอนยังไม่มีเลข: ซ่อนการ์ด License No. ทั้งใบ และเปลี่ยนย่อหน้าเป็นแบบที่
 *  ให้ผู้อ่านขอเลขจากเราก่อนแล้วค่อยไปค้นเอง
 *  เหตุผล: ทั้งบล็อกพาดหัวว่า "อย่าเพิ่งเชื่อเรา เช็กเองได้" การโชว์เลขที่
 *  ค้นในระบบสภาวิศวกรแล้วไม่เจอ ทำลายข้อความของบล็อกนี้แรงกว่าการไม่โชว์เลข
 *  ห้ามเติมเลขสมมติหรือ XXXXX กลับเข้ามาเพื่อให้ layout เต็ม */
/*  เป็นแถบกรมท่าเต็มความกว้าง ไม่ใช่การ์ดกรมท่าที่วางอยู่ในกรอบเนื้อหา
 *  ใบรับรองคือหลักฐานชิ้นเดียวในเว็บที่ผู้อ่านไปพิสูจน์จากข้างนอกได้จริง
 *  มันจึงต้องหนักกว่าย่อหน้าธรรมดา — แต่การ์ดทำตรงกันข้าม คือจับมันใส่กล่อง
 *  ให้กว้างเท่าบล็อกอื่นทุกใบในหน้า กลายเป็น "อีกหนึ่งรายการ" ในแถว
 *
 *  พอถอดกรอบออก สีกรมท่ากินเต็มความกว้างจอ หน้าจึงหยุดหนึ่งจังหวะตรงนี้
 *  ก่อนเข้าเรื่องถัดไป น้ำหนักที่ได้มาจากการจัดวางล้วน ๆ ไม่ได้เพิ่มสี
 *  ไม่ได้ขยายตัวอักษร และไม่ได้ใส่ภาพที่เราไม่มี
 *
 *  เครื่องหมายตัดมุมถูกถอดไปพร้อมกรอบ — มันเป็นภาษาของ "แผ่นกระดาษ"
 *  ซึ่งอ่านได้เฉพาะตอนมีขอบให้ตัด พอเป็นแถบเต็มจอแล้วมันจะลอยอยู่มุมจอเฉย ๆ */
export function VerifyLicense() {
  const licenseNo = credentials.licenseNo;

  return (
    <section className={`bg-ink text-white ${rhythm.open}`}>
      <Container>
        <div className="flex items-center justify-between gap-6">
          <TechLabel tone="invert">Verification</TechLabel>
          <TechLabel tone="invert">Council Of Engineers</TechLabel>
        </div>
        <span aria-hidden className="mt-4 block h-px w-full bg-white/15" />

        <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div>
            <span className="inline-flex size-11 items-center justify-center rounded-sm border border-white/20">
              <ShieldIcon className="size-5 text-white" />
            </span>
            {/* ใหญ่กว่า h3 ของบล็อกอื่นหนึ่งขั้น เพราะแถบนี้กินเต็มความกว้างแล้ว
                หัวข้อขนาดเดิมจะดูเล็กเกินไปเมื่อเทียบกับพื้นที่ที่มันยืนอยู่ */}
            <h3 className="mt-6 max-w-2xl text-[1.75rem] font-semibold sm:text-[2.25rem]">
              อย่าเพิ่งเชื่อเรา — เช็กเองได้
            </h3>
            <p className="mt-5 max-w-xl text-white/70 sm:text-lg sm:leading-[1.8]">
              วิศวกรที่เข้าตรวจทุกงานมีใบประกอบวิชาชีพวิศวกรรมควบคุม
              รับรองโดย{credentials.licenseBody}{" "}
              {licenseNo
                ? "คุณเอาเลขใบอนุญาตไปค้นในระบบสาธารณะของสภาวิศวกรได้เลย ไม่ต้องเชื่อคำโฆษณาของเรา"
                : "ขอเลขใบอนุญาตจากเราทางไลน์ได้ก่อนนัด แล้วเอาไปค้นในระบบสาธารณะของสภาวิศวกรเองได้เลย ไม่ต้องเชื่อคำโฆษณาของเรา"}
            </p>
          </div>

          <div className="lg:w-72 lg:shrink-0">
            {licenseNo && (
              <dl className="mb-5">
                <dt>
                  <TechLabel tone="invert">License No.</TechLabel>
                </dt>
                <dd className="tnum mt-2 border-b border-white/25 pb-3 font-display text-[2.25rem] leading-none font-semibold">
                  {licenseNo}
                </dd>
              </dl>
            )}
            <a
              href={credentials.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-white px-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 ease-out hover:bg-white/90"
            >
              ตรวจสอบที่เว็บสภาวิศวกร
              <ExternalIcon className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5" />
            </a>
          </div>
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
        <div className="flex items-baseline justify-between gap-6 pt-9 sm:pt-12">
          <TechLabel>Field Record</TechLabel>
          {/* ปีจากนาฬิกาเครื่อง ไม่ใช่ตัวเลขที่ตั้งขึ้นเอง */}
          <TechLabel>DD / {new Date().getFullYear()}</TechLabel>
        </div>
        <DrawnRule className="mt-3.5" />

        <dl className="grid grid-cols-2 gap-x-8 gap-y-9 py-9 sm:grid-cols-4 sm:gap-x-10 sm:py-12">
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
                  className="tnum mt-2.5 block font-display text-[2.75rem] leading-[0.9] font-semibold text-gold-500 sm:text-[3.5rem] lg:text-[4rem]"
                />
                <span className="mt-3 block text-[0.9375rem] text-ink2">
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
  const total = featuredServices.length;

  return (
    <section className={rhythm.base}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            eyebrow="Featured Services"
            title="เลือกตามสถานการณ์ของคุณ"
            lead="กำลังจะรับบ้านใหม่ รับคอนโด ดูบ้านมือสอง หรือรอตรวจซ้ำหลังโครงการแก้ — ขอบเขตการตรวจต่างกัน"
          />
          <GhostLink href="/services/inspection">ดูบริการทั้งหมด</GhostLink>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 lg:mt-16">
          <TechLabel>Inspection Scopes</TechLabel>
          <IndexLabel current={total} total={total} />
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
                className="flex flex-col gap-4 py-7 transition-colors duration-300 ease-out sm:flex-row sm:items-start sm:gap-8 sm:py-9 lg:pr-[40%]"
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
                  <span className="mt-2 block max-w-md text-[0.9375rem] leading-[1.75] text-ink2 sm:text-[1.0625rem]">
                    {s.short}
                  </span>
                  {/* meta เป็นภาษาไทย จึงห้ามใช้ TechLabel ที่ถ่าง letter-spacing */}
                  <span className="mt-3 block text-[0.8125rem] text-ink3">
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
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink3">
              รอยร้าวแบบไหนต้องเฝ้าระวัง แบบไหนเป็นแค่ผิวปูน — ต่างกันที่ทิศทางและความกว้าง
            </p>
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
    <section className={`border-t border-line ${rhythm.open}`}>
      <Container className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal variant="scale" className="group relative">
          {/* กรอบบาง ๆ เยื้องออกไปด้านหลัง — ให้ความรู้สึกว่าเป็นกระดาษหลายแผ่นวางซ้อน
              ไม่ใช่ mockup 3 มิติ ซึ่งจะอ่านเป็นงานขายซอฟต์แวร์ทันที */}
          <span
            aria-hidden
            className="absolute -top-3 -left-3 hidden h-full w-full rounded-sm border border-line sm:block"
          />
          {/* แถบเลขรายงานอยู่เหนือภาพ ไม่ใช่ใต้ภาพ — ภาพที่วางซ้อนมุมขวาล่าง
              กินพื้นที่ใต้ภาพเสมอ ป้ายที่ชิดขวาจึงถูกบังจนอ่านไม่ออก
              และหัวกระดาษด้านบนก็อ่านเป็นเอกสารจริงมากกว่าคำบรรยายใต้ภาพอยู่แล้ว */}
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-line pb-2.5">
            {/* TODO: CLIENT-DATA — รูปแบบเลขรายงานจริงรอจากลูกค้า
                จงใจใช้ XXXX ให้เห็นชัดว่ายังไม่ใช่ของจริง */}
            <TechLabel>Report No. DD-XXXX</TechLabel>
            <TechLabel>Sample Document</TechLabel>
          </div>

          <div className="relative overflow-hidden rounded-sm">
            <MockImage
              src="report.jpg"
              alt="ตัวอย่างรายงานตรวจบ้านพร้อมภาพประกอบทุกจุด"
              zoom
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
            {/* หมุดชี้ตำแหน่ง: ข้อความมาจาก reportHighlights ที่มีอยู่จริง
                ไม่ได้ตั้งชื่อห้องหรือเลข defect ขึ้นมาเอง
                หมุดที่สองเลี่ยงมุมขวาล่าง เพราะภาพซ้อนทับบังพื้นที่นั้นไว้ */}
            <ImageMarker
              index={1}
              label="Location Marked"
              className="top-[18%] left-[10%]"
            />
            <ImageMarker
              index={2}
              label="Priority Ranked"
              className="top-[34%] right-[10%]"
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
                  <dd className="mt-1.5 text-[0.9375rem] leading-[1.75] text-ink2">
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
    <section id="about" className={`scroll-mt-24 border-y border-line bg-warm ${rhythm.dense}`}>
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
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/85">
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
                <p className="mt-2.5 text-[0.9375rem] leading-[1.75] text-ink2">
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

/** Section 9 — รีวิว: อันแรกเป็นคำพูดตัวใหญ่ อีกสองอันเรียงเล็กลงข้าง ๆ
 *
 *  ไม่มีดาว — ดาวคือภาษาของ marketplace ไม่ใช่ของงานวิชาชีพ
 *  และเราไม่มีระบบให้คะแนนจริงรองรับ จะใส่ก็เป็นการกล่าวอ้างลอย ๆ
 *  ป้ายกำกับจึงเป็น FIELD NOTE ตามลำดับรายการ ซึ่งเป็นข้อมูลที่มีอยู่จริง */
export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="reviews" className={`scroll-mt-24 border-t border-line ${rhythm.base}`}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <SectionHeading eyebrow="Client Reviews" title="เสียงจากลูกค้าของเรา" />
          <IndexLabel
            current={testimonials.length}
            total={testimonials.length}
            label="Field Notes"
          />
        </div>

        {/* ทั้งสามโน้ตแขวนจากเส้นบนเส้นเดียวกัน — ของเดิมใบซ้ายเริ่มด้วยป้ายเปล่า ๆ
            ส่วนสองใบขวาเริ่มด้วย border-t ทั้งคู่ ขอบบนจึงไม่ตรงกันสักเส้น
            พอทุกใบมีเส้นเดียวกันแล้ว ความต่างของขนาดตัวอักษรจะอ่านเป็น "ลำดับความสำคัญ"
            แทนที่จะอ่านเป็นของคนละชุดที่วางชนกัน */}
        <div className="mt-14 grid gap-x-16 gap-y-14 lg:mt-20 lg:grid-cols-[1.2fr_1fr]">
          <Reveal as="article" variant="left">
            <figure className="border-t border-line pt-6">
              <TechLabel tone="accent">Field Note 01</TechLabel>
              {/* คำพูดหลักตัวใหญ่จริง — ขนาดคือสิ่งที่ทำให้รู้สึกพรีเมียม ไม่ใช่กรอบการ์ด

                  เดิม figure เป็น flex h-full แล้วให้ blockquote กิน flex-1
                  ชื่อผู้พูดจึงถูกดันไปติดก้นกล่องที่ grid ยืดไว้ ห่างจากคำพูด ~100px
                  อ่านเป็นคำพูดลอยที่ไม่มีเจ้าของ แล้วมีชื่อใครไม่รู้อยู่ข้างล่าง
                  ชื่อต้องตามหลังคำพูดทันที ส่วนที่เหลือปล่อยว่างท้ายคอลัมน์ได้ */}
              <blockquote className="mt-5 text-[1.375rem] leading-[1.7] text-ink before:mr-1 before:font-display before:text-[2rem] before:leading-none before:text-gold-500 before:content-['“'] sm:text-[1.75rem] sm:leading-[1.62]">
                {lead.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <MockImage
                  src={lead.image}
                  alt=""
                  className="size-12 shrink-0 rounded-full"
                  sizes="48px"
                />
                <span>
                  <span className="block font-semibold">{lead.name}</span>
                  <span className="block text-sm text-ink3">
                    {lead.property}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* self-center ออก — ตอนที่ใบซ้ายยังถูกยืด มันไม่มีผลอยู่แล้ว
              แต่พอใบซ้ายหดตามเนื้อหาจริง มันจะดันสองใบขวาลอยลงกลางคอลัมน์
              ทำให้เส้นบนของใบแรกไม่ตรงกับเส้นบนของใบซ้ายอีก */}
          <div className="grid gap-y-10">
            {rest.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 90} variant="right">
                <figure className="border-t border-line pt-6">
                  <TechLabel>{`Field Note 0${i + 2}`}</TechLabel>
                  <blockquote className="mt-3 text-[1.0625rem] leading-[1.8] text-ink2 before:mr-1 before:font-display before:text-2xl before:text-gold-500 before:content-['“']">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3.5">
                    <MockImage
                      src={t.image}
                      alt=""
                      className="size-10 shrink-0 rounded-full"
                      sizes="40px"
                    />
                    <span>
                      <span className="block text-[0.9375rem] font-semibold">
                        {t.name}
                      </span>
                      <span className="block text-sm text-ink3">
                        {t.property}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
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
    <section id="pricing" className={`scroll-mt-24 border-t border-line ${rhythm.base}`}>
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

                    {/* ราคาชิดขวาและเป็น tabular-nums ทุกตัว หลักจึงตรงกันเป็นคอลัมน์
                        เทียบราคาข้ามแถว (และข้ามกลุ่ม) ได้ด้วยการกวาดตาลงอย่างเดียว

                        เส้นนำสายตา (leader) แทนเส้นแบ่งแถวเต็มความกว้าง — เหตุผล:
                        ชื่อเรตอยู่ซ้ายสุด ราคาอยู่ขวาสุด ห่างกัน ~380px บนจอ 1280
                        และ ~480px บนจอ 768 (ช่วงที่ตารางกินเต็มความกว้าง)
                        เส้นแบ่งแถวทำหน้าที่ "คั่น" ซึ่งตรงข้ามกับสิ่งที่แถวนี้ต้องการ
                        คือ "เชื่อม" ชื่อเข้ากับตัวเลขของมัน · เส้นนำจึงอ่านง่ายกว่า
                        ในระยะไกล และเป็นภาษาเดียวกับเส้นบอกระยะในแบบก่อสร้าง
                        (จอเล็กซ่อนเส้นไว้ เพราะระยะเหลือ ~150px ตาโยงเองได้อยู่แล้ว
                         และเส้นสั้น ๆ จะกลายเป็นขีดลอยที่ไม่ได้ทำหน้าที่อะไร) */}
                    <dl className="mt-6 border-t border-line sm:col-span-2 sm:col-start-1 sm:row-start-3">
                      {group.tiers.map((t) => (
                        <div
                          key={t.label}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 py-4 sm:grid-cols-[minmax(0,auto)_minmax(2rem,1fr)_auto] sm:gap-x-4"
                        >
                          {/* ขอบเขตต่อท้ายชื่อในบรรทัดเดียวกัน ไม่ใช่บรรทัดที่สอง —
                              เดิมทุกแถวสูง 2 บรรทัดโดยที่บรรทัดล่างมีแค่ "ไม่เกิน 35 ตร.ม."
                              ซึ่งเป็นส่วนขยายของชื่อ ไม่ใช่ข้อมูลคนละชั้น
                              รวมเป็นบรรทัดเดียวแล้วเส้นนำมีจุดเริ่มที่ชัด และตารางทั้งชุด
                              เตี้ยลง ~150px ต่อหน้า · leading-normal (1.5) คือพื้นล่าง
                              สำหรับภาษาไทย จำเป็นตอนจอแคบที่ชื่อ+ขอบเขตตัดลงสองบรรทัด
                              ต่ำกว่านี้วรรณยุกต์บรรทัดล่างจะชนสระล่างของบรรทัดบน */}
                          <dt className="min-w-0 leading-normal">
                            <span className="font-medium">{t.label}</span>{" "}
                            <span className="text-sm text-ink3">{t.scope}</span>
                          </dt>
                          {/* กล่องเปล่าที่ไม่มีเนื้อหา เส้นฐานของมันคือขอบล่างของกล่อง
                              พอสูง 1px และ grid จัดแบบ baseline เส้นจึงนอนอยู่บนเส้นฐาน
                              ของชื่อพอดี ไม่ต้องคำนวณระยะเอง */}
                          <span
                            aria-hidden
                            className="hidden h-px bg-line sm:block"
                          />
                          <dd className="tnum shrink-0 font-display text-[1.75rem] leading-none font-semibold whitespace-nowrap text-gold-700 lg:text-[2rem]">
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
                  <dd className="text-[0.9375rem] leading-relaxed text-ink2">
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

/** ไทม์ไลน์หลังนัดตรวจ — แถวแบบเอกสาร ไม่ใช่การ์ดสี่ใบ
 *  ระยะเวลาอยู่คอลัมน์ขวาสุดเหมือนช่อง "กำหนดส่ง" ในตารางงาน */
export function Timeline() {
  return (
    <ol className="border-t border-ink">
      {timeline.map((item, i) => {
        const interior = "isInterior" in item && item.isInterior;
        return (
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
              <p className="mt-2 max-w-xl text-[0.9375rem] leading-[1.75] text-ink2">
                {item.body}
              </p>
              {interior ? (
                <div className="mt-3">
                  <GhostLink href="/services/interior">
                    ดูบริการตกแต่ง
                  </GhostLink>
                </div>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-ink3 sm:w-44 sm:shrink-0 sm:text-right">
              {item.duration}
            </p>
          </Reveal>
        );
      })}
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
       กว้างกว่าคอลัมน์ตัวหนังสือ (1.3fr ต่อ 1fr) ภาพจึงเป็นตัวนำจริง ๆ */
    <Reveal as="article" variant="clip" className="group relative">
      <div className="grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
        <MockImage
          src={article.image}
          alt={article.title}
          zoom
          className="aspect-[4/3] w-full rounded-sm sm:aspect-[16/10]"
          sizes="(min-width: 1024px) 41rem, 100vw"
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
        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-[1.75] text-ink2">
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
    <section className={rhythm.dense}>
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <TechLabel className="mb-5 block">Secondary Service</TechLabel>
          <SectionHeading
            eyebrow="After The Inspection"
            title="ตรวจเจอปัญหาแล้ว "
            accent="ซ่อมที่ไหน?"
            lead="ส่วนใหญ่โครงการจะแก้ให้ตามรายงาน แต่ส่วนที่คุณอยากปรับเพิ่มเอง — ม่าน พื้น บิวท์อิน ต่อเติม — ทีมเดียวกันทำต่อได้เลย ไม่ต้องเริ่มหาช่างใหม่ตั้งแต่ต้น"
          />
          <ul className="mt-7 grid gap-2.5 text-[0.9375rem] text-ink2 sm:grid-cols-2">
            {[
              "ผ้าม่าน มู่ลี่ พรม",
              "วอลเปเปอร์",
              "พื้น SPC",
              "ฟิล์มกรองแสง",
              "กระจกกั้นห้อง",
              "ต่อเติมบ้าน",
            ].map((x) => (
              <li key={x} className="flex gap-2.5">
                <CheckIcon className="mt-1 size-4 shrink-0 text-gold-500" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <GhostLink href="/services/interior">
              ดูบริการตกแต่งครบ 9 บริการ
            </GhostLink>
          </div>
        </div>
        <Reveal variant="clip">
          <MockImage
            src="cross-sell.jpg"
            alt="ห้องนั่งเล่นหลังตกแต่ง ผ้าม่านและพื้นไม้"
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/** Section 8 — CTA ปิดท้าย: ภาพบ้านเต็มความกว้าง คลุมด้วยถ่านเข้มให้ตัวอักษรอ่านออก */
export function ContactCta() {
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
          <TechLabel tone="invert">Ready To Inspect</TechLabel>
          {/* เวลาทำการเป็นภาษาไทย จึงห้ามผ่าน TechLabel ที่ถ่าง letter-spacing 0.18em
              — สระกับวรรณยุกต์จะหลุดจากพยัญชนะ ใช้ข้อความเล็กธรรมดาแทน */}
          <span className="text-[0.8125rem] text-white/55">{contact.hours}</span>
        </div>
        <span aria-hidden className="mt-4 block h-px w-full bg-white/15" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-[1.875rem] leading-[1.3] font-semibold text-white sm:text-[2.75rem]">
              กำลังจะรับบ้าน? ตรวจให้มั่นใจก่อนตัดสินใจ
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.8] text-white/75">
              วันตรวจก่อนโอนคือโอกาสสุดท้ายที่โครงการจะแก้ให้ฟรี
              ทักมาบอกวันโอนกับขนาดห้อง เดี๋ยวเราเช็กคิวให้
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <BookCta tone="onDark" />
            <QuoteCta tone="outlineDark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
