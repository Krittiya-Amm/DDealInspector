import { NextResponse, type NextRequest } from "next/server";

/* URL ไทยไม่มี prefix — rewrite ไปที่ /th/... ภายใน
 * ส่วน /th/... ที่มีคนพิมพ์เข้ามาตรง ๆ redirect กลับไป URL ไม่มี prefix
 * กัน Google เห็นหน้าเดียวกันสองที่อยู่ (duplicate content)
 * /en/... ผ่านไปตามปกติ */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  if (pathname === "/th" || pathname.startsWith("/th/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/th${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // ข้ามไฟล์ระบบ ภาพ และ metadata route ที่อยู่นอก [lang]
    "/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
