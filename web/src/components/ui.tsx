import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, LineIcon, PhoneIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { contact, telHref } from "@/lib/site";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── จังหวะแนวตั้ง ──────────────────────────────────────────────────────
   ช่องว่างเหนือ-ใต้ section คือเครื่องมือบอกลำดับความสำคัญ ไม่ใช่ค่าที่ตั้งครั้งเดียว
   แล้วใช้ยาว ตอน audit วัดได้ว่าหน้า /services/inspection มี 11 section ติดกัน
   ที่ padding 128/128 เป๊ะเท่ากันหมด ผลคือหน้าอ่านเป็น "แถวของบล็อกที่ถูกปั๊มออกมา"
   ต่อให้เนื้อหาข้างในแต่ละบล็อกต่างกันแค่ไหนก็ตาม เพราะตาจับจังหวะก่อนจับเนื้อหา

   สี่ระดับนี้ไม่ได้ให้เลือกตามใจ แต่ผูกกับ "หน้าที่" ของบล็อก:
     tight  ป้ายนำทาง/สารบัญ — เป็นทางผ่าน ไม่ใช่จุดหยุด
     dense  รายการ ตาราง ข้อมูลอ้างอิง — อ่านต่อเนื่อง ไม่ต้องการที่หายใจ
     base   ค่าตั้งต้นของบล็อกเนื้อหาทั่วไป
     open   บล็อกที่ต้องให้หยุดดู (ภาพใหญ่ ใบรับรอง ตัวอย่างรายงาน)

   กติกา: section ที่ติดกันห้ามใช้ระดับเดียวกันสองครั้งซ้อน เว้นแต่ตั้งใจให้อ่าน
   เป็นก้อนเดียวกัน — ลำดับที่ควรได้คือ แน่น → หายใจ → แน่น → ภาพ → หายใจ */
export const rhythm = {
  tight: "py-10 sm:py-12",
  dense: "py-14 sm:py-20",
  base: "py-20 sm:py-28",
  open: "py-24 sm:py-36",
} as const;

/* SectionNav ย้ายไป components/section-nav.tsx เพราะต้องอ่านตำแหน่ง scroll
   เพื่อไฮไลต์หัวข้อที่กำลังอ่านอยู่ จึงต้องเป็น client component
   ไม่ re-export ต่อจากที่นี่เหมือนที่ sections.tsx ทำกับ InspectionProcess
   เพราะ section-nav.tsx import Container จากไฟล์นี้ — re-export กลับจะเป็นวงจร
   หน้าที่ใช้จึง import ตรงจาก "@/components/section-nav" */

