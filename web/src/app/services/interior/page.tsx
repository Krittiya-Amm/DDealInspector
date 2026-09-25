import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ContactCta } from "@/components/sections";
import {
  BookCta,
  CallButton,
  Container,
  Eyebrow,
  MockImage,
  QuoteCta,
  rhythm,
  SectionHeading,
} from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { interiorServices } from "@/lib/site";

export const metadata = pageMeta({
  path: "/services/interior",
  title: "บริการตกแต่งครบวงจร",
  description:
    "ผ้าม่าน วอลเปเปอร์ พื้น SPC ฟิล์มกรองแสง ตาข่ายกันนก ต่อเติมบ้าน กระจกกั้นห้อง ราวตากผ้า และงานออกแบบบิวท์อิน ครบในทีมเดียว",
});

const [lead, ...rest] = interiorServices;

export default function InteriorPage() {
  return (
    <>
      <section className="relative border-b border-line bg-warm">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="lg:w-[53%] lg:pr-8">
            <Eyebrow>Interior Services</Eyebrow>
            <h1 className="mt-5 text-[2rem] font-semibold sm:text-[2.75rem] lg:text-5xl">
              บ้านผ่านการตรวจแล้ว ทีนี้ทำให้มันน่าอยู่
            </h1>
            <p className="mt-5 max-w-xl text-ink2 sm:text-lg sm:leading-[1.75]">
              9 บริการตกแต่ง ตั้งแต่ผ้าม่านไปจนถึงงานต่อเติม
              ทีมเดียวกับที่ตรวจบ้านให้คุณเป็นคนดูหน้างาน
              จึงรู้ว่าผนังไหนรับน้ำหนักได้และจุดไหนเคยมีปัญหา
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCta />
              <QuoteCta />
            </div>
          </div>
        </Container>
        <div className="relative h-64 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[43%]">
          <MockImage
            src="interior-hero.jpg"
            alt="ห้องที่ตกแต่งเสร็จแล้ว"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full"
            priority
          />
        </div>
      </section>

      <section className="border-b border-line bg-warm py-8">
        <Container>
          <h2 className="sr-only">รายการบริการตกแต่ง</h2>
          <ul className="flex flex-wrap gap-2">
            {interiorServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`#${s.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-sm border border-line px-4 text-sm transition-colors duration-200 hover:border-ink hover:text-gold-700"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* เดิมเป็นแถว image/text สลับซ้ายขวา 9 แถวติดกัน โครงเดียวกันเป๊ะทุกแถว
          ยาวรวม 5,716px บนมือถือ — อ่านแล้วเป็น "เทมเพลตที่วนลูป" ไม่ใช่หน้าแนะนำงาน
          และภาพกว้าง 50% เท่าตัวหนังสือพอดี ทั้งที่งานตกแต่งขายด้วยภาพเป็นหลัก

          เปลี่ยนเป็นโครงแบบนิตยสาร: ชิ้นแรกเป็นสเปรดเต็มความกว้าง ที่เหลือเป็น
          กริดสองคอลัมน์ที่ภาพเป็นตัวนำ — ภาพสูงกว่าบล็อกตัวหนังสือราวสามเท่า
          ลำดับความสำคัญยึดตามลำดับในข้อมูลของลูกค้า ไม่ได้จัดอันดับเอง
          (กฎเดียวกับหน้าตรวจบ้านและหน้าบทความ ชิ้นแรกของชุดคือชิ้นนำ) */}
      <section className={rhythm.base}>
        <Container>
          <article id={lead.slug} className="scroll-mt-24">
            <MockImage
              src={`${lead.slug}.jpg`}
              alt={`ตัวอย่างงาน${lead.name}`}
              zoom
              className="aspect-[4/3] w-full rounded-sm sm:aspect-[16/9]"
              sizes="(min-width: 1280px) 74rem, 100vw"
            />
            {/* ตัวหนังสือแยกสองคอลัมน์ใต้ภาพ ไม่ใช่กองเดียวยาว — ชื่อบริการกับ
                คำโปรยเป็นสิ่งที่ตาอ่านคู่กับภาพ ส่วนรายละเอียดเป็นชั้นถัดไป
                วางคนละคอลัมน์จึงแยกสองจังหวะนั้นออกจากกันโดยไม่ต้องเพิ่มเส้น */}
            <div className="mt-8 grid gap-x-16 gap-y-5 lg:grid-cols-2 lg:items-start">
              <div>
                <Eyebrow>01</Eyebrow>
                <h2 className="mt-3 text-[1.75rem] leading-[1.25] font-semibold sm:text-[2.25rem]">
                  {lead.name}
                </h2>
                <p className="mt-3 font-medium text-gold-700">{lead.short}</p>
              </div>
              <div>
                <p className="text-[1.0625rem] leading-[1.8] text-ink2">
                  {lead.detail}
                </p>
                {/* ลิงก์ขอประเมินราคาเหลือที่เดียว จากเดิมซ้ำทั้ง 9 ชิ้น —
                    การประเมินราคาไม่ได้แยกตามบริการอยู่แล้ว (ทักไลน์พร้อมรูปห้อง)
                    ปุ่มที่ซ้ำเก้าครั้งจึงไม่ได้ให้ทางลัดอะไรเพิ่ม นอกจากเสียงรบกวน
                    หน้านี้ยังมีแถบ CTA ลอย + ปุ่มในหัวหน้า + section #quote ปิดท้าย */}
                <a
                  href="#quote"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-gold-700 hover:text-ink"
                >
                  ขอประเมินราคา
                  <ArrowIcon className="size-4" />
                </a>
              </div>
            </div>
          </article>

          {/* nth-child(2n) เยื้องลง 64px เฉพาะจอที่มีสองคอลัมน์ขึ้นไป
              สองคอลัมน์ที่ขอบบนตรงกันทุกแถวจะอ่านเป็นตาราง กดให้คอลัมน์ขวา
              ต่ำลงหนึ่งจังหวะ สายตาจึงไล่แบบซิกแซกเหมือนหน้าคู่ของนิตยสาร
              items-start จำเป็นเหมือนเดิม — ปล่อย stretch แล้วภาพจะยืดไม่เท่ากัน
              ภาพเป็น 4:5 บนจอกว้าง (ตั้ง) แต่เป็น 4:3 บนมือถือ เพราะแนวตั้ง
              เต็มความกว้างจอมือถือจะสูง 437px กินพื้นที่เกินความจำเป็น */}
          <ul className="mt-16 grid items-start gap-x-12 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 sm:[&>li:nth-child(2n)]:mt-16 lg:gap-x-16">
            {rest.map((service, index) => (
              <li key={service.slug} id={service.slug} className="scroll-mt-24">
                <MockImage
                  src={`${service.slug}.jpg`}
                  alt={`ตัวอย่างงาน${service.name}`}
                  zoom
                  className="aspect-[4/3] w-full rounded-sm sm:aspect-[4/5]"
                  sizes="(min-width: 640px) 45vw, 100vw"
                />
                <div className="mt-6">
                  <Eyebrow>
                    {String(index + 2).padStart(2, "0")}
                  </Eyebrow>
                  <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                    {service.name}
                  </h2>
                  <p className="mt-2 font-medium text-gold-700">
                    {service.short}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-[1.75] text-ink2">
                    {service.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="quote" className={`scroll-mt-24 bg-warm ${rhythm.dense}`}>
        <Container>
          <SectionHeading
            eyebrow="Get A Quote"
            align="center"
            title="งานตกแต่งประเมินราคา "
            accent="จากหน้างานเสมอ"
            lead="ขนาดพื้นที่ วัสดุที่เลือก และสภาพหน้างานทำให้ราคาต่างกันมาก ทักไลน์มาพร้อมรูปห้องและขนาดคร่าว ๆ เราตีราคาเบื้องต้นให้ก่อนได้"
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BookCta />
            <CallButton />
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
