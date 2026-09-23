import type { Metadata } from "next";
import { CheckIcon } from "@/components/icons";
import {
  ContactCta,
  InteriorCrossSell,
  Timeline,
  VerifyLicense,
} from "@/components/sections";
import {
  BookCta,
  CallButton,
  Container,
  Eyebrow,
  MockImage,
  SectionHeading,
} from "@/components/ui";
import {
  equipment,
  inspectionServices,
  pricing,
  startingPrice,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "บริการตรวจสอบบ้านและคอนโด",
  description:
    "ตรวจบ้านก่อนโอน ตรวจคอนโดก่อนโอน และตรวจงานต่อเติมระหว่างก่อสร้าง โดยวิศวกรโยธาที่มีใบประกอบวิชาชีพรับรองโดยสภาวิศวกร",
};

const priceByService = new Map(pricing.map((p) => [p.service, p.tiers]));

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

      <section className="py-24 sm:py-32">
        <Container className="space-y-14">
          {inspectionServices.map((service, index) => {
            const tiers = priceByService.get(service.name);
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 border-t border-line pt-10 first:border-0 first:pt-0"
              >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                  <div>
                    <Eyebrow>Service {String(index + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-ink2">{service.detail}</p>
                    <h3 className="mt-6 font-semibold">จุดที่ตรวจ</h3>
                    <ul className="mt-3 space-y-2 text-ink2">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <CheckIcon className="mt-1 size-4 shrink-0 text-gold-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tiers ? (
                    <div className="card h-fit p-5 sm:p-6">
                      <h3 className="font-semibold">ราคา</h3>
                      <dl className="mt-4 divide-y divide-line">
                        {tiers.map((t) => (
                          <div
                            key={t.label}
                            className="flex items-baseline justify-between gap-4 py-3"
                          >
                            <dt>
                              <span className="font-medium">{t.label}</span>
                              <span className="block text-sm text-ink3">
                                {t.scope}
                              </span>
                            </dt>
                            <dd className="tnum text-lg font-semibold whitespace-nowrap text-gold-700">
                              ฿{t.price}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-4 text-sm text-ink3">
                        ตรวจซ้ำหลังโครงการแก้ ไม่คิดค่าบริการเพิ่ม
                      </p>
                      <div className="mt-5">
                        <BookCta className="w-full" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <section className="border-y border-line bg-warm py-24 sm:py-32">
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

      <section className="py-24 sm:py-32">
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

      <section className="pb-20 sm:pb-28">
        <Container>
          <VerifyLicense />
        </Container>
      </section>

      <InteriorCrossSell />
      <ContactCta />
    </>
  );
}
