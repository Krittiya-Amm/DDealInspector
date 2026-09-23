import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { DocIcon, HomeIcon, ShieldIcon, ToolIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  ArticleCard,
  ContactCta,
  FeaturedServices,
  InspectionProcess,
  InteriorCrossSell,
  ReportShowcase,
  Testimonials,
  TrustBar,
  VerifyLicense,
  WhyChooseUs,
  WhyInspect,
} from "@/components/sections";
import {
  BookCta,
  Button,
  Container,
  Eyebrow,
  GhostLink,
  MockImage,
  SectionHeading,
} from "@/components/ui";
import { articles } from "@/lib/articles";
import { credentials, pricing, startingPrice } from "@/lib/site";

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
              ตรวจบ้าน<span className="text-gold-500">อย่างละเอียด</span>
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
                href="#pricing"
                className="underline underline-offset-4 hover:text-gold-700"
              >
                ดูตารางราคาทุกขนาด
              </Link>{" "}
              · ไม่มีค่าใช้จ่ายในการปรึกษา
            </p>
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
      <WhyInspect />
      <InspectionProcess />
      <ReportShowcase />
      <WhyChooseUs />

      <section className="py-24 sm:py-32">
        <Container>
          <VerifyLicense />
        </Container>
      </section>

      {/* ราคาเป็นบล็อกแยกตามประเภทงาน ไม่ใช่ตาราง — ตารางอ่านเป็นใบเสนอราคา
          ส่วนบล็อกที่มีหัวเรื่องของตัวเองอ่านเป็น "แพ็กเกจ" ซึ่งตรงกับวิธีที่ลูกค้าเลือกจริง */}
      <section id="pricing" className="border-t border-line py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="ราคาชัดเจน"
            accent=" ตั้งแต่ก่อนนัด"
            lead="คิดตามขนาดพื้นที่ใช้สอย ไม่มีค่าใช้จ่ายแอบแฝง และไม่คิดเพิ่มสำหรับการตรวจซ้ำ"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricing.map((group, i) => (
              <Reveal
                key={group.service}
                delay={i * 80}
                className="card flex flex-col p-7 sm:p-8"
              >
                <h3 className="text-xl font-semibold">{group.service}</h3>
                <dl className="mt-7 border-t border-line">
                  {group.tiers.map((t) => (
                    <div
                      key={t.label}
                      className="flex items-baseline justify-between gap-5 border-b border-line py-4"
                    >
                      <dt className="min-w-0">
                        <span className="block text-[0.9375rem] font-medium">
                          {t.label}
                        </span>
                        <span className="block text-sm text-ink3">
                          {t.scope}
                        </span>
                      </dt>
                      <dd className="tnum shrink-0 font-display text-2xl font-semibold whitespace-nowrap text-gold-700">
                        ฿{t.price}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto pt-6">
                  <GhostLink href="/contact">สอบถามงานนี้</GhostLink>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink3">
            พื้นที่นอกกรุงเทพฯ และปริมณฑลมีค่าเดินทางเพิ่ม แจ้งให้ทราบก่อนนัดเสมอ
          </p>
        </Container>
      </section>

      <Gallery />
      <InteriorCrossSell />
      <Testimonials />

      <section className="border-y border-line bg-warm py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading
              eyebrow="Journal"
              title="อ่านก่อนไปตรวจ จะคุยกับโครงการได้มั่นใจขึ้น"
            />
            <GhostLink href="/articles">ดูบทความทั้งหมด</GhostLink>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal as="div" key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
