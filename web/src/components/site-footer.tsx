import Link from "next/link";
import {
  ClockIcon,
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
import { getDict, getLang } from "@/content/dict";
import { href } from "@/lib/i18n";
import { contact, inspectionIds, telHref } from "@/lib/site";

export async function SiteFooter() {
  const lang = await getLang();
  const d = await getDict();
  const ci = d.contactInfo;

  const socials = [
    { url: contact.social.facebook, label: ci.facebookInspector, Icon: FacebookIcon },
    { url: contact.social.facebookInterior, label: ci.facebookInterior, Icon: FacebookIcon },
    { url: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: contact.social.tiktok, label: "TikTok", Icon: TiktokIcon },
    { url: contact.lineUrl, label: "LINE", Icon: LineIcon },
  ];

  return (
    <footer className="bg-brand-deep text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.3fr]">
        <div>
          <Link href={href(lang, "/")} className="inline-flex items-center gap-2.5">
            <span className="grid size-12 place-items-center rounded-xl bg-white">
              <LogoMark className="h-8 w-auto" />
            </span>
            <span className="font-bold text-white">{d.meta.siteTitle}</span>
          </Link>
          <p className="mt-4 text-sm">{d.footer.about}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ url, label, Icon }) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-11 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={d.footer.services}>
          <h2 className="font-bold text-white">{d.footer.services}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {inspectionIds.map((id) => (
              <li key={id}>
                <Link href={href(lang, `/services/inspection#${id}`)} className="inline-flex min-h-9 items-center hover:text-gold">
                  {d.inspection[id].name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href(lang, "/services/interior")} className="inline-flex min-h-9 items-center hover:text-gold">
                {d.nav.interior}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={d.footer.company}>
          <h2 className="font-bold text-white">{d.footer.company}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[
              ["/", d.nav.home],
              ["/services", d.nav.servicesAll],
              ["/services/inspection#pricing", d.cta.seeStartPrice],
              ["/articles", d.nav.articles],
              ["/contact", d.nav.contact],
            ].map(([p, label]) => (
              <li key={p}>
                <Link href={href(lang, p)} className="inline-flex min-h-9 items-center hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-bold text-white">{d.footer.contact}</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>{ci.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="flex flex-wrap gap-x-3">
                {contact.phones.map((p, i) => (
                  <a key={p} href={telHref(i)} className="tnum hover:text-gold">
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 size-5 shrink-0 text-gold" />
              <a href={`mailto:${contact.email}`} className="hover:text-gold">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>{ci.hours}</span>
            </li>
          </ul>
          {/* พื้นที่ให้บริการใต้ข้อมูลติดต่อ (ข้อ 14) */}
          <p className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
            {d.common.serviceArea}
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} {d.meta.siteTitle}. {d.footer.rights}
          </p>
          <p className="flex gap-4">
            <Link href={href(lang, "/privacy")} className="inline-flex min-h-9 items-center hover:text-white">
              {d.footer.privacy}
            </Link>
            <Link href={href(lang, "/terms")} className="inline-flex min-h-9 items-center hover:text-white">
              {d.footer.terms}
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
