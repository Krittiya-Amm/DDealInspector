type IconProps = React.SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 3h-.9A2.7 2.7 0 0 0 3 5.7C3 14.15 9.85 21 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-.9a1.2 1.2 0 0 0-.82-1.14l-3.4-1.13a1.2 1.2 0 0 0-1.3.4l-.86 1.07a13.6 13.6 0 0 1-5.92-5.92l1.07-.86a1.2 1.2 0 0 0 .4-1.3L7.74 3.82A1.2 1.2 0 0 0 6.6 3Z" />
  </Base>
);

export const LineIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.4c-5.4 0-9.8 3.55-9.8 7.92 0 3.92 3.49 7.2 8.2 7.81.32.07.75.21.86.48.1.25.07.63.03.88l-.14.83c-.04.25-.2.96.85.53 1.05-.44 5.64-3.32 7.7-5.69 1.42-1.55 2.1-3.14 2.1-4.84 0-4.37-4.4-7.92-9.8-7.92Zm-3.9 10.5H6.16a.52.52 0 0 1-.52-.51V8.5a.52.52 0 0 1 1.03 0v3.37H8.1a.52.52 0 0 1 0 1.03Zm2.02-.51a.52.52 0 0 1-1.03 0V8.5a.52.52 0 0 1 1.03 0v3.89Zm4.68 0a.52.52 0 0 1-.93.31l-2-2.7v2.39a.52.52 0 0 1-1.03 0V8.5a.52.52 0 0 1 .93-.31l2 2.71V8.5a.52.52 0 0 1 1.03 0v3.89Zm3.14-2.46a.52.52 0 0 1 0 1.03h-1.42v.91h1.42a.52.52 0 0 1 0 1.03h-1.94a.52.52 0 0 1-.51-.51V8.5a.52.52 0 0 1 .51-.52h1.94a.52.52 0 0 1 0 1.04h-1.42v.91h1.42Z" />
  </svg>
);

/* โลโก้โซเชียลเป็น glyph ตันสีเดียว (fill=currentColor) แบบเดียวกับ LineIcon
   — รับสีจาก text-* ที่ครอบอยู่ จึงเปลี่ยนเป็นทองตอน hover ได้เหมือนไอคอนอื่น
   ปุ่มที่เรียกใช้ต้องมี aria-label เพราะเป็นไอคอนล้วนไม่มีตัวหนังสือ */
export const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);

export const TiktokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <Base strokeWidth={2.25} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.9 7.5 9 4.3-1.1 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const ArrowIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ChevronIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 10 4 4 4-4" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Base>
);

export const DocIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4" />
  </Base>
);

export const ToolIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 6.5a4 4 0 0 0 5.2 5.2l-7.8 7.8a2.5 2.5 0 0 1-3.5-3.5l7.8-7.8a4 4 0 0 0-5.2-5.2" />
  </Base>
);

export const SofaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path d="M4 11a2 2 0 0 0-2 2v3h20v-3a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1H6v-1a2 2 0 0 0-2-2Z" />
    <path d="M5 19v-3M19 19v-3" />
  </Base>
);

export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.5Z" />
    <path d="M9.5 20.5v-6h5v6" />
  </Base>
);

export const ExternalIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 5h5v5M19 5l-8 8" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </Base>
);

/* ── ไอคอนบริการตกแต่ง ──────────────────────────────────────────────
   หกใบนี้ใช้แทนเครื่องหมายถูกในรายการบริการตกแต่ง เพื่อให้แต่ละบรรทัด
   สื่อของจริงแทนที่จะเป็น "ติ๊กถูก" ซ้ำกันหกครั้ง — ทุกใบวาดบน Base ตัวเดียวกัน
   (เส้น 1.75 มุมมน viewBox 24) ภาษาภาพจึงเข้าชุดกับไอคอนที่เหลือทั้งเว็บ

   ทุกใบถูกจัดกรอบภาพให้อยู่ในสี่เหลี่ยมกลาง viewBox ราว 4–20 (กว้าง/สูง ~16)
   และกึ่งกลางที่ (12,12) ตัวลายจึงมี "ขนาดสายตา" เท่ากันทั้งชุด ไม่ใช่บางใบ
   เต็มกรอบ (พระอาทิตย์) บางใบลอยเล็ก (บ้าน) ทั้งที่กล่อง svg เท่ากัน */

// ผ้าม่าน/มู่ลี่/พรม — ราวม่านบนสุด จีบม่านห้อยลง จบด้วยชายผ้าเป็นคลื่น
export const CurtainIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4h16" />
    <path d="M7 4.5v13.5M10.33 4.5v13.5M13.67 4.5v13.5M17 4.5v13.5" />
    <path d="M4 18q1.6 2.4 3.2 0t3.2 0 3.2 0 3.2 0 3.2 0" />
  </Base>
);

// วอลเปเปอร์ — แผงผนังที่มีลายซ้ำ (ข้าวหลามตัด 4 ดวง) = ผนังบุลาย ไม่ใช่ผนังเปล่า
export const WallpaperIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M8.5 6.3l2.2 2.2-2.2 2.2-2.2-2.2z" />
    <path d="M15.5 6.3l2.2 2.2-2.2 2.2-2.2-2.2z" />
    <path d="M8.5 13.3l2.2 2.2-2.2 2.2-2.2-2.2z" />
    <path d="M15.5 13.3l2.2 2.2-2.2 2.2-2.2-2.2z" />
  </Base>
);

