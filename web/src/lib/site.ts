/* ข้อมูลธุรกิจกลางที่ "ไม่ขึ้นกับภาษา" — เบอร์ ลิงก์ ราคา ตัวเลขสถิติ
 *
 * ทุกค่าในไฟล์นี้มาจากแท็บ "ข้อมูลที่ถูกต้อง (อ้างอิง)" ในไฟล์
 * DDeal_Website_Revision_Comments.xlsx (ยืนยันกับลูกค้า 28–30 ก.ย. 2569)
 * ห้ามเพิ่มตัวเลขหรือข้อกล่าวอ้างที่ไม่มีในแท็บนั้น
 *
 * ข้อความที่ต้องแปล (ชื่อบริการ คำอธิบาย ป้ายปุ่ม) อยู่ใน src/content/dict/{th,en}.ts
 * ไฟล์นี้เก็บเฉพาะค่าที่เหมือนกันทั้งสองภาษา แก้ที่เดียวแล้วตรงกันทั้งเว็บ */

export const site = {
  name: "D Deal Inspector & Interior",
  shortName: "D Deal",
  // โดเมนจริงตั้งผ่าน env ตอน deploy — fallback คือ Vercel preview ที่ใช้อยู่
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://ddealinspector-portfolio-ssk.vercel.app",
} as const;

export const contact = {
  email: "ddealservice@gmail.com",
  phones: ["086-388-6226", "085-509-5831"],
  lineUrl: "https://lin.ee/YuAmDGQF",
  lineLabel: "@ddealinspector",
  social: {
    facebook: "https://www.facebook.com/Ddealinspector",
    facebookInterior:
      "https://www.facebook.com/DdealInteriordesignandconstruction",
    instagram: "https://www.instagram.com/d_deal_inspector/",
    tiktok: "https://www.tiktok.com/@ddealinspector",
  },
  /* query ของแผนที่ใช้ที่อยู่ตามบรีฟคำต่อคำ (ไม่มีคำว่า "ชัยพฤกษ์" แล้ว — ข้อ 1)
     ใช้ชื่อหมู่บ้าน + เลขที่ + ถนน + เขต เพื่อให้หมุดลงตำแหน่งหมู่บ้านจริง */
  mapQuery:
    "K.Riz Town จตุโชติ-รามอินทรา 237/69 ถนนไทยรามัญ สามวาตะวันตก คลองสามวา กรุงเทพฯ 10510",
} as const;

export const telHref = (i = 0) => `tel:${contact.phones[i].replace(/-/g, "")}`;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  contact.mapQuery,
)}&z=16&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.mapQuery,
)}`;

export const credentials = {
  /* เลขใบ กว. ยังไม่ได้รับจากลูกค้า — null = ไม่แสดงเลข
     ห้ามใส่เลขสมมติ เพราะบล็อกนี้ชวนให้คนเอาเลขไปค้นที่สภาวิศวกรเอง */
  licenseNo: null as string | null,
  verifyUrl: "https://service.coe.or.th/",
} as const;

/** ราคาเริ่มต้น — แสดงเฉพาะสองบริการนี้เท่านั้น (ข้อ 6–10)
 *  บริการเฉพาะกรณีและงานตกแต่งไม่แสดงราคา ให้ทักไลน์สอบถามแทน */
export const prices = {
  condo: "3,000",
  house: "5,000",
} as const;

/** ตัวเลขสถิติที่ลูกค้ายืนยัน 30 ก.ย. 2569 (ข้อ 5) */
export const statValues = ["3,500+", "6+", "350+", "98%"] as const;

/** id ของบริการตรวจ — ใช้เป็น anchor ในหน้า /services/inspection ด้วย
 *  สองตัวแรกคือบริการหลัก อีกสี่ตัวคือบริการเฉพาะกรณี (รวม 6 — ข้อ 2–4) */
export const inspectionIds = [
  "house",
  "condo",
  "construction",
  "secondhand",
  "recheck",
  "repair",
] as const;
export type InspectionId = (typeof inspectionIds)[number];

export const interiorIds = [
  "curtain",
  "wallpaper",
  "spc-floor",
  "window-film",
  "bird-net",
  "extension",
  "glass-partition",
  "drying-rack",
  "built-in",
] as const;
export type InteriorId = (typeof interiorIds)[number];

/** ภาพประจำบริการ — TODO: CLIENT-ASSET ทุกใบยังเป็นภาพ stock
 *  ได้ภาพจริงจากเพจลูกค้าเมื่อไหร่ วางไฟล์ทับชื่อเดิมใน public/images ได้เลย */
export const interiorImages: Record<InteriorId, string> = {
  curtain: "curtain.jpg",
  wallpaper: "wallpaper.jpg",
  "spc-floor": "spc-floor.jpg",
  "window-film": "window-film.jpg",
  "bird-net": "bird-net.jpg",
  extension: "extension.jpg",
  "glass-partition": "glass-partition.jpg",
  "drying-rack": "drying-rack.jpg",
  "built-in": "built-in.jpg",
};

/* เปลี่ยนจาก hero.jpg (มีลายน้ำ Unsplash+ = ภาพเสียเงินที่ยังไม่ได้ซื้อ) เป็นภาพที่ไม่มีลายน้ำ
   TODO: CLIENT-ASSET — ทุกใบยังเป็นภาพแทน รอภาพหน้างานจริงของทีม */
export const inspectionImages: Partial<Record<InspectionId, string>> = {
  house: "hero-inspector.jpg",
  condo: "article-condo.jpg",
  construction: "extension.jpg",
};
