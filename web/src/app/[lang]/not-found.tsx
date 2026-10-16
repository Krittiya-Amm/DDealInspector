import { Container, LineButton, LinkButton } from "@/components/ui";
import { getDict, getLang } from "@/content/dict";
import { href } from "@/lib/i18n";

/* 404 — แผงพื้น paper กรอบมนชุดเดียวกับหัวเพจย่อย ให้ยังรู้สึกว่าอยู่ในเว็บเดิม */
export default async function NotFound() {
  const d = await getDict();
  const lang = await getLang();
  return (
    <Container className="py-14 sm:py-20">
      <div className="flex flex-col items-center rounded-[2rem] bg-paper px-6 py-16 text-center ring-1 ring-ink/5 sm:py-24">
        <p className="tnum text-6xl font-bold text-brand sm:text-7xl">404</p>
        <span aria-hidden className="mt-5 h-0.5 w-10 rounded-full bg-gold-deep" />
        <h1 className="mt-5 text-3xl font-bold">{d.notFound.title}</h1>
        <p className="mt-3 text-muted">{d.notFound.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href={href(lang, "/")}>{d.notFound.home}</LinkButton>
          <LineButton label={d.cta.lineAsk} variant="outline" />
        </div>
      </div>
    </Container>
  );
}
