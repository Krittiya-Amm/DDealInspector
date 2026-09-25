import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { CheckIcon } from "@/components/icons";
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
  SectionHeading,
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

/* ชื่อบริการในสารบัญดึงมาจาก inspectionServices ตรง ๆ ไม่พิมพ์ซ้ำ
   ถ้าเพิ่ม/แก้บริการใน site.ts สารบัญเปลี่ยนตามเอง ไม่หลุดจากเนื้อหาข้างล่าง
   ส่วนอีกสามหัวข้อเป็นบล็อกที่ไม่ได้มาจาก array จึงเขียนไว้ตรงนี้ */
const pageIndex = [
  ...inspectionServices.map((s) => ({ href: `#${s.slug}`, label: s.name })),
  { href: "#pricing", label: "ราคา" },
  { href: "#process", label: "ขั้นตอนการตรวจ" },
  { href: "#gallery", label: "ตัวอย่างงาน" },
];

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

          ใช้โครงเดียวกับแถบชิปของหน้า /services/interior ทุกอย่าง — สองหน้านี้
          เป็นหน้าพี่น้องกัน ถ้าใช้คนละท่าคนจะอ่านว่าเป็นเว็บคนละที่
          ลำดับเรียงตามคำถามที่คนถามจริงก่อน-หลัง: เคสฉันคืออันไหน → ราคา → ขั้นตอน */}
      <section className="border-b border-line bg-warm py-8">
        <Container>
          <h2 className="sr-only">ไปยังหัวข้อในหน้านี้</h2>
          <ul className="flex flex-wrap gap-2">
            {pageIndex.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex min-h-[44px] items-center rounded-sm border border-line px-4 text-sm transition-colors duration-200 hover:border-ink hover:text-gold-700"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* รายการบริการคือเหตุผลที่คนเปิดหน้านี้ จึงมาก่อน "ทำไมต้องตรวจ"
          ต่างจากหน้าแรกที่ต้องโน้มน้าวก่อน — คนที่มาถึง /services/inspection
          ตัดสินใจแล้วว่าสนใจตรวจบ้าน เหลือแค่หาว่าเคสตัวเองตรงกับอันไหน */}
      <section className="py-24 sm:py-32">
        <Container className="space-y-14">
          {inspectionServices.map((service, index) => {
            const from = lowestByService.get(service.name);
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 border-t border-line pt-10 first:border-0 first:pt-0"
              >
                {/* items-start: คำอธิบายกับรายการจุดตรวจยาวไม่เท่ากันทุกบริการ
                    ถ้าปล่อย stretch ตามค่าเริ่มต้นของ grid คอลัมน์ที่สั้นกว่า
                    จะถูกยืดจนช่องว่างไปกองอยู่กลางคอลัมน์ (บั๊กชุดเดียวกับที่
                    บันทึกไว้ใน README หัวข้อ "กติกาการวางคอลัมน์") */}
                <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                  <div>
                    <Eyebrow>Service {String(index + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-ink2">{service.detail}</p>

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
                      <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5 text-sm text-ink3">
                        <span>เริ่มต้น</span>
                        <span className="tnum font-display text-[1.625rem] leading-none font-semibold text-gold-700">
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
                  </div>

                  {/* จุดที่ตรวจย้ายมาคอลัมน์ขวา แทนที่การ์ดราคาที่ถูกถอดออก
                      รายการนี้คือ "ขอบเขตงาน" ซึ่งเป็นข้อมูลที่คนเทียบข้ามบริการจริง ๆ
                      ให้มันมีคอลัมน์ของตัวเองจึงกวาดตาเทียบได้ ไม่ต้องอ่านผ่านย่อหน้า */}
                  <div className="border-t border-line pt-5 lg:border-0 lg:pt-0">
                    <h3 className="text-sm font-semibold">จุดที่ตรวจ</h3>
                    <ul className="mt-4 grid gap-2.5 text-ink2">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <CheckIcon className="mt-1 size-4 shrink-0 text-gold-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <WhyInspect />
      <InspectionProcess />

      {/* เครื่องมือต่อจากขั้นตอนการตรวจ เพราะเป็นคำตอบของคำถามที่เพิ่งเกิดขึ้น
          ("แล้วรู้ได้ยังไงว่าผนังชื้น") ไม่ใช่รายการอุปกรณ์ที่วางไว้ลอย ๆ
          border-t อย่างเดียวไม่ใช่ border-y — บล็อกถัดไป (ตัวอย่างรายงาน) มี
          เส้นบนของตัวเองอยู่แล้ว ถ้าใส่ทั้งสองเส้นจะได้เส้นคู่ห่างกัน 0px */}
      <section className="border-t border-line bg-warm py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          <SectionHeading
            eyebrow="Equipment"
            title="ตาเปล่ามองไม่เห็นทุกอย่าง"
            lead="ความชื้นในผนัง ท่อที่ตันอยู่ข้างใน หรือสายดินที่ไม่ได้ต่อจริง ต้องใช้เครื่องมือถึงจะยืนยันได้"
          />
          <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {equipment.map((e) => (
              <div key={e.name} className="border-t border-line pt-4">
                <dt className="font-semibold">{e.name}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink2">{e.use}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ReportShowcase />

      {/* แกลเลอรีย้ายมาจากหน้าแรก ไม่ได้ไปหน้า Interior ตามที่วางไว้ตอนแรก
          เพราะข้อมูลจริงในนั้นเป็นงานตรวจล้วน — หมวดคือ บ้าน / คอนโด / Defect /
          Report และคำบรรยายทุกภาพขึ้นต้นด้วย "ตรวจ..." ย้ายไปหน้าตกแต่งแล้ว
          หัวข้อ "ตัวอย่างสิ่งที่เราเข้าไปตรวจ" จะไม่ตรงกับหน้าที่มันอยู่
          (หน้า Interior นำด้วยภาพผลงานอยู่แล้ว — มีภาพประกอบครบทั้ง 9 บริการ) */}
      <Gallery />

      {/* ไทม์ไลน์นี้ไม่ใช่ของซ้ำกับ InspectionProcess ข้างบน — อันนั้นคือ 5 ขั้น
          ของ "การตรวจหน้างาน" ส่วนอันนี้คือ 4 ขั้นของ "หลังจากลูกค้านัด"
          (นัด → ตรวจ → ส่งรายงาน → ตรวจซ้ำ) มีคอลัมน์ระยะเวลาเป็นตัวหลัก
          แต่วางติดกันเมื่อไหร่คนก็อ่านเป็นของซ้ำอยู่ดี จึงคั่นด้วยเครื่องมือ
          ตัวอย่างรายงาน และแกลเลอรีไว้ แล้ววางตรงนี้เพราะเป็นสะพานเข้าเรื่องราคา
          (แผง "รวมอยู่ในทุกราคาแล้ว" ในตารางเรตอ้างระยะเวลาจากไทม์ไลน์ชุดนี้)

          ไม่ต้องมีเส้นบน เพราะแกลเลอรีข้างบนเป็นพื้น warm ที่มี border-b ของตัวเอง */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The Process"
            title="นัดแล้ว "
            accent="เกิดอะไรขึ้นบ้าง"
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </section>

      <PricingTable />
      <WhyChooseUs />

      <section className="py-24 sm:py-32">
        <Container>
          <VerifyLicense />
        </Container>
      </section>

      <InteriorCrossSell />
      <ContactCta />
    </>
  );
}
