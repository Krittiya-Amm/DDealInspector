import Link from "next/link";
import { DocIcon, HomeIcon, ShieldIcon, ToolIcon } from "@/components/icons";
import {
  ArticleCard,
  ContactCta,
  FeaturedServices,
  InspectionProcess,
  InteriorCrossSell,
  ReportShowcase,
  Stats,
  Testimonials,
  VerifyLicense,
  WhyChooseUs,
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
import { pricing } from "@/lib/site";

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
        <Container className="py-14 sm:py-20 lg:py-32">
          <div className="lg:w-[45%] lg:pr-10">
            <Eyebrow>Professional Home Inspection</Eyebrow>
            <h1 className="mt-7 text-[2.125rem] font-semibold sm:text-[2.875rem] lg:text-[3.25rem]">
              ตรวจบ้าน<span className="text-gold-500">อย่างละเอียด</span>
              <span className="block">ก่อนตัดสินใจรับบ้าน</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-ink2">
              ตรวจสอบทุกจุดสำคัญของบ้านโดยทีมผู้เชี่ยวชาญ
              พร้อมรายงานที่เข้าใจง่าย เพื่อให้คุณมั่นใจก่อนรับโอน
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookCta />
              <Button href="/services" tone="outline">
                ดูบริการของเรา
              </Button>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8">
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
        <div className="relative h-72 sm:h-[26rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[51%]">
          <MockImage
            src="hero.jpg"
            alt="วิศวกรกำลังตรวจสภาพห้องก่อนโอน"
            sizes="(min-width: 1024px) 51vw, 100vw"
            className="h-full w-full"
            priority
          />
          {/* เหรียญคร่อมขอบภาพ — ตัวเดียวในเว็บที่เป็นวงกลม จึงยังอ่านเป็นตราประทับ
              ถ้ามีวงกลมลอยหลายจุดจะกลายเป็นดีไซน์แบบ SaaS ทันที */}
          <div className="absolute right-5 -bottom-9 grid size-28 place-items-center rounded-full border-2 border-gold-500 bg-ink px-4 text-center text-white sm:size-32 lg:right-auto lg:-left-16 lg:bottom-16 lg:size-36">
            <p className="text-[0.8125rem] leading-snug font-semibold">
              ตรวจครบ
              <span className="block">ทุกจุดสำคัญ</span>
            </p>
          </div>
        </div>
      </section>

      <FeaturedServices />
      <InspectionProcess />
      <ReportShowcase />
      <WhyChooseUs />
      <Stats />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <VerifyLicense />
        </Container>
      </section>

      <section id="pricing" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="ราคาชัดเจน "
            accent="ตั้งแต่ก่อนนัด"
            lead="คิดตามขนาดพื้นที่ใช้สอย ไม่มีค่าใช้จ่ายแอบแฝง และไม่คิดเพิ่มสำหรับการตรวจซ้ำ"
          />
          <div className="mt-12 space-y-8">
            {pricing.map((group) => (
              <div key={group.service} className="card overflow-hidden">
                <h3 className="border-b border-line px-5 py-4 font-semibold sm:px-6">
                  {group.service}
                </h3>
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    ตารางราคา {group.service}
                  </caption>
                  <thead className="text-ink3">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium sm:px-6">
                        ขนาด
                      </th>
                      <th
                        scope="col"
                        className="hidden px-5 py-3 font-medium sm:table-cell sm:px-6"
                      >
                        ขอบเขต
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-right font-medium sm:px-6"
                      >
                        ราคา
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {group.tiers.map((t) => (
                      <tr key={t.label}>
                        <th
                          scope="row"
                          className="px-5 py-4 font-medium sm:px-6"
                        >
                          {t.label}
                          <span className="block font-normal text-ink3 sm:hidden">
                            {t.scope}
                          </span>
                        </th>
                        <td className="hidden px-5 py-4 text-ink2 sm:table-cell sm:px-6">
                          {t.scope}
                        </td>
                        <td className="tnum px-5 py-4 text-right text-base font-semibold whitespace-nowrap text-gold-700 sm:px-6">
                          ฿{t.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink3">
            พื้นที่นอกกรุงเทพฯ และปริมณฑลมีค่าเดินทางเพิ่ม แจ้งให้ทราบก่อนนัดเสมอ
          </p>
        </Container>
      </section>

      <InteriorCrossSell />
      <Testimonials />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Journal"
              title="อ่านก่อนไปตรวจ จะคุยกับโครงการได้มั่นใจขึ้น"
            />
            <GhostLink href="/articles">ดูบทความทั้งหมด</GhostLink>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
