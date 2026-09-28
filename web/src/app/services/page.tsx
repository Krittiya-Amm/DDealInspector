import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ContactCta } from "@/components/sections";
import {
  Container,
  Eyebrow,
  GhostLink,
  MockImage,
  rhythm,
  TechLabel,
} from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { inspectionServices, interiorServices, startingPrice } from "@/lib/site";

export const metadata = pageMeta({
  path: "/services",
  title: "บริการทั้งหมด",
  description:
    "บริการตรวจสอบบ้านและคอนโดก่อนโอนโดยวิศวกรโยธา และบริการตกแต่งครบวงจร 9 บริการ",
});

/* หน้านี้มีหน้าที่เดียว: ตอบคำถาม "ฉันต้องการบริการฝั่งไหน"
   ไม่ใช่หน้าอธิบายบริการทั้ง 14 อัน (สองหน้าลูกทำหน้าที่นั้นอยู่แล้ว)
   ของเดิมวางสองคอลัมน์ที่แต่ละคอลัมน์มีภาพ + หัวข้อ + รายชื่อบริการครบ + ปุ่ม
   ซึ่งอ่านเป็น "การ์ดสองใบ" และยัดสารบัญ 14 บรรทัดไว้ในจุดที่คนยังไม่ได้เลือกฝั่ง

   โครงใหม่แยกงานออกเป็นสามจังหวะ: ประกาศตัว → เลือกฝั่ง → ค่อยเจาะรายการ
   บล็อกเลือกฝั่งจึงไม่มีรายชื่อบริการเลย (สารบัญอยู่ข้างล่างสุดแล้ว) เหลือแค่
   สิ่งที่ใช้ตัดสินใจจริง — ขอบเขตงาน จำนวนบริการ และค่าบริการเริ่มต้น */
const worlds = [
  {
    href: "/services/inspection",
    index: "01",
    label: "Inspection",
    title: "บริการตรวจสอบ",
    lead: "ตรวจโดยวิศวกรโยธาที่มีใบประกอบวิชาชีพวิศวกรรมควบคุม พร้อมอุปกรณ์ตรวจครบชุด ส่งรายงานที่ระบุตำแหน่งพร้อมภาพประกอบ ใช้ยื่นกับโครงการได้ทันที",
    meta: [
      { term: "ครอบคลุม", value: `${inspectionServices.length} บริการ` },
      { term: "ค่าบริการ", value: `เริ่มต้น ฿${startingPrice}` },
    ],
    cta: "ดูบริการตรวจสอบ",
    image: "inspection-hero.jpg",
    alt: "วิศวกรตรวจงานก่อสร้างหน้างานพร้อมแบบก่อสร้าง",
  },
  {
    href: "/services/interior",
    index: "02",
    label: "Interior",
    title: "บริการตกแต่ง",
    lead: "ตั้งแต่ผ้าม่านและพื้น SPC ไปจนถึงงานบิวท์อินและต่อเติม ทีมเดียวกับที่ตรวจบ้านให้คุณเป็นคนดูหน้างาน จึงรู้ว่าผนังไหนรับน้ำหนักได้และจุดไหนเคยมีปัญหา",
    meta: [
      { term: "ครอบคลุม", value: `${interiorServices.length} บริการ` },
      { term: "ค่าบริการ", value: "ประเมินจากหน้างาน" },
    ],
    cta: "ดูบริการตกแต่ง",
    image: "interior-hero.jpg",
    alt: "ห้องนั่งเล่นที่ตกแต่งเสร็จแล้ว",
  },
];

