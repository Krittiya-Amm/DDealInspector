import { getDict, getLang } from "@/content/dict";
import { href } from "@/lib/i18n";
import { inspectionIds, interiorIds } from "@/lib/site";
import { HeaderClient, type NavItem } from "./site-header-client";

/** ส่วน server ของ header — ประกอบเมนูจาก dict แล้วส่งเป็นข้อมูลล้วนให้ฝั่ง client */
export async function SiteHeader() {
  const lang = await getLang();
  const d = await getDict();

  const nav: NavItem[] = [
    { href: href(lang, "/"), label: d.nav.home },
    {
      href: href(lang, "/services"),
      label: d.nav.services,
      groups: [
        {
          title: d.nav.inspectionGroup,
          href: href(lang, "/services/inspection"),
          links: inspectionIds.map((id) => ({
            href: href(lang, `/services/inspection#${id}`),
            label: d.inspection[id].name,
          })),
        },
        {
          title: d.nav.interiorGroup,
          href: href(lang, "/services/interior"),
          links: interiorIds.map((id) => ({
            href: href(lang, `/services/interior#${id}`),
            label: d.interior[id].name,
          })),
        },
      ],
    },
    { href: href(lang, "/articles"), label: d.nav.articles },
    { href: href(lang, "/contact"), label: d.nav.contact },
  ];

  return (
    <HeaderClient
      lang={lang}
      nav={nav}
      homeHref={href(lang, "/")}
      allServicesHref={href(lang, "/services")}
      text={{
        menu: d.nav.menu,
        close: d.nav.close,
        switchTo: d.nav.switchTo,
        servicesAll: d.nav.servicesAll,
        lineBook: d.cta.lineBook,
        call: d.cta.callUs,
        siteName: d.meta.siteTitle,
      }}
    />
  );
}
