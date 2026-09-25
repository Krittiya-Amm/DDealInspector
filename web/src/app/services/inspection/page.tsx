import { Gallery } from "@/components/gallery";
import { CheckIcon } from "@/components/icons";
import { SectionNav } from "@/components/section-nav";
import {
  ContactCta,
  InspectionProcess,
  InteriorCrossSell,
  PricingTable,
  ReportShowcase,
  Timeline,
  VerifyLicense,
  WhyChooseUs,
  WhyInspect,
} from "@/components/sections";
import {
  BookCta,
  CallButton,
  Container,
  Eyebrow,
  GhostLink,
  MockImage,
  rhythm,
  SectionHeading,
  TechLabel,
} from "@/components/ui";
import {
  equipment,
  inspectionServices,
  pricing,
  startingPrice,
} from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/services/inspection",
  title: "บริการตรวจสอบบ้านและคอนโด",
  description:
    "ตรวจบ้านก่อนโอน ตรวจคอนโดก่อนโอน และตรวจงานต่อเติมระหว่างก่อสร้าง โดยวิศวกรโยธาที่มีใบประกอบวิชาชีพรับรองโดยสภาวิศวกร",
});

/* ใช้แค่เรตต่ำสุดของแต่ละบริการมาทำ "ป้ายบอกราคาเริ่มต้น" ในรายการบริการ
   ตารางเรตเต็มอยู่ที่ #pricing ในหน้าเดียวกันข้างล่าง — เมื่อก่อนหน้านี้พิมพ์
   ตารางราคาซ้ำเป็นการ์ดข้างบริการแต่ละอัน พอย้ายตารางเรตมาอยู่หน้านี้ด้วย
   ข้อมูลชุดเดียวกันจะขึ้นสองที่ในหน้าเดียว ซึ่งนอกจากซ้ำแล้วยังมีโอกาสขัดกันเอง
   เวลาแก้ราคา จึงเหลือ "ตัวเลขเริ่มต้น + ลิงก์ไปตาราง" แทนตารางย่อย */
const lowestByService = new Map(
  pricing.map((p) => [p.service, p.tiers[0].price]),
);

/* สารบัญในหน้า — เหลือ 5 ปลายทางระดับบนสุด ไม่ใช่ 8 ชิปที่รวมชื่อบริการทุกอัน
   ของเดิมเอา inspectionServices ทั้ง 5 มาเป็นชิปแล้วต่อท้ายด้วยอีก 3 หัวข้อ
   ได้สารบัญ 8 บรรทัดที่ยาวกว่าเมนูหลักของเว็บ — ซึ่งไม่ใช่ทางลัดอีกต่อไป
   เพราะต้องอ่านทั้งแถบก่อนถึงจะเลือกได้ (กติกา bottom-nav-limit: ไม่เกิน 5)
   ชื่อบริการทั้งห้ายังกระโดดตรงได้จากฟุตเตอร์และจากสารบัญในหน้า /services

   "รายงาน" ไม่ใช่ "ตัวอย่างรายงาน" — ป้ายยาวขึ้น 8 ตัวอักษรกินความกว้างแถบ ~60px
   ซึ่งดันให้ "ราคา" ที่อยู่ท้ายสุดหลุดออกนอกจอ วัดจริงตอนใช้ป้ายยาว: แถบกว้าง 445px
   ที่จอ 375px (iPhone SE/mini) เหลือ "ราคา" โผล่แค่ 9px ที่ 360px (แอนดรอยด์ทั่วไป)
   หายไปทั้งคำ — ทั้งที่ scrollbar ถูกซ่อนไว้ คนจึงไม่มีทางรู้ว่ายังเลื่อนได้
   กลายเป็นว่าปลายทางที่คนอยากกดที่สุดคือปลายทางเดียวที่มองไม่เห็น
   พอสั้นลงเหลือ 385px ทุกจอตั้งแต่ 320px ขึ้นไปเห็น "ราคา" โผล่เป็นสัญญาณว่าเลื่อนได้
   และหัวข้อจริงของบล็อกนั้นเขียนว่า "ตัวอย่างรายงานที่คุณจะได้รับ" อยู่แล้ว
   สารบัญจึงไม่ต้องแบกคำเต็ม */
