import { LineIcon } from "@/components/icons";
import { SectionNav } from "@/components/section-nav";
import { ContactCta } from "@/components/sections";
import {
  Button,
  Container,
  Eyebrow,
  MockImage,
  rhythm,
  SectionHeading,
  TechLabel,
} from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { contact, interiorServices } from "@/lib/site";

export const metadata = pageMeta({
  path: "/services/interior",
  title: "บริการตกแต่งครบวงจร",
  description:
    "ผ้าม่าน วอลเปเปอร์ พื้น SPC ฟิล์มกรองแสง ตาข่ายกันนก ต่อเติมบ้าน กระจกกั้นห้อง ราวตากผ้า และงานออกแบบบิวท์อิน ครบในทีมเดียว",
});

/* สี่งานนี้ขึ้นก่อน ไม่ใช่เพราะกำไรดีกว่า แต่เพราะเป็นงานที่ "เปลี่ยนห้องทั้งห้อง"
   — คนที่เพิ่งรับบ้านมองหาสี่อย่างนี้ก่อนเสมอ ส่วนอีกห้าอย่างเป็นงานเติมทีหลัง
   ที่คนมาหาเมื่อรู้ชื่อสิ่งที่ต้องการอยู่แล้ว (ฟิล์ม ตาข่ายกันนก ราวตากผ้า)

   TODO: CLIENT-DATA — ลำดับนี้มาจากโจทย์รอบปรับเลย์เอาต์ ไม่ใช่ข้อมูลยอดขายจริง
   ถ้าลูกค้ามีตัวเลขว่างานไหนขายดีที่สุด ให้แก้ลำดับใน FEATURED แล้วจบ
   ไม่ต้องแตะเลย์เอาต์ เพราะทั้งสองบล็อกดึงข้อมูลจาก interiorServices ชุดเดียวกัน
   และทุก slug ยังมี id ของตัวเองอยู่ครบ 9 อัน ลิงก์จากฟุตเตอร์กับหน้า /services
   จึงไม่พังไม่ว่าจะสลับลำดับยังไง */
const FEATURED = ["curtain", "spc-floor", "built-in", "extension"];

const byIndex = new Map(interiorServices.map((s) => [s.slug, s]));
const featured = FEATURED.map((slug) => byIndex.get(slug)!);
const supporting = interiorServices.filter((s) => !FEATURED.includes(s.slug));

/* สารบัญชี้ไปที่งานสี่ตัวหลัก + กองที่เหลือ ไม่ใช่ชิปครบ 9 อันแบบเดิม
   ป้ายใช้คำสั้นที่สุดที่ยังแยกออก ("ผ้าม่าน" ไม่ใช่ "ผ้าม่าน มู่ลี่ ฉากกั้น พรม มุ้งจีบ")
   เพราะแถบนี้ต้องอ่านจบในสายตาเดียว ชื่อเต็มอยู่ที่หัวข้อของแต่ละบล็อกแล้ว */
const sections = [
  { href: "#curtain", label: "ผ้าม่าน" },
  { href: "#spc-floor", label: "พื้น SPC" },
  { href: "#built-in", label: "บิวท์อิน" },
  { href: "#extension", label: "ต่อเติม" },
  { href: "#more", label: "บริการอื่น" },
];

/* สามอย่างที่ต้องส่งมาเพื่อให้ตีราคาได้ — ไม่ใช่ของแต่งใหม่ ทั้งสามข้อถอดมาจาก
   คำโปรยเดิมของบล็อกนี้ที่ยืนยันแล้ว: "ขนาดพื้นที่ วัสดุที่เลือก และสภาพหน้างาน
   ทำให้ราคาต่างกันมาก ทักไลน์มาพร้อมรูปห้องและขนาดคร่าว ๆ"
   เปลี่ยนจากประโยคเดียวเป็นสามช่อง เพราะคนอ่านแล้วต้องลงมือส่งของ
   ประโยคเดียวอ่านผ่าน แต่สามข้อที่มีเลขกำกับคือเช็กลิสต์ที่ทำตามได้จริง

   ห้ามเติมข้อที่สี่แบบ "งบประมาณ" หรือ "ระยะเวลาทำงาน" เข้ามาเอง —
   ไม่มีที่มาในข้อมูลของลูกค้า และเป็นเงื่อนไขทางธุรกิจที่เราตั้งแทนเขาไม่ได้ */
