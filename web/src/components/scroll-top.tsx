"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** สคริปต์ที่ต้องรันก่อนหน้าเรนเดอร์ (วางใน layout) — ปิดการจำตำแหน่งเลื่อนของเบราว์เซอร์ตั้งแต่ต้น
 *  ถ้ารอ React hydrate ก่อน เบราว์เซอร์จะเลื่อนกลับตำแหน่งเดิมไปแล้วหนึ่งจังหวะ */
export const scrollRestorationScript = `try{history.scrollRestoration="manual"}catch(e){}`;

/** ไป #anchor ถ้ามีใน URL ไม่งั้นขึ้นบนสุด
 *  ระบุ behavior: "instant" ตรง ๆ — ชนะค่า scroll-behavior: smooth ของ html
 *  (ถ้าปล่อยให้ smooth หน้าใหม่จะค่อย ๆ ไหลจากตำแหน่งเดิม ดูเหมือนไม่ได้เริ่มบนสุด) */
function settle(withHash: boolean) {
  const el = withHash && location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/** ทุกหน้าเริ่มจากบนสุดเสมอ
 *  - โหลด/รีเฟรช: ขึ้นบนสุด · รีเฟรชหน้าที่มี # ค้างใน URL ก็ตัด # ทิ้งแล้วขึ้นบนสุด
 *  - เปลี่ยนหน้าภายในเว็บ (กดเมนู/ลิงก์): ขึ้นบนสุดทันที ไม่ไหลแบบ smooth จากตำแหน่งเดิม
 *  - ลิงก์ที่ตั้งใจพาไป section (เปิดใหม่หรือกดจากหน้าอื่น เช่น footer → #pricing) ยังไปที่ section นั้น
 *  ทำซ้ำอีกครั้งหลัง ~120ms เพราะ router ของ Next อาจปรับตำแหน่งหลัง hydrate/เปลี่ยนหน้า */
export function ScrollTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    let withHash = true;
    if (first.current) {
      first.current = false;
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const isReload = nav?.type === "reload" || nav?.type === "back_forward";
      if (isReload && location.hash) history.replaceState(history.state, "", location.pathname + location.search);
      withHash = !isReload;
    }
    settle(withHash);
    const t = window.setTimeout(() => settle(withHash), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
