export const config = {
  runtime: "nodejs",
  matcher: [
    "/write",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
export { auth as middleware } from "@/auth";