// พื้น SPC — แผ่นพื้นไม้ยาวแนวนอน รอยต่อสลับแบบเบาบาง (อ่านเป็นพื้นไม้ ไม่ใช่ผนังอิฐ)
export const FloorIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="5" width="16" height="14" rx="1" />
    <path d="M4 8.5h16M4 12h16M4 15.5h16" />
    <path d="M10.5 5v3.5" />
    <path d="M15 8.5v3.5" />
    <path d="M9 12v3.5" />
    <path d="M14 15.5v3.5" />
  </Base>
);

// ฟิล์มกรองแสง — ดวงอาทิตย์มีรัศมี แทน "แสง" ที่ฟิล์มช่วยกรอง
export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M17.6 6.4l-1.4 1.4M6.4 17.6l1.4-1.4" />
  </Base>
);

// กระจกกั้นห้อง — แผงกระจกในกรอบ แบ่งช่องด้วยเสากลาง มีเส้นสะท้อนแสงบอกว่าเป็นกระจก
export const PartitionIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M9.33 4v16M14.67 4v16" />
    <path d="M6.5 15l2.5-4" />
  </Base>
);

// ต่อเติมบ้าน — ตัวบ้านหลังหลักกับส่วนต่อเติมหลังคาต่ำทางขวา
export const ExtendHomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5 9.5 4.5 15 10.5" />
    <path d="M5 10.5v9M14 10.5v9M5 19.5h15" />
    <path d="M14 13.5h6v6" />
    <path d="M8.3 19.5v-3.8h3V19.5" />
  </Base>
);

/* ── ไอคอนชุดรอบปรับดีไซน์ ต.ค. 2569 — เส้น 1.75 ทรงเดียวกับชุดเดิม (Base 24×24) ── */

export const BuildingIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
  </Base>
);

export const HardHatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 17h18M4.5 17a7.5 7.5 0 0 1 15 0" />
    <path d="M10 9.7V6h4v3.7M3 17v2h18v-2" />
  </Base>
);

export const KeyIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 9-9M17 6l2 2M15 8l2 2" />
  </Base>
);

export const RefreshIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4" />
  </Base>
);

export const WrenchIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 6.3-6.3a4 4 0 0 1-5-5L12 5l-2.6-2.6a6 6 0 0 1 7.6 7.6" />
    <path d="M3 21l5.5-5.5" />
  </Base>
);

export const ThermalIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="14" height="12" rx="2" />
    <path d="m17 10 4-2v8l-4-2" />
    <circle cx="10" cy="12" r="3" />
  </Base>
);

export const DropletIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  </Base>
);

export const CameraIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12h7a3 3 0 0 0 3-3V5" />
    <circle cx="13" cy="5" r="2" />
    <rect x="15" y="14" width="6" height="7" rx="1.5" />
    <path d="M3 12v6a3 3 0 0 0 3 3h9" />
  </Base>
);

export const LevelIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2" y="9" width="20" height="6" rx="1.5" />
    <rect x="9.5" y="10.5" width="5" height="3" rx="1.5" />
    <path d="M12 3v3M12 18v3" />
  </Base>
);

export const PlugIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />
  </Base>
);

export const RulerIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m3 16 13-13 5 5L8 21l-5-5Z" />
    <path d="m7 12 2 2M10 9l2 2M13 6l2 2" />
  </Base>
);

export const BoltIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </Base>
);

export const PipeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4v6a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v2M2 4h4M18 20h4" />
  </Base>
);

export const ColumnsIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 21h18M4 7h16M12 3 4 7M12 3l8 4M7 7v14M12 7v14M17 7v14" />
  </Base>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.5 14.3 4l2.7-.2.9 2.6 2.3 1.5-.6 2.6 1 2.5-2 1.8-.4 2.7-2.6.6-1.7 2.1-2.4-1.2-2.5 1.1-1.6-2.1-2.7-.6-.3-2.7L3.5 13l1-2.5-.6-2.6 2.3-1.4.9-2.6 2.7.2Z" />
    <path d="m8.5 12 2.3 2.3 4.7-4.6" />
  </Base>
);

export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5a6.5 6.5 0 0 1 3 5.5" />
  </Base>
);

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Base>
);

export const HeartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7.5-4.6-9-9.5A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 9 4.5C19.5 15.4 12 20 12 20Z" />
  </Base>
);

export const ChatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
    <path d="M8 10h8M8 13h5" />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Base>
);

export const ZoomIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4M11 8v6M8 11h6" />
  </Base>
);

export const QuoteIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M4 18v-5.5C4 8.4 6.2 5.6 10 5l.7 1.7C8.6 7.5 7.6 9 7.5 11H10v7H4Zm10 0v-5.5c0-4.1 2.2-6.9 6-7.5l.7 1.7c-2.1.8-3.1 2.3-3.2 4.3H20v7h-6Z" />
  </svg>
);

export const MessengerIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.1 7.1.2.1.3.4.3.6l.1 1.8c0 .6.6 1 1.2.7l2-.9c.2-.1.4-.1.6-.1.9.3 1.8.4 2.7.4 5.6 0 10-4.1 10-9.6S17.6 2 12 2Zm6 7.5-2.9 4.6a1.5 1.5 0 0 1-2.2.4l-2.3-1.7a.6.6 0 0 0-.7 0l-3.1 2.4c-.4.3-1-.2-.7-.6L8.9 10a1.5 1.5 0 0 1 2.2-.4l2.3 1.7c.2.2.5.2.7 0l3.1-2.4c.4-.3 1 .2.8.6Z" />
  </svg>
);
