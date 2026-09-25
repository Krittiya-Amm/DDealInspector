import Link from "next/link";
import { DocIcon, HomeIcon, ShieldIcon, ToolIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  ArticleMeta,
  ContactCta,
  FeaturedServices,
  InteriorCrossSell,
  Testimonials,
  TrustBar,
  VerifyLicense,
} from "@/components/sections";
import {
  BookCta,
  Button,
  Container,
  DrawnRule,
  Eyebrow,
  GhostLink,
  MockImage,
  rhythm,
  SectionHeading,
  TechLabel,
} from "@/components/ui";
import { articles } from "@/lib/articles";
import { credentials, startingPrice } from "@/lib/site";

/* สามเรื่องล่าสุด ไม่ใช่สี่ — สารบัญ 3 บรรทัดจบพอดีในหนึ่งก้อนสายตา */
const journal = articles.slice(0, 3);

/* หน้าแรกของเว็บ information ทำหน้าที่ "บอกว่าเราคือใคร แล้วพาไปหน้าที่ตอบคำถาม"
   ไม่ใช่เล่าทุกเรื่องจบในหน้าเดียวแบบ landing page

   เดิมหน้านี้มี 14 section สูง 14,562px (16.2 หน้าจอ) และถือคำ 44% ของทั้งเว็บ
   แปลว่า ขั้นตอน / ราคา / แกลเลอรี / เกี่ยวกับ / รีวิว ไม่มี URL ของตัวเอง
   ส่งลิงก์ให้ใครไม่ได้ Google เก็บเป็นหน้าแยกไม่ได้ ขัดกับเป้า SEO ในการ์ด

   สิ่งที่ย้ายออกไม่ได้ถูกลบ — ไปอยู่หน้าที่มันเป็นหัวข้อหลักจริง ๆ:
     ทำไมต้องตรวจ · ขั้นตอน · ตัวอย่างรายงาน · จุดแข็ง · ตารางราคา
         → /services/inspection
     แกลเลอรีผลงาน → /services/interior (การ์ดระบุว่า Interior นำด้วยภาพผลงาน)
     บทความ → /articles ที่มีอยู่แล้ว

   เหลือบนหน้าแรก = 3 หัวข้อที่การ์ดขอ (Inspection นำ + แตะ Interior ·
   วิศวกรผู้มีใบประกอบวิชาชีพ · รีวิวลูกค้า) + ทางเข้าหน้าอื่น */

const heroTrust = [
  { icon: ShieldIcon, label: "ตรวจโดยผู้เชี่ยวชาญ" },
  { icon: DocIcon, label: "รายงานละเอียด" },
  { icon: ToolIcon, label: "เครื่องมือมาตรฐาน" },
  { icon: HomeIcon, label: "ใส่ใจทุกจุดของบ้าน" },
];

