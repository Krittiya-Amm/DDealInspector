import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, LineIcon, PhoneIcon } from "@/components/icons";
import { contact, telHref } from "@/lib/site";

/* ชิ้นส่วนพื้นฐานของระบบดีไซน์รอบใหม่
 * ทุกตัวเป็น "ไม่รู้ภาษา" — ข้อความรับเข้ามาเป็น prop เสมอ
 * จึงใช้ได้ทั้งใน Server Component และ Client Component */

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

const sectionTone = {
  white: "bg-white",
  soft: "bg-brand-soft",
  surface: "bg-surface",
  brand: "bg-brand text-white",
  // พื้นเข้มพรีเมียม: เขียวป่าเข้ม + ตารางพิมพ์เขียว + แสงทองนวลที่มุม
  dark: "relative isolate overflow-hidden bg-brand-deep text-white bg-blueprint",
} as const;
export type SectionTone = keyof typeof sectionTone;

/** section มาตรฐาน — จังหวะ padding เดียวกันทั้งเว็บ
 *  สลับ tone ระหว่าง section เพื่อให้มีจุดพักสายตา (ข้อ 27) */
export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${sectionTone[tone]} ${className}`}>
      {tone === "dark" ? <div aria-hidden className="glow-gold absolute inset-0 -z-10" /> : null}
      {children}
    </section>
  );
}

/** หัว section: หัวข้อ 1 บรรทัด + คำโปรยไม่เกิน 2 บรรทัด (กติกาจากคำขอปรับ layout)
 *  label เป็นภาษาของหน้านั้นเสมอ ไม่ถ่าง letter-spacing เพราะเป็นไทยได้ */
export function SectionHeader({
  label,
  title,
  lead,
  align = "left",
  invert = false,
  action,
}: {
  label?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  action?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex gap-x-8 gap-y-4 ${
        center ? "flex-col items-center text-center" : "flex-wrap items-end justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {label ? (
          <p
            className={`inline-flex items-center gap-2.5 text-sm font-semibold ${
              center ? "justify-center" : ""
            } ${invert ? "text-gold" : "text-brand"}`}
          >
            {/* ขีดทองสั้นนำหน้าป้าย — เครื่องหมายเดียวที่บอกว่า "ขึ้นหัวข้อใหม่" */}
            <span aria-hidden className="h-0.5 w-7 rounded-full bg-gradient-to-r from-gold-deep to-gold" />
            {label}
          </p>
        ) : null}
        <h2
          className={`text-[1.75rem] leading-tight font-bold sm:text-[2.5rem] ${
            label ? "mt-3" : ""
          } ${invert ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={`mt-4 text-base sm:text-lg ${
              invert ? "text-white/80" : "text-muted"
            }`}
          >
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** ภาพผ่าน next/image แบบ fill — ตัวครอบกำหนดสัดส่วน/มุมจาก className
 *  TODO: CLIENT-ASSET ภาพใน public/images ยังเป็น stock รอภาพจริงจากเพจลูกค้า */
export function Img({
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
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={`/images/${src}`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${
          zoom ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""
        }`}
      />
    </div>
  );
}

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[0.9375rem] font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-out cursor-pointer active:scale-[0.98]";

/** ปุ่ม LINE — ปุ่มที่สำคัญที่สุดของเว็บ ใช้ทุกจุดที่พูดถึงราคาหรือบริการ
 *  เปิดแท็บใหม่เสมอ เพื่อไม่ให้คนหลุดจากหน้าเว็บ */
export function LineButton({
  label,
  size = "md",
  variant = "solid",
  full = false,
  className = "",
}: {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "white";
  full?: boolean;
  className?: string;
}) {
  const sz =
    size === "lg"
      ? "min-h-14 px-6 text-base"
      : size === "sm"
        ? "min-h-11 px-4 text-sm"
        : "";
  const tone =
    variant === "white"
      ? "bg-white text-line-btn hover:bg-brand-soft"
      : "bg-gradient-to-b from-[#05964a] to-line-btn text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-10px_rgb(0_135_60/0.75)] hover:to-line-btn-hover hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_14px_30px_-10px_rgb(0_135_60/0.85)]";
  return (
    <a
      href={contact.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} ${sz} ${tone} ${full ? "w-full" : ""} ${className}`}
    >
      <LineIcon className={size === "lg" ? "size-6" : "size-5"} />
      {label}
    </a>
  );
}

export function CallButton({
  label,
  index = 0,
  variant = "outline",
  size = "md",
  full = false,
  className = "",
}: {
  label: string;
  index?: number;
  variant?: "outline" | "white";
  size?: "md" | "lg";
  full?: boolean;
  className?: string;
}) {
  const tone =
    variant === "white"
      ? "border-2 border-white/70 text-white hover:bg-white/10"
      : "border-2 border-brand text-brand hover:bg-brand-soft";
  return (
    <a
      href={telHref(index)}
      className={`${btnBase} ${size === "lg" ? "min-h-14 px-6 text-base" : ""} ${tone} ${
        full ? "w-full" : ""
      } ${className}`}
    >
      <PhoneIcon className="size-5" />
      {label}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white";
  className?: string;
}) {
  const tone = {
    primary: "bg-brand-deep text-white shadow-card hover:bg-brand-dark",
    outline: "border-2 border-brand text-brand hover:bg-brand-soft",
    white: "bg-white text-brand hover:bg-brand-soft",
  }[variant];
  return (
    <Link href={href} className={`${btnBase} ${tone} ${className}`}>
      {children}
    </Link>
  );
}

/** ลิงก์ข้อความ + ลูกศร — สูง 44px ตามเกณฑ์เป้าสัมผัส */
export function TextLink({
  href,
  children,
  invert = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-1.5 font-semibold ${
        invert ? "text-white hover:text-gold" : "text-brand hover:text-brand-dark"
      } ${className}`}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function Badge({
  children,
  tone = "soft",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "soft" | "gold" | "white" | "line";
  className?: string;
}) {
  const t = {
    soft: "bg-brand-soft text-brand-dark",
    gold: "bg-gradient-to-r from-gold-light to-gold text-brand-deep shadow-gold",
    white: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
    line: "bg-white/95 text-ink ring-1 ring-line shadow-card",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold ${t} ${className}`}
    >
      {children}
    </span>
  );
}

