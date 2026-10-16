"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, ZoomIcon } from "@/components/icons";

type Cat = "condo" | "house" | "onsite";
type Photo = { image: string; cat: Cat; caption: string };

/** แกลเลอรีบรรยากาศการเข้าตรวจงาน (ข้อ 31)
 *  แท็บหมวด คอนโด / บ้าน / ระหว่างการตรวจ
 *  รูปแบบ "ภาพเด่น + แถบภาพย่อ": ภาพที่เลือกแสดงใหญ่ พร้อมคำบรรยายและลำดับภาพ · กดภาพย่อเพื่อสลับ
 *  กดภาพใหญ่เปิดเต็มจอ (dialog เนทีฟ: ปิดด้วย Esc ได้ โฟกัสถูกกักไว้ในกล่องเอง · ลูกศรซ้าย-ขวาเลื่อนภาพ) */
export function PhotoGallery({
  photos,
  cats,
  text,
}: {
  photos: Photo[];
  cats: Record<"all" | Cat, string>;
  text: { zoom: string; prev: string; next: string; close: string };
}) {
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const list = cat === "all" ? photos : photos.filter((p) => p.cat === cat);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) dlg.close();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + list.length) % list.length)),
    [list.length],
  );

  const current = open !== null ? list[open] : null;

  return (
    <div>
      <div role="tablist" className="scroller -mx-4 gap-2 px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {(Object.keys(cats) as ("all" | Cat)[]).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={cat === k}
            onClick={() => {
              setCat(k);
              setActive(0);
            }}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors ${
              cat === k ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"
            }`}
          >
            {cats[k]}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_11rem] lg:gap-5">
          {/* ภาพเด่น */}
          <figure>
            <button
              type="button"
              onClick={() => setOpen(active)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-surface"
              aria-label={`${text.zoom}: ${list[active].caption}`}
            >
              <span className="relative block aspect-[4/3] sm:aspect-[16/9]">
                <Image
                  key={list[active].image}
                  src={`/images/${list[active].image}`}
                  alt={list[active].caption}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="animate-[fade-in_400ms_ease-out] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                />
              </span>
              <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white text-ink transition-transform duration-200 group-hover:scale-105">
                <ZoomIcon className="size-5" />
              </span>
            </button>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
              <span className="text-ink">{list[active].caption}</span>
              <span className="tnum shrink-0 text-muted">
                {String(active + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          {/* แถบภาพย่อ — มือถือแนวนอน 4 ช่อง · จอใหญ่เรียงลงด้านขวา */}
          <ul className="grid grid-cols-4 gap-2 sm:gap-3 lg:mb-8 lg:max-h-full lg:grid-cols-1 lg:grid-rows-4">
            {list.map((p, i) => (
              <li key={p.image} className="lg:min-h-0">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  aria-label={p.caption}
                  className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl transition-[opacity,box-shadow] lg:aspect-auto lg:h-full duration-200 ${
                    i === active ? "opacity-100 ring-2 ring-brand ring-offset-2" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={`/images/${p.image}`} alt="" fill sizes="(min-width: 1024px) 11rem, 25vw" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(64rem,94vw)] max-w-none bg-transparent p-0 backdrop:bg-black/85"
        aria-label={current?.caption}
      >
        {current ? (
          <figure>
            <div className="relative aspect-[4/3] max-h-[78vh] w-full overflow-hidden rounded-xl bg-black">
              <Image src={`/images/${current.image}`} alt={current.caption} fill sizes="94vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-3 text-white">
              <span>{current.caption}</span>
              <span className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label={text.prev} className="grid size-11 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                  <ChevronIcon className="size-5 rotate-90" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={text.next} className="grid size-11 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                  <ChevronIcon className="size-5 -rotate-90" />
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label={text.close} className="grid size-11 place-items-center rounded-full bg-white text-ink">
                  <CloseIcon className="size-5" />
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </div>
  );
}
