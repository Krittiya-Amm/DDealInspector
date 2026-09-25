"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { contact, site } from "@/lib/site";

/* เมนูบน = 4 หน้าตามการ์ด (หน้าแรก / บริการ / บทความ / ติดต่อเรา) ไม่มากไม่น้อยกว่านี้
   และ **ทุกปลายทางเป็นหน้าจริง ไม่มี #anchor สักตัวในเมนู**

   ของเดิมเคยมี 8 รายการโดย 5 ตัวเป็น anchor ชี้กลับหน้าแรกหน้าเดียว
   (#process #pricing #gallery #about #reviews) — เมนูแบบนั้นคือสารบัญของเอกสารแผ่นเดียว
   ไม่ใช่เมนูของเว็บ · รอบ IA แก้ไปชั้นหนึ่งแล้วเหลือ anchor ตัวสุดท้ายคือ "ราคา"
   ที่ชี้ไป /services/inspection#pricing ซึ่งยังเป็นการกดเมนูแล้วเด้งไป section อยู่ดี
   รอบนี้ตัดออก — ราคาอยู่ในหน้า "ตรวจบ้าน-คอนโด" ซึ่งมีสารบัญของตัวเองอยู่ใต้ hero แล้ว

   บริการสองสายอยู่ใต้ "บริการ" เป็นเมนูย่อย ไม่ใช่รายการระดับบนสุด
   เพราะการ์ดนับ "หน้าบริการ" เป็นหน้าเดียว · เมนูย่อยทั้งสามอันก็เป็นหน้าจริงทั้งหมด
   ส่วนบริการรายตัว 14 รายการเข้าถึงจาก /services และจากสารบัญในแต่ละหน้าบริการ
   (เคยลงไว้ในเมนูมือถือทั้ง 14 ตัวแบบ #slug — ถอดออกด้วยเหตุผลเดียวกัน) */
