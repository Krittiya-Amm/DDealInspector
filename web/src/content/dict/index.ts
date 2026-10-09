import { lang as rootLang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Lang } from "@/lib/i18n";
import { en } from "./en";
import { th, type Dict } from "./th";

const dicts: Record<Lang, Dict> = { th, en };

/** ภาษาปัจจุบันจาก segment [lang] — เรียกได้จาก Server Component ทุกตัวโดยไม่ต้องส่ง prop */
export async function getLang(): Promise<Lang> {
  const l = await rootLang();
  if (!hasLocale(l)) notFound();
  return l;
}

export async function getDict(): Promise<Dict> {
  return dicts[await getLang()];
}

export const dictFor = (l: Lang): Dict => dicts[l];

export type { Dict };
