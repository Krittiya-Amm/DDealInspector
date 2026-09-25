import {
  ArticleCard,
  ContactCta,
  FeaturedArticle,
} from "@/components/sections";
import {
  Container,
  DrawnRule,
  Eyebrow,
  TechLabel,
  rhythm,
} from "@/components/ui";
import { articleCategories, articles, type ArticleCategory } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/articles",
  title: "บทความ",
  description:
    "ความรู้เรื่องการตรวจบ้านก่อนโอน ปัญหาที่พบบ่อยในบ้านและคอนโด และไอเดียการตกแต่ง",
});

const order: ArticleCategory[] = ["inspection", "interior"];

/* จังหวะของสองหมวดไม่เท่ากันตั้งใจ — หมวดตรวจบ้านคือเนื้อหาหลักของเว็บและมี
   บทความมากกว่า จึงได้ที่หายใจมากกว่า ส่วนหมวดตกแต่งเป็นส่วนต่อท้าย
   ถ้าให้ระยะเท่ากันทั้งคู่ หน้าจะอ่านเป็น "สองบล็อกที่วางต่อกัน" แทนที่จะเป็น
   "เนื้อหาหลัก แล้วตามด้วยส่วนเสริม" */
const sectionRhythm: Record<ArticleCategory, string> = {
  inspection: rhythm.base,
  interior: rhythm.dense,
};

export default function ArticlesPage() {
  return (
    <>
      {/* หัวหน้าบทความคือ "หัวนิตยสาร" (masthead) ไม่ใช่หัวข้อ section — จึงต้องเป็น
          <h1> จริง ของเดิมใช้ SectionHeading ซึ่งเรนเดอร์ <h2> ผลคือทั้งหน้าไม่มี h1
          เลย (ลำดับหัวเรื่องกระโดดจาก h2 หมวด → h3 บทความ) เสียทั้ง heading hierarchy
          และ SEO — หัวเรื่องหลักของหน้าต้องเป็นระดับสูงสุดเสมอ

          คำโปรยเดิมลอยเดี่ยวอยู่กลางช่องว่างครึ่งขวาบนโดยไม่มีอะไรยึด ทำให้หัวหน้า
          อ่านเป็นบล็อกหัวข้อโล่ง ๆ ไม่ใช่หน้าปกวารสาร — เติมแถบข้อมูลใต้เส้นคาด
          (จำนวนบทความ + สองหมวด) เป็นฐานยึดแบบหัวกระดาษ ตัวเลขดึงจาก articles.length
          จริง ไม่ได้พิมพ์ทับ ป้ายเป็นอังกฤษถ่างได้ (ไทยถ่าง 0.18em แล้วสระหลุด) */}
      <section className="border-b border-line bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Eyebrow>Journal</Eyebrow>
              <h1 className="mt-6 text-[2rem] leading-[1.2] font-semibold text-balance sm:text-[2.75rem] lg:text-[3.25rem]">
                รู้ก่อนไปตรวจ คุยกับโครงการได้มั่นใจกว่า
              </h1>
            </div>
            <p className="max-w-xl text-[1.0625rem] leading-[1.8] text-ink2 lg:pb-2">
              รวมสิ่งที่เราเจอบ่อยหน้างาน
              เขียนให้คนที่ไม่ได้เรียนวิศวกรรมอ่านแล้วใช้ได้จริง
            </p>
          </div>
          <div className="mt-10 sm:mt-12">
            <DrawnRule className="opacity-70" />
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
              <TechLabel>{articles.length} Articles</TechLabel>
              <TechLabel>Inspection · Interior</TechLabel>
            </div>
          </div>
        </Container>
      </section>

      {order.map((key, i) => {
        const list = articles.filter((a) => a.category === key);
        if (list.length === 0) return null;
        /* ชิ้นแรกของหมวดเป็นบทความเด่น ที่เหลือเป็นรายการรอง — ไม่ใช่การ์ด
           ขนาดเท่ากันสามใบ ซึ่งบอกผู้อ่านว่า "ทั้งสามชิ้นนี้สำคัญเท่ากัน"
           ทั้งที่หน้าดัชนีบทความมีหน้าที่ตรงข้าม คือชี้ว่าควรเริ่มอ่านตรงไหน
           (FeaturedArticle มีอยู่ในโค้ดมาตลอดแต่ไม่เคยถูกเรียกใช้ในหน้านี้) */
        const [lead, ...rest] = list;
        return (
          <section
            key={key}
            className={`${i > 0 ? "border-t border-line " : ""}${sectionRhythm[key]}`}
          >
            <Container>
              {/* หัวหมวดเป็นบรรทัดเดียวคาดด้วยเส้น ไม่ใช่ SectionHeading เต็มทรง
                  — มันเป็นป้ายแบ่งหมวดในหน้าดัชนี ไม่ใช่หัวข้อของบทใหม่
                  จำนวนบทความชิดขวาเพราะเป็นข้อมูลกำกับของป้ายฝั่งซ้าย */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-line pb-5">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {articleCategories[key].label}
                </h2>
                <TechLabel>
                  {String(list.length).padStart(2, "0")} Articles
                </TechLabel>
              </div>

              <div className="mt-10 sm:mt-12">
                <FeaturedArticle article={lead} />
              </div>

              {rest.length ? (
                <div className="mt-12 grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2">
                  {rest.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              ) : null}
            </Container>
          </section>
        );
      })}

      <ContactCta />
    </>
  );
}
