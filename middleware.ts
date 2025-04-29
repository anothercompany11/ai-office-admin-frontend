import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // 로그인·정적파일 등 예외 경로는 그대로 통과
  const { pathname } = req.nextUrl;

  const PUBLIC_PATHS = ["/login", "/auth", "/_next", "/favicon.ico"];

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  // 나머지는 전부 보호 → refresh_token 쿠키 체크
  const hasRefresh = req.cookies.get("refresh_token");
  console.log("여기서 확인함!", req.cookies);
  if (!hasRefresh) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // 통과
}

/* matcher에서 모든 경로 잡고, 내부에서 Public 경로 필터링 */
export const config = {
  matcher: "/:path*",
};
