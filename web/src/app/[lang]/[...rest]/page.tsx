import { notFound } from "next/navigation";

/* URL ที่ไม่มีหน้าอยู่จริงทุกแบบ (/th/xxx หลัง rewrite, /en/xxx) วิ่งมาที่นี่
 * เพื่อให้ได้หน้า 404 ที่มี header/footer ของภาษานั้น (not-found.tsx ใน [lang]) */
export default function CatchAll() {
  notFound();
}
