"use client";

import { useEffect, useRef, useState } from "react";

/** ชุดท่าเข้าของเนื้อหา — ตั้งใจให้มีหลายท่า
 *  ถ้าทุก section ใช้ fade-up ท่าเดียวกันหมด จังหวะการเลื่อนจะซ้ำจนอ่านเป็นเทมเพลต
 *  ท่าเหล่านี้นิยามจริงใน globals.css (`[data-reveal="..."]`) */
export type RevealVariant =
  | "up"
  | "rise"
  | "fade"
  | "left"
  | "right"
  | "clip"
  | "line"
  | "scale";

/** สังเกตครั้งเดียวแล้วเลิก — ใช้ร่วมกันทั้ง Reveal และ Counter */
function observeOnce(el: Element, onEnter: () => void, threshold = 0) {
  // ไม่มี IntersectionObserver (เบราว์เซอร์เก่ามาก) ก็ให้แสดงไปเลย ดีกว่าหน้าว่าง
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      onEnter();
      io.disconnect();
    },
    { rootMargin: "0px 0px -10% 0px", threshold },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** เผยเนื้อหาตอนเลื่อนถึง — ทำงานครั้งเดียวแล้วเลิกสังเกต
 *  สถานะซ่อนอยู่ใน globals.css ([data-reveal]) ตัวนี้แค่เติม data-shown
 *  จึงไม่มีจังหวะที่เนื้อหาโผล่แล้วหายตอน hydrate
 *  prefers-reduced-motion ถูกปลดที่ CSS ไม่ต้องเช็กซ้ำที่นี่ */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** หน่วงเป็นมิลลิวินาที ใช้ไล่ลำดับรายการในกริด 60-80ms ต่อชิ้นกำลังดี */
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "li" | "article" | "span" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => {
      el.dataset.shown = "";
    });
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** แยกตัวเลขออกจากส่วนประกอบรอบ ๆ เพื่อให้นับได้โดยไม่แตะข้อความจริง
 *  "1,500+" → { value: 1500, suffix: "+" } · "98%" → { value: 98, suffix: "%" }
 *  ถ้าแยกไม่ได้ คืน null แล้วแสดงข้อความเดิมไปตรง ๆ */
function parseNumeric(raw: string) {
  const m = raw.match(/^(\D*)([\d,]+)(.*)$/);
  if (!m) return null;
  const value = Number(m[2].replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  return { prefix: m[1], value, suffix: m[3], grouped: m[2].includes(",") };
}

/** นับเลขขึ้นตอนเลื่อนถึง — ตัวเลขที่ขยับทำให้สายตาหยุดอ่านสถิติจริง ๆ
 *  ค่าตั้งต้นคือข้อความเต็มเสมอ ดังนั้น no-JS และ reduced-motion ก็ยังเห็นเลขถูก */
export function Counter({
  value,
  className = "",
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parseNumeric(value);
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let safety = 0;
    const stop = observeOnce(
      el,
      () => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — วิ่งเร็วตอนต้นแล้วค่อย ๆ นิ่ง อ่านเป็นมาตรวัดมากกว่าแอนิเมชันตกแต่ง
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const n = Math.round(parsed.value * eased);
          setDisplay(
            `${parsed.prefix}${parsed.grouped ? n.toLocaleString("en-US") : n}${parsed.suffix}`,
          );
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(`${parsed.prefix}0${parsed.suffix}`);
        raf = requestAnimationFrame(tick);

        // กันเหนียว: rAF หยุดเดินเมื่อแท็บถูกซ่อน ถ้าผู้ใช้สลับแท็บกลางคัน
        // ตัวเลขจะค้างอยู่ที่ค่าผิด ๆ ตลอดไป ซึ่งร้ายแรงกว่าการไม่มีแอนิเมชัน
        // เพราะนี่คือสถิติที่ลูกค้าอ่านเป็นคำกล่าวอ้าง — จึงบังคับให้จบที่ค่าจริงเสมอ
        safety = window.setTimeout(() => {
          cancelAnimationFrame(raf);
          setDisplay(value);
        }, duration + 400);
      },
      0.6,
    );

    return () => {
      stop();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
