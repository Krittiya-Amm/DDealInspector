"use client";

import { useState } from "react";
import {
  Container,
  IndexLabel,
  MockImage,
  rhythm,
  SectionHeading,
  TechLabel,
} from "@/components/ui";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
} from "@/lib/site";

/** Section 8 — แกลเลอรี
 *  คำบรรยายอยู่ติดภาพตลอดเวลา ไม่ใช่โผล่ตอน hover — เพราะบนมือถือไม่มี hover
 *  และเนื้อหาที่อ่านไม่ได้ถ้าไม่เอาเมาส์ไปชี้ ถือว่าไม่มีอยู่จริงสำหรับคนส่วนหนึ่ง
 *
 *  ตั้งใจไม่ใส่ลูกศรมุมการ์ดตามแบบที่ขอมา เพราะลูกศรสื่อว่ากดแล้วไปต่อได้
 *  แต่เว็บนี้ไม่มีหน้ารายละเอียดของแต่ละภาพ ใส่แล้วจะเป็นสัญญาที่ทำไม่ได้ */
export function Gallery() {
  const [active, setActive] = useState<GalleryCategory>("all");
  const items =
    active === "all" ? gallery : gallery.filter((g) => g.category === active);

  return (
    /* rhythm.dense ไม่ใช่ base — ในหน้าบริการตรวจ บล็อกนี้ถูกขนาบด้วย
       ตัวอย่างรายงาน (open) และตารางราคา (base) ถ้าใช้ base เท่าตารางราคา
       สองบล็อกจะอ่านเป็นน้ำหนักเดียวกัน ทั้งที่อันหนึ่งเป็นหลักฐานประกอบ
       อีกอันเป็นคำตอบที่คนเลื่อนมาหา ระยะหายใจคือสิ่งที่บอกลำดับนั้น

       border-t อย่างเดียว ไม่ใช่ border-y — บล็อกถัดไปในหน้าเดียวที่ใช้คอมโพเนนต์นี้
       (ตารางราคา) มีเส้นบนของตัวเองอยู่แล้ว ใส่ทั้งคู่จะได้เส้นสองเส้นชิดกันเป็น 2px
       ขอบล่างของพื้นครีมมีการเปลี่ยนสีพื้นเป็นตัวบอกอยู่แล้ว ไม่ต้องขีดซ้ำ */
    <section
      id="gallery"
      className={`scroll-mt-32 border-t border-line bg-warm ${rhythm.dense}`}
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <SectionHeading
            eyebrow="Gallery"
            title="ตัวอย่างสิ่งที่เราเข้าไปตรวจ"
            lead="ภาพชุดนี้แสดงลักษณะงานและจุดที่เราให้ความสำคัญในที่อยู่อาศัยแต่ละประเภท"
          />

          {/* ตัวกรองเป็นข้อความขีดเส้นใต้ ไม่ใช่ปุ่มกล่องห้าใบ
              กล่องห้าใบเรียงกันเพิ่มขอบเข้ามาในหน้าโดยไม่ได้เพิ่มความหมาย
              พื้นที่กดยังสูง 44px เท่าเดิม แค่ขอบที่มองเห็นหายไป */}
          <div
            role="group"
            aria-label="กรองแกลเลอรีตามหมวด"
            className="flex flex-wrap gap-x-8 gap-y-2"
          >
            {galleryCategories.map((c) => {
              const on = c.key === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  aria-pressed={on}
                  /* before = เขตสัมผัสที่กว้างกว่าตัวหนังสือข้างละ 10px
                     คำสั้นอย่าง "บ้าน" กว้างแค่ ~25px ต่ำกว่าเกณฑ์ 44px
                     ไม่ใช้วิธีเติม padding เพราะเส้นใต้ (after:inset-x-0) จะยาว
                     ตามกล่องไปด้วย กลายเป็นคำสั้นมีเส้นใต้ยื่นยาวกว่าคำ
                     ส่วนคำยาวเส้นพอดีคำ — ไม่สม่ำเสมอ
                     ขยายด้วย pseudo-element จึงได้เป้าสัมผัสโดยหน้าตาไม่ขยับเลย
                     (gap-x-8 = 32px ทำให้เขตสัมผัสที่ขยายแล้วยังห่างกัน 12px) */
                  className={`relative inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium transition-colors duration-200 ease-out before:absolute before:-inset-x-[10px] before:inset-y-0 before:content-[''] after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:transition-transform after:duration-300 after:ease-out after:content-[''] ${
                    on
                      ? "text-ink after:scale-x-100 after:bg-gold-500"
                      : "text-ink3 after:scale-x-0 after:bg-ink hover:text-ink hover:after:scale-x-100"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-4">
          <TechLabel>Reference Images</TechLabel>
          <IndexLabel current={items.length} total={gallery.length} />
        </div>

        {/* ขนาดภาพไม่เท่ากันทั้งกริด — ใบแรกของทุกชุดกินสองคอลัมน์ในอัตราส่วน
            แนวนอนกว่า ที่เหลือเป็น 4:3 ตาจึงมีจุดเริ่มที่ชัดหนึ่งจุดแล้วค่อยกวาดต่อ
            ต่างจากเดิมที่เก้าใบเท่ากันหมด ซึ่งอ่านเป็น "ผลการค้นหา"
            ไม่ใช่ "ผลงานที่ถูกเลือกมาวาง"

            ใช้ nth-child/first ไม่ใช่เช็ค index ในโค้ด เพราะรายการเปลี่ยนตาม
            ตัวกรอง กฎจึงต้องผูกกับตำแหน่งจริงในกริดหลังกรอง ไม่ใช่ลำดับในข้อมูลดิบ
            และเยื้องเป็น 4n ไม่ใช่ 3n+2 — พอใบแรกกินสองช่อง รอบการนับเดิม
            จะเลื่อนไปตกใบที่ไม่ได้อยู่กลางแถวจริง กลายเป็นเยื้องมั่ว

            items-start สำคัญมาก ห้ามถอด — ค่าตั้งต้นของ grid คือ stretch
            ซึ่งยืดทุก <li> ให้สูงเท่าแถวที่สูงที่สุด ตอนนี้แถวแรกสูงตามใบใหญ่
            ใบเล็กข้าง ๆ จึงจะมีช่องว่างใต้ภาพ และคำบรรยายที่ยึด bottom-0
            ของ <li> ก็ตกลงไปลอยอยู่ในช่องว่างนั้น กลายเป็นแถบกรมท่าทึบ
            วางอยู่บนพื้นครีม *ใต้* ภาพ แทนที่จะทับขอบล่างของภาพ
            พอ align เป็น start กล่องสูงเท่าภาพพอดี คำบรรยายกลับไปเกาะภาพทุกใบ

            อัตราส่วนอยู่ที่ <li> ไม่ใช่ที่ MockImage เพราะ MockImage เป็นตัว
            absolute-fill อยู่แล้ว ถ้าสั่ง aspect ที่ตัวมันเองจะ override กันเอง
            เวลาใบแรกต้องใช้อัตราส่วนคนละค่ากับใบอื่น (Tailwind ตัดสินด้วย
            ลำดับใน stylesheet ไม่ใช่ลำดับใน class — กับดักชุดเดียวกับที่
            บันทึกไว้ใน README เรื่อง MockImage + absolute) */}
        <ul className="mt-8 grid items-start gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <li
              key={g.image}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm sm:first:col-span-2 sm:first:aspect-[16/9] lg:[&:nth-child(4n)]:mt-12"
            >
              <MockImage
                src={g.image}
                alt={g.caption}
                zoom
                className="h-full w-full"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {/* ไล่เฉดจากกรมท่าเข้ม ไม่ใช่ดำ — ดำบนภาพโทนอุ่นจะออกเทาสกปรก
                  ช่วงล่างทึบเกือบเต็มจึงคุมคอนทราสต์ตัวหนังสือขาวได้ไม่ว่าภาพจะสว่างแค่ไหน */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent p-4 pt-14">
                <span className="tnum block text-[10.5px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* leading-normal (1.5) ไม่ใช่ snug (1.375) — คำบรรยายภาษาไทย
                    ที่นี่ยาว 2 บรรทัดเกือบทุกใบ ระยะ snug ทำให้วรรณยุกต์บรรทัดบน
                    ชนสระบนของบรรทัดล่าง และไม่ใช้ 1.75 ตาม body เพราะคำบรรยาย
                    ต้องอ่านเป็นก้อนเดียวเกาะขอบล่างของภาพ ไม่ใช่ย่อหน้าลอย */}
                <p className="mt-1 text-[0.9375rem] leading-normal font-medium text-white">
                  {g.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
