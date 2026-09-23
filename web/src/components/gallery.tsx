"use client";

import { useState } from "react";
import { Container, MockImage, SectionHeading } from "@/components/ui";
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
    <section
      id="gallery"
      className="border-y border-line bg-warm py-24 sm:py-32"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <SectionHeading
            eyebrow="Gallery"
            title="ตัวอย่างสิ่งที่เราเข้าไปตรวจ"
            lead="ภาพชุดนี้แสดงลักษณะงานและจุดที่เราให้ความสำคัญในที่อยู่อาศัยแต่ละประเภท"
          />

          <div
            role="group"
            aria-label="กรองแกลเลอรีตามหมวด"
            className="flex flex-wrap gap-2"
          >
            {galleryCategories.map((c) => {
              const on = c.key === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  aria-pressed={on}
                  className={`inline-flex min-h-[44px] items-center rounded-sm border px-4 text-[0.9375rem] font-medium transition-colors duration-200 ease-out ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-paper text-ink2 hover:border-ink hover:text-ink"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <li
              key={g.image}
              className="group relative overflow-hidden rounded-sm"
            >
              <MockImage
                src={g.image}
                alt={g.caption}
                zoom
                className="aspect-[4/3] w-full"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {/* ไล่เฉดจากกรมท่าเข้ม ไม่ใช่ดำ — ดำบนภาพโทนอุ่นจะออกเทาสกปรก
                  ช่วงล่างทึบเกือบเต็มจึงคุมคอนทราสต์ตัวหนังสือขาวได้ไม่ว่าภาพจะสว่างแค่ไหน */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent p-4 pt-14">
                <p className="text-[0.9375rem] leading-snug font-medium text-white">
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
