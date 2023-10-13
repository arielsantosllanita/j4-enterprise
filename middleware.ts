// import { withAuth } from "next-auth/middleware";
// export default withAuth({
//   callbacks: {
//     authorized({ token, req }) {
//       if (req.nextUrl.pathname.startsWith("/dashboard/products")) {
//         return token && (token as any).user.roles.includes("admin");
//       }
//       return true;
//     },
//   },
// });

export { default } from "next-auth/middleware";

export const config = {
  // * = zero or more
  // + = one or more
  // ? = zero or one
  matcher: ["/dashboard/:path*"],
};
