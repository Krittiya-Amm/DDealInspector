import { ImageResponse } from "next/og";

export const alt = "D Deal Inspector & Interior — ตรวจบ้านและคอนโดก่อนโอน";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** การ์ดที่ขึ้นเวลาแชร์ลิงก์ในไลน์/เฟซบุ๊ก
 *
 *  ทำไมเป็นภาษาอังกฤษล้วนทั้งที่เว็บเป็นไทย: ImageResponse เรนเดอร์ด้วย Satori
 *  ซึ่งใช้ฟอนต์ที่ฝังมากับ next (Geist-Regular.ttf ที่
 *  node_modules/next/dist/compiled/@vercel/og/) — ฟอนต์นั้นไม่มีสระและวรรณยุกต์ไทย
 *  ถ้าใส่ข้อความไทยจะออกมาเป็นช่องว่างหรือกล่องเปล่า ไม่ใช่ตัวหนังสือ
 *  จะใส่ไทยได้ต้อง readFile ไฟล์ .ttf ไทยเข้ามาเอง ซึ่งกินโควตา bundle 500KB
 *  ของ route นี้เกือบหมด
 *
 *  ที่ยอมรับได้เพราะ "ป้ายกำกับภาษาอังกฤษถ่างกว้าง" เป็นภาษาของระบบ
 *  Inspection Language ในเว็บอยู่แล้ว (TechLabel, Eyebrow, DD / 2026)
 *  การ์ดนี้จึงอ่านเป็นหัวกระดาษรายงาน ไม่ใช่การ์ดที่แปลไทยไม่ได้
 *
 *  น้ำหนักฟอนต์มีแค่ 400 ลำดับความสำคัญจึงมาจากขนาดกับ letter-spacing ล้วน ๆ
 *  อย่าใส่ fontWeight ตัวหนาแล้วคาดหวังว่าจะหนาจริง
 *
 *  TODO: CLIENT-ASSET — ถ้าได้โลโก้จริงมาแล้ว ให้วางแทนบล็อกตัวหนังสือ D DEAL
 */
export default function Image() {
  // สีทุกตัวคัดลอกมาจาก @theme ใน globals.css โดยตรง — ไฟล์นี้อยู่นอก Tailwind
  // อ่าน var(--color-*) ไม่ได้ ถ้าแก้ CI ต้องตามมาแก้ที่นี่ด้วย
  const ink = "#16355a";
  const gold = "#b07f32";
  const hairline = "rgba(255,255,255,0.18)";
  const muted = "rgba(255,255,255,0.55)";

  const label = {
    fontSize: 21,
    letterSpacing: 5,
    color: muted,
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: ink,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* เครื่องหมายตัดมุมชุดเดียวกับบล็อก VerifyLicense ในเว็บ */}
        {[
          { top: 40, left: 40, borderTopWidth: 2, borderLeftWidth: 2 },
          { top: 40, right: 40, borderTopWidth: 2, borderRightWidth: 2 },
          { bottom: 40, left: 40, borderBottomWidth: 2, borderLeftWidth: 2 },
          { bottom: 40, right: 40, borderBottomWidth: 2, borderRightWidth: 2 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 26,
              height: 26,
              borderColor: "rgba(255,255,255,0.28)",
              borderStyle: "solid",
              borderWidth: 0,
              ...pos,
            }}
          />
        ))}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={label}>PROFESSIONAL HOME INSPECTION</div>
            <div style={label}>DD / 2026</div>
          </div>
          <div
            style={{
              display: "flex",
              height: 1,
              backgroundColor: hairline,
              marginTop: 20,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 86,
            lineHeight: 1.08,
            letterSpacing: -1,
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex" }}>D DEAL</div>
          <div style={{ display: "flex", color: gold }}>INSPECTOR</div>
          <div style={{ display: "flex" }}>&amp; INTERIOR</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 1,
              backgroundColor: hairline,
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={label}>LICENSED CIVIL ENGINEER · COE</div>
            <div style={label}>BANGKOK · THAILAND</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