export function Eyebrow({
  children,
  tone = "accent",
  variant = "rule",
}: {
  children: React.ReactNode;
  tone?: "accent" | "invert";
  /** `rule` = ป้ายกำกับหัวข้อ (ค่าตั้งต้น) · `pill` = แท็กหมวดหมู่ */
  variant?: "rule" | "pill";
}) {
  // แท็กหมวดหมู่ใส่ชื่อหมวดซึ่งเป็นภาษาไทยเสมอ จึงไม่ถ่าง letter-spacing
  // และไม่ uppercase (ไทยไม่มีตัวพิมพ์ใหญ่อยู่แล้ว) — ต่างจาก variant "rule"
  // ที่เป็นป้ายอังกฤษล้วนและถ่างได้ ดูเหตุผลเรื่องสระ/วรรณยุกต์ด้านล่าง
  //
  // และใช้ 12px ไม่ใช่ 11px เท่า variant "rule" — ที่ 11px สระบนกับวรรณยุกต์ไทย
  // เหลือความสูงราว 1px เรนเดอร์ออกมาเป็นจุดเดียวกันหมด แยก "ไม้เอก/ไม้โท" ไม่ออก
  // ป้ายอังกฤษไม่มีปัญหานี้จึงคงขนาดเดิมไว้ได้
  if (variant === "pill") {
    return (
      <span
        className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold ${
          tone === "invert"
            ? "bg-white/10 text-white"
            : "bg-warm text-ink2"
        }`}
      >
        {children}
      </span>
    );
  }

  // ป้ายกำกับเป็น "อังกฤษตัวพิมพ์ใหญ่ถ่างกว้าง" ทั้งเว็บ ไม่ใช่ภาษาไทย —
  // ไทยไม่เว้นวรรคระหว่างคำ ถ่าง 0.2em แล้วตาจะแยกขอบเขตคำไม่ออก
  // แต่ป้ายอังกฤษสั้น ๆ ถ่างได้เต็มที่ ซึ่งคือสิ่งที่ทำให้หัวข้ออ่านเป็นงานบรรณาธิการ
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase ${
        tone === "invert" ? "text-white/60" : "text-gold-700"
      }`}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* ─── Inspection Language ────────────────────────────────────────────────
   ภาษาภาพชุดเล็ก ๆ ที่ยืมมาจากใบรายงานตรวจบ้านจริง — เลขอ้างอิง เลขลำดับ
   ป้ายโซน เส้นบอกระยะ หมุดชี้ตำแหน่ง สิ่งเหล่านี้ทำให้หน้าเว็บอ่านเป็น
   "เอกสารทางเทคนิค" มากกว่า "หน้าขายของ" โดยไม่ต้องเพิ่มสีหรือฟอนต์ใหม่เลย

   กฎเหล็ก: ทุกตัวเลขที่โชว์ต้องมาจากข้อมูลที่มีอยู่จริง (ลำดับรายการ ปี ชื่อหมวด)
   ห้ามแต่งเลขรายงาน เลขใบอนุญาต หรือพิกัดขึ้นมาเองเพื่อความสวย
   ─────────────────────────────────────────────────────────────────────── */

/** ป้ายข้อมูลเชิงเทคนิค — เล็ก ถ่างกว้าง ตัวพิมพ์ใหญ่
 *  ⚠️ ใส่ได้เฉพาะข้อความอังกฤษหรือตัวเลขเท่านั้น
 *  ไทยถ่าง 0.18em แล้วสระกับวรรณยุกต์จะหลุดจากพยัญชนะจนอ่านยาก (เหตุผลเดียวกับ Eyebrow)
 *  ถ้าข้อมูลเป็นไทย ให้ใช้ข้อความ text-sm text-ink3 ธรรมดาแทน */
export function TechLabel({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent" | "invert";
  className?: string;
}) {
  const toneCls = {
    muted: "text-ink3",
    accent: "text-gold-700",
    invert: "text-white/55",
  }[tone];
  return (
    <span
      className={`tnum text-[10.5px] font-semibold tracking-[0.18em] uppercase ${toneCls} ${className}`}
    >
      {children}
    </span>
  );
}

/** ตัวนับลำดับแบบแบบก่อสร้าง — `01 / 05` ตามด้วยชื่อกำกับ */
export function IndexLabel({
  current,
  total,
  label,
  tone = "muted",
  className = "",
}: {
  current: number | string;
  total: number | string;
  label?: string;
  tone?: "muted" | "accent" | "invert";
  className?: string;
}) {
  const pad = (n: number | string) =>
    typeof n === "number" ? String(n).padStart(2, "0") : n;
  return (
    <TechLabel tone={tone} className={`inline-flex items-center gap-3 ${className}`}>
      <span>
        {pad(current)}
        <span className="mx-1 opacity-40">/</span>
        {pad(total)}
      </span>
      {label ? (
        <>
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
          <span>{label}</span>
        </>
      ) : null}
    </TechLabel>
  );
}

/** เส้นคั่นบาง ๆ ที่ลากตัวเองตอนเลื่อนถึง — ใช้แทนขอบการ์ดในเลย์เอาต์แบบบรรณาธิการ
 *
 *  tone: light = เส้นแบ่งปกติบนพื้นสว่าง · dark = บนพื้นเข้ม
 *        ink   = เส้นหนักบนพื้นสว่าง ใช้เป็น "เส้นหัวตาราง" ที่แบ่งของเป็นชุด ๆ
 *                (ตารางราคาใช้ตัวนี้แทน border-t border-ink เพื่อให้เส้นลากเข้ามาได้
 *                 border จริงขยับ scaleX ไม่ได้ ต้องเป็น element ของมันเอง) */
export function DrawnRule({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark" | "ink";
}) {
  const toneCls = { light: "bg-line", dark: "bg-white/20", ink: "bg-ink" }[
    tone
  ];
  return (
    <Reveal
      variant="line"
      as="span"
      className={`block h-px w-full ${toneCls} ${className}`}
    >
      {null}
    </Reveal>
  );
}

/** หมุดชี้ตำแหน่งบนภาพ — เลียนแบบการวงจุด defect ในรายงาน
 *  ตัวเลขต้องเป็นลำดับของรายการจริงเท่านั้น ไม่ใช่เลขสุ่มให้ดูเท่ */
export function ImageMarker({
  index,
  label,
  style,
  className = "",
}: {
  index: number;
  label: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={style}
      className={`pointer-events-none absolute flex items-center gap-2 ${className}`}
    >
      <span className="relative flex size-6 items-center justify-center rounded-full border border-white/80 bg-ink-deep/70 backdrop-blur-[1px]">
        <span className="tnum font-display text-[11px] leading-none font-semibold text-white">
          {index}
        </span>
      </span>
      <span className="tnum bg-ink-deep/70 px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.14em] whitespace-nowrap text-white/90 uppercase backdrop-blur-[1px]">
        {label}
      </span>
    </span>
  );
}

/* หัว section มีสามทรง ไม่ใช่ทรงเดียว — ตอน audit นับได้ว่า 9 section ในหน้าเดียว
   ขึ้นต้นด้วย "ป้ายเล็ก → หัวข้อ 42px ชิดซ้าย → ย่อหน้า" เหมือนกันทุกตัว
   ซึ่งเป็นลายเซ็นของหน้าที่ประกอบจากคอมโพเนนต์สำเร็จรูป ไม่ใช่หน้าที่ถูกจัด

   ทรงไม่ได้มีไว้สลับให้ดูหลากหลาย แต่เลือกตามรูปร่างของบล็อกที่มันนำ:
     stack  บล็อกที่หัวข้อยืนเป็นคอลัมน์ของตัวเอง (layout สองคอลัมน์ หัวอยู่ซ้าย)
     split  บล็อกเต็มความกว้าง — หัวข้อซ้าย คำโปรยขวา ยึดเส้นฐานเดียวกัน
     rule   บล็อกที่ต้องประกาศตัวว่าเป็นบทใหม่ — ป้ายนั่งบนเส้นคาดเต็มความกว้าง

   ทั้งสามทรงใช้ขนาดตัวอักษร ระยะ และป้ายชุดเดียวกันหมด ต่างกันแค่การจัดวาง
   จึงยังเป็นระบบเดียว ไม่ใช่สามสไตล์ปนกัน (ข้อกำหนด: อยู่ใน design system เดียว) */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  tone = "light",
  variant = "stack",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** ท่อนท้ายหัวข้อที่ย้อมสีเน้น — ใช้ประหยัด ๆ ไม่งั้นหมดความหมาย */
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  variant?: "stack" | "split" | "rule";
}) {
  const dark = tone === "dark";
  const titleCls = `text-[1.75rem] font-semibold sm:text-[2.25rem] lg:text-[2.625rem] ${
    dark ? "text-white" : ""
  }`;
  const leadCls = `text-[1.0625rem] leading-[1.8] ${
    dark ? "text-white/70" : "text-ink2"
  }`;
  const heading = (
    <>
      {title}
      {accent ? <span className="text-gold-500">{accent}</span> : null}
    </>
  );
  const label = eyebrow ? (
    <Eyebrow tone={dark ? "invert" : "accent"}>{eyebrow}</Eyebrow>
  ) : null;

  /* หัวข้อกับคำโปรยยืนคนละคอลัมน์ ยึด items-end ให้เส้นฐานบรรทัดสุดท้าย
     ของทั้งสองฝั่งตรงกัน — ถ้าปล่อย stretch คำโปรยจะลอยกลางคอลัมน์
     (บั๊กชุดเดียวกับที่บันทึกไว้ใน README หัวข้อ "กติกาการวางคอลัมน์") */
  if (variant === "split") {
    return (
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
        <div>
          {label}
          <h2 className={`${label ? "mt-6" : ""} ${titleCls}`}>{heading}</h2>
        </div>
        {lead ? <p className={`max-w-xl lg:pb-2 ${leadCls}`}>{lead}</p> : null}
      </div>
    );
  }

  /* เส้นคาดเต็มความกว้างคือสิ่งที่ทำให้บล็อกอ่านเป็น "บทใหม่" ไม่ใช่ "หัวข้อถัดไป"
     ยืมมาจากหัวกระดาษรายงาน ซึ่งเป็นภาษาภาพหลักของเว็บนี้อยู่แล้ว */
  if (variant === "rule") {
    return (
      <div>
        {label}
        <span
          aria-hidden
          className={`mt-5 block h-px w-full ${dark ? "bg-white/15" : "bg-line"}`}
        />
        <h2 className={`mt-8 max-w-3xl ${titleCls}`}>{heading}</h2>
        {lead ? <p className={`mt-5 max-w-2xl ${leadCls}`}>{lead}</p> : null}
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {label}
      <h2 className={`${label ? "mt-6" : ""} ${titleCls}`}>{heading}</h2>
      {lead ? <p className={`mt-5 ${leadCls}`}>{lead}</p> : null}
    </div>
  );
}

// ปุ่มทั้งเว็บมุม 4px เท่ากับการ์ด — ปุ่มแคปซูลอ่านเป็นแอปผู้บริโภค ไม่ใช่งานวิชาชีพ
const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm px-7 text-[0.9375rem] font-semibold transition-[background-color,border-color,color] duration-200 ease-out";

const buttonTone = {
  primary: "bg-ink text-white hover:bg-ink-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  onDark: "bg-white text-ink hover:bg-white/90",
  outlineDark: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
} as const;

export type ButtonTone = keyof typeof buttonTone;

export function Button({
  href,
  children,
  tone = "primary",
  external = false,
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: ButtonTone;
  external?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      {arrow ? (
        <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      ) : null}
    </>
  );
  const cls = `${buttonBase} ${buttonTone[tone]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** CTA หลักของทั้งเว็บ — พาไปที่ไลน์ ซึ่งเป็นช่องทางที่ลูกค้าใช้จริง */
export function BookCta({
  tone = "primary",
  className = "",
}: {
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <Button href={contact.lineUrl} external tone={tone} arrow className={className}>
      นัดหมายตรวจบ้าน
    </Button>
  );
}

export function QuoteCta({
  tone = "outline",
  className = "",
}: {
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <Button href="/contact" tone={tone} className={className}>
      ขอใบเสนอราคา
    </Button>
  );
}

export function CallButton({
  tone = "outline",
  className = "",
}: {
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <a href={telHref} className={`${buttonBase} ${buttonTone[tone]} ${className}`}>
      <PhoneIcon className="size-[18px]" />
      โทรปรึกษาฟรี
    </a>
  );
}

/** สีเขียวของ LINE ห้ามแก้ตามข้อกำหนดของ LINE — ใช้เฉพาะที่พูดถึงช่องทางตรง ๆ */
export function LineButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={contact.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonBase} bg-line-green text-white hover:brightness-95 ${className}`}
    >
      <LineIcon className="size-5" />
      ทักไลน์ นัดวันตรวจ
    </a>
  );
}