const sections = [
  { href: "#services", label: "บริการ" },
  { href: "#scope", label: "จุดที่ตรวจ" },
  { href: "#process", label: "ขั้นตอน" },
  { href: "#report", label: "รายงาน" },
  { href: "#pricing", label: "ราคา" },
];

/* ธุรกิจหลักของที่นี่คือ "ตรวจบ้าน" กับ "ตรวจคอนโด" — อีกสามตัวเป็นบริการ
   เฉพาะกรณีที่คนมาหาเมื่อรู้อยู่แล้วว่าต้องการอะไร ของเดิมวางทั้งห้าตัวด้วย
   โครงเดียวกัน ขนาดเดียวกัน เรียงต่อกันลงมา ซึ่งบอกผู้อ่านว่าทั้งห้าสำคัญเท่ากัน
   คนที่เพิ่งจะซื้อบ้านหลังแรกจึงต้องอ่านครบทั้งห้าก่อนถึงจะรู้ว่าอันไหนคือของตัวเอง

   สองตัวแรกได้พื้นที่ ขนาดตัวอักษร เส้นคาดที่หนากว่า และภาพของตัวเอง
   ส่วนสามตัวหลังยุบเป็นกลุ่มเดียวเรียงสามคอลัมน์แบบไม่มีภาพ

   ภาพสองใบนี้ไปซ้ำกับรูปย่อในแกลเลอรีข้างล่าง (ทั้งเว็บมีภาพ 19 ใบ และชุดที่
   เป็นงานตรวจถูกแกลเลอรีใช้ไปเกือบหมดแล้ว) รับไว้อย่างรู้ตัว เพราะสองบล็อกนี้
   ห่างกันเกิน 6,000px คนละขนาด คนละบริบท และการปล่อยให้บริการหลักไม่มีภาพเลย
   ทำให้ทั้งหน้าอ่านเป็นเอกสารตัวหนังสือล้วน ซึ่งแย่กว่าการซ้ำแบบนี้
   ได้ภาพผลงานจริงจากลูกค้าเมื่อไหร่ ให้เปลี่ยนสองใบนี้ก่อนเป็นอันดับแรก */
const PRIMARY_COUNT = 2;
const primaryServices = inspectionServices.slice(0, PRIMARY_COUNT);
const specialistServices = inspectionServices.slice(PRIMARY_COUNT);

/** ภาพประจำบริการหลัก — ผูกกับ slug ไม่ใช่ index เพื่อให้สลับลำดับใน site.ts
 *  แล้วภาพยังตามไปถูกบริการเดิม ไม่ใช่ตามตำแหน่ง */
const serviceImage: Record<string, { src: string; alt: string }> = {
  condo: {
    src: "article-condo.jpg",
    alt: "ตรวจวงกบและบานประตูกระจกภายในห้องชุด",
  },
  house: {
    src: "hero.jpg",
    alt: "วิศวกรเดินตรวจบ้านพร้อมเอกสารรายการตรวจ",
  },
};

