import { LineIcon, PhoneIcon } from "@/components/icons";
import { contact, telHref } from "@/lib/site";

export function ContactFab() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:inset-x-auto lg:right-6 lg:bottom-6">
      {/* mobile: full-width bar in the thumb zone — easier to hit than a floating circle */}
      <div className="flex gap-3 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <a
          href={telHref}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-sm border border-ink font-semibold text-ink"
        >
          <PhoneIcon className="size-5" />
          โทร
        </a>
        <a
          href={contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] flex-[1.6] items-center justify-center gap-2 rounded-sm bg-line-green font-semibold text-white"
        >
          <LineIcon className="size-5" />
          ทักไลน์ นัดวันตรวจ
        </a>
      </div>

      <div className="hidden flex-col gap-3 lg:flex">
        <a
          href={telHref}
          className="grid size-14 place-items-center rounded-full bg-ink text-white shadow-lift transition-colors duration-200 hover:bg-ink-deep"
        >
          <PhoneIcon className="size-6" />
          <span className="sr-only">โทร {contact.phones[0]}</span>
        </a>
        <a
          href={contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-14 place-items-center rounded-full bg-line-green text-white shadow-lift transition-[filter] duration-200 hover:brightness-95"
        >
          <LineIcon className="size-7" />
          <span className="sr-only">ทักไลน์ {contact.lineLabel}</span>
        </a>
      </div>
    </div>
  );
}
