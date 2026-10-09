// ดัชนีบทความ — เนื้อหาแต่ละภาษาอยู่ที่ src/content/articles/<slug>.<lang>.mdx
// ไฟล์นี้ป้อนข้อมูลให้หน้ารวมบทความและบทความแนะนำบนหน้าแรก

export type Lang = "th" | "en";

export const articleCategories = {
  inspection: { th: "ความรู้ตรวจบ้าน", en: "Inspection Guides" },
  interior: { th: "สไตล์การตกแต่ง", en: "Interior Styles" },
} as const;

export type ArticleCategory = keyof typeof articleCategories;

export type ArticleText = { title: string; excerpt: string; readingTime: string };

export type Article = {
  slug: string;
  category: ArticleCategory;
  date: string;
  image: string;
  /** ภาพเป็นแนวตั้ง — โชว์เต็มสัดส่วนจริงในบทความเด่นและหน้ารายละเอียด
   *  ไม่ครอปเป็นแนวนอน (การ์ดรองในกริดยังครอป 16:10 ให้แถวตรงกัน) */
  portrait?: boolean;
  th: ArticleText;
  en: ArticleText;
};

// เรียงจากใหม่ไปเก่า
export const articles: Article[] = [
  {
    slug: "modern-luxury-style",
    category: "interior",
    date: "2026-10-01",
    image: "built-in.jpg",
    th: {
      title: "Modern Luxury แต่งบ้านให้ดูหรูแบบอยู่ได้จริง",
      excerpt:
        "ความหรูมาจากวัสดุ รอยต่อ และแสง ไม่ใช่ของประดับ พร้อมวิธีเลือกให้ทนแดดและความชื้นแบบบ้านไทย",
      readingTime: "6 นาที",
    },
    en: {
      title: "Modern Luxury That Works in a Thai Home",
      excerpt:
        "Luxury comes from materials, clean joints and light, not ornaments. Here's how to choose finishes that survive Thai sun and humidity.",
      readingTime: "6 min read",
    },
  },
  {
    slug: "japandi-style",
    category: "interior",
    date: "2026-09-24",
    image: "spc-floor.jpg",
    th: {
      title: "Japandi ในอากาศร้อนชื้น ต้องปรับอะไรบ้าง",
      excerpt:
        "โทนไม้ ผ้าลินิน และเส้นสายเรียบ ปรับให้เข้ากับความชื้นและแดดแรงของบ้านเรา",
      readingTime: "6 นาที",
    },
    en: {
      title: "Japandi for a Hot, Humid Climate",
      excerpt:
        "Wood tones, linen and clean lines, adapted for Thailand's humidity and strong sun.",
      readingTime: "6 min read",
    },
  },
  {
    slug: "minimal-style",
    category: "interior",
    date: "2026-09-17",
    image: "interior-hero.jpg",
    th: {
      title: "แต่งคอนโดสไตล์มินิมอล ให้ห้องเล็กอยู่สบายจริง",
      excerpt:
        "มินิมอลไม่ใช่ห้องโล่ง แต่คือที่เก็บของที่วางแผนไว้ก่อน และการจัดการแสงกับความร้อน",
      readingTime: "6 นาที",
    },
    en: {
      title: "Minimalist Living in a Small Condo",
      excerpt:
        "Minimalism isn't an empty room. It's storage planned in advance, plus a smart approach to light and heat.",
      readingTime: "6 min read",
    },
  },
  {
    slug: "condo-checklist",
    category: "inspection",
    date: "2026-09-10",
    image: "article-condo.jpg",
    th: {
      title: "เช็กลิสต์ 12 จุดที่ต้องดูก่อนเซ็นรับโอนคอนโด",
      excerpt:
        "จุดที่คนส่วนใหญ่มองข้ามตอนตรวจห้องเอง แล้วมารู้ตัวหลังโอนไปแล้วว่าแก้ยากกว่าที่คิด",
      readingTime: "6 นาที",
    },
    en: {
      title: "12 Things to Check Before Signing for Your Condo",
      excerpt:
        "The points most buyers miss when checking a unit themselves, and only discover after transfer are harder to fix than expected.",
      readingTime: "6 min read",
    },
  },
  {
    slug: "crack-types",
    category: "inspection",
    date: "2026-09-03",
    image: "article-crack.jpg",
    th: {
      title: "รอยร้าวแบบไหนอันตราย แบบไหนแค่รอยสี",
      excerpt:
        "ไม่ใช่ทุกรอยร้าวจะแปลว่าโครงสร้างมีปัญหา แต่มีบางลักษณะที่ต้องรีบให้วิศวกรดู",
      readingTime: "5 นาที",
    },
    en: {
      title: "Which Cracks Are Dangerous and Which Are Just Paint Deep",
      excerpt:
        "Not every crack means a structural problem, but some patterns need an engineer to look at them soon.",
      readingTime: "5 min read",
    },
  },
  {
    slug: "defect-report-to-developer",
    category: "inspection",
    date: "2026-08-25",
    image: "article-defect.jpg",
    th: {
      title: "ตรวจบ้านเจอปัญหา แจ้งโครงการอย่างไรให้เขาแก้จริง",
      excerpt:
        "รายงานที่ระบุตำแหน่งและอ้างอิงมาตรฐานได้ ทำให้การคุยกับโครงการจบเร็วกว่าการเถียงกันด้วยความรู้สึก",
      readingTime: "7 นาที",
    },
    en: {
      title: "Found Defects? How to Report Them So the Developer Actually Fixes Them",
      excerpt:
        "A report with exact locations and measurable standards settles things faster than arguing over impressions.",
      readingTime: "7 min read",
    },
  },
  {
    slug: "curtain-by-direction",
    category: "interior",
    date: "2026-08-18",
    image: "article-curtain.jpg",
    portrait: true,
    th: {
      title: "เลือกผ้าม่านตามทิศของบ้าน ให้ห้องไม่ร้อนและไม่มืด",
      excerpt:
        "ทิศตะวันตกกับทิศเหนือต้องการผ้าคนละแบบ เลือกผิดคือได้ห้องมืดแต่ยังร้อนอยู่ดี",
      readingTime: "5 นาที",
    },
    en: {
      title: "Choosing Curtains by Window Direction: Cool Rooms Without the Gloom",
      excerpt:
        "West and north windows need different fabrics. Get it wrong and you end up with a room that's dark but still hot.",
      readingTime: "5 min read",
    },
  },
];

// แสดงวันที่ตามภาษา — ไทยใช้ปฏิทิน พ.ศ. อังกฤษใช้รูปแบบ en-GB
export const formatDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
