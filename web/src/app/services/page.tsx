import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ContactCta } from "@/components/sections";
import {
  Container,
  Eyebrow,
  MockImage,
  SectionHeading,
} from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { inspectionServices, interiorServices, startingPrice } from "@/lib/site";

export const metadata = pageMeta({
  path: "/services",
  title: "บริการทั้งหมด",
  description:
    "บริการตรวจสอบบ้านและคอนโดก่อนโอนโดยวิศวกรโยธา และบริการตกแต่งครบวงจร 9 บริการ",
});

const groups = [
  {
    href: "/services/inspection",
    eyebrow: "Inspection",
    title: "บริการตรวจสอบ",
    lead: `ตรวจโดยวิศวกรโยธาที่มีใบประกอบวิชาชีพ เริ่มต้น ฿${startingPrice}`,
    items: inspectionServices,
    image: "inspection-hero.jpg",
  },
  {
    href: "/services/interior",
    eyebrow: "Interior",
    title: "บริการตกแต่ง",
    lead: "9 บริการตั้งแต่ผ้าม่านถึงงานบิวท์อินและต่อเติม ทีมเดียวกับที่ตรวจให้คุณ",
    items: interiorServices,
    image: "interior-hero.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="ตรวจให้ชัดก่อน แล้วค่อยแต่งให้สวย"
            lead="เราแบ่งบริการเป็นสองฝั่งที่ต่อกัน — ฝั่งตรวจสอบทำให้คุณมั่นใจว่าบ้านไม่มีปัญหาซ่อนอยู่ ฝั่งตกแต่งทำให้บ้านพร้อมอยู่จริง"
          />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          {groups.map(({ href, eyebrow, title, lead, items, image }) => (
            <article key={href} className="flex flex-col">
              <MockImage
                src={image}
                alt={title}
                className="aspect-[3/2] rounded-sm"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="mt-7">
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
              <h2 className="mt-4 text-2xl font-semibold sm:text-[1.875rem]">
                {title}
              </h2>
              <p className="mt-3 text-ink2">{lead}</p>
              <ul className="mt-7 flex-1 border-t border-line">
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`${href}#${item.slug}`}
                      className="group flex min-h-[48px] items-center justify-between gap-3 border-b border-line text-[0.9375rem] transition-colors duration-200 hover:text-gold-700"
                    >
                      {item.name}
                      <ArrowIcon className="size-4 shrink-0 text-ink3 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-ink px-6 font-semibold text-white transition-colors duration-200 ease-out hover:bg-ink-deep"
              >
                ดู{title}ทั้งหมด
                <ArrowIcon className="size-5" />
              </Link>
            </article>
          ))}
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