/** ไอคอนในวงกลม — จุดดึงสายตาของการ์ดที่ไม่มีภาพ */
export function IconBubble({
  icon: Icon,
  tone = "soft",
  size = "md",
}: {
  icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  tone?: "soft" | "brand" | "gold" | "white" | "premium";
  size?: "md" | "lg";
}) {
  const t = {
    soft: "bg-brand-soft text-brand ring-1 ring-brand/10",
    brand: "bg-brand text-white",
    gold: "bg-gradient-to-br from-gold-light to-gold-deep text-brand-deep shadow-gold",
    white: "bg-white/10 text-gold ring-1 ring-white/15",
    // เขียวป่าไล่เฉด + ไอคอนทอง = สัญลักษณ์ "มาตรฐานวิชาชีพ" ของทั้งเว็บ
    premium: "bg-gradient-to-br from-brand to-brand-deep text-gold shadow-[0_8px_20px_-10px_rgb(11_42_27/0.8)]",
  }[tone];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl ${t} ${
        size === "lg" ? "size-14" : "size-12"
      }`}
    >
      <Icon className={size === "lg" ? "size-7" : "size-6"} />
    </span>
  );
}

/** "เริ่มต้น ฿3,000" — ตัวเลขใหญ่หนาเป็นจุดเด่น (ข้อ 6)
 *  ฿ วางหน้าตัวเลขทั้งสองภาษา หน่วยอ่านออกเสียงผ่าน sr-only */
export function Price({
  from,
  value,
  unit,
  size = "md",
  invert = false,
}: {
  from: string;
  value: string;
  unit: string;
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  const num = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl sm:text-5xl" }[size];
  return (
    <p className="flex items-baseline gap-2">
      <span className={`text-sm ${invert ? "text-white/80" : "text-muted"}`}>{from}</span>
      <span className={`tnum font-bold ${num} ${invert ? "text-gold" : "text-brand"}`}>
        ฿{value}
      </span>
      <span className="sr-only">{unit}</span>
    </p>
  );
}