export function GhostLink({
  href,
  children,
  stretch = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** ขยาย hit area ให้เต็มการ์ดแม่ (การ์ดต้องเป็น `relative`) */
  stretch?: boolean;
  /** สำหรับ "วางที่ไหน" เท่านั้น (margin / grid placement / order)
   *  ห้ามส่งสีหรือขนาดตัวอักษรมาทับ — Tailwind ตัดสิน utility ที่ชนกัน
   *  ด้วยลำดับใน stylesheet ไม่ใช่ลำดับใน class attribute ของที่ส่งมาจะแพ้เงียบ ๆ
   *  (เคสจริงที่โดนมาแล้ว อยู่ในหัวข้อ "หมายเหตุสำหรับคนรับงานต่อ" ของ README) */
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center gap-1.5 text-[0.9375rem] font-semibold text-gold-700 hover:text-ink ${
        stretch ? "after:absolute after:inset-0 after:content-['']" : ""
      } ${className}`}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
    </Link>
  );
}

export function MockImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  zoom = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** ขยายภาพเล็กน้อยตอน hover — ต้องให้ตัวครอบเป็น `group` ถึงจะทำงาน */
  zoom?: boolean;
}) {
  // TODO: CLIENT-ASSET — ภาพใน /public/images ยังเป็น stock ชั่วคราวทั้งหมด
  // ดู public/images/CREDITS.md ว่าใบไหนมาจากไหน และวิธีเปลี่ยนเป็นภาพจริง
  // โฟลเดอร์เคยชื่อ /mock ซึ่งติดไปกับ URL ของทุกภาพ ใครเปิด DevTools หรือ
  // คลิกขวาดูภาพก็อ่านได้ว่าเว็บยังทำไม่เสร็จ — สถานะ placeholder ย้ายไปบันทึกที่
  // CREDITS.md กับ TODO ในโค้ดแทน ไม่ต้องประกาศผ่าน URL ให้ลูกค้าเห็น
  // radius มาจาก call site เสมอ — ถ้าใส่ rounded-sm เป็นค่าตั้งต้น การส่ง
  // rounded-none มา override จะไม่ทำงาน (Tailwind ตัดสินด้วยลำดับใน stylesheet)
  return (
    <div className={`relative overflow-hidden bg-warm ${className}`}>
      <Image
        src={`/images/${src}`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // 700ms ช้ากว่าไมโครอินเทอแรกชันทั่วไปตั้งใจ — ภาพใหญ่ที่ซูมเร็วอ่านเป็นโฆษณา
        className={`object-cover ${
          zoom
            ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            : ""
        }`}
      />
    </div>
  );
}

export function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  // radius มาจาก call site เสมอ เหตุผลเดียวกับ MockImage ข้างบน
  return (
    <div
      className={`placeholder-hatch flex items-center justify-center ${className}`}
    >
      <span className="rounded-sm bg-white/80 px-3 py-1 text-xs font-medium text-ink3">
        {label}
      </span>
    </div>
  );
}
