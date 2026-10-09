import { Container, LineButton, LinkButton } from "@/components/ui";
import { getDict, getLang } from "@/content/dict";
import { href } from "@/lib/i18n";

export default async function NotFound() {
  const d = await getDict();
  const lang = await getLang();
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <p className="tnum text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">{d.notFound.title}</h1>
      <p className="mt-3 text-muted">{d.notFound.lead}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href={href(lang, "/")}>{d.notFound.home}</LinkButton>
        <LineButton label={d.cta.lineAsk} />
      </div>
    </Container>
  );
}
