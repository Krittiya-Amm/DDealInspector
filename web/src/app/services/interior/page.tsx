import type { Metadata } from "next";
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
  SectionHeading,
} from "@/components/ui";
import { interiorServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "บริการตกแต่งครบวงจร",
  description:
    "ผ้าม่าน วอลเปเปอร์ พื้น SPC ฟิล์มกรองแสง ตาข่ายกันนก ต่อเติมบ้าน กระจกกั้นห้อง ราวตากผ้า และงานออกแบบบิวท์อิน ครบในทีมเดียว",
};

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

      <section className="py-24 sm:py-32">
        <Container className="space-y-12">
          {interiorServices.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 grid gap-6 border-t border-line pt-10 first:border-0 first:pt-0 lg:grid-cols-2 lg:items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-last" : ""}>
                <Eyebrow>
                  {String(index + 1).padStart(2, "0")}
                </Eyebrow>
                <h2 className="mt-3 text-2xl font-semibold">{service.name}</h2>
                <p className="mt-2 font-medium text-gold-700">
                  {service.short}
                </p>
                <p className="mt-4 text-ink2">{service.detail}</p>
                <a
                  href="#quote"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-gold-700 hover:text-ink"
                >
                  ขอประเมินราคา
                  <ArrowIcon className="size-4" />
                </a>
              </div>
              <MockImage
                src={`${service.slug}.jpg`}
                alt={`ตัวอย่างงาน${service.name}`}
                className="aspect-[4/3] w-full rounded-sm"
              />
            </article>
          ))}
        </Container>
      </section>

      <section id="quote" className="scroll-mt-24 bg-warm py-24 sm:py-32">
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
