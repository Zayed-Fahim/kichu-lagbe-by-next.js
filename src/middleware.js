import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
const middleware = (request) => {
  return NextResponse.redirect(new URL("/home", request.url));
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
export default middleware;
