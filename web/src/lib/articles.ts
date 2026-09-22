// Article bodies live in src/app/articles/<slug>/page.mdx — this file is the index
// that feeds the listing page and the homepage teasers.
// TODO: CONTENT — เนื้อหาทั้งหมดเป็นตัวอย่างสำหรับวาง template รอบทความจริง

export const articleCategories = {
  inspection: { label: "ความรู้ตรวจบ้าน" },
  interior: { label: "สไตล์การตกแต่ง" },
};

export type ArticleCategory = keyof typeof articleCategories;

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readingTime: string;
  image: string;
};

export const articles: Article[] = [
  {
    slug: "condo-checklist",
    image: "article-condo.jpg",
    title: "เช็กลิสต์ 12 จุดที่ต้องดูก่อนเซ็นรับโอนคอนโด",
    excerpt:
      "จุดที่คนส่วนใหญ่มองข้ามตอนตรวจห้องเอง แล้วมารู้ตัวหลังโอนไปแล้วว่าแก้ยากกว่าที่คิด",
    category: "inspection",
    date: "2026-09-10",
    readingTime: "6 นาที",
  },
  {
    slug: "crack-types",
    image: "article-crack.jpg",
    title: "รอยร้าวแบบไหนอันตราย แบบไหนแค่รอยสี",
    excerpt:
      "ไม่ใช่ทุกรอยร้าวจะแปลว่าโครงสร้างมีปัญหา แต่มีบางลักษณะที่ต้องรีบให้วิศวกรดู",
    category: "inspection",
    date: "2026-09-03",
    readingTime: "5 นาที",
  },
  {
    slug: "defect-report-to-developer",
    image: "article-defect.jpg",
    title: "ตรวจบ้านเจอปัญหา แจ้งโครงการอย่างไรให้เขาแก้จริง",
    excerpt:
      "รายงานที่ระบุตำแหน่งและอ้างอิงมาตรฐานได้ ทำให้การคุยกับโครงการจบเร็วกว่าการเถียงกันด้วยความรู้สึก",
    category: "inspection",
    date: "2026-08-25",
    readingTime: "7 นาที",
  },
  {
    slug: "curtain-by-direction",
    image: "article-curtain.jpg",
    title: "เลือกผ้าม่านตามทิศของบ้าน ให้ห้องไม่ร้อนและไม่มืด",
    excerpt:
      "ทิศตะวันตกกับทิศเหนือต้องการผ้าคนละแบบ เลือกผิดคือได้ห้องมืดแต่ยังร้อนอยู่ดี",
    category: "interior",
    date: "2026-08-18",
    readingTime: "5 นาที",
  },
];

export const formatThaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
