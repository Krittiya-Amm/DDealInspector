"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { LangSwitch } from "@/components/lang-switch";
import { LogoMark } from "@/components/logo";
import { CallButton, LineButton } from "@/components/ui";
import { stripLang, type Lang } from "@/lib/i18n";

export type NavLink = { href: string; label: string };
export type NavItem = NavLink & {
  groups?: { title: string; href: string; links: NavLink[] }[];
};

/** เทียบเมนูที่ active โดยตัด prefix ภาษาออกทั้งสองฝั่งก่อน */
function isActive(pathname: string, itemHref: string) {
  const a = stripLang(pathname);
  const b = stripLang(itemHref);
  return b === "/" ? a === "/" : a === b || a.startsWith(`${b}/`);
}

export function HeaderClient({
  lang,
  nav,
  homeHref,
  allServicesHref,
  text,
}: {
  lang: Lang;
  nav: NavItem[];
  homeHref: string;
  allServicesHref: string;
  text: {
    menu: string;
    close: string;
    switchTo: string;
    servicesAll: string;
    lineBook: string;
    call: string;
    siteName: string;
  };
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  // ปิดเมนูมือถือเมื่อเปลี่ยนหน้า — ปรับ state ระหว่าง render ตามแนวทาง React
  // ("adjusting state when a prop changes") แทน setState ใน effect
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  // ล็อกการเลื่อนพื้นหลังตอนเมนูเปิด
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // ห้ามใส่ backdrop-blur ที่ header — backdrop-filter ทำให้ header กลายเป็น containing block
  // ของ position:fixed เมนูมือถือที่อยู่ข้างในจะถูกขังสูงเท่า header แทนที่จะเต็มจอ
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white shadow-[0_1px_0_rgb(11_42_27/0.02),0_8px_24px_-18px_rgb(11_42_27/0.35)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href={homeHref} className="flex shrink-0 items-center gap-2.5" aria-label={text.siteName}>
          <LogoMark className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="block text-[1.0625rem] font-bold text-brand">D Deal</span>
            <span className="block text-[0.6875rem] font-medium text-muted">Inspector &amp; Interior</span>
          </span>
        </Link>

        {/* เมนู desktop */}
        <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex" aria-label={text.siteName}>
          {nav.map((item) =>
            item.groups ? (
              <div key={item.href} className="group/menu relative">
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-3 font-medium hover:text-brand ${
                    isActive(pathname, item.href) ? "text-brand" : "text-ink"
                  }`}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronIcon className="size-4 transition-transform group-hover/menu:rotate-180" />
                </Link>
                {/* เมนูย่อยเปิดด้วย hover หรือโฟกัสคีย์บอร์ด (focus-within) */}
                <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-150 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100">
                  <div className="grid w-[40rem] grid-cols-2 gap-6 rounded-2xl border border-line bg-white p-6 shadow-lift">
                    {item.groups.map((g) => (
                      <div key={g.href}>
                        <Link href={g.href} className="font-bold text-brand hover:underline">
                          {g.title}
                        </Link>
                        <ul className="mt-2 space-y-0.5">
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-brand-soft hover:text-brand"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href={allServicesHref}
                      className="col-span-2 rounded-xl bg-surface px-4 py-3 text-center text-sm font-semibold text-brand hover:bg-brand-soft"
                    >
                      {text.servicesAll}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex min-h-11 items-center rounded-lg px-3 font-medium hover:text-brand ${
                  isActive(pathname, item.href) ? "font-semibold text-brand" : "text-ink"
                }`}
              >
                {item.label}
                {/* ขีดทองใต้เมนูที่อยู่ — สัญญาณตำแหน่งปัจจุบันแบบเดียวกับป้ายหัว section */}
                {isActive(pathname, item.href) ? (
                  <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold-deep to-gold" />
                ) : null}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitch lang={lang} label={text.switchTo} />
          {/* ข้อ 39: ปุ่มหลักบน header เปิด LINE OA ตรง ไม่ไปหน้า /contact ที่ไม่มีฟอร์ม */}
          <div className="hidden lg:block">
            <LineButton label={text.lineBook} size="sm" />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-xl text-ink hover:bg-surface lg:hidden"
            aria-label={text.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {/* เมนูมือถือแบบแผ่นเต็มจอ */}
      {open ? (
        <div id="mobile-menu" className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <LangSwitch lang={lang} label={text.switchTo} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-xl hover:bg-surface"
              aria-label={text.close}
            >
              <CloseIcon className="size-6" />
            </button>
          </div>
          <nav
            className="flex-1 overflow-y-auto px-4 py-4"
            aria-label={text.siteName}
            // ลิงก์ anchor ในหน้าเดียวกัน (#house) ไม่เปลี่ยน pathname เมนูจึงต้องปิดเองตอนแตะลิงก์
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  {item.groups ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSvcOpen((v) => !v)}
                        aria-expanded={svcOpen}
                        className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-lg font-semibold"
                      >
                        {item.label}
                        <ChevronIcon className={`size-5 transition-transform ${svcOpen ? "rotate-180" : ""}`} />
                      </button>
                      {svcOpen ? (
                        <div className="space-y-4 px-3 pb-3">
                          {item.groups.map((g) => (
                            <div key={g.href}>
                              <Link href={g.href} className="flex min-h-11 items-center font-bold text-brand">
                                {g.title}
                              </Link>
                              <ul>
                                {g.links.map((l) => (
                                  <li key={l.href}>
                                    <Link href={l.href} className="flex min-h-11 items-center text-muted">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link href={allServicesHref} className="flex min-h-11 items-center font-semibold text-brand">
                            {text.servicesAll}
                          </Link>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold ${
                        isActive(pathname, item.href) ? "bg-brand-soft text-brand" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <LineButton label={text.lineBook} size="lg" full />
            <CallButton label={text.call} full />
          </div>
        </div>
      ) : null}
    </header>
  );
}
