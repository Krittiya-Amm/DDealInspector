import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, LineIcon, PhoneIcon } from "@/components/icons";
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
  if (variant === "pill") {
    return (
      <span
        className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase ${
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

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** ท่อนท้ายหัวข้อที่ย้อมสีเน้น — ใช้ประหยัด ๆ ไม่งั้นหมดความหมาย */
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "dark" ? "invert" : "accent"}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={`mt-6 text-[1.75rem] font-semibold sm:text-[2.25rem] lg:text-[2.625rem] ${
          tone === "dark" ? "text-white" : ""
        }`}
      >
        {title}
        {accent ? <span className="text-gold-500">{accent}</span> : null}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-[1.0625rem] leading-[1.8] ${
            tone === "dark" ? "text-white/70" : "text-ink2"
          }`}
        >
          {lead}
        </p>
      ) : null}
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
}: {
  href: string;
  children: React.ReactNode;
  /** ขยาย hit area ให้เต็มการ์ดแม่ (การ์ดต้องเป็น `relative`) */
  stretch?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center gap-1.5 text-[0.9375rem] font-semibold text-gold-700 hover:text-ink ${
        stretch ? "after:absolute after:inset-0 after:content-['']" : ""
      }`}
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
  // TODO: CLIENT-ASSET — ภาพใน /public/mock เป็น stock ชั่วคราว ดู public/mock/CREDITS.md
  // radius มาจาก call site เสมอ — ถ้าใส่ rounded-sm เป็นค่าตั้งต้น การส่ง
  // rounded-none มา override จะไม่ทำงาน (Tailwind ตัดสินด้วยลำดับใน stylesheet)
  return (
    <div className={`relative overflow-hidden bg-warm ${className}`}>
      <Image
        src={`/mock/${src}`}
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
