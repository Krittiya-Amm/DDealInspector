"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";

/** สไลเดอร์รีวิวลูกค้า — โชว์ทีละ 3 ใบบนจอกว้าง แล้วเลื่อนดูใบถัดไป
 *
 *  ทำไมเป็น scroll-snap ไม่ใช่ transform: translateX เอง
 *  ─ จำนวนใบที่เห็นต่อจอไม่เท่ากัน (มือถือ 1 · แท็บเล็ต 2 · จอใหญ่ 3) ถ้าเลื่อน
 *    ด้วย translate ต้องคำนวณ step เองทุก breakpoint · ปล่อยให้ flex-basis คุม
 *    ความกว้างใบตาม breakpoint แล้วให้เบราว์เซอร์ snap ทำงานเอง โค้ดจึงไม่ต้อง
 *    รู้ว่าตอนนี้เห็นกี่ใบ
 *  ─ ได้ปัดนิ้ว (native touch swipe) กับเลื่อนด้วยลูกกลิ้งฟรี ไม่ต้องผูก event เอง
 *  ─ ปุ่มซ้าย/ขวาเป็นตัวช่วยสำหรับเมาส์/คีย์บอร์ด เรียก scrollBy เอาเท่านั้น
 *
 *  เป็น client component เพราะต้องถือ ref ของราง อ่านตำแหน่งเลื่อน และปิดปุ่ม
 *  เมื่อสุดทาง — รับแค่ข้อความรีวิว (string ล้วน) ที่ serialize ข้าม boundary ได้ */
export function ReviewsCarousel({ quotes }: { quotes: readonly string[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  // ปิดปุ่มเมื่อสุดทางสองข้าง — ปุ่มที่กดแล้วไม่ขยับคือปุ่มที่หลอกสายตา
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // อ่านตำแหน่งจริงของรางแล้วอัปเดตสถานะปุ่ม · เผื่อ 1px กันเศษทศนิยม
  // ของ scrollLeft ที่ไม่ลงตัวพอดีจนปุ่มกะพริบ enable/disable
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    // เผื่อความกว้างใบเปลี่ยนตอนหมุนจอ/ย่อขยาย → คำนวณสุดทางใหม่
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // เลื่อนทีละหนึ่งใบ (กว้างใบ + ช่องไฟ) ไม่ใช่ทีละหน้า — รีวิวมีแค่ห้าใบ
  // การเลื่อนทีละใบให้จังหวะที่ตามง่ายกว่ากระโดดทีละสามใบจนตกหล่น
  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    // เคารพ prefers-reduced-motion — คนที่ตั้งค่าลดการเคลื่อนไหวไม่ควรเจอเลื่อนลื่น
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <div className="mt-8 lg:mt-10">
      {/* แถบปุ่มควบคุมอยู่เหนือราง ชิดขวา — เป็นตัวช่วยเมาส์/คีย์บอร์ด
          มือถือใช้ปัดนิ้วได้อยู่แล้ว แต่ยังโชว์ปุ่มไว้ให้เห็นว่าเลื่อนได้ */}
      <div className="mb-4 flex justify-end gap-2">
        <CarouselButton
          label="ดูรีวิวก่อนหน้า"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
          dir="prev"
        />
        <CarouselButton
          label="ดูรีวิวถัดไป"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
          dir="next"
        />
      </div>

      {/* ราง: flex + snap · overflow-x-auto ให้ปัด/เลื่อนได้ · ซ่อนแถบเลื่อน
          (ไม่ซ่อนความสามารถเลื่อน แค่ซ่อนเส้น scrollbar ที่รกสายตา)
          role=region + aria-label ให้ screen reader ประกาศเป็นพื้นที่รีวิว
          tabIndex=0 ให้คีย์บอร์ดโฟกัสรางแล้วใช้ลูกศรเลื่อนเนทีฟได้
          items-stretch (ค่าเริ่มต้นของ flex) ให้ทุกใบสูงเท่าใบที่ยาวสุดในแถว
          การ์ดจึงเป็นคอลัมน์ความสูงเท่ากัน ไม่ขรุขระ */}
      <ul
        ref={trackRef}
        onScroll={sync}
        role="region"
        aria-label="รีวิวจากลูกค้า เลื่อนแนวนอนเพื่อดูเพิ่ม"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 [&::-webkit-scrollbar]:hidden"
      >
        {quotes.map((quote, i) => (
          <li
            key={i}
            className="shrink-0 basis-full snap-start rounded-sm border border-line/55 p-5 sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]"
          >
            {/* พื้นใส ไม่มีพื้นครีมแล้ว — เหลือกรอบบางเป็นขอบเขตของแต่ละใบ
                กรอบใช้ border-line ที่ 55% (จาง #e8e2d6 ลงบนพื้นขาว) ตามที่ลูกค้าขอ
                ให้อ่อนลงอีก เส้นจึงเป็นแค่ร่องรอยขอบเขต ไม่ดึงสายตาแข่งกับตัวคำพูด
                เครื่องหมายอัญประกาศทองนำหน้าเป็นสัญญะว่านี่คือคำพูดของลูกค้า */}
            <blockquote className="text-[1rem] leading-[1.6] text-ink2 before:mr-1 before:font-display before:text-2xl before:leading-none before:text-gold-500 before:content-['“']">
              {quote}
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** ปุ่มเลื่อนหนึ่งใบ — 44px ตามเกณฑ์เป้าสัมผัส ไอคอนลูกศรหมุนตามทิศ
 *  ตอนปิด (สุดทาง) ลดความทึบและกันคลิก แต่ไม่เอาปุ่มหายเพื่อให้ตำแหน่งคงที่ */
function CarouselButton({
  label,
  disabled,
  onClick,
  dir,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
    >
      <ArrowIcon
        className={`size-5 ${dir === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
