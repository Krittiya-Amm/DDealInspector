import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { href } from "@/lib/i18n";
import { site } from "@/lib/site";

/* sitemap สองภาษา — ทุก URL ประกาศคู่ภาษาของตัวเองผ่าน alternates (hreflang) ข้อ 45 */
const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/services/inspection", priority: 0.9, freq: "monthly" },
  { path: "/services/interior", priority: 0.8, freq: "monthly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
  { path: "/articles", priority: 0.6, freq: "weekly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
];

const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...pages.map((p) => ({ ...p, lastModified: new Date() })),
    // บทความใช้วันเผยแพร่จริง ไม่ใช่เวลา build
    ...articles.map((a) => ({ path: `/articles/${a.slug}`, priority: 0.5, freq: "yearly" as const, lastModified: new Date(a.date) })),
  ];
  return entries.flatMap((e) =>
    (["th", "en"] as const).map((lang) => ({
      url: abs(href(lang, e.path)),
      lastModified: e.lastModified,
      changeFrequency: e.freq,
      priority: e.priority,
      alternates: { languages: { th: abs(href("th", e.path)), en: abs(href("en", e.path)) } },
    })),
  );
}
