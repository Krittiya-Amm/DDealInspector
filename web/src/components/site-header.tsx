"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { contact, inspectionServices, interiorServices, site } from "@/lib/site";

// เมนูแบนชั้นเดียว ไม่มี dropdown — รายการบริการทั้ง 12 ตัวยังเข้าถึงได้จาก
// หน้า /services และจากเมนูมือถือที่กางได้ การยัดทั้งหมดไว้บนแถบบนทำให้
// เมนูหนักจนคนอ่านไม่ออกว่าอะไรสำคัญกว่ากัน
// ป้ายบนแถบบนสั้นกว่าป้ายในเมนูมือถือโดยตั้งใจ — แปดรายการเต็มชื่อชนกับปุ่ม CTA
// ที่ 1280px พอดี เมนูมือถือมีที่เหลือเฟือจึงใช้ชื่อเต็มได้
const navItems = [
  { href: "/services", label: "บริการ", longLabel: "บริการ" },
  { href: "/#process", label: "ขั้นตอน", longLabel: "ขั้นตอนการตรวจ" },
  { href: "/#pricing", label: "ราคา", longLabel: "ราคา" },
  { href: "/#gallery", label: "แกลเลอรี", longLabel: "แกลเลอรี" },
  { href: "/#about", label: "เกี่ยวกับ", longLabel: "เกี่ยวกับเรา" },
  { href: "/#reviews", label: "รีวิว", longLabel: "รีวิว" },
  { href: "/articles", label: "บทความ", longLabel: "บทความ" },
  { href: "/contact", label: "ติดต่อ", longLabel: "ติดต่อ" },
];

const mobileGroups = [
  {
    key: "inspection",
    label: "บริการตรวจสอบ",
    href: "/services/inspection",
    items: inspectionServices,
  },
  {
    key: "interior",
    label: "บริการตกแต่ง",
    href: "/services/interior",
    items: interiorServices,
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // แถบบนหดลงหลังเลื่อนพ้น hero ช่วงแรก — ให้พื้นที่อ่านเนื้อหาคืนมาโดยที่เมนูยังอยู่
  // 24px ไม่ใช่ 0 เพื่อไม่ให้หดกลับไปกลับมาตอนสะบัดนิ้วเบา ๆ บนมือถือ
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ease-out ${
          scrolled ? "border-line shadow-card" : "border-transparent"
        }`}
      >
        <Container
          className={`flex items-center justify-between gap-4 transition-[height] duration-300 ease-out ${
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-16 lg:h-24"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5 py-2">
            {/* TODO: CLIENT-ASSET — แทน mark นี้ด้วยโลโก้จริงจากลูกค้า */}
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-sm bg-ink text-sm font-bold text-white"
            >
              D
            </span>
            <span className="text-base leading-tight font-semibold">
              D Deal
              <span className="block text-[11px] font-normal text-ink3">
                Inspector &amp; Interior
              </span>
            </span>
            <span className="sr-only">{site.name} — กลับหน้าแรก</span>
          </Link>

          <nav aria-label="เมนูหลัก" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center rounded-sm px-2.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-gold-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/contact"
              className="hidden min-h-[44px] items-center rounded-sm px-4 text-sm font-semibold transition-colors duration-200 hover:text-gold-700 xl:inline-flex"
            >
              ขอใบเสนอราคา
            </Link>
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-sm bg-ink px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-deep"
            >
              นัดหมายตรวจบ้าน
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 grid size-11 place-items-center rounded-sm lg:hidden"
          >
            {open ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
            <span className="sr-only">{open ? "ปิดเมนู" : "เปิดเมนู"}</span>
          </button>
        </Container>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container className="py-4 pb-32">
            <ul className="divide-y divide-line">
              {mobileGroups.map((group) => {
                const isOpen = expanded === group.key;
                return (
                  <li key={group.key} className="py-1">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : group.key)}
                      aria-expanded={isOpen}
                      className="flex min-h-[56px] w-full items-center justify-between gap-3 text-left text-lg font-semibold"
                    >
                      {group.label}
                      <ChevronIcon
                        className={`size-5 text-ink3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen ? (
                      <ul className="pb-3">
                        <li>
                          <Link
                            href={group.href}
                            className="flex min-h-[48px] items-center font-medium text-gold-700"
                          >
                            ดูภาพรวมทั้งหมด
                          </Link>
                        </li>
                        {group.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`${group.href}#${item.slug}`}
                              className="flex min-h-[48px] items-center text-ink2"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              {navItems
                .filter((i) => i.href !== "/services")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-[56px] items-center text-lg font-semibold"
                    >
                      {item.longLabel}
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </div>
      ) : null}
    </>
  );
}
