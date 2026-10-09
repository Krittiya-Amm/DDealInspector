"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, ZoomIcon } from "@/components/icons";

type Cat = "condo" | "house" | "onsite";
type Photo = { image: string; cat: Cat; caption: string };

/** แกลเลอรีบรรยากาศการเข้าตรวจงาน (ข้อ 31)
 *  แท็บหมวด คอนโด / บ้าน / ระหว่างการตรวจ · คำบรรยาย 1 บรรทัด
 *  กดแล้วเปิดภาพใหญ่ (dialog เนทีฟ: ปิดด้วย Esc ได้ โฟกัสถูกกักไว้ในกล่องเอง)
 *  มือถือเลื่อนแนวนอน · desktop เป็น grid */
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
            onClick={() => setCat(k)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
              cat === k ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-line hover:bg-brand-soft"
            }`}
          >
            {cats[k]}
          </button>
        ))}
      </div>

      <ul className="scroller -mx-4 mt-6 gap-3 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {list.map((p, i) => (
          <li key={p.image} className="w-[72%] sm:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full cursor-zoom-in text-left"
              aria-label={`${text.zoom}: ${p.caption}`}
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface">
                <Image
                  src={`/images/${p.image}`}
                  alt={p.caption}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 72vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-white/90 text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIcon className="size-5" />
                </span>
              </span>
              <span className="mt-2 block truncate text-sm text-muted">{p.caption}</span>
            </button>
          </li>
        ))}
      </ul>

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
