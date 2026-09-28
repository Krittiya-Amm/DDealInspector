import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import {
  BookCta,
  CallButton,
  Container,
  DrawnRule,
  Eyebrow,
  LineButton,
  MockImage,
  rhythm,
  TechLabel,
} from "@/components/ui";
import { contact } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/contact",
  title: "ติดต่อเรา",
  description: `ติดต่อ D Deal Inspector & Interior — โทร ${contact.phones.join(" หรือ ")} เปิดทำการ ${contact.hours}`,
});

const mapsQuery = encodeURIComponent(contact.address);

export default function ContactPage() {
  return (
    <>
      {/* หัวหน้าติดต่อใช้ทรงเดียวกับหน้า /services/interior (ตัวหนังสือซ้าย ~53%
          + ภาพเกาะขวา ~47%) ตามคำขอให้หัวทั้งสามหน้าเป็นทรงเดียวกันทั้งเว็บ
          เดิมหน้านี้ตั้งใจ "สงบ/ตรง" ไม่ใส่ภาพ แต่ตอนนี้รวมท่าเดียวกันเพื่อความสม่ำเสมอ

          ยังคงเป็น <h1> จริง (ไม่ใช่ SectionHeading ที่เรนเดอร์ <h2>) เพื่อรักษา
          heading hierarchy/SEO และคงแถบข้อมูลใต้เส้นคาด (พื้นที่ให้บริการ อังกฤษถ่างได้
          + เวลาทำการ ไทยใช้ text ธรรมดา ไม่ถ่าง ตามกฎ TechLabel) ไว้ในคอลัมน์ซ้าย
          ทั้งคู่ดึงจาก contact จริง ไม่ได้พิมพ์ทับ */}
      <section className="relative border-b border-line bg-warm">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="lg:w-[53%] lg:pr-8">
            <Eyebrow>Contact Us</Eyebrow>
            <h1 className="mt-6 text-[2rem] font-semibold text-balance sm:text-[2.75rem] lg:text-5xl">
              ทักมาบอกวันโอน เดี๋ยวเราเช็กคิวให้
            </h1>
            <p className="mt-6 max-w-xl text-ink2 sm:text-lg sm:leading-[1.75]">
              ช่องทางที่เร็วที่สุดคือไลน์ ส่งขนาดห้องกับวันที่ต้องการตรวจมาได้เลย
              ตอบกลับภายในเวลาทำการ
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCta />
              <CallButton />
            </div>
            <div className="mt-8">
              <DrawnRule className="opacity-70" />
              <div className="mt-3.5 flex flex-wrap items-center gap-x-8 gap-y-2">
                <TechLabel>Bangkok · Thailand</TechLabel>
                <span className="text-sm text-ink3">เปิดทำการ {contact.hours}</span>
              </div>
            </div>
          </div>
        </Container>
        <div className="relative h-64 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[47%]">
          <MockImage
            src="hero.jpg"
            alt="ผู้ตรวจสวมหมวกนิรภัยถือเอกสารรายการตรวจ"
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="h-full w-full"
            priority
          />
        </div>
      </section>

      <section className={rhythm.base}>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">ช่องทางติดต่อ</h2>
            <dl className="card mt-6 divide-y divide-line px-6">
              <div className="flex gap-4 py-5">
                <PhoneIcon className="mt-1 size-5 shrink-0 text-gold-500" />
                <div>
                  <dt className="font-semibold">โทรศัพท์</dt>
                  <dd className="mt-1">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/-/g, "")}`}
                        className="flex min-h-[44px] items-start text-ink2 hover:text-gold-700"
                      >
                        {phone}
                      </a>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 py-5">
                <MailIcon className="mt-1 size-5 shrink-0 text-gold-500" />
                <div>
                  <dt className="font-semibold">อีเมล</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex min-h-[44px] items-start text-ink2 hover:text-gold-700"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 py-5">
                <ClockIcon className="mt-1 size-5 shrink-0 text-gold-500" />
                <div>
                  <dt className="font-semibold">เวลาทำการ</dt>
                  <dd className="mt-1 text-ink2">{contact.hours}</dd>
                </div>
              </div>

              <div className="flex gap-4 py-5">
                <PinIcon className="mt-1 size-5 shrink-0 text-gold-500" />
                <div>
                  <dt className="font-semibold">ที่อยู่</dt>
                  <dd className="mt-1 text-ink2">{contact.address}</dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center font-medium text-gold-700 underline underline-offset-4"
                    >
                      เปิดใน Google Maps
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6">
              <LineButton className="w-full sm:w-auto" />
            </div>

            <h2 className="mt-10 text-xl font-semibold sm:text-2xl">
              ติดตามผลงาน
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {[
                ["Facebook", contact.social.facebook],
                ["Instagram", contact.social.instagram],
                ["TikTok", contact.social.tiktok],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded-sm border border-line px-4 font-medium transition-colors duration-200 hover:border-ink hover:text-gold-700"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">แผนที่</h2>
            {/* embed แบบ output=embed ไม่ต้องใช้ API key — ปักหมุดจากที่อยู่จริงใน contact
                ใช้ mapsQuery ตัวเดียวกับลิงก์ "เปิดใน Google Maps" ด้านซ้าย */}
            <iframe
              title="แผนที่สำนักงาน D Deal Inspector & Interior"
              src={`https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 aspect-[4/3] w-full rounded-sm border border-line"
            />
            <p className="mt-4 text-sm text-ink3">
              เราให้บริการในกรุงเทพฯ และปริมณฑลเป็นหลัก
              พื้นที่นอกเขตแจ้งค่าเดินทางให้ทราบก่อนนัดเสมอ
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