const quoteInputs = [
  {
    term: "รูปถ่ายพื้นที่",
    detail: "ถ่ายจากมุมที่เห็นทั้งห้อง และถ่ายจุดที่อยากแก้เพิ่มอีกสองสามรูป",
  },
  {
    term: "ขนาดคร่าว ๆ",
    detail: "กว้าง × ยาว หรือขนาดเป็นตารางเมตร ไม่ต้องวัดละเอียด เราวัดจริงให้อีกรอบ",
  },
  {
    term: "วัสดุหรือสไตล์ที่ชอบ",
    detail: "มีรูปตัวอย่างที่ถูกใจส่งมาได้เลย ไม่มีก็บอกแค่โทนที่ชอบ",
  },
];

export default function InteriorPage() {
  return (
    <>
      <section className="relative border-b border-line bg-warm">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="lg:w-[53%] lg:pr-8">
            <Eyebrow>Interior Services</Eyebrow>
            <h1 className="mt-6 text-[2rem] font-semibold sm:text-[2.75rem] lg:text-5xl">
              บ้านผ่านการตรวจแล้ว ทีนี้ทำให้มันน่าอยู่
            </h1>
            <p className="mt-6 max-w-xl text-ink2 sm:text-lg sm:leading-[1.75]">
              {interiorServices.length} บริการตกแต่ง
              ตั้งแต่ผ้าม่านไปจนถึงงานต่อเติม
              ทีมเดียวกับที่ตรวจบ้านให้คุณเป็นคนดูหน้างาน
              จึงรู้ว่าผนังไหนรับน้ำหนักได้และจุดไหนเคยมีปัญหา
            </p>
            {/* ปุ่มคู่นี้ไม่ใช่ BookCta ("นัดหมายตรวจบ้าน") ของทั้งเว็บ — หน้านี้
                ไม่ได้ขายงานตรวจ คนที่มาถึงหน้านี้อยากได้ราคาค่าตกแต่ง การยิงเขา
                ไปที่ไลน์ด้วยคำว่า "นัดหมายตรวจบ้าน" คือการตอบคำถามผิดข้อ
                ปุ่มหลักจึงพาลงไปที่บล็อกประเมินราคาในหน้าเดียวกัน (ซึ่งบอกว่า
                ต้องส่งอะไรมาบ้าง) แล้วค่อยทักไลน์ตอนมีของครบ

                ปุ่มรองเป็นโทน outline ไม่ใช่เขียว LINE ทั้งใบ — ปุ่มเขียวสดจะเด่น
                กว่าปุ่มหลักสีกรมท่าทันที แล้วลำดับความสำคัญก็กลับหัว
                (กติกา primary-action: หนึ่งหน้าจอมีปุ่มหลักได้ใบเดียว) */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote" arrow>
                ขอประเมินราคางานตกแต่ง
              </Button>
              <Button href={contact.lineUrl} external tone="outline">
                <LineIcon className="size-5" />
                ปรึกษาทีมงานผ่าน LINE
              </Button>
            </div>
          </div>
        </Container>
        <div className="relative h-64 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[47%]">
          <MockImage
            src="interior-hero.jpg"
            alt="ห้องที่ตกแต่งเสร็จแล้ว"
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="h-full w-full"
            priority
          />
        </div>
      </section>

      {/* แถบเดียวกับหน้าบริการตรวจ — สองหน้านี้เป็นหน้าพี่น้องกัน ถ้าใช้คนละท่า
          คนจะอ่านว่าเป็นเว็บคนละที่ ของเดิมเป็นชิป 9 อัน (ทุกบริการ) ที่เลื่อน
          หายไปกับหน้า ซึ่งยาวเกินกว่าจะอ่านจบในสายตาเดียวและใช้ได้แค่ตอนเปิดหน้า */}
      <SectionNav label="หัวข้อในหน้านี้" items={sections} />

      {/* เดิมเป็นแถว image/text สลับซ้ายขวา 9 แถวติดกัน โครงเดียวกันเป๊ะทุกแถว
          ยาวรวม 5,716px บนมือถือ — อ่านแล้วเป็น "เทมเพลตที่วนลูป" ไม่ใช่หน้าแนะนำงาน
          รอบก่อนแก้เป็นสเปรดใบใหญ่ + กริดสองคอลัมน์ 8 ใบ ซึ่งดีขึ้นแต่ยังแบน
          เพราะ 8 ใบหลังได้น้ำหนักเท่ากันหมด

          รอบนี้แบ่งสองชั้นจริง ๆ: 4 งานที่เปลี่ยนห้องทั้งห้องได้บล็อกเต็มสลับซ้ายขวา
          ส่วนอีก 5 งานเป็นรายการแถวแน่น ๆ ที่ยังมีภาพประกอบครบ
          ความต่างของน้ำหนักมาจากขนาดภาพกับระยะหายใจล้วน ๆ ไม่ได้ตัดเนื้อหาใครออก */}
      <section className={rhythm.base}>
        <Container>
          <div className="space-y-20 sm:space-y-28 lg:space-y-32">
            {featured.map((service, index) => {
              const imageFirst = index % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-32"
                >
                  {/* ภาพได้ 1.25fr ตัวหนังสือ 0.75fr — กลับกันกับหน้าบริการตรวจ
                      ที่ตัวหนังสือกว้างกว่า เพราะงานตกแต่งตัดสินใจด้วยตา
                      ส่วนงานตรวจตัดสินใจด้วยขอบเขตงานที่เป็นตัวหนังสือ
                      items-center ไม่ใช่ items-start — บล็อกนี้มีตัวหนังสือสั้น
                      (ชื่อ + คำโปรย + คำอธิบาย) ถ้าแขวนจากขอบบนจะเหลือที่ว่าง
                      ใต้ตัวหนังสือสูงเกือบเท่าภาพ ซึ่งอ่านเป็นรูโหว่ ไม่ใช่จังหวะ */}
                  <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16 xl:gap-20">
                    <MockImage
                      src={`${service.slug}.jpg`}
                      alt={`ตัวอย่างงาน${service.name}`}
                      zoom
                      className={`aspect-[4/3] w-full rounded-sm sm:aspect-[3/2] ${
                        imageFirst ? "lg:order-2" : ""
                      }`}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                    <div className={imageFirst ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-5">
                        <span
                          aria-hidden
                          className="tnum font-display text-[2.75rem] leading-[0.8] font-semibold text-gold-500 sm:text-[3.5rem]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden className="h-px flex-1 bg-line" />
                      </div>
                      <h2 className="mt-6 text-[1.625rem] leading-[1.25] font-semibold sm:text-[2rem]">
                        {service.name}
                      </h2>
                      <p className="mt-3 font-medium text-gold-700">
                        {service.short}
                      </p>
                      <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink2">
                        {service.detail}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ห้าบริการที่เหลืออ่านเป็น "รายการ" ไม่ใช่ "ผลงาน" — คนที่มาถึงตรงนี้
          ส่วนใหญ่รู้ชื่อสิ่งที่ต้องการอยู่แล้ว (มาจากฟุตเตอร์หรือสารบัญหน้า /services)
          จึงต้องการหาเจอเร็ว ไม่ได้ต้องการถูกโน้มน้าวด้วยภาพใหญ่
          ภาพจัตุรัสเล็กคงไว้เพราะมีไฟล์ครบทั้งห้า และช่วยให้กวาดตาหาได้เร็วกว่าอ่านชื่อ */}
      <section
        id="more"
        className={`scroll-mt-32 border-t border-line bg-warm ${rhythm.dense}`}
      >
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-line pb-5">
            <h2 className="text-xl font-semibold sm:text-2xl">บริการอื่น ๆ</h2>
            <TechLabel>
              {String(supporting.length).padStart(2, "0")} More Services
            </TechLabel>
          </div>

          <ul className="mt-10 border-t border-ink">
            {supporting.map((service, index) => (
              <li
                key={service.slug}
                id={service.slug}
                className="scroll-mt-32 border-b border-line"
              >
                {/* จอแคบ: ภาพเล็กซ้าย ชื่อขวา คำอธิบายตกลงไปเต็มความกว้างข้างล่าง
                    จอกว้าง: สามคอลัมน์ ภาพ / ชื่อ / คำอธิบาย อ่านเป็นตารางสเปก
                    ภาพ 5rem บนมือถือ ไม่ใช่ 4rem — ต่ำกว่านี้ภาพงานตกแต่ง
                    จะเล็กจนแยกไม่ออกว่าเป็นงานอะไร แล้วก็ไม่ต้องมีก็ได้ */}
                <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-x-5 gap-y-3 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-7 sm:py-7 lg:grid-cols-[7rem_minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-10">
                  <MockImage
                    src={`${service.slug}.jpg`}
                    alt={`ตัวอย่างงาน${service.name}`}
                    className="aspect-square w-full rounded-sm"
                    sizes="112px"
                  />
                  <div>
                    <TechLabel className="block">
                      {String(featured.length + index + 1).padStart(2, "0")}
                    </TechLabel>
                    <h3 className="mt-2 text-lg font-semibold sm:text-xl">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] font-medium text-gold-700">
                      {service.short}
                    </p>
                  </div>
                  <p className="col-span-2 text-[0.9375rem] leading-[1.75] text-ink2 lg:col-span-1">
                    {service.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* บล็อกประเมินราคา — ของเดิมเป็นหัวข้อกึ่งกลาง + ปุ่มสองใบ ซึ่งบอกว่า
          "ทักมาสิ" แต่ไม่ได้บอกว่าต้องทักมาพร้อมอะไร คนเลยทักมาว่า "สนใจครับ"
          แล้วต้องถามกลับสามรอบกว่าจะตีราคาได้

          สามช่องนี้คือสิ่งที่เปลี่ยนบล็อกจาก "คำเชิญ" เป็น "แบบฟอร์มที่กรอกในไลน์"
          ชิดซ้ายไม่ใช่กึ่งกลาง เพราะเป็นรายการที่ต้องอ่านไล่ทีละข้อ
          ไม่ใช่ประโยคปิดท้ายที่อ่านรวดเดียว */}
      <section id="quote" className={`scroll-mt-32 ${rhythm.base}`}>
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Get A Quote"
              title="งานตกแต่งประเมินราคา "
              accent="จากหน้างานเสมอ"
              lead="ขนาดพื้นที่ วัสดุที่เลือก และสภาพหน้างานทำให้ราคาต่างกันมาก ส่งสามอย่างนี้มาทางไลน์ เราตีราคาเบื้องต้นให้ก่อนได้"
            />
            <div className="mt-8">
              <Button href={contact.lineUrl} external arrow>
                ส่งข้อมูลทางไลน์
              </Button>
            </div>
            <p className="mt-5 text-sm text-ink3">
              ตอบกลับ {contact.hours}
            </p>
          </div>

          <ol className="border-t border-ink">
            {quoteInputs.map((q, i) => (
              <li
                key={q.term}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 border-b border-line py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
              >
                <span
                  aria-hidden
                  className="tnum font-display text-[1.75rem] leading-[0.9] font-semibold text-gold-500 sm:text-[2.25rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold">{q.term}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.75] text-ink2">
                    {q.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA ปิดท้ายของหน้านี้ถามคนละคำถามกับหน้าอื่น — หน้าอื่นปิดด้วย
          "กำลังจะรับบ้าน? ตรวจให้มั่นใจก่อน" ซึ่งเป็นคำถามของคนที่ยังไม่โอน
          คนที่อ่านหน้านี้จนจบส่วนใหญ่โอนมาแล้ว ปุ่มรองจึงเป็นทางกลับไปฝั่งตรวจบ้าน
          (ขายไขว้กลับทิศ — ทั้งเว็บมีแต่ ตรวจ → ตกแต่ง ยังไม่เคยมีทางกลับ) */}
      <ContactCta
        label="Ready To Renovate"
        title="มีพื้นที่ที่อยากปรับ? เริ่มจากส่งรูปห้องมาก่อน"
        lead="ไม่ต้องรู้ตั้งแต่แรกว่าอยากได้แบบไหน บอกแค่ว่าห้องไหน ใช้ทำอะไร แล้วเราเสนอทางเลือกพร้อมราคาให้เทียบ"
        actions={
          <>
            <Button href={contact.lineUrl} external tone="onDark" arrow>
              ส่งรูปห้องให้ประเมินราคา
            </Button>
            <Button href="/services/inspection" tone="outlineDark">
              ดูบริการตรวจบ้าน
            </Button>
          </>
        }
      />
    </>
  );
}
