import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Thai } from "next/font/google";
import { ContactFab } from "@/components/contact-fab";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, credentials, site } from "@/lib/site";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// เซริฟตัวนี้โหลด latin อย่างเดียว เพราะใช้กับตัวเลขลำดับ/สถิติเท่านั้น
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  email: contact.email,
  telephone: contact.phones,
  openingHours: "Mo-Su 09:00-17:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "237/69 ถนนไทยรามัญ แขวงสามวาตะวันตก",
    addressLocality: "เขตคลองสามวา",
    addressRegion: "กรุงเทพมหานคร",
    postalCode: "10510",
    addressCountry: "TH",
  },
  sameAs: [
    contact.social.facebook,
    contact.social.instagram,
    contact.social.tiktok,
  ],
  areaServed: "กรุงเทพมหานครและปริมณฑล",
  knowsAbout: ["ตรวจบ้านก่อนโอน", "ตรวจคอนโดก่อนโอน", "ตกแต่งภายใน"],
  hasCredential: credentials.licenseBody,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${notoThai.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          ข้ามไปเนื้อหาหลัก
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* keeps the mobile FAB bar from covering the last row of the footer */}
        <div className="h-24 lg:h-0" />
        <ContactFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
