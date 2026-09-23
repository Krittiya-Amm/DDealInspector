"use client";

import { useEffect, useRef } from "react";

/** เผยเนื้อหาตอนเลื่อนถึง — ทำงานครั้งเดียวแล้วเลิกสังเกต
 *  สถานะซ่อนอยู่ใน globals.css ([data-reveal]) ตัวนี้แค่พลิกเป็น "shown"
 *  จึงไม่มีจังหวะที่เนื้อหาโผล่แล้วหายตอน hydrate
 *  prefers-reduced-motion ถูกปลดที่ CSS ไม่ต้องเช็กซ้ำที่นี่ */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** หน่วงเป็นมิลลิวินาที ใช้ไล่ลำดับการ์ดในกริด 60-80ms ต่อใบกำลังดี */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ไม่มี IntersectionObserver (เบราว์เซอร์เก่ามาก) ก็ให้แสดงไปเลย ดีกว่าหน้าว่าง
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "shown";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
