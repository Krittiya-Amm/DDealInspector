import Link from "next/link";
import {
  ArrowIcon,
  CheckIcon,
  ExternalIcon,
  ShieldIcon,
} from "@/components/icons";
import {
  BookCta,
  Container,
  Eyebrow,
  GhostLink,
  MockImage,
  QuoteCta,
  SectionHeading,
} from "@/components/ui";
import { articleCategories, formatThaiDate, type Article } from "@/lib/articles";
import {
  credentials,
  featuredServices,
  processSteps,
  reportHighlights,
  stats,
  testimonials,
  timeline,
  whyChooseUs,
} from "@/lib/site";

export function VerifyLicense() {
  return (
    <div className="rounded-sm bg-ink p-7 text-white sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
        <div>
          <span className="inline-flex size-12 items-center justify-center rounded-sm bg-white/10">
            <ShieldIcon className="size-6 text-white" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
            อย่าเพิ่งเชื่อเรา — เช็กเองได้
          </h3>
          <p className="mt-4 max-w-xl text-white/70 sm:text-lg sm:leading-[1.8]">
            วิศวกรที่เข้าตรวจทุกงานมีใบประกอบวิชาชีพวิศวกรรมควบคุม
            รับรองโดยสภาวิศวกร คุณเอาเลขใบอนุญาตไปค้นในระบบสาธารณะของสภาวิศวกรได้เลย
            ไม่ต้องเชื่อคำโฆษณาของเรา
          </p>
        </div>

        <div className="lg:w-72 lg:shrink-0">
          <dl className="rounded-sm border border-white/15 p-5">
            <dt className="text-[11px] font-semibold tracking-[0.15em] text-white/60 uppercase">
              License No.
            </dt>
            <dd className="tnum mt-1.5 font-display text-3xl font-semibold">
              {credentials.licenseNo}
            </dd>
          </dl>
          <a
            href={credentials.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-white px-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 ease-out hover:bg-white/90"
          >
            ตรวจสอบที่เว็บสภาวิศวกร
            <ExternalIcon className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Section 2 — การ์ดบริการเด่น: ภาพนำ ชื่อ คำอธิบายสั้น แล้วลูกศรเล็ก ๆ
 *  ไม่มีไอคอน ไม่มี badge — ให้ภาพทำหน้าที่แยกแยะการ์ดแทน */
export function FeaturedServices() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Services"
            title="บริการตรวจบ้านที่ครอบคลุม"
            lead="เลือกตามสถานการณ์ของคุณ — กำลังจะรับบ้านใหม่ รับคอนโด ดูบ้านมือสอง หรือรอตรวจซ้ำหลังโครงการแก้"
          />
          <GhostLink href="/services/inspection">ดูบริการทั้งหมด</GhostLink>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s) => (
            <article key={s.name} className="group relative flex flex-col">
              <MockImage
                src={s.image}
                alt={s.name}
                className="aspect-[4/5] rounded-sm"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <p className="mt-5 text-[11px] font-semibold tracking-[0.12em] text-ink3 uppercase">
                {s.meta}
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                <Link
                  href={s.href}
                  className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
                >
                  {s.name}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-[0.9375rem] text-ink2">{s.short}</p>
              <span
                aria-hidden
                className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-gold-700"
              >
                อ่านต่อ
                <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Section 3 — ขั้นตอนการตรวจ 5 ขั้น
 *  แนวนอนบนจอใหญ่ เชื่อมด้วยเส้นบางเส้นเดียวที่ลากผ่านเลขลำดับ
 *  แนวตั้งบนมือถือ โดยเส้นย้ายไปอยู่ทางซ้าย */
export function InspectionProcess() {
  return (
    <section
      id="process"
      className="border-y border-line bg-warm py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Our Inspection Process"
          title="ตรวจอย่างเป็นระบบ เพื่อให้คุณมั่นใจก่อนรับบ้าน"
          lead="ลำดับการตรวจไม่ได้สุ่ม — เริ่มจากสิ่งที่แก้ทีหลังแพงที่สุด ไล่ไปหาสิ่งที่แก้ง่ายกว่า"
        />

        <ol className="mt-14 grid gap-y-10 lg:grid-cols-5 lg:gap-x-8">
          {processSteps.map((s, i) => (
            <li key={s.step} className="relative pl-16 lg:pl-0">
              {/* เส้นเชื่อม: มือถือลากลงทางซ้าย จอใหญ่ลากขวาผ่านหลังเลข
                  ขั้นสุดท้ายไม่มีเส้น เพราะไม่มีอะไรให้เชื่อมต่อไปแล้ว */}
              {i < processSteps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-12 bottom-[-2.5rem] left-[1.4375rem] w-px bg-line lg:top-[1.4375rem] lg:right-[-2rem] lg:bottom-auto lg:left-14 lg:h-px lg:w-auto"
                />
              ) : null}
              <span className="tnum absolute top-0 left-0 grid size-12 place-items-center rounded-full border border-line bg-paper font-display text-xl font-semibold text-gold-700 lg:static">
                {s.step}
              </span>
              <h3 className="mt-0 text-lg font-semibold lg:mt-6">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink2">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Section 4 — ตัวอย่างรายงาน: ภาพซ้อนสองใบทางซ้าย เนื้อหาทางขวา */
export function ReportShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <MockImage
            src="report.jpg"
            alt="ตัวอย่างรายงานตรวจบ้านพร้อมภาพประกอบทุกจุด"
            className="aspect-[4/3] rounded-sm"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {/* ใบเล็กซ้อนมุมล่างขวา ให้เห็นว่ารายงานมีหลายหน้า ไม่ใช่กระดาษแผ่นเดียว
              ต้องห่อด้วย div ที่ absolute เพราะราก MockImage เป็น relative อยู่แล้ว
              และ relative มาทีหลัง absolute ใน stylesheet ของ Tailwind */}
          <div className="absolute -right-4 -bottom-10 hidden w-44 rounded-sm border-4 border-paper sm:block lg:w-52">
            <MockImage
              src="article-defect.jpg"
              alt=""
              className="aspect-[3/4]"
              sizes="208px"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Detailed Inspection Report"
            title="เห็นทุกจุด ก่อนตัดสินใจรับบ้าน"
            lead="รายงานของเราไม่ใช่เช็กลิสต์ติ๊กถูก แต่เป็นเอกสารที่ระบุตำแหน่ง มีภาพประกอบ และจัดลำดับความเร่งด่วน ให้คุณใช้คุยกับโครงการได้จริง"
          />
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {reportHighlights.map((h) => (
              <div key={h.title}>
                <dt className="flex items-center gap-2 font-semibold">
                  <CheckIcon className="size-4 shrink-0 text-gold-500" />
                  {h.title}
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink2">{h.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9">
            <GhostLink href="/services/inspection">ดูตัวอย่าง Report</GhostLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section 5 — สี่เหตุผล แยกด้วยเส้นตั้งบาง ๆ ไม่ใช่การ์ด */
export function WhyChooseUs() {
  return (
    <section id="about" className="border-y border-line bg-warm py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="ทำไมต้องให้เราตรวจ"
          lead="เหตุผลที่ลูกค้าเลือกเรา ไม่ใช่เพราะราคาถูกที่สุด แต่เพราะรายงานเอาไปใช้ได้จริง"
        />
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((w) => (
            <div
              key={w.title}
              className="border-t-2 border-ink pt-5 sm:border-t-0 sm:border-l sm:border-line sm:pt-0 sm:pl-6"
            >
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] text-ink2">{w.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Section 6 — ตัวเลข: ใหญ่ เรียบ ไม่มีกรอบ ไม่มีไอคอน */
export function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block font-display text-[2.75rem] leading-none font-semibold text-gold-500 sm:text-[3.5rem]">
                  {s.value}
                </span>
                <span className="mt-3 block text-[0.9375rem] text-ink2">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client Reviews"
          title="เสียงจากลูกค้าของเรา"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-12 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <blockquote className="flex-1 text-[1.0625rem] leading-[1.8] text-ink2 before:mr-1 before:font-display before:text-2xl before:text-gold-500 before:content-['“']">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                <MockImage
                  src={t.image}
                  alt=""
                  className="size-11 shrink-0 rounded-full"
                  sizes="44px"
                />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-ink3">{t.property}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Timeline() {
  return (
    <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {timeline.map((item) => {
        const interior = "isInterior" in item && item.isInterior;
        return (
          <li key={item.step} className="border-t-2 border-ink pt-5">
            <span className="tnum font-display text-3xl font-semibold text-gold-500">
              {item.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold text-ink3">
              {item.duration}
            </p>
            <p className="mt-3 text-[0.9375rem] text-ink2">{item.body}</p>
            {interior ? (
              <div className="mt-4">
                <GhostLink href="/services/interior">ดูบริการตกแต่ง</GhostLink>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  const cat = articleCategories[article.category];
  return (
    <article className="group relative flex flex-col">
      <MockImage
        src={article.image}
        alt={article.title}
        className="aspect-[16/10] rounded-sm"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-5 flex flex-1 flex-col">
        <Eyebrow variant="pill">{cat.label}</Eyebrow>
        <h3 className="mt-3.5 text-lg font-semibold">
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-[0.9375rem] text-ink2">
          {article.excerpt}
        </p>
        <p className="mt-5 text-xs text-ink3">
          {formatThaiDate(article.date)} · อ่าน {article.readingTime}
        </p>
      </div>
    </article>
  );
}

export function InteriorCrossSell() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="After The Inspection"
            title="ตรวจเจอปัญหาแล้ว "
            accent="ซ่อมที่ไหน?"
            lead="ส่วนใหญ่โครงการจะแก้ให้ตามรายงาน แต่ส่วนที่คุณอยากปรับเพิ่มเอง — ม่าน พื้น บิวท์อิน ต่อเติม — ทีมเดียวกันทำต่อได้เลย ไม่ต้องเริ่มหาช่างใหม่ตั้งแต่ต้น"
          />
          <ul className="mt-7 grid gap-2.5 text-[0.9375rem] text-ink2 sm:grid-cols-2">
            {[
              "ผ้าม่าน มู่ลี่ พรม",
              "วอลเปเปอร์",
              "พื้น SPC",
              "ฟิล์มกรองแสง",
              "กระจกกั้นห้อง",
              "ต่อเติมบ้าน",
            ].map((x) => (
              <li key={x} className="flex gap-2.5">
                <CheckIcon className="mt-1 size-4 shrink-0 text-gold-500" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <GhostLink href="/services/interior">
              ดูบริการตกแต่งครบ 9 บริการ
            </GhostLink>
          </div>
        </div>
        <MockImage
          src="cross-sell.jpg"
          alt="ห้องนั่งเล่นหลังตกแต่ง ผ้าม่านและพื้นไม้"
          className="aspect-[4/3] w-full rounded-sm"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </Container>
    </section>
  );
}

/** Section 8 — CTA ปิดท้าย: ภาพบ้านเต็มความกว้าง คลุมด้วยถ่านเข้มให้ตัวอักษรอ่านออก */
export function ContactCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* ภาพพื้นหลังต้องเป็น "ห้องว่าง" ไม่ใช่ภาพคน — ใบหน้าที่จางอยู่หลังหัวข้อ
          ดึงสายตาแย่งข้อความ และทำให้ลูมิแนนซ์ไม่สม่ำเสมอจนคุมคอนทราสต์ไม่ได้ */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <MockImage
          src="interior-hero.jpg"
          alt=""
          className="h-full w-full"
          sizes="100vw"
        />
      </div>
      <Container className="relative py-24 text-center sm:py-32">
        <div className="mx-auto max-w-2xl">
          <Eyebrow tone="invert">Ready To Inspect</Eyebrow>
          <h2 className="mt-6 text-[1.875rem] font-semibold text-white sm:text-[2.5rem]">
            กำลังจะรับบ้าน? ตรวจให้มั่นใจก่อนตัดสินใจ
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.8] text-white/75">
            วันตรวจก่อนโอนคือโอกาสสุดท้ายที่โครงการจะแก้ให้ฟรี
            ทักมาบอกวันโอนกับขนาดห้อง เดี๋ยวเราเช็กคิวให้
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <BookCta tone="onDark" />
            <QuoteCta tone="outlineDark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
