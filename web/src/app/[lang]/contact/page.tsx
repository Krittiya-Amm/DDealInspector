import type { Metadata } from "next";
import { ClockIcon, ExternalIcon, FacebookIcon, GlobeIcon, InstagramIcon, LineIcon, MailIcon, PhoneIcon, PinIcon, TiktokIcon } from "@/components/icons";
import { PlainHero } from "@/components/blocks";
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
 * ข้อ 22: เพิ่มเพจ Facebook งานตกแต่ง
 * layout: แถวช่องทางติดต่อ 3 ช่อง (LINE เด่นสุด กว้างสุด) → แผนที่ใหญ่ + แผงข้อมูลที่ตั้ง → โซเชียล */
export default async function ContactPage() {
  const d = await getDict();
  const p = d.contactPage;
  const ci = d.contactInfo;

  const socials = [
    { url: contact.social.facebook, label: ci.facebookInspector, Icon: FacebookIcon },
    { url: contact.social.facebookInterior, label: ci.facebookInterior, Icon: FacebookIcon },
    { url: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: contact.social.tiktok, label: "TikTok", Icon: TiktokIcon },
  ];

  return (
    <>
      <PlainHero
        title={p.title}
        lead={p.lead}
        aside={
          <p className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 lg:float-right">
            <ClockIcon className="size-4 text-brand" />
            {ci.hoursLabel} {ci.hours}
          </p>
        }
      />

      <Section tone="white">
        <Container>
          {/* ช่องทางติดต่อ */}
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="flex flex-col rounded-[1.75rem] bg-ink p-6 text-white sm:p-8 lg:col-span-5">
              <span className="grid size-14 place-items-center rounded-2xl bg-line-brand text-white">
                <LineIcon className="size-8" />
              </span>
              <h2 className="mt-5 text-2xl font-bold sm:text-[1.75rem]">{p.lineCardTitle}</h2>
              <p className="mt-2 text-white/80">{p.lineCardBody}</p>
              <p className="mt-1 text-sm text-white/70">{contact.lineLabel}</p>
              <div className="mt-auto pt-6">
                <LineButton label={d.cta.lineBook} size="lg" variant="white" />
              </div>
            </div>

            <div className="flex flex-col rounded-[1.75rem] bg-paper p-6 sm:p-8 lg:col-span-3">
              <PhoneIcon className="size-6 text-brand" />
              <h2 className="mt-5 text-sm font-semibold text-muted">{ci.phoneLabel}</h2>
              <ul className="mt-2 space-y-1">
                {contact.phones.map((ph, i) => (
                  <li key={ph}>
                    <a href={telHref(i)} className="tnum inline-flex min-h-11 items-center text-xl font-bold text-ink hover:text-brand">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col rounded-[1.75rem] bg-paper p-6 sm:p-8 lg:col-span-4">
              <MailIcon className="size-6 text-brand" />
              <h2 className="mt-5 text-sm font-semibold text-muted">{ci.emailLabel}</h2>
              <a href={`mailto:${contact.email}`} className="mt-2 inline-flex min-h-11 items-center text-lg font-bold [overflow-wrap:anywhere] text-ink hover:text-brand">
                {contact.email}
              </a>
            </div>
          </div>

          {/* แผนที่ + ที่ตั้ง */}
          <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold sm:text-2xl">{p.mapTitle}</h2>
              <dl className="mt-5 border-t border-ink/10">
                {[
                  { Icon: PinIcon, label: ci.addressLabel, value: ci.address },
                  { Icon: GlobeIcon, label: ci.areaLabel, value: `${d.common.serviceArea} ${d.common.travelFee}` },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-3 border-b border-ink/10 py-4">
                    <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <dt className="text-sm text-muted">{label}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline">
                {d.cta.openMap}
                <ExternalIcon className="size-4" />
              </a>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-ink/10 lg:col-span-8">
              <iframe
                title={p.mapIframeTitle}
                src={mapEmbedUrl}
                className="h-80 w-full sm:h-[26rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* โซเชียล */}
          <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:mt-16 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-bold">{ci.socialLabel}</p>
            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {socials.map(({ url, label, Icon }) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-white">
                    <Icon className="size-[1.125rem]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
