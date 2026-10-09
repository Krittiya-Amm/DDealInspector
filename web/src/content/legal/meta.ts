// ข้อมูลหัวเอกสารของหน้ากฎหมาย — เนื้อหาอยู่ที่ <slug>.<lang>.mdx ในโฟลเดอร์เดียวกัน
// updated คือวันที่แก้เนื้อหาล่าสุด (ISO) — เปลี่ยนทุกครั้งที่แก้ไฟล์ .mdx
// หน้าเดิมไม่มีวันที่ระบุ จึงใช้วันที่ commit ล่าสุดของหน้าเดิม (2026-09-28)

export const legalMeta = {
  privacy: {
    th: {
      title: "นโยบายความเป็นส่วนตัว",
      description:
        "นโยบายความเป็นส่วนตัวของ D Deal Inspector & Interior วิธีที่เราเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
      updated: "2026-09-28",
    },
    en: {
      title: "Privacy Policy",
      description:
        "How D Deal Inspector & Interior collects, uses and protects your personal data under Thailand's Personal Data Protection Act (PDPA).",
      updated: "2026-09-28",
    },
  },
  terms: {
    th: {
      title: "ข้อกำหนดการใช้บริการ",
      description:
        "ข้อกำหนดและเงื่อนไขการใช้บริการของ D Deal Inspector & Interior ขอบเขตบริการ การนัดหมาย และความรับผิดของรายงานผลการตรวจ",
      updated: "2026-09-28",
    },
    en: {
      title: "Terms of Service",
      description:
        "Terms and conditions for using D Deal Inspector & Interior: scope of service, bookings, and the limits of our inspection reports.",
      updated: "2026-09-28",
    },
  },
} as const;

export type LegalSlug = keyof typeof legalMeta;

export default legalMeta;
