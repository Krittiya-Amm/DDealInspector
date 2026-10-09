import type { Metadata } from "next";
import { dictFor } from "@/content/dict";
import { href, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** metadata ของหน้าหนึ่ง ๆ — ทุกหน้าต้องเรียกตัวนี้
 *
 *  - canonical ชี้ URL ของภาษาตัวเอง (ตั้งที่ layout ไม่ได้ เพราะจะชี้หน้าแรกทั้งเว็บ)
 *  - hreflang th / en / x-default ให้ Google แยกสองภาษาได้ (ข้อ 45)
 *  - openGraph ต้อง spread ใหม่ทุกหน้า เพราะ metadata merge แบบตื้น
 *    ประกาศ openGraph ที่หน้าย่อยเมื่อไหร่ og:image จาก layout จะหลุดทั้งก้อน */
export function pageMeta({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  lang: Lang;
  /** path กลางไม่มี prefix ภาษา เช่น "/services" */
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const d = dictFor(lang);
  const url = href(lang, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        th: href("th", path),
        en: href("en", path),
        "x-default": href("th", path),
      },
    },
    openGraph: {
      type: "website",
      locale: d.locale,
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: d.meta.tagline }],
    },
  };
}
