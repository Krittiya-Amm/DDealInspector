import Link from "next/link";
import { BookCta, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <p className="tnum font-display text-6xl font-semibold text-gold-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
          ไม่พบหน้าที่คุณกำลังหา
        </h1>
        <p className="mt-4 text-ink2">
          ลิงก์อาจถูกย้ายหรือพิมพ์ผิด ลองกลับไปหน้าแรก
          หรือทักไลน์มาถามได้เลยว่าต้องการข้อมูลอะไร
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <BookCta />
          <Link
            href="/"
            className="inline-flex min-h-[52px] items-center rounded-sm border border-ink/25 px-6 font-semibold transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </Container>
    </section>
  );
}
