/* โครงสร้าง 2 ภาษา (ข้อ 44–47)
 *
 * ไทยเป็นภาษาหลัก อยู่ที่ URL เดิมไม่มี prefix (/services/inspection)
 * อังกฤษอยู่ใต้ /en (/en/services/inspection)
 * ภายในแอปทุกหน้าอยู่ใต้ app/[lang] — proxy.ts rewrite URL ไทยไปที่ /th/... ให้เอง
 * ลิงก์ไทยเดิมที่แชร์ไปแล้วจึงยังใช้ได้ทุกลิงก์ ไม่ต้องตั้ง redirect */

export const locales = ["th", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "th";

export const hasLocale = (v: string): v is Lang =>
  (locales as readonly string[]).includes(v);

/** แปลง path กลาง ("/services") เป็น URL ของภาษานั้น */
export function href(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "th") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/** ตัด prefix ภาษาออกจาก pathname ใดก็ได้ (/en/x, /th/x, /x → /x)
 *  ใช้ฝั่ง client ตอนสลับภาษา เพื่อให้อยู่หน้าเดิม ไม่เด้งกลับหน้าแรก (ข้อ 44) */
export function stripLang(pathname: string): string {
  const m = pathname.match(/^\/(th|en)(?=\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest === "" ? "/" : rest;
}
