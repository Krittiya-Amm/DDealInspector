import { Container, Eyebrow } from "@/components/ui";
import { contact, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/terms",
  title: "ข้อกำหนดการใช้บริการ",
  description: `ข้อกำหนดและเงื่อนไขการใช้บริการของ ${site.name} — ขอบเขตบริการ การนัดหมาย และความรับผิดของรายงานผลการตรวจ`,
});

// SCAFFOLD — โครงและหัวข้อครบ อ้างอิงบริการจริงและข้อมูลติดต่อจริงใน site.ts
// รายละเอียดที่ต้องให้ธุรกิจตัดสิน (เงื่อนไขชำระเงิน/คืนเงิน นโยบายยกเลิก ค่าปรับ)
// ยังไม่ระบุตัวเลข ต้องเติมและตรวจทานทางกฎหมายก่อน go-live — ดูรายงาน QA รอบนี้
const sections = [
  {
    heading: "1. ขอบเขตการให้บริการ",
    body: [
      `${site.name} ให้บริการตรวจสอบบ้านและคอนโดก่อนโอนโดยวิศวกรที่มีใบประกอบวิชาชีพ พร้อมบริการตกแต่งภายใน ตามรายละเอียดบริการที่ระบุบนเว็บไซต์`,
    ],
  },
  {
    heading: "2. การนัดหมายและการยกเลิก",
    body: [
      "การนัดหมายถือว่าสมบูรณ์เมื่อได้รับการยืนยันวันเวลาจากทีมงาน หากต้องการเปลี่ยนแปลงหรือยกเลิก กรุณาแจ้งล่วงหน้าผ่านช่องทางติดต่อ เงื่อนไขและระยะเวลาการแจ้งล่วงหน้าเป็นไปตามที่ตกลงกันเมื่อยืนยันนัด",
    ],
  },
  {
    heading: "3. ขอบเขตของรายงานผลการตรวจ",
    body: [
      "รายงานผลการตรวจสะท้อนสภาพที่ตรวจพบ ณ วันและเวลาที่เข้าตรวจตามวิธีการตรวจที่มองเห็นและเข้าถึงได้ ณ ขณะนั้น รายงานไม่ครอบคลุมความชำรุดที่ซ่อนอยู่หรือเกิดขึ้นภายหลังการตรวจ และไม่ถือเป็นการรับประกันสภาพทรัพย์ในอนาคต",
      "การตัดสินใจใด ๆ จากรายงานเป็นดุลยพินิจของผู้ว่าจ้าง",
    ],
  },
  {
    heading: "4. ทรัพย์สินทางปัญญา",
    body: [
      "เนื้อหา รูปภาพ และรูปแบบบนเว็บไซต์นี้เป็นของ " +
        site.name +
        " ห้ามนำไปใช้ซ้ำเพื่อการค้าโดยไม่ได้รับอนุญาต",
    ],
  },
  {
    heading: "5. การเปลี่ยนแปลงข้อกำหนด",
    body: [
      "เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว ฉบับที่เผยแพร่บนเว็บไซต์ถือเป็นฉบับปัจจุบัน",
    ],
  },
];

export default function TermsPage() {
  return (
    <article>
      <header className="border-b border-line bg-white py-10 sm:py-14">
        <Container className="max-w-3xl">
          <Eyebrow>Terms of Service</Eyebrow>
          <h1 className="mt-5 text-3xl font-semibold sm:text-[2.5rem]">
            ข้อกำหนดการใช้บริการ
          </h1>
          <p className="mt-5 text-ink2 sm:text-lg sm:leading-[1.75]">
            การใช้เว็บไซต์และบริการของ {site.name}
            ถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขต่อไปนี้
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-10 sm:py-14">
        {/* หมายเหตุตามจริง: ฉบับร่าง ต้องตรวจทานทางกฎหมายและเติมเงื่อนไขชำระเงิน/
            ยกเลิกให้ครบก่อนบังคับใช้ */}
        <p className="rounded-sm border-l-4 border-gold-500 bg-warm p-4 text-sm text-ink2">
          เอกสารฉบับร่าง — โครงและหัวข้อจัดทำไว้แล้ว
          รอเติมเงื่อนไขเชิงพาณิชย์และตรวจทานโดยผู้รับผิดชอบก่อนบังคับใช้จริง
        </p>

        {sections.map((s) => (
          <section key={s.heading} className="mt-10 first:mt-8">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-4 text-ink2">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">6. ติดต่อเรา</h2>
          <p className="mt-4 text-ink2">
            หากมีคำถามเกี่ยวกับข้อกำหนดนี้ ติดต่อได้ที่
          </p>
          <ul className="mt-4 space-y-2 text-ink2">
            <li>
              อีเมล{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-gold-700 underline underline-offset-4"
              >
                {contact.email}
              </a>
            </li>
            <li>
              โทร{" "}
              <a
                href={`tel:${contact.phones[0].replace(/-/g, "")}`}
                className="font-medium text-gold-700 underline underline-offset-4"
              >
                {contact.phones.join(" หรือ ")}
              </a>
            </li>
          </ul>
        </section>
      </Container>
    </article>
  );
}
