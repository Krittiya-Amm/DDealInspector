import type { Metadata } from "next";
import { ArticleCard, ContactCta } from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { articleCategories, articles, type ArticleCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "บทความ",
  description:
    "ความรู้เรื่องการตรวจบ้านก่อนโอน ปัญหาที่พบบ่อยในบ้านและคอนโด และไอเดียการตกแต่ง",
};

const order: ArticleCategory[] = ["inspection", "interior"];

export default function ArticlesPage() {
  return (
    <>
      <section className="border-b border-line bg-white py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="บทความ"
            title="รู้ก่อนไปตรวจ คุยกับโครงการได้มั่นใจกว่า"
            lead="รวมสิ่งที่เราเจอบ่อยหน้างาน เขียนให้คนที่ไม่ได้เรียนวิศวกรรมอ่านแล้วใช้ได้จริง"
          />
        </Container>
      </section>

      {order.map((key) => {
        const list = articles.filter((a) => a.category === key);
        if (list.length === 0) return null;
        return (
          <section key={key} className="py-16 sm:py-20">
            <Container>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {articleCategories[key].label}
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <ContactCta />
    </>
  );
}