export default function HomePage() {
  return (
    <>
      {/* hero: ตัวหนังสืออยู่ในคอลัมน์ซ้ายที่อิงขอบ container
          ส่วนภาพกินยาวไปชนขอบจอขวา ไม่ใช่การ์ดลอยกลางหน้า */}
      <section className="relative border-b border-line bg-warm">
        <Container className="py-16 sm:py-24 lg:py-36">
          <div className="lg:w-[46%] lg:pr-12">
            <Eyebrow>Professional Home Inspection</Eyebrow>
            <h1 className="mt-8 text-[2.25rem] font-semibold sm:text-[3rem] lg:text-[3.625rem]">
              {/* บังคับขึ้นบรรทัดเองทั้งสามบรรทัด ไม่ปล่อยให้เบราว์เซอร์ตัดคำ
                  ไทยไม่เว้นวรรคระหว่างคำ จุดตัดอัตโนมัติจึงเดาไม่ได้และเปลี่ยนตามความกว้างจอ */}
              <span className="block">ตรวจบ้าน</span>
              <span className="block text-gold-500">อย่างละเอียด</span>
              <span className="block">ก่อนตัดสินใจรับบ้าน</span>
            </h1>
            <p className="mt-7 max-w-xl text-[1.125rem] leading-[1.85] text-ink2">
              ตรวจสอบทุกจุดสำคัญของบ้านโดยทีมผู้เชี่ยวชาญ
              พร้อมรายงานที่เข้าใจง่าย เพื่อให้คุณมั่นใจก่อนรับโอน
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookCta />
              <Button href="/services" tone="outline">
                ดูบริการของเรา
              </Button>
            </div>

            <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8">
              {heroTrust.map((t) => (
                <li key={t.label} className="flex items-center gap-2.5">
                  <t.icon className="size-5 shrink-0 text-gold-500" />
                  <span className="text-[0.9375rem] font-medium">
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink3">
              <Link
                href="/services/inspection#pricing"
                className="underline underline-offset-4 hover:text-gold-700"
              >
                ดูตารางราคาทุกขนาด
              </Link>{" "}
              · ไม่มีค่าใช้จ่ายในการปรึกษา
            </p>
          </div>
        </Container>

        {/* แถบข้อมูลกำกับใต้ hero — ขอบเขตงานและพื้นที่ให้บริการ เขียนแบบหัวกระดาษรายงาน
            ทั้งสองค่ามาจากข้อมูลจริงในเว็บ ไม่ได้ตั้งขึ้นมาเพื่อความสวย */}
        <Container className="relative hidden pb-8 lg:block">
          <DrawnRule className="opacity-70" />
          <div className="mt-3.5 flex w-[46%] items-center justify-between gap-6 pr-12">
            <TechLabel>Pre-Transfer Inspection</TechLabel>
            <TechLabel>Bangkok · Thailand</TechLabel>
          </div>
        </Container>

        {/* มือถือไหลต่อท้ายตัวหนังสือ · จอใหญ่ลอยชิดขอบขวาเต็มความสูง section */}
        <div className="relative h-80 sm:h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
          <MockImage
            src="hero.jpg"
            alt="วิศวกรกำลังตรวจสภาพห้องก่อนโอน"
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="h-full w-full"
            priority
          />
          {/* การ์ดใบเดียวที่คร่อมขอบภาพ — บอกสองอย่างที่คนตัดสินใจจริง ๆ ใช้
              คือ "ใครตรวจ" กับ "เริ่มที่เท่าไหร่" มือถือวางทับในภาพเพื่อไม่ให้ล้นออกนอก section
              จอใหญ่เลื่อนออกไปคร่อมขอบซ้ายของภาพ ให้สองคอลัมน์เกี่ยวกันแทนที่จะวางคู่กันเฉย ๆ */}
          <div className="absolute inset-x-4 bottom-4 rounded-sm bg-ink/95 p-5 backdrop-blur sm:inset-x-6 sm:bottom-6 sm:max-w-sm lg:-left-14 lg:bottom-16 lg:w-80 lg:bg-ink lg:p-7 lg:shadow-lift lg:right-auto">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              Licensed Engineer
            </p>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/85">
              ตรวจโดยวิศวกรโยธาผู้มีใบประกอบวิชาชีพ รับรองโดย
              {credentials.licenseBody}
            </p>
            <p className="mt-4 flex items-baseline gap-2 border-t border-white/15 pt-4 text-white/60">
              <span className="text-[0.8125rem]">เริ่มต้น</span>
              <span className="tnum font-display text-2xl font-semibold text-gold-500">
                ฿{startingPrice}
              </span>
              <span className="text-[0.8125rem]">ต่อครั้ง</span>
            </p>
          </div>
        </div>
      </section>

      <TrustBar />
      <FeaturedServices />

      <VerifyLicense />

      <InteriorCrossSell />
      <Testimonials />

      {/* ทางเข้าหน้าบทความ — การ์ดระบุ 4 หน้า (แรก / บริการ / บทความ / ติดต่อ)
          หน้าแรกของเว็บ information ต้องมีทางไปครบทั้งสี่ ไม่ใช่แค่ในเมนูบน
          เนื้อหาหน้าแรกเดิมลิงก์ออกแค่ /services, /services/interior, /contact

          ไม่ใช่บล็อกนิตยสารเดิมที่กินความสูง ~900px (บทความเด่นมีภาพใหญ่
          + อีกสามชิ้นมีคำโปรยครบ) เพราะนั่นคือการเอาหน้า /articles มาย่อไว้ในหน้าแรก
          ซึ่งเป็นท่าของ landing page · อันนี้เป็นสารบัญ 3 บรรทัด: หัวเรื่อง + ข้อมูลกำกับ
          พอให้รู้ว่ามีอะไรให้อ่าน แล้วส่งต่อไปหน้าจริง

          variant="left" ให้แถวไหลเข้าจากซ้ายทีละบรรทัดแบบไทม์ไลน์ ไม่ใช่ fade-up
          ซึ่งหน้านี้มีอยู่แล้ว 4 ที่ */}
      <section className={`border-t border-line ${rhythm.dense}`}>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <SectionHeading
              eyebrow="Journal"
              title="อ่านก่อนไปตรวจ"
              accent=" จะคุยกับโครงการได้มั่นใจขึ้น"
            />
            <GhostLink href="/articles" className="ml-auto">
              ดูบทความทั้งหมด
            </GhostLink>
          </div>

          {/* เส้นบนเป็น border-ink เหมือนหัวตารางในไทม์ไลน์ ส่วนแถวคั่นด้วย
              border-line บาง ๆ — อ่านเป็นสารบัญ ไม่ใช่กองการ์ด */}
          <ol className="mt-10 border-t border-ink">
            {journal.map((a, i) => (
              <Reveal
                as="li"
                key={a.slug}
                delay={i * 70}
                variant="left"
                className="group relative grid gap-x-10 gap-y-2 border-b border-line py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
              >
                <h3 className="text-[1.0625rem] leading-[1.5] font-semibold sm:text-lg">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
                  >
                    {a.title}
                  </Link>
                </h3>
                <ArticleMeta article={a} index={i + 1} />
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
