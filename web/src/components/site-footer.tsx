import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TiktokIcon,
} from "@/components/icons";
import { LogoMark } from "@/components/logo";
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

// ไอคอนแบรนด์แทนป้ายตัวหนังสือ — สั้นกว่า อ่านออกทันทีในแถวเดียว
// ปุ่มไอคอนล้วนต้องมี aria-label เพราะไม่มีตัวหนังสือให้ screen reader อ่าน
const socials = [
  { label: "Facebook", href: contact.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: contact.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: contact.social.tiktok, Icon: TiktokIcon },
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
          (ถ้าใช้ order ลำดับ tab ของคีย์บอร์ดจะไม่ตรงกับลำดับที่ตาเห็น)

          ลดความสูง footer ~30%: ตัวการหลักคือคอลัมน์ Navigation ที่มีลิงก์ 8 อัน
          เรียงลงมา แต่ละอันสูง 44px (เกณฑ์เป้าสัมผัส ห้ามหด) รวม ~350px เป็นตัว
          กำหนดความสูงทั้งแถว · แก้โดยจัดลิงก์ทั้ง Navigation และ Services เป็น
          2 คอลัมน์ (grid-cols-2) จำนวนแถวลดครึ่ง ความสูงคอลัมน์ลดตาม โดยลิงก์
          ทุกอันยังสูง 44px เท่าเดิม ไม่เสียเกณฑ์สัมผัส · เสริมด้วยการหด padding
          แนวตั้ง (py-16/20 → py-10/14) และแถบล่าง (py-6 → py-4) ให้แน่นขึ้น */}
      <Container className="grid gap-x-8 gap-y-10 py-8 sm:grid-cols-2 lg:grid-cols-[0.9fr_1.2fr_1.2fr_1.2fr] lg:py-10">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2.5"
          >
            <LogoMark className="h-9 w-auto" />
            <span className="text-base font-semibold">{site.shortName}</span>
          </Link>
          <p className="mt-5 max-w-xs text-base text-ink2">
            {site.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-sm border border-line text-ink2 transition-colors duration-200 hover:border-ink hover:text-gold-700"
                >
                  <Icon className="size-5" />
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
            {/* เบอร์โทรสองเลขวางเรียงข้างกัน (flex-wrap gap-x-5) ไม่ใช่ซ้อนลงมา
                — ประหยัดความสูง 44px ในคอลัมน์ Contact ซึ่งเป็นคอลัมน์ที่สูงสุด
                และเป็นตัวกำหนดความสูงทั้ง footer · แต่ละเบอร์ยังเป็นลิงก์สูง 44px
                gap-x-5 (20px) ให้ระยะห่างเป้าสัมผัสเกิน 8px ตามเกณฑ์ */}
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <span className="flex flex-wrap gap-x-5">
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
              ตัวอักษรยังชิดซ้ายตรงกับป้ายหัวคอลัมน์เหมือนเดิม ไม่มีอะไรขยับ

              ลดระยะห่างระหว่างบรรทัดเมนู: ความสูงแถว 44px คือ "เป้าสัมผัส" ที่จำเป็น
              บนจอสัมผัสเท่านั้น — บนเมาส์ (ตัวชี้ละเอียด) ไม่ต้องใช้ 44px ก็คลิกแม่น
              จึงหุบเหลือ 32px เฉพาะ pointer-fine (เมาส์/แทร็กแพด) ส่วน pointer-coarse
              (นิ้วสัมผัส) ยังได้ 44px เต็มตามเกณฑ์ CRITICAL ไม่ลดเป้าสัมผัสบนมือถือ */}
          <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[0.9375rem] text-ink2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center hover:text-gold-700 pointer-fine:min-h-[32px]"
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
          <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[0.9375rem] text-ink2">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center hover:text-gold-700 pointer-fine:min-h-[32px]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-4 text-xs text-ink3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <nav
              aria-label="นโยบายและข้อกำหนด"
              className="flex flex-wrap items-center gap-x-5"
            >
              <Link
                href="/privacy"
                className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-gold-700 sm:min-h-0"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link
                href="/terms"
                className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-gold-700 sm:min-h-0"
              >
                ข้อกำหนดการใช้บริการ
              </Link>
            </nav>
          </div>
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