export default function InspectionPage() {
  return (
    <>
      <section className="relative border-b border-line bg-warm">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="lg:w-[53%] lg:pr-8">
            <Eyebrow>Inspection Services</Eyebrow>
            <h1 className="mt-5 text-[2rem] font-semibold sm:text-[2.75rem] lg:text-5xl">
              ตรวจให้เจอ ก่อนที่มันจะกลายเป็นค่าซ่อมของคุณ
            </h1>
            <p className="mt-5 max-w-xl text-ink2 sm:text-lg sm:leading-[1.75]">
              ทุกงานตรวจโดยวิศวกรโยธาที่มีใบประกอบวิชาชีพวิศวกรรมควบคุม
              พร้อมอุปกรณ์ตรวจครบชุด เริ่มต้น ฿{startingPrice}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCta />
              <CallButton />
            </div>
          </div>
        </Container>
        <div className="relative h-64 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[43%]">
          <MockImage
            src="inspection-hero.jpg"
            alt="ทีมวิศวกรตรวจงานระบบภายในบ้าน"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full"
            priority
          />
        </div>
      </section>

      {/* สารบัญในหน้า — หน้านี้ยาว 13,700px เพราะรวบทุกคำถามเรื่องงานตรวจไว้ที่เดียว
          ซึ่งถูกสำหรับเว็บ information (คนค้นคำว่า "ตรวจบ้านก่อนโอน" ควรเจอหน้าเดียว
          ที่ตอบครบ ไม่ใช่ 6 หน้าที่ตอบอย่างละนิด) แต่ยาวแล้วต้องกระโดดได้
          ไม่งั้นก็กลายเป็น landing page ที่ย้ายที่อยู่เฉย ๆ

          ของเดิมเป็นชิป 8 อันที่เลื่อนหายไปกับหน้า ช่วยได้แค่ 2 วินาทีแรก
          ตอนนี้เป็นแถบหนึบใต้เมนูบน ใช้ได้ตลอดทั้งหน้า — เหตุผลเต็มอยู่ที่
          คอมเมนต์ใน components/section-nav.tsx หน้า /services/interior ใช้ตัวเดียวกัน */}
      <SectionNav label="หัวข้อในหน้านี้" items={sections} />

      {/* รายการบริการคือเหตุผลที่คนเปิดหน้านี้ จึงมาก่อน "ทำไมต้องตรวจ"
          ต่างจากหน้าแรกที่ต้องโน้มน้าวก่อน — คนที่มาถึง /services/inspection
          ตัดสินใจแล้วว่าสนใจตรวจบ้าน เหลือแค่หาว่าเคสตัวเองตรงกับอันไหน */}
      <section id="services" className={`scroll-mt-32 ${rhythm.base}`}>
        <Container>
          <div className="space-y-20 sm:space-y-28">
            {primaryServices.map((service, index) => {
              const from = lowestByService.get(service.name);
              const image = serviceImage[service.slug];
              /* สลับฝั่งภาพทีละบริการ — ตาจึงไล่แบบสลับฟันปลาแทนที่จะไหลลงตรง ๆ
                 เป็นจังหวะเดียวกับบล็อก "เลือกฝั่ง" ในหน้า /services
                 และทำให้สองบริการหลักไม่อ่านเป็นเทมเพลตเดียวกันสองรอบ */
              const imageFirst = index % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  /* border-t-2 border-ink ไม่ใช่เส้นบางสีครีม — เส้นหนาสีกรมท่า
                     คือสัญญาณว่า "นี่คือหัวข้อระดับบนสุด" เส้นบางถูกสงวนไว้ให้
                     บริการเฉพาะกรณีข้างล่าง ตาจึงแยกสองระดับออกก่อนเริ่มอ่าน */
                  className="scroll-mt-32 border-t-2 border-ink pt-8"
                >
                  {/* items-start: คำอธิบายกับภาพยาวไม่เท่ากันทุกบริการ
                      ถ้าปล่อย stretch ตามค่าเริ่มต้นของ grid คอลัมน์ที่สั้นกว่า
                      จะถูกยืดจนช่องว่างไปกองอยู่กลางคอลัมน์ (บั๊กชุดเดียวกับที่
                      บันทึกไว้ใน README หัวข้อ "กติกาการวางคอลัมน์")

                      1.15fr / 0.85fr ไม่ใช่ครึ่งต่อครึ่ง — ฝั่งตัวหนังสือมีทั้ง
                      คำอธิบาย ราคาเริ่มต้น และรายการจุดที่ตรวจ ส่วนฝั่งขวามีภาพใบเดียว
                      ให้พื้นที่เท่ากันเมื่อไหร่ บรรทัดฝั่งซ้ายจะสั้นจนอ่านเป็นคอลัมน์แคบ */}
                  <div className="grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-x-20">
                    <div className={imageFirst ? "lg:order-2" : ""}>
                      <Eyebrow>
                        Service {String(index + 1).padStart(2, "0")}
                      </Eyebrow>
                      {/* ขนาดเดียวกับ h1 ของหน้า — บริการหลักสองตัวนี้คือเหตุผล
                          ที่เว็บนี้มีอยู่ หัวข้อจึงไม่ควรเล็กกว่าหัวข้อของบล็อกรองใด ๆ */}
                      <h2 className="mt-4 text-[1.75rem] leading-[1.25] font-semibold sm:text-[2.25rem] lg:text-[2.5rem]">
                        {service.name}
                      </h2>
                      <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink2">
                        {service.detail}
                      </p>

                      {/* ราคาเริ่มต้นเป็นบรรทัดเดียว ไม่ใช่ตารางย่อย — ตารางเรตเต็ม
                          อยู่ข้างล่างในหน้าเดียวกัน ลิงก์จึงเป็น anchor ไม่ใช่ข้ามหน้า
                          ฿ ใช้ฟอนต์เนื้อความตามกติกาเดียวกับตารางเรต เพราะ Cormorant
                          ที่โหลดมาเฉพาะ subset latin ไม่มี U+0E3F

                          ลิงก์ใช้ GhostLink ไม่ใช่ <a> ขีดเส้นใต้ธรรมดา เพราะอันนี้เป็น
                          "ปุ่มไปต่อ" ที่ยืนอยู่ในแถว ไม่ใช่คำในประโยค — แบบแรกวัดได้
                          75×24px บนจอ 375 ซึ่งต่ำกว่าพื้นที่กดขั้นต่ำ 44px
                          GhostLink มี min-h-[44px] อยู่แล้ว และ items-baseline ของแถว
                          ยังจับเส้นฐานตัวอักษรให้ตรงกับ "เริ่มต้น" เหมือนเดิม
                          ความสูงที่เพิ่มมากระจายขึ้น-ลงรอบเส้นฐาน ไม่ดันบรรทัดเบี้ยว */}
                      {from ? (
                        <p className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5 text-sm text-ink3">
                          <span>เริ่มต้น</span>
                          <span className="tnum font-display text-[2rem] leading-none font-semibold text-gold-700">
                            <span className="font-head mr-[0.06em] align-baseline text-[0.58em] font-normal">
                              ฿
                            </span>
                            {from}
                          </span>
                          <GhostLink href="#pricing">
                            ดูเรตทุกขนาด
                            {/* ลิงก์นี้ซ้ำคำกันทุกบริการแต่ผู้อ่านด้วยเสียงต้องแยกออก
                                ว่ากำลังฟังของบริการไหน จึงต่อชื่อไว้เฉพาะ screen reader */}
                            <span className="sr-only"> ของ{service.name}</span>
                          </GhostLink>
                        </p>
                      ) : null}

                      {/* จุดที่ตรวจกลับมาอยู่คอลัมน์เดียวกับคำอธิบาย ไม่ใช่คอลัมน์ขวา
                          เพราะคอลัมน์ขวาเป็นของภาพแล้ว — และตามลำดับการอ่านจริง
                          รายการนี้คือ "รายละเอียดของย่อหน้าข้างบน" ไม่ใช่ของคู่ขนาน
                          วางต่อกันลงมาจึงอ่านถูกลำดับทั้งบนมือถือและจอกว้าง
                          (ของเดิมสองคอลัมน์ทำให้บนมือถือต้องอ่านราคาคั่นกลางก่อนถึงรายการ) */}
                      <div className="mt-8 border-t border-line pt-5">
                        <h3 className="text-sm font-semibold">จุดที่ตรวจ</h3>
                        <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink2 sm:text-base">
                          {service.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5">
                              <CheckIcon className="mt-1 size-4 shrink-0 text-gold-500" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* ภาพยืนเป็นคอลัมน์ของตัวเอง ไม่มีกรอบไม่มีเงา — ขอบของภาพ
                        คือขอบของบล็อกอยู่แล้ว เพิ่มกรอบเมื่อไหร่ก็กลายเป็นการ์ด
                        4/5 บนจอกว้างเพราะต้องยืนคู่กับคอลัมน์ตัวหนังสือที่สูงราว 500px
                        ส่วนบนมือถือใช้ 4/3 ภาพแนวตั้งเต็มจอกินพื้นที่เลื่อนเกินจำเป็น */}
                    {image ? (
                      <MockImage
                        src={image.src}
                        alt={image.alt}
                        zoom
                        className={`aspect-[4/3] w-full rounded-sm lg:aspect-[4/5] ${
                          imageFirst ? "lg:order-1" : ""
                        }`}
                        sizes="(min-width: 1024px) 38vw, 100vw"
                      />
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          {/* สามตัวนี้อ่านเป็น "กลุ่มเดียว" ไม่ใช่สามบล็อกที่ต่อจากบริการหลัก
              หัวกลุ่มจึงเป็นบรรทัดเดียวคาดเส้น ไม่ใช่ SectionHeading เต็มทรง
              — ถ้าใส่หัวข้อใหญ่ตรงนี้มันจะกลายเป็นอีก section หนึ่งในสายตา
              แล้วลำดับที่เพิ่งสร้างไว้ข้างบนก็หายไป */}
          <div className="mt-20 sm:mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-line pb-5">
              <h2 className="text-xl font-semibold sm:text-2xl">
                บริการเฉพาะกรณี
              </h2>
              <TechLabel>
                {String(specialistServices.length).padStart(2, "0")} Services
              </TechLabel>
            </div>

            {/* items-start — เนื้อหาสามตัวนี้ยาวไม่เท่ากัน ถ้าปล่อย stretch
                ตัวที่สั้นกว่าจะถูกยืดจนเส้นคาดบนดูลอยไม่ตรงกับอะไร */}
            <div className="mt-10 grid items-start gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {specialistServices.map((service, i) => {
                const from = lowestByService.get(service.name);
                return (
                  <article
                    key={service.slug}
                    id={service.slug}
                    className="scroll-mt-32 border-t border-line pt-5"
                  >
                    <TechLabel className="block">
                      {String(PRIMARY_COUNT + i + 1).padStart(2, "0")}
                    </TechLabel>
                    <h3 className="mt-3 text-lg font-semibold sm:text-xl">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.75] text-ink2">
                      {service.detail}
                    </p>
                    <ul className="mt-5 grid gap-2 text-[0.9375rem] text-ink2">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <CheckIcon className="mt-[0.3rem] size-3.5 shrink-0 text-gold-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {from ? (
                      <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink3">
                        <span>เริ่มต้น</span>
                        <span className="tnum font-display text-[1.25rem] leading-none font-semibold text-gold-700">
                          <span className="font-head mr-[0.06em] align-baseline text-[0.58em] font-normal">
                            ฿
                          </span>
                          {from}
                        </span>
                        <GhostLink href="#pricing">
                          ดูเรต
                          <span className="sr-only"> ของ{service.name}</span>
                        </GhostLink>
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <WhyInspect />
      <InspectionProcess />

      {/* เครื่องมือต่อจากบล็อกจุดที่ตรวจ เพราะเป็นคำตอบของคำถามที่เพิ่งเกิดขึ้น
          ("แล้วรู้ได้ยังไงว่าผนังชื้น") ไม่ใช่รายการอุปกรณ์ที่วางไว้ลอย ๆ

          ของเดิมเป็นสองคอลัมน์ที่แต่ละชิ้นมีเส้นคาดบนของตัวเอง = 6 เส้นสั้น ๆ
          เรียงเป็นตาราง ซึ่งอ่านเป็นการ์ดจาง ๆ หกใบ ตอนนี้เป็นรายการสเปกเรียงลงมา
          มีเลขลำดับกับชื่ออังกฤษเป็นหัวแถว แบบหน้าสเปกอุปกรณ์ในแคตตาล็อกงานช่าง
          เส้นเดียวลากยาวตลอดคอลัมน์แทนหกเส้นสั้น ตาจึงไล่ลงเป็นรายการเดียว */}
      <section className={`border-y border-line bg-warm ${rhythm.dense}`}>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-36">
            <SectionHeading
              eyebrow="Inspection Toolkit"
              title="ตาเปล่ามองไม่เห็นทุกอย่าง"
              lead="ความชื้นในผนัง ท่อที่ตันอยู่ข้างใน หรือสายดินที่ไม่ได้ต่อจริง ต้องใช้เครื่องมือถึงจะยืนยันได้"
            />
            {/* TODO: CLIENT-DATA — ยังไม่มีภาพถ่ายอุปกรณ์จริงของทีม
                บล็อกนี้ออกแบบเผื่อภาพไว้แล้ว (คอลัมน์ซ้ายว่างพอสำหรับภาพ 4:3
                ใต้หัวข้อ) ได้ไฟล์มาเมื่อไหร่วาง <MockImage> ตรงนี้ได้เลย
                ไม่หยิบภาพ stock ใบอื่นมาใส่ เพราะทั้งคลังไม่มีภาพที่เป็นอุปกรณ์ */}
            <p className="mt-8 border-t border-line pt-5 text-sm text-ink3">
              อุปกรณ์ทุกชิ้นเป็นของทีม ไม่ได้เช่ามาเฉพาะงาน
              และเข้าตรวจพร้อมกันทุกครั้ง
            </p>
          </div>
          <dl className="border-t border-ink">
            {equipment.map((e, i) => (
              <div
                key={e.name}
                /* คอลัมน์ซ้ายคงที่ 11rem: เลขลำดับ + ชื่ออุปกรณ์ภาษาอังกฤษ
                   ป้ายอังกฤษถ่าง letter-spacing ได้ ชื่อไทยถ่างไม่ได้ (สระกับ
                   วรรณยุกต์จะหลุดจากพยัญชนะ) จึงแยกคนละคอลัมน์ ไม่ใช่บรรทัดเดียวกัน
                   ชื่อไทยกับหน้าที่ซ้อนกันในคอลัมน์ขวา = ทรงหน้าสเปกอุปกรณ์
                   บนจอแคบกริดยุบเป็นคอลัมน์เดียว อ่านไล่ลง ป้าย → ชื่อ → หน้าที่ */
                className="grid gap-x-8 gap-y-2 border-b border-line py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:py-6"
              >
                <TechLabel className="block pt-1">
                  {String(i + 1).padStart(2, "0")} · {e.en}
                </TechLabel>
                <dt className="font-semibold">{e.name}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink2 sm:col-start-2">
                  {e.use}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ไทม์ไลน์นี้ไม่ใช่ของซ้ำกับบล็อกจุดที่ตรวจข้างบน — อันนั้นตอบว่า
          "ตรวจตรงไหนบ้าง" (5 หมวดงาน) ส่วนอันนี้ตอบว่า "นัดแล้วเกิดอะไรขึ้น"
          (นัด → ตรวจ → ส่งรายงาน → ตรวจซ้ำ) มีคอลัมน์ระยะเวลาเป็นตัวหลัก
          เมื่อก่อนสองบล็อกนี้ชื่อ "ขั้นตอน" เหมือนกันเลยต้องวางห่างกันสุดหน้า
          กันคนอ่านสับสน พอแยกคำถามให้ชัด (scope / process) ก็วางต่อกันได้
          และควรวางต่อกันด้วย เพราะสารบัญด้านบนเรียงสองอันนี้ติดกัน

          วางก่อนตัวอย่างรายงาน เพราะขั้น 03 ของไทม์ไลน์คือ "รับรายงาน" พอดี
          บล็อกถัดไปจึงเป็นการกางของชิ้นนั้นให้ดู ไม่ใช่หัวข้อใหม่ที่โผล่มาเฉย ๆ
          (แผง "รวมอยู่ในทุกราคาแล้ว" ในตารางเรตอ้างระยะเวลาจากไทม์ไลน์ชุดนี้) */}
      <section id="process" className={`scroll-mt-32 ${rhythm.dense}`}>
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="นัดแล้ว "
            accent="เกิดอะไรขึ้นบ้าง"
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </section>

      <ReportShowcase />

      {/* แกลเลอรีย้ายมาจากหน้าแรก ไม่ได้ไปหน้า Interior ตามที่วางไว้ตอนแรก
          เพราะข้อมูลจริงในนั้นเป็นงานตรวจล้วน — หมวดคือ บ้าน / คอนโด / Defect /
          Report และคำบรรยายทุกภาพขึ้นต้นด้วย "ตรวจ..." ย้ายไปหน้าตกแต่งแล้ว
          หัวข้อ "ตัวอย่างสิ่งที่เราเข้าไปตรวจ" จะไม่ตรงกับหน้าที่มันอยู่
          (หน้า Interior นำด้วยภาพผลงานอยู่แล้ว — มีภาพประกอบครบทั้ง 9 บริการ) */}
      <Gallery />

      <PricingTable />
      <WhyChooseUs />

      <VerifyLicense />

      <InteriorCrossSell />
      <ContactCta />
    </>
  );
}
