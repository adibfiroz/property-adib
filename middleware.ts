export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/property/create",
    "/customer/create",
    "/property/edit/:path*",
    "/customer/edit/:path*",
  ],
};
