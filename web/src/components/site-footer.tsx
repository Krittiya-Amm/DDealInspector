import Link from "next/link";
import { LineIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { contact, site, telHref } from "@/lib/site";

const navLinks = [
  { href: "/services", label: "บริการทั้งหมด" },
  { href: "/#process", label: "ขั้นตอนการตรวจ" },
  { href: "/#pricing", label: "ราคา" },
  { href: "/#about", label: "เกี่ยวกับเรา" },
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
      <Container className="grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
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
                  className="inline-flex min-h-[40px] items-center rounded-sm border border-line px-3 text-sm transition-colors duration-200 hover:border-ink hover:text-gold-700"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-nav">
          <p
            id="footer-nav"
            className="text-[11px] font-semibold tracking-[0.15em] text-ink3 uppercase"
          >
            Navigation
          </p>
          <ul className="mt-4 text-[0.9375rem] text-ink2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[40px] items-center hover:text-gold-700"
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
                  className="inline-flex min-h-[40px] items-center hover:text-gold-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.15em] text-ink3 uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-3.5 text-[0.9375rem] text-ink2">
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <span>
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/-/g, "")}`}
                    className="block hover:text-gold-700"
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
                className="hover:text-gold-700"
              >
                {contact.lineLabel}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MailIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-gold-700"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <PinIcon className="mt-1 size-4 shrink-0 text-ink3" />
              <span>
                {contact.address}
                <span className="mt-1 block text-ink3">{contact.hours}</span>
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href={telHref} className="hover:text-gold-700">
            โทรหาเรา {contact.phones[0]}
          </a>
        </Container>
      </div>
    </footer>
  );
}
