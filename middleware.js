export { default } from "next-auth/middleware";

export const config = {
  // Matcher define the protected route that cannot get accessed without authentication
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
