import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import legalMeta from "@/content/legal/meta";
import { hasLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const m = legalMeta.terms[lang];
  return pageMeta({ lang, path: "/terms", title: m.title, description: m.description });
}

export default function Page() {
  return <LegalPage slug="terms" />;
}
