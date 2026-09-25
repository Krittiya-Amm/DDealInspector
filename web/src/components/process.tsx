"use client";

import { useEffect, useRef, useState } from "react";
import {
  Container,
  IndexLabel,
  MockImage,
  rhythm,
  SectionHeading,
} from "@/components/ui";
import { processSteps } from "@/lib/site";

/** Section 3 — ขั้นตอนการตรวจ: section ประจำตัวของเว็บนี้
 *
 *  เส้นแนวตั้งทางซ้ายเติมตัวเองตามการเลื่อน และเลขขั้นตอนทางซ้ายเปลี่ยนตามขั้นที่
 *  กำลังอยู่ในสายตา — เป็นการยืมภาษาของ "ไทม์ไลน์การตรวจ" มาใช้ตรง ๆ
 *  แทนที่จะวางเป็นการ์ดห้าใบเรียงกันซึ่งไม่ได้บอกว่าอะไรมาก่อนมาหลัง
 *
 *  เนื้อหาทุกขั้นแสดงครบตลอดเวลา ไม่ได้ซ่อนไว้รอ scroll — การเคลื่อนไหวทำหน้าที่
 *  เน้นตำแหน่ง ไม่ใช่เป็นเงื่อนไขในการเข้าถึงข้อมูล */
export function InspectionProcess() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;

      // เส้นอ้างอิงอยู่ที่ 45% ของจอ — สูงกว่ากึ่งกลางนิดหน่อย
      // เพราะสายตาคนอ่านนำหน้าจุดกึ่งกลางจอเสมอ
      const anchor = window.innerHeight * 0.45;
      const rect = list.getBoundingClientRect();
      const p = (anchor - rect.top) / Math.max(1, rect.height);
      setProgress(Math.min(1, Math.max(0, p)));

      let next = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= anchor) next = i;
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
  }, []);

  const current = processSteps[active];

  return (
    /* id="scope" ไม่ใช่ "process" — หน้าบริการตรวจมีสองบล็อกที่เคยชื่อว่า
       "ขั้นตอน" เหมือนกัน คือบล็อกนี้ (ตรวจอะไรบ้าง) กับ Timeline (หลังนัดแล้วเกิดอะไร)
       พอสองอันใช้คำเดียวกัน สารบัญด้านบนเลยมีสองรายการที่อ่านแล้วแยกไม่ออกว่าต่างกันยังไง
       บล็อกนี้ตอบ "ตรวจตรงไหนบ้าง" จึงเป็น scope ส่วนคำว่า process ยกให้ Timeline */
    <section id="scope" className={`scroll-mt-32 ${rhythm.open}`}>
      <Container>
        {/* variant="rule" — บล็อกนี้เป็นบทหลักของหน้า และเป็นบล็อกเดียวที่หัวข้อ
            ยืนเต็มความกว้างก่อนแยกเป็นสองคอลัมน์ เส้นคาดใต้ป้ายจึงทำหน้าที่
            ประกาศว่า "ขึ้นบทใหม่" ไม่ใช่แค่ "หัวข้อถัดไปในลำดับเดิม"
            หน้านี้มีหัวข้อทรงนี้ตัวเดียว — ถ้าใส่หลายที่มันจะกลับไปเป็นเทมเพลตอีกแบบ */}
        <SectionHeading
          variant="rule"
          eyebrow="Inspection Scope"
          title="จุดที่ตรวจ ไล่จากของที่แก้ทีหลัง"
          accent="แพงที่สุด"
          lead="ลำดับการตรวจไม่ได้สุ่ม — เริ่มจากโครงสร้างที่รื้อแก้ทีหลังแทบไม่ได้ ไปจบที่งานผิวซึ่งแก้ง่ายกว่า"
        />

        <div className="mt-14 grid gap-x-20 gap-y-12 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          {/* คอลัมน์ซ้าย: ตัวบอกตำแหน่ง — หนึบไว้ระหว่างที่รายการทางขวาเลื่อนผ่าน */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <IndexLabel
              current={active + 1}
              total={processSteps.length}
              label="Inspection Progress"
            />
            <p
              aria-hidden
              className="tnum mt-5 font-display text-[5rem] leading-[0.8] font-semibold text-gold-500 transition-opacity duration-300 ease-out sm:text-[7rem] lg:text-[8.5rem]"
              key={current.step}
            >
              {current.step}
            </p>
            <p
              aria-hidden
              className="mt-5 text-lg font-semibold text-ink lg:text-xl"
            >
              {current.title}
            </p>
            <MockImage
              src="inspection-hero.jpg"
              alt="วิศวกรโยธาเข้าตรวจหน้างานพร้อมอุปกรณ์"
              className="mt-8 hidden aspect-[4/3] rounded-sm lg:block"
              sizes="32vw"
            />
          </div>

          {/* คอลัมน์ขวา: รายการขั้นตอน พร้อมรางเส้นที่เติมตามการเลื่อน */}
          <ol ref={listRef} className="relative pl-10 sm:pl-14">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line sm:left-[1.0625rem]"
            />
            <span
              aria-hidden
              data-progress-line
              style={{ transform: `scaleY(${progress})` }}
              className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-gold-500 sm:left-[1.0625rem]"
            />

            {processSteps.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.step}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="relative pb-12 last:pb-0 sm:pb-16"
                >
                  <span
                    aria-hidden
                    className={`absolute top-[0.4375rem] -left-10 grid size-6 place-items-center rounded-full border transition-colors duration-300 ease-out sm:-left-14 sm:size-9 ${
                      isActive
                        ? "border-gold-500 bg-gold-500 text-white"
                        : "border-line bg-paper text-ink3"
                    }`}
                  >
                    <span className="tnum font-display text-[11px] leading-none font-semibold sm:text-sm">
                      {s.step}
                    </span>
                  </span>
                  <h3
                    className={`text-xl font-semibold transition-colors duration-300 ease-out sm:text-2xl ${
                      isActive ? "text-ink" : "text-ink2"
                    }`}
                  >
                    <span className="sr-only">ขั้นที่ {s.step} — </span>
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[1.0625rem] leading-[1.8] text-ink2">
                    {s.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
