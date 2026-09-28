/* LogoMark — เครื่องหมายของ D Deal Inspector & Interior วาดใหม่เป็น SVG จากโลโก้ที่ลูกค้าส่งมา
 *
 * ทำไมเป็น SVG ไม่ใช่ไฟล์ภาพ: mark นี้โผล่ที่ header (พื้นขาว) และ footer (พื้นครีม)
 * ขนาดจริงราว 36px — เวกเตอร์คมทุกจอ ปรับสี/ขนาดได้จากที่เดียว และไม่กินคำขอโหลดภาพ
 *
 * องค์ประกอบตรงกับโลโก้: สามเหลี่ยม (บ้าน/หลังคา) + แว่นขยาย = งาน "ตรวจ"
 * แถบตึกสีเหลืองไล่ระดับ = งานอาคาร/ตกแต่ง · สองสีคือเขียวป่ากับเหลืองสดของแบรนด์
 *
 * สีฝังตรงนี้ (ไม่ใช้ currentColor) เพราะ mark มีหลายสีพร้อมกัน:
 *   เขียว = เขียวสดของโลโก้ (เข้มกว่านี้คือ --color-ink ที่ใช้กับตัวหนังสือ)
 *   เหลือง = --color-gold-bright · แว่นขยาย = เขียวเกือบดำให้เข้ากับพื้นครีมโดยไม่ออกเทา
 *
 * TODO: CLIENT-ASSET — ถ้าลูกค้าส่งไฟล์เวกเตอร์ต้นฉบับ (.svg/.ai) มา ให้แทน path ด้านล่าง
 * ด้วยไฟล์จริงเพื่อความตรงเป๊ะระดับพิกเซล · โครงการวางโค้ดไว้ให้สลับได้จุดเดียว
 */
const GREEN = "#16653a";
const YELLOW = "#f2c744";
const LENS = "#10231a";

type Props = React.SVGProps<SVGSVGElement> & { title?: string };

export function LogoMark({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 52 44"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}

      {/* แถบตึกสีเหลืองไล่ระดับ (วาดก่อนเพื่อให้สามเหลี่ยมทับขอบซ้ายได้เนียน) */}
      <g fill={YELLOW}>
        <rect x="30.5" y="12" width="3.2" height="25" rx="0.4" />
        <rect x="35" y="7" width="3.2" height="30" rx="0.4" />
        <rect x="39.5" y="16" width="3.2" height="21" rx="0.4" />
        <rect x="44" y="22" width="3.2" height="15" rx="0.4" />
      </g>

      {/* เส้นฐาน + สามเหลี่ยมตรวจบ้าน */}
      <path
        d="M16 6 L4 37 H28 Z M4 37 H48"
        stroke={GREEN}
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* แว่นขยาย */}
      <circle cx="15" cy="21.5" r="5" stroke={LENS} strokeWidth="2.4" />
      <path
        d="M18.6 25.1 L22.6 29.1"
        stroke={LENS}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
