import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import {
  BookCta,
  CallButton,
  Container,
  LineButton,
  PlaceholderImage,
  rhythm,
  SectionHeading,
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
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Contact Us"
            title="ทักมาบอกวันโอน เดี๋ยวเราเช็กคิวให้"
            lead="ช่องทางที่เร็วที่สุดคือไลน์ ส่งขนาดห้องกับวันที่ต้องการตรวจมาได้เลย ตอบกลับภายในเวลาทำการ"
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookCta />
            <CallButton />
          </div>
        </Container>
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
            {/* TODO: DEPLOY — แทนด้วย Google Maps embed จริง (ต้องใช้ API key ของลูกค้า) */}
            <PlaceholderImage
              label="Google Maps embed"
              className="mt-6 aspect-[4/3] w-full rounded-sm"
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
