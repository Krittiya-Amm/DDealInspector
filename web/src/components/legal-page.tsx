import { Container } from "@/components/ui";
import { getLang } from "@/content/dict";
import { formatDate } from "@/lib/articles";
import legalMeta, { type LegalSlug } from "@/content/legal/meta";

/** หน้ากฎหมาย (privacy / terms) — เนื้อหาเป็น MDX แยกภาษา src/content/legal/<slug>.<lang>.mdx */
export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const lang = await getLang();
  const m = legalMeta[slug][lang];
  const { default: Body } = await import(`@/content/legal/${slug}.${lang}.mdx`);
  return (
    <>
      <section className="bg-brand-soft">
        <Container className="max-w-3xl py-10 sm:py-14">
          <h1 className="text-[1.875rem] font-bold sm:text-4xl">{m.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {lang === "th" ? "ปรับปรุงล่าสุด" : "Last updated"} <time dateTime={m.updated}>{formatDate(m.updated, lang)}</time>
          </p>
        </Container>
      </section>
      <Container className="max-w-3xl py-10 sm:py-14">
        <Body />
      </Container>
    </>
  );
}
