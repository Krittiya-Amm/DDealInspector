import { LineIcon, MessengerIcon, PhoneIcon } from "@/components/icons";
import { getDict } from "@/content/dict";
import { contact, telHref } from "@/lib/site";

/** ปุ่มลอย โทร / LINE / เพจ ตามบรีฟ (ข้อ 38) — ปุ่ม LINE เด่นที่สุดเสมอ
 *  มือถือ: แถบล่างเต็มความกว้างในระยะนิ้วโป้ง · desktop: ปุ่มกลมลอยมุมขวาล่าง */
export async function ContactFab() {
  const d = await getDict();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:inset-x-auto lg:right-6 lg:bottom-6">
      <div className="flex gap-2 border-t border-line bg-white/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <a
          href={telHref()}
          className="flex min-h-12 flex-1 flex-col items-center justify-center rounded-xl text-xs font-semibold text-brand ring-1 ring-line"
        >
          <PhoneIcon className="size-5" />
          {d.fab.call}
        </a>
        <a
          href={contact.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 flex-col items-center justify-center rounded-xl text-xs font-semibold text-[#0866ff] ring-1 ring-line"
        >
          <MessengerIcon className="size-5" />
          {d.fab.page}
        </a>
        <a
          href={contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-[2.4] items-center justify-center gap-2 rounded-xl bg-line-btn font-bold text-white"
        >
          <LineIcon className="size-6" />
          {d.cta.lineBook}
        </a>
      </div>

      <div className="hidden flex-col items-end gap-3 lg:flex">
        <a
          href={contact.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-12 place-items-center rounded-full bg-white text-[#0866ff] shadow-lift ring-1 ring-line hover:bg-surface"
        >
          <MessengerIcon className="size-6" />
          <span className="sr-only">{d.cta.facebook}</span>
        </a>
        <a
          href={telHref()}
          className="grid size-12 place-items-center rounded-full bg-brand text-white shadow-lift hover:bg-brand-dark"
        >
          <PhoneIcon className="size-5" />
          <span className="sr-only">
            {d.fab.call} {contact.phones[0]}
          </span>
        </a>
        <a
          href={contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center gap-2 rounded-full bg-line-btn pr-5 pl-4 font-bold text-white shadow-lift hover:bg-line-btn-hover"
        >
          <LineIcon className="size-7" />
          {d.cta.lineBook}
        </a>
      </div>
    </div>
  );
}