const directory = [
  {
    href: "/services/inspection",
    label: "Inspection",
    heading: "บริการตรวจสอบ",
    items: inspectionServices,
  },
  {
    href: "/services/interior",
    label: "Interior",
    heading: "บริการตกแต่ง",
    items: interiorServices,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* หัวหน้าเพจใช้ทรงเดียวกับสองหน้าลูก (ตัวหนังสือซ้าย ~53% + ภาพเกาะขวา ~47%)
          ตามคำขอให้หัวทั้งสามหน้า (บริการทั้งหมด / บทความ / ติดต่อ) เป็นทรงเดียว
          กับหน้า /services/interior — เดิมหน้านี้ตั้งใจทำต่าง (ตัวหนังสือเต็มความกว้าง
          + แถบภาพเต็มจอคั่น) แต่ตอนนี้รวมท่าเดียวกันทั้งเว็บเพื่อความสม่ำเสมอ
          ภาพ cross-sell.jpg ที่เคยเป็นแถบเต็มจอด้านล่างย้ายมาเป็นภาพเกาะขวาแทน
          (ห้องที่ตรวจแล้วกำลังจะเริ่มแต่ง — ตรงกับหน้าที่พูดถึงทั้งสองฝั่ง) */}
      <section className="relative border-b border-line bg-warm">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="lg:w-[53%] lg:pr-8">
            <Eyebrow>Our Services</Eyebrow>
            <h1 className="mt-6 text-[2rem] font-semibold text-balance sm:text-[2.75rem] lg:text-5xl">
              ตรวจให้ชัดก่อน แล้วค่อยแต่งให้สวย
            </h1>
            <p className="mt-6 max-w-xl text-ink2 sm:text-lg sm:leading-[1.75]">
              เราแบ่งบริการเป็นสองฝั่งที่ต่อกัน —
              ฝั่งตรวจสอบช่วยให้คุณมั่นใจก่อนรับบ้าน
              และฝั่งตกแต่งช่วยให้บ้านพร้อมอยู่จริง
            </p>
            <TechLabel className="mt-8 block">
              02 Groups · {inspectionServices.length + interiorServices.length}{" "}
              Services
            </TechLabel>
          </div>
        </Container>
        <div className="relative h-64 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[47%]">
          <MockImage
            src="cross-sell.jpg"
            alt="ห้องที่ผ่านการตรวจแล้วและกำลังจะเริ่มงานตกแต่ง"
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="h-full w-full"
            priority
          />
        </div>
      </section>

      {/* สองฝั่งได้น้ำหนักเท่ากัน — ขนาดภาพ ขนาดหัวข้อ และจำนวนบรรทัดเท่ากันหมด
          ต่างกันแค่ฝั่งที่ภาพอยู่ ซึ่งทำให้ตาไล่แบบสลับฟันปลาแทนที่จะไหลลงตรง ๆ
          ทั้งบล็อกเป็นลิงก์เดียว (GhostLink stretch) พื้นที่กดจึงเท่ากับบล็อก
          ไม่ใช่แค่ตัวหนังสือท้ายบล็อก และไม่ต้องมีปุ่มทึบสองปุ่มมาแย่งกันเป็นปุ่มหลัก */}
      <section className={rhythm.open}>
        <Container className="space-y-20 sm:space-y-28 lg:space-y-32">
          {worlds.map((w, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <article
                key={w.href}
                className="group relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              >
                <div className={imageFirst ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden
                      className="tnum font-display text-[3.25rem] leading-[0.8] font-semibold text-gold-500 sm:text-[4.25rem]"
                    >
                      {w.index}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-line" />
                    <TechLabel>{w.label}</TechLabel>
                  </div>
                  <h2 className="mt-7 text-[2rem] leading-[1.2] font-semibold sm:text-[2.5rem] lg:text-[2.75rem]">
                    {w.title}
                  </h2>
                  <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink2">
                    {w.lead}
                  </p>
                  {/* สองตัวเลขนี้คือสิ่งที่คนใช้ตัดสินใจจริงว่าจะกดเข้าฝั่งไหน
                      วางเป็นคู่บนเส้นคาด ไม่ใช่ในย่อหน้า จึงกวาดตาเทียบสองฝั่งได้ */}
                  <dl className="mt-8 grid grid-cols-2 gap-x-8 border-t border-line pt-5">
                    {w.meta.map((m) => (
                      <div key={m.term}>
                        <dt className="text-[0.8125rem] text-ink3">{m.term}</dt>
                        <dd className="tnum mt-1 font-semibold">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7">
                    <GhostLink href={w.href} stretch>
                      {w.cta}
                    </GhostLink>
                  </div>
                </div>

                <MockImage
                  src={w.image}
                  alt={w.alt}
                  zoom
                  className={`aspect-[4/3] w-full rounded-sm sm:aspect-[3/2] ${
                    imageFirst ? "lg:order-1" : ""
                  }`}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </article>
            );
          })}
        </Container>
      </section>

      {/* สารบัญ ไม่ใช่ภาพหลัก — ตัวอักษรเล็กลง แถวแน่นขึ้น พื้นเปลี่ยนเป็นครีม
          คนที่รู้อยู่แล้วว่าต้องการอะไรกระโดดมาที่นี่ได้ทันทีจากเมนูบน
          ส่วนคนที่ยังไม่รู้จะถูกบล็อกเลือกฝั่งข้างบนพาไปก่อนถึงจะมาเจอ
          min-h 48px ต่อแถว เพราะเป็นลิงก์ที่ต้องแตะได้จริงบนมือถือ */}
      <section className={`border-t border-line bg-warm ${rhythm.dense}`}>
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-line pb-5">
            <h2 className="text-xl font-semibold sm:text-2xl">บริการทั้งหมด</h2>
            <TechLabel>Service Directory</TechLabel>
          </div>
          <div className="mt-10 grid items-start gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-x-20">
            {directory.map((g) => (
              <div key={g.href}>
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-semibold">{g.heading}</h3>
                  <TechLabel>
                    {String(g.items.length).padStart(2, "0")} {g.label}
                  </TechLabel>
                </div>
                <ul className="mt-4 border-t border-line">
                  {g.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`${g.href}#${item.slug}`}
                        className="group flex min-h-[48px] items-center justify-between gap-4 border-b border-line text-[0.9375rem] transition-colors duration-200 hover:text-gold-700"
                      >
                        {item.name}
                        <ArrowIcon className="size-4 shrink-0 text-ink3 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
