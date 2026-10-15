import {
  ArticlesTeaser,
  FinalCta,
  HomeHero,
  InspectionServices,
  InteriorShowcase,
  ReportPreview,
  Reviews,
  Stepper,
  StatsBand,
  WhyUs,
} from "@/components/blocks";

/* หน้าแรกตามลำดับที่ PM เสนอ (ต.ค. 2569)
 *   1 Hero · 2 แถบตัวเลข · 3 บริการ (ใหญ่ 2 + เล็ก 4) · 4 ทำไมต้องเรา (ใบ กว. + อุปกรณ์)
 *   5 ขั้นตอน stepper · 6 ตัวอย่างรายงาน · 7 รีวิว · 8 ผลงานตกแต่ง · 9 บทความ · 10 CTA ปิดท้าย
 * ทุก section = หัวข้อ 1 บรรทัด + คำโปรย ≤ 2 บรรทัด + ภาพ/การ์ด/ไอคอน/ตัวเลข */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBand />
      <InspectionServices />
      <WhyUs />
      <Stepper />
      <ReportPreview />
      <Reviews />
      <InteriorShowcase />
      <ArticlesTeaser />
      <FinalCta flush />
    </>
  );
}
