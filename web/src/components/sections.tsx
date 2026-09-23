import Link from "next/link";
import {
  ArrowIcon,
  CheckIcon,
  ExternalIcon,
  ShieldIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
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
  equipment,
  featuredServices,
  processSteps,
  reportHighlights,
  stats,
  testimonials,
  timeline,
  whyChooseUs,
  whyInspect,
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

/** Section 1 — แถบตัวเลขใต้ hero
 *  แบ่งช่องด้วยเส้นตั้งเส้นเดียว ไม่ใช่การ์ดสี่ใบ — การ์ดทำให้ตัวเลขดูเหมือน
 *  widget ของ dashboard ส่วนเส้นบางทำให้อ่านเป็น "ฐาน" ที่รองหัวเรื่องอยู่ */
export function TrustBar() {
  return (
    <section className="border-b border-line">
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-10 sm:grid-cols-4 sm:gap-x-10 sm:py-14">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className="border-t border-line pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block font-display text-[2.5rem] leading-none font-semibold text-gold-500 sm:text-[3.25rem]">
                  {s.value}
                </span>
                <span className="mt-3 block text-[0.9375rem] text-ink2">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Section 2 — บริการเด่นแบบงานบรรณาธิการ
 *  ใบแรกใหญ่กินสองในสาม ที่เหลือเป็นรายการแถวคั่นด้วยเส้นบาง
 *  กริดสี่ช่องเท่ากันทำให้ไม่มีอะไรสำคัญกว่าอะไร ซึ่งไม่จริง — คนส่วนใหญ่มาหา "ตรวจบ้านก่อนโอน" */
export function FeaturedServices() {
  const [lead, ...rest] = featuredServices;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            eyebrow="Featured Services"
            title="เลือกตามสถานการณ์ของคุณ"
            lead="กำลังจะรับบ้านใหม่ รับคอนโด ดูบ้านมือสอง หรือรอตรวจซ้ำหลังโครงการแก้ — ขอบเขตการตรวจต่างกัน"
          />
          <GhostLink href="/services/inspection">ดูบริการทั้งหมด</GhostLink>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal
            as="article"
            className="group relative lg:col-span-7 lg:self-start"
          >
            <MockImage
              src={lead.image}
              alt={lead.name}
              zoom
              className="aspect-[16/11] rounded-sm"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <p className="mt-6 text-[11px] font-semibold tracking-[0.12em] text-ink3 uppercase">
              {lead.meta}
            </p>
            <h3 className="mt-3 text-[1.625rem] font-semibold sm:text-[2rem]">
              <Link
                href={lead.href}
                className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
              >
                {lead.name}
              </Link>
            </h3>
            <p className="mt-3 max-w-lg text-[1.0625rem] leading-[1.8] text-ink2">
              {lead.short}
            </p>
            <span
              aria-hidden
              className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-gold-700"
            >
              อ่านต่อ
              <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </span>
          </Reveal>

          <ul className="border-t border-line lg:col-span-5">
            {rest.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                delay={i * 80}
                className="group relative flex items-center gap-5 border-b border-line py-6"
              >
                <MockImage
                  src={s.image}
                  alt=""
                  zoom
                  className="size-24 shrink-0 rounded-sm sm:size-28"
                  sizes="112px"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-ink3 uppercase">
                    {s.meta}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold">
                    <Link
                      href={s.href}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:text-gold-700"
                    >
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-ink2">{s.short}</p>
                </div>
                <ArrowIcon
                  aria-hidden
                  className="size-4 shrink-0 text-gold-700 transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Section 3 — ทำไมต้องตรวจ
 *  หัวเรื่องหนึบอยู่ทางซ้ายตอนเลื่อน ส่วนเหตุผลไล่ลงทางขวาเป็นรายการเลขใหญ่
 *  เป็นจังหวะเดียวในหน้าที่ตัวเลขทำหน้าที่เป็นภาพ ไม่ใช่ข้อมูล */
export function WhyInspect() {
  return (
    <section className="border-y border-line bg-warm py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Why Inspect"
            title="บ้านใหม่ไม่ได้แปลว่า"
            accent="ไม่มี Defect"
            lead="ไม่ใช่เพราะโครงการตั้งใจทำไม่ดี แต่เพราะงานก่อสร้างมีตัวแปรเยอะเกินกว่าจะสมบูรณ์เองโดยไม่มีคนตรวจ"
          />
          <MockImage
            src="article-crack.jpg"
            alt="รอยร้าวบนผนังที่ต้องประเมินว่าเป็นรอยร้าวโครงสร้างหรือรอยร้าวผิวปูน"
            className="mt-10 hidden aspect-[4/3] rounded-sm lg:block"
            sizes="40vw"
          />
        </div>

        <ol className="border-t border-line">
          {whyInspect.map((w, i) => (
            <Reveal
              as="li"
              key={w.step}
              delay={i * 60}
              className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-8 sm:gap-x-10 sm:py-10"
            >
              <span
                aria-hidden
                className="tnum font-display text-[2.5rem] leading-none font-semibold text-gold-500 sm:text-[3.5rem]"
              >
                {w.step}
              </span>
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{w.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.8] text-ink2">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Section 3 — ขั้นตอนการตรวจ 5 ขั้น
 *  แนวนอนบนจอใหญ่ เชื่อมด้วยเส้นบางเส้นเดียวที่ลากผ่านเลขลำดับ
 *  แนวตั้งบนมือถือ โดยเส้นย้ายไปอยู่ทางซ้าย */
export function InspectionProcess() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Inspection Process"
          title="ตรวจอย่างเป็นระบบ เพื่อให้คุณมั่นใจก่อนรับบ้าน"
          lead="ลำดับการตรวจไม่ได้สุ่ม — เริ่มจากสิ่งที่แก้ทีหลังแพงที่สุด ไล่ไปหาสิ่งที่แก้ง่ายกว่า"
        />

        <ol className="mt-16 grid gap-y-10 lg:grid-cols-5 lg:gap-x-8">
          {processSteps.map((s, i) => (
            <Reveal
              as="li"
              key={s.step}
              delay={i * 70}
              className="relative pl-16 lg:pl-0"
            >
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
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Section 4 — ตัวอย่างรายงาน: ภาพซ้อนสองใบทางซ้าย เนื้อหาทางขวา */
export function ReportShowcase() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
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

/** Section 5 — เกี่ยวกับเรา: ภาพเต็มคอลัมน์ซ้าย เนื้อหาขวา
 *  การ์ดใบประกอบวิชาชีพลอยคร่อมขอบภาพ เป็นชิ้นเดียวในบล็อกนี้ที่พื้นเข้ม
 *  จึงดึงสายตาไปที่ "ใครเป็นคนตรวจ" ซึ่งคือสิ่งที่ลูกค้าอยากรู้ที่สุด */
export function WhyChooseUs() {
  return (
    <section id="about" className="border-y border-line bg-warm py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div className="relative">
          <MockImage
            src="inspection-hero.jpg"
            alt="วิศวกรโยธาพร้อมอุปกรณ์ตรวจสอบหน้างาน"
            className="aspect-[5/6] rounded-sm"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          {/* มือถือ: ต่อท้ายภาพตามปกติ · sm ขึ้นไป: ลอยทับมุมล่างขวาของภาพ
              lg: เลื่อนออกไปคร่อมขอบขวาเข้าไปในช่องว่างระหว่างคอลัมน์ */}
          <div className="mt-4 rounded-sm bg-ink p-6 text-white sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-64 sm:shadow-lift lg:-right-12 lg:bottom-12 lg:w-72">
            {/* การ์ดนี้พูดเรื่อง "เครื่องมือ" ไม่ใช่ "ใบอนุญาต" เพราะบล็อก VerifyLicense
                ที่อยู่ถัดลงไปพูดเรื่องใบอนุญาตอยู่แล้ว พูดซ้ำสองที่ติดกันแล้วทั้งคู่จะเบา */}
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              Inspection Toolkit
            </p>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-white/85">
              กล้องถ่ายภาพความร้อน เครื่องวัดความชื้น กล้องส่องท่อ
              และเครื่องมือมาตรฐานอีก {equipment.length - 3} ชนิด
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="About Us"
            title="เราตรวจเพื่อให้คุณ"
            accent="ตัดสินใจได้เอง"
            lead="ลูกค้าเลือกเราไม่ใช่เพราะราคาถูกที่สุด แต่เพราะรายงานที่ได้เอาไปคุยกับโครงการได้จริง"
          />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {whyChooseUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="border-t-2 border-ink pt-5">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-ink2">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section 9 — รีวิว: อันแรกเป็นคำพูดตัวใหญ่ อีกสองอันเรียงเล็กลงข้าง ๆ
 *  ไม่มีดาว — ดาวคือภาษาของ marketplace ไม่ใช่ของงานวิชาชีพ
 *  และเราไม่มีระบบให้คะแนนจริงรองรับ จะใส่ก็เป็นการกล่าวอ้างลอย ๆ */
export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="reviews" className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Client Reviews" title="เสียงจากลูกค้าของเรา" />

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal as="article">
            <figure className="flex h-full flex-col">
              <span
                aria-hidden
                className="block font-display text-[4.5rem] leading-[0.7] text-gold-500"
              >
                “
              </span>
              <blockquote className="mt-4 flex-1 text-[1.25rem] leading-[1.75] text-ink sm:text-[1.5rem] sm:leading-[1.7]">
                {lead.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                <MockImage
                  src={lead.image}
                  alt=""
                  className="size-12 shrink-0 rounded-full"
                  sizes="48px"
                />
                <span>
                  <span className="block font-semibold">{lead.name}</span>
                  <span className="block text-sm text-ink3">
                    {lead.property}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-y-10 self-center">
            {rest.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 80}>
                <figure className="border-t border-line pt-7">
                  <blockquote className="text-[1.0625rem] leading-[1.8] text-ink2 before:mr-1 before:font-display before:text-2xl before:text-gold-500 before:content-['“']">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3.5">
                    <MockImage
                      src={t.image}
                      alt=""
                      className="size-10 shrink-0 rounded-full"
                      sizes="40px"
                    />
                    <span>
                      <span className="block text-[0.9375rem] font-semibold">
                        {t.name}
                      </span>
                      <span className="block text-sm text-ink3">
                        {t.property}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
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
        zoom
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
    <section className="py-24 sm:py-32">
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
