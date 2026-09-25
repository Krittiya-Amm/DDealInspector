import type { Metadata } from "next";
import { site } from "@/lib/site";

/** ฟิลด์ openGraph ที่ทุกหน้าต้องมีเหมือนกัน
 *
 *  ทำไมต้อง spread ซ้ำทุกหน้าแทนที่จะตั้งไว้ที่ root layout ที่เดียว:
 *  เอกสาร Next (generate-metadata หัวข้อ Ordering) ระบุว่า metadata ของแต่ละ
 *  segment merge กันแบบ "ตื้น" — ฟิลด์ซ้อนอย่าง openGraph ที่ segment ล่าง
 *  ประกาศ จะทับของ segment บน "ทั้งก้อน" ไม่ได้รวมทีละคีย์
 *
 *  ผลที่เจอจริงตอนเพิ่ม canonical รอบนี้: พอหน้าย่อยตั้ง openGraph.title เอง
 *  เพื่อไม่ให้สืบทอดชื่อหน้าแรก og:image ที่มาจาก file convention หายไปหมดทุกหน้า
 *  เหลือแค่หน้าแรกที่ยังมี ตรวจเจอตอนอ่าน <head> ของทั้ง 7 หน้าเทียบกัน
 *  ไม่ใช่ตอน build (build ผ่านปกติ เพราะมันไม่ใช่ error) */
const openGraphShared = {
  type: "website",
  locale: "th_TH",
  siteName: site.name,
  // path นี้คือ route ที่ Next สร้างจาก src/app/opengraph-image.tsx
  // ต้องเขียน images เองเพราะกฎ merge ข้างบนทำให้ภาพจาก file convention หลุด
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${site.name} — ${site.tagline}`,
    },
  ],
} satisfies Metadata["openGraph"];

export const openGraphBase: Metadata["openGraph"] = openGraphShared;

/** metadata ของหน้าหนึ่ง ๆ — ใช้ตัวนี้แทนการเขียน object เองทุกหน้า
 *
 *  นอกจาก openGraph ข้างบนแล้ว ยังมีอีกฟิลด์ที่ "สืบทอดแล้วผิด":
 *
 *  alternates.canonical — ค่าที่ layout ตั้งไว้ resolve เทียบกับ metadataBase
 *  เท่านั้น ไม่ได้เทียบกับ path ของหน้าที่กำลังเรนเดอร์ (ตาราง URL Composition
 *  ในเอกสาร Next ระบุว่า "./" กับ "/" ให้ผลเดียวกันคือ origin เปล่า ๆ)
 *  ถ้าตั้งที่ layout ที่เดียว ทุกหน้าจะได้ canonical ชี้กลับหน้าแรกหมด
 *  = บอก Google ว่าทั้งเว็บมีหน้าเดียว หน้าอื่นไม่ต้อง index
 *
 *  title template "%s | ชื่อเว็บ" อยู่ใน root layout ซึ่ง og:title ไม่ได้ใช้
 *  จึงต้องประกอบเองให้ตรงกัน ไม่งั้นหัวเรื่องบนแท็บกับบนการ์ดแชร์จะคนละแบบ */
export function pageMeta({
  path,
  title,
  description,
}: {
  /** path จริงของหน้า ขึ้นต้นด้วย "/" เสมอ และไม่ต้องใส่โดเมน */
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphShared,
      url: path,
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
