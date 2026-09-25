import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Thai } from "next/font/google";
import { ContactFab } from "@/components/contact-fab";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { openGraphBase } from "@/lib/seo";
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
  // canonical ที่ layout ครอบเฉพาะหน้าแรก — หน้าอื่นประกาศของตัวเองผ่าน pageMeta()
  // เพราะค่าที่ layout resolve เทียบ metadataBase ไม่ใช่ path ปัจจุบัน ดู src/lib/seo.ts
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphBase,
    url: "/",
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
        {/* overflow-x-clip กันหน้าปัดซ้ายขวาได้บนมือถือ
            ต้นเหตุคือท่าเข้า [data-reveal="right"] ที่ดันตัวเองไปทางขวา 1.75rem
            ระหว่างรอคิวแสดง ของที่ยังไม่ถูกเผยจึงยื่นพ้นขอบขวาของจอ
            ที่จอ 390px ขอบขวาเนื้อหาอยู่ 370 + 28 = 398 เกินมา 8px
            (จอ 768 ขึ้นไปไม่เจอ เพราะ Container มี padding ข้างละ 32px ขึ้นไป ระยะ 28px จึงยังพอดี)

            clip ไม่ใช่ hidden — hidden สร้าง scroll container ขึ้นมาใหม่ แล้ว
            position:sticky ทุกตัวที่อยู่ข้างใน (แถบสารบัญของหน้าบริการ คอลัมน์ซ้าย
            ที่หนึบใน WhyInspect/InspectionProcess/Toolkit) จะไปยึดกล่องนั้นแทน viewport
            แล้วหยุดทำงานแบบไม่มี error ส่วน clip แค่ตัดส่วนที่ล้นทิ้ง ไม่สร้างกล่องเลื่อน
            sticky จึงยังยึด viewport เหมือนเดิม — ห้ามสลับเป็น hidden เด็ดขาด

            และวางที่ <main> ไม่ใช่ <body> เพราะ overflow ของ body ถูก propagate
            ขึ้นไปที่ viewport ตามสเปก ตัว body เองเลยกลับไปเป็น visible แล้วไม่ตัดอะไรเลย
            (ลองมาแล้ว: computed เป็น clip จริง แต่ยังปัดขวาได้ 8px เท่าเดิม)

            แก้รวมที่นี่แทนการห้ามใช้ท่า "right" เพราะกฎคือ "transform ตกแต่ง
            ต้องไม่ขยายพื้นที่เลื่อนของเอกสาร" ซึ่งเป็นกฎระดับหน้า ไม่ใช่ข้อจำกัดของ section ใด */}
        <main id="main" className="flex-1 overflow-x-clip">
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
