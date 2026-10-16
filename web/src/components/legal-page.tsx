import Link from "next/link";
import { Breadcrumb } from "@/components/blocks";
import { DocIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { getLang } from "@/content/dict";
import { formatDate } from "@/lib/articles";
import { href } from "@/lib/i18n";
import legalMeta, { type LegalSlug } from "@/content/legal/meta";

/** หน้ากฎหมาย (privacy / terms) — เนื้อหาเป็น MDX แยกภาษา src/content/legal/<slug>.<lang>.mdx
 *  layout แบบเอกสาร: breadcrumb + หัวเรื่อง · แถบซ้ายติดจอ (สลับเอกสาร + วันที่ปรับปรุง) · เนื้อหาคอลัมน์อ่านง่าย */
export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const lang = await getLang();
  const m = legalMeta[slug][lang];
  const { default: Body } = await import(`@/content/legal/${slug}.${lang}.mdx`);
  const docs = (Object.keys(legalMeta) as LegalSlug[]).map((k) => ({ slug: k, title: legalMeta[k][lang].title }));
  const updated = lang === "th" ? "ปรับปรุงล่าสุด" : "Last updated";
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <Container className="pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumb current={m.title} />
          <h1 className="mt-6 text-[1.875rem] leading-[1.2] font-bold sm:text-[2.5rem] lg:mt-8">{m.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {updated} <time dateTime={m.updated}>{formatDate(m.updated, lang)}</time>
          </p>
        </Container>
      </section>
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-3">
          <ul className="space-y-1 lg:sticky lg:top-28">
            {docs.map((x) => {
              const active = x.slug === slug;
              return (
                <li key={x.slug}>
                  <Link
                    href={href(lang, `/${x.slug}`)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[0.9375rem] font-semibold ${
                      active ? "bg-paper text-ink ring-1 ring-ink/10" : "text-muted hover:text-ink"
                    }`}
                  >
                    <DocIcon className={`size-4 shrink-0 ${active ? "text-brand" : ""}`} />
                    {x.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="max-w-3xl lg:col-span-8">
          <Body />
        </div>
      </Container>
    </>
  );
}