type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const navItems: NavItem[] = [
  { href: "/", label: "หน้าแรก" },
  {
    href: "/services",
    label: "บริการ",
    children: [
      { href: "/services", label: "บริการทั้งหมด" },
      { href: "/services/inspection", label: "ตรวจบ้าน-คอนโด" },
      { href: "/services/interior", label: "งานตกแต่ง" },
    ],
  },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* "อยู่หน้านี้อยู่" — หน้าแรกต้องเทียบแบบตรงตัว ไม่งั้น "/" จะ active ตลอดทั้งเว็บ
     ส่วน /services ครอบหน้าลูกด้วย เพื่อให้รายการแม่ยังสว่างตอนอยู่หน้าตรวจบ้าน/ตกแต่ง */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  /* `aria-current="page"` ต้องมีตัวเดียวในเมนู — รายการที่มีเมนูย่อยทำหน้าที่เป็นหัวกลุ่ม
     ปล่อยให้ลูกที่ตรง URL จริงเป็นคนถือป้ายนี้ ไม่งั้นตอนอยู่ /services
     ทั้ง "บริการ" และ "บริการทั้งหมด" จะประกาศว่าเป็นหน้าปัจจุบันพร้อมกัน */
  const currentAttr = (item: NavItem | { href: string }) =>
    pathname === item.href && !("children" in item && item.children)
      ? ("page" as const)
      : undefined;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* เปิดเมนูมือถือตอนอยู่หน้าบริการ ให้กลุ่มนั้นกางมาเลย — คนเปิดเมนูจากหน้าลูก
     มักจะเปิดมาเพื่อย้ายไปหน้าลูกอีกอันในกลุ่มเดียวกัน ไม่ควรต้องกดกางซ้ำ
     ตั้งค่าตอนกดปุ่ม ไม่ใช่ใน effect — setState ใน effect ทำให้เรนเดอร์ซ้อน
     และ eslint ของโปรเจกต์นี้ห้ามไว้ (react-hooks/set-state-in-effect) */
  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const parent = navItems.find(
      (i) => i.children && pathname.startsWith(`${i.href}/`),
    );
    setExpanded(parent ? parent.href : null);
    setOpen(true);
  };

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

          {/* nav ยืดเต็มความสูงแถบ (`self-stretch`) ไม่ใช่เพื่อความสวย —
              เมนูย่อยวาง `top-full` ของ <li> ถ้า li สูงแค่ 44px ในแถบสูง 96px
              แผงจะไปโผล่กลางแถบ และมีร่องให้เมาส์หลุดระหว่างทาง */}
          <nav aria-label="เมนูหลัก" className="hidden lg:block lg:self-stretch">
            <ul className="flex h-full items-center gap-0.5">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li
                    key={item.href}
                    className="group relative flex h-full items-center"
                  >
                    {/* เส้นใต้คลี่ออกจากซ้าย แทนการเปลี่ยนสีเฉย ๆ
                        เป็นไมโครอินเทอแรกชันเดียวกับลิงก์ในเนื้อหา ทั้งเว็บจึงตอบสนองเหมือนกัน
                        หน้าที่อยู่ตอนนี้ = เส้นค้างไว้ถาวร (ตัวหนังสือยังเป็นสีหมึก)
                        ต่างจาก hover ที่เปลี่ยนเป็นทองด้วย — ตาจึงแยกออกว่าอันไหน "อยู่ตรงนี้"
                        อันไหนแค่ "กดได้" · ห้ามเขียน scale-x-0 กับ scale-x-100 ไว้ในสตริงเดียวกัน
                        Tailwind ตัดสินด้วยลำดับใน stylesheet ไม่ใช่ลำดับใน class */}
                    <Link
                      href={item.href}
                      aria-current={currentAttr(item)}
                      className={`relative inline-flex min-h-[44px] items-center gap-1 rounded-sm px-2.5 text-[0.9375rem] font-medium transition-colors duration-200 after:absolute after:inset-x-2.5 after:bottom-2.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-gold-700 motion-reduce:after:transition-none ${
                        active
                          ? "after:scale-x-100"
                          : "after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      {item.label}
                      {item.children ? (
                        <ChevronIcon
                          aria-hidden
                          className="size-4 text-ink3 transition-transform duration-200 group-hover:rotate-180 motion-reduce:transition-none"
                        />
                      ) : null}
                    </Link>

                    {/* เปิดด้วย hover และ focus-within — ไม่ต้องมี state เพราะไม่มีอะไรต้องจำ
                        คนที่ไล่ด้วยคีย์บอร์ดโฟกัสมาถึง "บริการ" แผงจะกางเอง แล้ว Tab ต่อเข้าไปในแผงได้
                        ตอนซ่อนใช้ `invisible` ไม่ใช่ opacity อย่างเดียว เพื่อให้ pointer event ดับไปด้วย */}
                    {item.children ? (
                      <div className="invisible absolute top-full left-0 z-10 w-56 -translate-y-1 rounded-sm border border-line bg-paper opacity-0 shadow-lift transition-[opacity,transform] duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                        <ul className="py-1.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={currentAttr(child)}
                                className={`flex min-h-[44px] items-center px-4 text-[0.9375rem] transition-colors duration-200 hover:bg-warm hover:text-gold-700 ${
                                  pathname === child.href
                                    ? "font-semibold text-gold-700"
                                    : "text-ink2"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {/* เมนูเหลือ 4 รายการแล้ว ลิงก์นี้จึงลงมาโผล่ตั้งแต่ lg ได้
                ตอนมี 8 รายการมันชนปุ่มพอดีที่ 1280px เลยต้องกั้นไว้ที่ xl */}
            <Link
              href="/contact"
              className="hidden min-h-[44px] items-center rounded-sm px-4 text-sm font-semibold transition-colors duration-200 hover:text-gold-700 lg:inline-flex"
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
            onClick={toggleMenu}
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
            {/* เมนูมือถือใช้ navItems ชุดเดียวกับแถบบน เรียงลำดับเดียวกัน
                เมื่อก่อนสองที่นี้ถือคนละรายการกัน ทำให้แก้เมนูทีต้องแก้สองจุดและหลุดบ่อย */}
            <ul className="divide-y divide-line">
              {navItems.map((item) => {
                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={currentAttr(item)}
                        className={`flex min-h-[56px] items-center text-lg font-semibold ${
                          isActive(item.href) ? "text-gold-700" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = expanded === item.href;
                return (
                  <li key={item.href} className="py-1">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.href)}
                      aria-expanded={isOpen}
                      className={`flex min-h-[56px] w-full items-center justify-between gap-3 text-left text-lg font-semibold ${
                        isActive(item.href) ? "text-gold-700" : ""
                      }`}
                    >
                      {item.label}
                      <ChevronIcon
                        aria-hidden
                        className={`size-5 text-ink3 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen ? (
                      <ul className="pb-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={currentAttr(child)}
                              className={`flex min-h-[48px] items-center ${
                                pathname === child.href
                                  ? "font-medium text-gold-700"
                                  : "text-ink2"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Container>
        </div>
      ) : null}
    </>
  );
}
