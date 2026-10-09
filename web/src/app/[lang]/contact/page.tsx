import type { Metadata } from "next";
import { ClockIcon, ExternalIcon, FacebookIcon, InstagramIcon, LineIcon, MailIcon, PhoneIcon, PinIcon, TiktokIcon } from "@/components/icons";
import { Container, LineButton, Section } from "@/components/ui";
import { dictFor, getDict } from "@/content/dict";
import { hasLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { contact, mapEmbedUrl, mapLinkUrl, telHref } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = dictFor(lang).contactPage;
  return pageMeta({ lang, path: "/contact", title: p.metaTitle, description: p.metaDescription });
}

/* ข้อ 1: ที่อยู่ตามบรีฟ (ไม่มี "ชัยพฤกษ์") ทั้งข้อความ iframe และลิงก์ Google Maps — มาจาก site.ts จุดเดียว
 * ข้อ 14, 15: พื้นที่ให้บริการ + ค่าเดินทาง ใช้ข้อความเดียวกับหน้าตรวจ
 * ข้อ 22: เพิ่มเพจ Facebook งานตกแต่ง */
export default async function ContactPage() {
  const d = await getDict();
  const p = d.contactPage;
  const ci = d.contactInfo;

  const rows = [
    { Icon: PhoneIcon, label: ci.phoneLabel, content: contact.phones.map((ph, i) => <a key={ph} href={telHref(i)} className="tnum block font-semibold hover:text-brand">{ph}</a>) },
    { Icon: MailIcon, label: ci.emailLabel, content: <a href={`mailto:${contact.email}`} className="font-semibold break-all hover:text-brand">{contact.email}</a> },
    { Icon: ClockIcon, label: ci.hoursLabel, content: <span className="font-semibold">{ci.hours}</span> },
    { Icon: PinIcon, label: ci.addressLabel, content: <span>{ci.address}</span> },
  ];

  const socials = [
    { url: contact.social.facebook, label: ci.facebookInspector, Icon: FacebookIcon },
    { url: contact.social.facebookInterior, label: ci.facebookInterior, Icon: FacebookIcon },
    { url: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: contact.social.tiktok, label: "TikTok", Icon: TiktokIcon },
  ];

  return (
    <>
      <section className="bg-brand-soft">
        <Container className="py-10 sm:py-14">
          <h1 className="text-[1.875rem] font-bold sm:text-5xl">{p.title}</h1>
          <p className="mt-3 max-w-xl text-muted sm:text-lg">{p.lead}</p>
        </Container>
      </section>

      <Section tone="white">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <div className="rounded-[var(--radius-card)] bg-brand-deep p-6 text-white sm:p-8">
              <span className="grid size-14 place-items-center rounded-2xl bg-line-brand text-white">
                <LineIcon className="size-8" />
              </span>
              <h2 className="mt-4 text-2xl font-bold">{p.lineCardTitle}</h2>
              <p className="mt-2 text-white/85">{p.lineCardBody}</p>
              <p className="mt-1 text-sm text-white/70">{contact.lineLabel}</p>
              <LineButton label={d.cta.lineBook} size="lg" variant="white" full className="mt-5" />
            </div>

            <dl className="divide-y divide-line rounded-[var(--radius-card)] bg-white px-5 shadow-card ring-1 ring-line">
              {rows.map(({ Icon, label, content }) => (
                <div key={label} className="flex gap-4 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-subtle">{label}</dt>
                    <dd className="mt-0.5">{content}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div>
              <p className="font-bold">{ci.socialLabel}</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {socials.map(({ url, label, Icon }) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-2 rounded-xl bg-surface px-3 text-sm font-semibold ring-1 ring-line hover:bg-brand-soft">
                      <Icon className="size-5 text-brand" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{p.mapTitle}</h2>
            <div className="mt-3 flex-1 overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line">
              <iframe
                title={p.mapIframeTitle}
                src={mapEmbedUrl}
                className="h-full min-h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand hover:underline">
              {d.cta.openMap}
              <ExternalIcon className="size-4" />
            </a>
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-surface p-4 text-sm text-muted">
              <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
              {d.common.serviceArea} {d.common.travelFee}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
