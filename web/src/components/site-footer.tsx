import Link from "next/link";
import { LineIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { contact, site, telHref } from "@/lib/site";

// ปลายทางทุกอันเป็นหน้าจริง — ของเดิม 4 ใน 7 เป็น anchor ของหน้าแรก
// (#process #pricing #about #reviews) ซึ่งเนื้อหาพวกนั้นย้ายไปอยู่หน้าบริการแล้ว
// ถ้าไม่แก้ตาม ลิงก์จะพาไปหน้าแรกแล้วไม่กระโดดไปไหน เพราะ id ไม่มีอยู่ในหน้านั้น
const navLinks = [
  { href: "/services", label: "บริการทั้งหมด" },
  // #scope = บล็อก 5 หมวดที่ตรวจ (เดิม id นี้ชื่อ #process) ส่วน #process ตอนนี้
  // เป็นไทม์ไลน์ "นัดแล้วเกิดอะไรต่อ" — ป้ายในฟุตเตอร์จึงต้องเปลี่ยนตามให้ตรงปลายทาง
  { href: "/services/inspection#scope", label: "จุดที่ตรวจ" },
  { href: "/services/inspection#pricing", label: "ราคาค่าตรวจ" },
  { href: "/services/inspection#gallery", label: "ตัวอย่างงานที่ตรวจ" },
  { href: "/services/inspection#about", label: "เกี่ยวกับเรา" },
  { href: "/#reviews", label: "รีวิวลูกค้า" },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

const serviceLinks = [
  { href: "/services/inspection#house", label: "ตรวจบ้านก่อนโอน" },
  { href: "/services/inspection#condo", label: "ตรวจคอนโดก่อนโอน" },
  {
    href: "/services/inspection#construction",
    label: "ตรวจต่อเติม / ระหว่างก่อสร้าง",
  },
  { href: "/services/interior#curtain", label: "ผ้าม่าน มู่ลี่ พรม" },
  { href: "/services/interior#built-in", label: "ออกแบบและบิวท์อิน" },
  { href: "/services/interior", label: "ดูบริการตกแต่งครบ 9 บริการ" },
];

const socials = [
  ["Facebook", contact.social.facebook],
  ["Instagram", contact.social.instagram],
  ["TikTok", contact.social.tiktok],
] as const;

export function SiteFooter() {
  return (
    // ไม่มี margin-top เพราะบล็อก CTA สีเข้มด้านบนต้องชนกับ footer พอดี
    // ถ้ามีช่องว่างขาวคั่น CTA จะดูเป็นแบนเนอร์ลอย ไม่ใช่ท้ายหน้า
    <footer className="border-t border-line bg-warm">
      {/* ลำดับคอลัมน์คือ แบรนด์ → ช่องทางติดต่อ → เมนู → บริการ
          ของเดิมช่องทางติดต่อเป็นคอลัมน์สุดท้าย ซึ่งบนจอกว้างไม่มีปัญหา
          แต่บนมือถือคอลัมน์เรียงต่อกันลงมา ผู้ใช้ต้องเลื่อนผ่านลิงก์ 14 อัน
          กว่าจะเจอเบอร์โทร — ข้อมูลที่คนเปิด footer มาหาบ่อยที่สุดอยู่ท้ายสุด
          สลับมาไว้อันที่สองแล้วลำดับตรงกันทั้งสองจอ ไม่ต้องใช้ order
          (ถ้าใช้ order ลำดับ tab ของคีย์บอร์ดจะไม่ตรงกับลำดับที่ตาเห็น) */}
      <Container className="grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_1fr] lg:py-20">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2.5"
          >
            {/* TODO: CLIENT-ASSET — แทน mark นี้ด้วยโลโก้จริงจากลูกค้า */}
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-sm bg-ink text-sm font-bold text-white"
            >
              D
            </span>
            <span className="text-base font-semibold">{site.shortName}</span>
          </Link>
          <p className="mt-5 max-w-xs text-[0.9375rem] text-ink2">
            {site.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-sm border border-line px-3.5 text-sm transition-colors duration-200 hover:border-ink hover:text-gold-700"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.15em] text-ink3 uppercase">
            Contact
          </p>
          {/* ช่องทางติดต่อทุกอันเป็นลิงก์ที่ต้องแตะได้จริง (โทร/ไลน์/อีเมล)
              ของเดิมสูงตามบรรทัด ~26px ซึ่งต่ำกว่าเกณฑ์ 44px

              วิธีแก้: ให้ลิงก์สูง 44px แล้ววางตัวอักษร "ชิดบน" (items-start)
              ไม่ใช่กึ่งกลาง — เพราะถ้ากึ่งกลาง ไอคอนที่ mt-1 จะหลุดแนวกับตัวหนังสือ
              ทันที พอชิดบนแล้วไอคอนยังตรงกับบรรทัดแรกเหมือนเดิมทุกแถว
              และเลิกใช้ space-y เพราะความสูง 44px ของแต่ละแถวคุมจังหวะแทนแล้ว
              (ระยะจากบรรทัดถึงบรรทัดขยับจาก ~40px เป็น 44px เท่านั้น) */}
          <ul className="mt-4 text-[0.9375rem] text-ink2">
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <span className="flex flex-col">
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/-/g, "")}`}
                    className="flex min-h-[44px] items-start hover:text-gold-700"
                  >
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <LineIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-start hover:text-gold-700"
              >
                {contact.lineLabel}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MailIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-[44px] items-start hover:text-gold-700"
              >
                {contact.email}
              </a>
            </li>
            <li className="mt-1 flex gap-2.5">
              <PinIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <span>
                {contact.address}
                <span className="mt-1 block text-ink3">{contact.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-nav">
          <p
            id="footer-nav"
            className="text-[11px] font-semibold tracking-[0.15em] text-ink3 uppercase"
          >
            Navigation
          </p>
          {/* ลิงก์ในลิสต์ใช้ flex (ไม่ใช่ inline-flex) โดยตั้งใจ — inline-flex
              ทำให้เป้าสัมผัสกว้างเท่าตัวหนังสือ คำสั้นอย่าง "ราคา" จึงเหลือกว้าง
              แค่ ~29px ต่ำกว่าเกณฑ์ 44px · flex ทำให้ลิงก์กินเต็มความกว้างคอลัมน์
              ตัวอักษรยังชิดซ้ายตรงกับป้ายหัวคอลัมน์เหมือนเดิม ไม่มีอะไรขยับ */}
          <ul className="mt-4 text-[0.9375rem] text-ink2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center hover:text-gold-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <p
            id="footer-services"
            className="text-[11px] font-semibold tracking-[0.15em] text-ink3 uppercase"
          >
            Services
          </p>
          <ul className="mt-4 text-[0.9375rem] text-ink2">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center hover:text-gold-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          {/* บรรทัดนี้เป็น "ปุ่มโทร" ไม่ใช่ข้อความกำกับท้ายเว็บ จึงไม่ปล่อยให้เล็ก
              12px ตามบรรทัดลิขสิทธิ์ที่อยู่ข้าง ๆ — ขนาดที่ต่างกันคือลำดับความสำคัญ
              ที่ตั้งใจ ไม่ใช่ความไม่สม่ำเสมอ · บังคับสูง 44px ให้แตะได้จริง
              ของเดิมสูงเท่าบรรทัด 16px ซึ่งต่ำกว่าเกณฑ์เป้าสัมผัสขั้นต่ำ */}
          <a
            href={telHref}
            className="inline-flex min-h-[44px] w-fit items-center text-sm transition-colors duration-200 hover:text-gold-700"
          >
            โทรหาเรา {contact.phones[0]}
          </a>
        </Container>
      </div>
    </footer>
  );
}
