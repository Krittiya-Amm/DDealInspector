import Link from "next/link";
import {
  ArrowIcon,
  BadgeCheckIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TiktokIcon,
} from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { Container, LineButton } from "@/components/ui";
import { getDict, getLang } from "@/content/dict";
import { href } from "@/lib/i18n";
import { contact, inspectionIds, telHref } from "@/lib/site";

/* footer — กรอบมนพื้นสว่างแบบเดียวกับ hero (หัว-ท้ายเว็บเข้าชุด)
 *
 * รอบ "เรียบกว่านี้ สั้นลง" (ต.ค. 2569): ชั้นเดียว 4 คอลัมน์ + แถบลิขสิทธิ์
 *   แบรนด์ + ใบ กว. · บริการตรวจ · เว็บไซต์ (รวมลิงก์งานตกแต่ง) · ติดต่อ (เบอร์ อีเมล เวลา ที่อยู่ พื้นที่ LINE โซเชียล)
 * ตัดการ์ดภาพงานตกแต่ง การ์ดพื้นที่ให้บริการ และ wordmark "D Deal" ออก
 * ข้อมูลทุกช่องมาจาก site.ts / dict (ข้อมูลที่ลูกค้ายืนยันแล้ว) — ข้อ 1, 14, 22 ของชีตแก้ไข */

/** หัวคอลัมน์ — ขีดทองสั้นแบบเดียวกับป้ายหัว section */
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-ink">
      <span aria-hidden className="h-0.5 w-5 rounded-full bg-gold-deep" />
      {children}
    </p>
  );
}

/** ลิงก์ในคอลัมน์ — ตัดบรรทัดเฉพาะตรงเว้นวรรค (กันคำไทยถูกตัดกลางคำในคอลัมน์แคบ) */
function FootLink({ href: to, children }: { href: string; children: string }) {
  return (
    <Link href={to} className="inline-flex min-h-9 items-center py-0.5 text-sm leading-snug text-muted transition-colors hover:text-ink sm:text-[0.9375rem]">
      <span>
        {children.split(" ").map((w, i, a) => (
          <span key={i} className="inline-block">
            {w}
            {i < a.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Link>
  );
}

export async function SiteFooter() {
  const lang = await getLang();
  const d = await getDict();
  const ci = d.contactInfo;

  const socials = [
    { url: contact.social.facebook, label: ci.facebookInspector, Icon: FacebookIcon },
    { url: contact.social.facebookInterior, label: ci.facebookInterior, Icon: FacebookIcon },
    { url: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: contact.social.tiktok, label: "TikTok", Icon: TiktokIcon },
  ];

  const siteLinks: [string, string][] = [
    ["/", d.nav.home],
    ["/services", d.nav.servicesAll],
    ["/services/interior", d.nav.interiorGroup],
    ["/services/inspection#pricing", d.cta.seeStartPrice],
    ["/articles", d.nav.articles],
    ["/contact", d.nav.contact],
  ];

  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="rounded-[1.75rem] bg-paper ring-1 ring-ink/5 sm:rounded-[2rem]">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-x-10">
          {/* แบรนด์ */}
          <div className="col-span-2 lg:col-span-3">
            <Link href={href(lang, "/")} className="inline-flex items-center gap-3" aria-label={d.meta.siteTitle}>
              <span className="grid size-12 place-items-center rounded-2xl bg-white ring-1 ring-ink/10">
                <LogoMark className="h-8 w-auto" />
              </span>
              <span className="leading-tight">
                <span className="block font-bold text-ink">D Deal</span>
                <span className="block text-sm text-muted">Inspector &amp; Interior</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{d.footer.about}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white py-1 pr-3.5 pl-1 text-[0.8125rem] font-semibold text-ink ring-1 ring-ink/10">
              <span className="grid size-6 place-items-center rounded-full bg-gold text-ink">
                <BadgeCheckIcon className="size-3.5" />
              </span>
              {d.common.licenceBadge} · {d.common.coe}
            </p>
          </div>

          {/* บริการตรวจ */}
          <nav aria-label={d.nav.inspectionGroup} className="lg:col-span-3">
            <ColHead>{d.nav.inspectionGroup}</ColHead>
            <ul className="mt-3">
              {inspectionIds.map((id) => (
                <li key={id}>
                  <FootLink href={href(lang, `/services/inspection#${id}`)}>{d.inspection[id].name}</FootLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* เว็บไซต์ */}
          <nav aria-label={d.footer.company} className="lg:col-span-2">
            <ColHead>{d.footer.company}</ColHead>
            <ul className="mt-3">
              {siteLinks.map(([p, label]) => (
                <li key={p}>
                  <FootLink href={href(lang, p)}>{label}</FootLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ติดต่อ */}
          <div className="col-span-2 lg:col-span-4">
            <ColHead>{d.footer.reach}</ColHead>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="size-4 shrink-0 text-brand" />
                <span className="flex flex-wrap gap-x-3">
                  {contact.phones.map((p, i) => (
                    <a key={p} href={telHref(i)} className="tnum font-semibold text-ink hover:text-brand">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${contact.email}`} className="hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon className="size-4 shrink-0 text-brand" />
                {ci.hours}
              </li>
              <li className="flex gap-2.5">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  {ci.address}
                  {/* พื้นที่ให้บริการ (ข้อ 14) — บรรทัดเดียวใต้ที่อยู่ */}
                  <span className="mt-1 block text-ink">{d.common.serviceArea}</span>
                </span>
              </li>
            </ul>
            <div className="mt-5">
              <LineButton label={d.cta.lineBook} size="sm" />
            </div>
            <div className="mt-3 flex gap-2">
              {socials.map(({ url, label, Icon }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-11 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white"
                >
                  <Icon className="size-[1.125rem]" />
                </a>
              ))}
            </div>
          </div>
        </Container>

        {/* แถบลิขสิทธิ์ · นโยบาย · กลับขึ้นด้านบน */}
        <div className="border-t border-ink/10">
          {/* จอใหญ่เว้นขวาให้พ้นปุ่มลอย LINE (fixed มุมขวาล่าง) ไม่ให้บังลิงก์ท้ายแถว */}
          <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-sm text-muted lg:pr-36 xl:pr-28">
            <p>
              © {new Date().getFullYear()} {d.meta.siteTitle}. {d.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-5">
              <Link href={href(lang, "/privacy")} className="inline-flex min-h-11 items-center hover:text-ink">
                {d.footer.privacy}
              </Link>
              <Link href={href(lang, "/terms")} className="inline-flex min-h-11 items-center hover:text-ink">
                {d.footer.terms}
              </Link>
              <a href="#main" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-ink">
                {d.footer.top}
                <span className="grid size-8 place-items-center rounded-full bg-white ring-1 ring-ink/15 transition-colors group-hover:bg-ink group-hover:text-white">
                  <ArrowIcon className="size-4 -rotate-90" />
                </span>
              </a>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
