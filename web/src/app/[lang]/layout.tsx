import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import { ContactFab } from "@/components/contact-fab";
import { ScrollTop, scrollRestorationScript } from "@/components/scroll-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictFor } from "@/content/dict";
import { hasLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { contact, site } from "@/lib/site";
import "../globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = dictFor(lang);
  // title ต้องอยู่หลัง spread — pageMeta คืน title แบบ absolute ซึ่งจะทับ template ของหน้าย่อยทิ้ง
  return {
    metadataBase: new URL(site.url),
    ...pageMeta({ lang, path: "/", title: `${site.name} | ${d.meta.tagline}`, description: d.meta.description, absoluteTitle: true }),
    title: { default: `${site.name} | ${d.meta.tagline}`, template: `%s | ${site.name}` },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = dictFor(lang);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: d.meta.description,
    url: site.url,
    email: contact.email,
    telephone: contact.phones,
    openingHours: "Mo-Su 09:00-17:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "th" ? "237/69 ถ.ไทยรามัญ แขวงสามวาตะวันตก" : "237/69 Thai Raman Road, Sam Wa Tawan Tok",
      addressLocality: lang === "th" ? "เขตคลองสามวา" : "Khlong Sam Wa",
      addressRegion: lang === "th" ? "กรุงเทพมหานคร" : "Bangkok",
      postalCode: "10510",
      addressCountry: "TH",
    },
    areaServed: d.common.serviceArea,
    sameAs: Object.values(contact.social),
  };

  return (
    <html lang={lang} className={`${notoThai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* ปิดการจำตำแหน่งเลื่อนก่อนหน้าเรนเดอร์ — รีเฟรชแล้วเริ่มบนสุดเสมอ */}
        <script dangerouslySetInnerHTML={{ __html: scrollRestorationScript }} />
        <ScrollTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          {d.nav.skip}
        </a>
        <SiteHeader />
        {/* overflow-x-clip (ไม่ใช่ hidden) — hidden สร้าง scroll container ใหม่แล้ว sticky ภายในพัง */}
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        {/* เว้นที่ให้แถบปุ่มลอยมือถือไม่บังแถวสุดท้ายของ footer */}
        <div className="h-[4.5rem] lg:hidden" />
        <ContactFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
