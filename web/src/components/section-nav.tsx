"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";

/* ─── แถบนำทางในหน้า ────────────────────────────────────────────────────
   สองหน้าบริการยาวมาก (หน้าตรวจบ้าน ~21,000px บนมือถือ) จึงต้องกระโดดได้
   ของเดิมเป็น "ชิปมีกรอบ" 8 อันวางเรียงกันใต้ hero แล้วเลื่อนหายไปกับหน้า
   ซึ่งช่วยได้แค่ตอนเปิดหน้าใหม่ ๆ พอเลื่อนไปกลางหน้าแล้วอยากข้ามไปดูราคา
   ต้องเลื่อนกลับขึ้นไปสุด — ซึ่งคนไม่ทำ เขาจะกดปุ่มย้อนกลับแทน

   แถบนี้จึงหนึบไว้ใต้เมนูบน และเหลือเฉพาะหัวข้อระดับบนสุดของหน้า
   (กติกา bottom-nav-limit ของ Material: ไม่เกิน 5 ปลายทาง — เกินกว่านั้น
    คนอ่านไม่ได้ใช้เป็นทางลัด แต่ต้องมาอ่านรายการก่อนว่ามีอะไรบ้าง)

   z-20 ไม่ใช่ z-40 — ต้องต่ำกว่าเมนูมือถือ (z-30) และแถบบน (z-40)
   ไม่งั้นตอนเปิดเมนูมือถือ แถบนี้จะลอยทับแผงเมนูเพราะอยู่หลังกว่าใน DOM

   ระยะเกาะ: แถบบนสูง 64px บนมือถือ และหดเหลือ 72px บนจอใหญ่ตอนเลื่อน
   ซึ่งเป็นสถานะที่แถบนี้เริ่มทำงานพอดี จึงใช้ค่าหลังเลื่อนทั้งคู่

   เป็น client component แยกไฟล์ ไม่ได้อยู่ใน ui.tsx เหมือนตัวอื่น เพราะต้องอ่าน
   ตำแหน่ง scroll ถ้าใส่ "use client" ที่ ui.tsx ทั้งไฟล์จะกลายเป็น client ทั้งก้อน
   ทั้งที่ 90% ของมันเป็นคอมโพเนนต์นิ่ง (แบบเดียวกับที่ process.tsx แยกออกมา)
   และ import Container จาก ui.tsx ทางเดียว ไม่ re-export กลับ เพื่อไม่ให้เกิด
   วงจร import ระหว่างสองไฟล์ */
export function SectionNav({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  const navRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  /* -1 = ยังไม่ถึงบล็อกไหนเลย (ยังอยู่ช่วง hero) — ตั้งใจให้ไม่มีอันไหนสว่าง
     ดีกว่าไปสว่างที่อันแรกทั้งที่ผู้อ่านยังไม่ได้เลื่อนถึง เพราะแถบนี้ต้องบอก
     "อยู่ตรงไหน" ตามจริง ไม่ใช่เดาให้ดูสมบูรณ์ */
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const nav = navRef.current;
      if (!nav) return;

      /* เส้นอ้างอิงคือขอบล่างของแถบนี้เอง ไม่ใช่ตัวเลขคงที่ — เพราะความสูงรวม
         ของ header + แถบนี้ต่างกันระหว่างมือถือ (117px) กับจอใหญ่ (125px)
         และจะเปลี่ยนอีกถ้าใครไปปรับความสูง header วันหลัง อ่านจาก DOM จึงไม่มีวันหลุด */
      const line = nav.getBoundingClientRect().bottom + 8;

      let next = -1;
      items.forEach((item, i) => {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  /* เลื่อนชิ้นที่กำลังอ่านอยู่ให้โผล่ในแถบเสมอ
     บนมือถือแถบกว้างเกินจอ (หน้าตรวจ 396px บนจอ 360px) ถ้าไม่เลื่อนตาม
     ปลายทางท้าย ๆ จะอยู่นอกจอตลอดและ scrollbar ก็ถูกซ่อนไว้ คนจึงไม่รู้ว่ามีอีก
     การที่แถบขยับเองตอนอ่านจึงทำสองหน้าที่ — บอกตำแหน่ง และเฉลยว่าแถบนี้เลื่อนได้

     คำนวณ scrollLeft เองแทน scrollIntoView() เพราะ scrollIntoView เลื่อน
     บรรพบุรุษที่เลื่อนได้ "ทุกชั้น" รวมถึงตัวหน้าเอง เสี่ยงกระตุกหน้าระหว่างอ่าน */
  useEffect(() => {
    if (active < 0) return;
    const el = itemRefs.current[active];
    const sc = scrollerRef.current;
    if (!el || !sc) return;

    const pad = 24; // เผยขอบของชิ้นถัดไปด้วย จะได้รู้ว่ายังมีต่อ
    const left = el.offsetLeft - pad;
    const right = el.offsetLeft + el.offsetWidth + pad;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? ("auto" as const)
      : ("smooth" as const);

    if (left < sc.scrollLeft) sc.scrollTo({ left, behavior });
    else if (right > sc.scrollLeft + sc.clientWidth)
      sc.scrollTo({ left: right - sc.clientWidth, behavior });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur lg:top-[4.5rem]"
    >
      <Container>
        {/* มือถือเลื่อนแนวนอน — ลบ padding ของ Container ออกแล้วใส่คืนข้างใน
            เพื่อให้รายการสุดท้ายถูกตัดครึ่งที่ขอบจอ ซึ่งเป็นสัญญาณว่ายังเลื่อนได้
            (ถ้า padding อยู่นอกพื้นที่เลื่อน รายการจะจบพอดีขอบ ดูเหมือนมีแค่นั้น)

            ยังเหลือข้อจำกัดที่จอ 320px: หน้าตรวจบ้านแถบกว้าง 396px ชิ้นสุดท้าย
            จะโผล่แค่ ~3px ซึ่งบางเกินกว่าจะเป็นสัญญาณ ยอมไว้เพราะ 320px
            คือ iPhone SE รุ่นแรก (เลิกขายปี 2018) และการไล่ย่อป้ายให้พอดี 320px
            จะทำให้จอ 390-430px ที่คนส่วนใหญ่ใช้ดูโล่งผิดสัดส่วน
            ตัวช่วยจริงที่จอแคบคือ useEffect ด้านบน — แถบเลื่อนตามสิ่งที่กำลังอ่าน */}
        <ul
          ref={scrollerRef}
          className="-mx-5 flex gap-x-1 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-x-3 lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={item.href}
                  aria-current={on ? "true" : undefined}
                  /* ขีดล่างเป็นตัวบอกตำแหน่ง ไม่ใช่เปลี่ยนสีพื้นเป็นชิปทึบ
                     เพราะชิปทึบจะเพิ่มกล่องมีขอบเข้ามาในหน้าอีกใบ ซึ่งทั้งเว็บ
                     พยายามเลี่ยง และ inset-x-3 เท่ากับ px-3 พอดี เส้นจึงยาวเท่าคำ
                     ไม่ใช่ยาวเท่ากล่อง — คำสั้นอย่าง "ราคา" จะได้ไม่มีเส้นยื่นเกิน

                     ใช้สี + เส้น + aria-current พร้อมกัน ไม่ได้ใช้สีอย่างเดียว
                     (กติกา color-not-only) */
                  className={`relative flex min-h-[52px] items-center px-3 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:content-[''] ${
                    on
                      ? "text-ink after:bg-gold-500"
                      : "text-ink2 after:bg-transparent hover:text-gold-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
