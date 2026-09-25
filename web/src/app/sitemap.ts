import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

/** หน้าคงที่ — ลำดับเดียวกับเมนูบนหัวเว็บ
 *  priority ไล่ตามระยะห่างจากการตัดสินใจจ้าง ไม่ได้ไล่ตามความลึกของ path
 *  (หน้า contact อยู่ปลายทางของทุก CTA จึงสำคัญกว่าหน้ารวมบทความ) */
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/inspection", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/interior", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // บทความใช้วันเผยแพร่จริงเป็น lastModified ไม่ใช่ new Date()
  // ถ้าใส่เวลา build ทุกครั้งที่ deploy จะบอก Google ว่าบทความทั้งหมดเพิ่งแก้
  // ซึ่งไม่จริงและทำให้สัญญาณ freshness เชื่อถือไม่ได้
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...articleRoutes,
  ];
}
