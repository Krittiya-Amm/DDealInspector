"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, stripLang, type Lang } from "@/lib/i18n";

/** ปุ่ม TH | EN — สลับแล้วอยู่หน้าเดิม ไม่เด้งกลับหน้าแรก (ข้อ 44)
 *  usePathname อาจคืน /th/... (หลัง rewrite) หรือ /... ก็ได้ stripLang รองรับทั้งสองแบบ
 *  บทความใช้ slug เดียวกันทั้งสองภาษา จึงพาไปบทความเดียวกันอีกภาษาได้ตรง (ข้อ 50) */
export function LangSwitch({
  lang,
  label,
  invert = false,
}: {
  lang: Lang;
  label: string;
  invert?: boolean;
}) {
  const base = stripLang(usePathname() ?? "/");
  const item = (l: Lang, text: string) => {
    const active = l === lang;
    return (
      <Link
        href={href(l, base)}
        hrefLang={l}
        lang={l}
        aria-current={active ? "true" : undefined}
        aria-label={active ? undefined : label}
        className={`grid min-h-9 min-w-10 place-items-center rounded-lg px-2 text-sm font-bold transition-colors ${
          active
            ? invert
              ? "bg-white text-brand"
              : "bg-brand text-white"
            : invert
              ? "text-white/80 hover:text-white"
              : "text-muted hover:text-brand"
        }`}
      >
        {text}
      </Link>
    );
  };
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-xl p-1 ${
        invert ? "bg-white/10" : "bg-surface ring-1 ring-line"
      }`}
    >
      {item("th", "TH")}
      {item("en", "EN")}
    </div>
  );
}
