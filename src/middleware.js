import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  const isPath = (path) => pathname.startsWith(path);
  try {
    let cookie = request.cookies.get("ACCESS_TOKEN")?.value;
    if (!cookie || !cookie.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
    await jwtVerify(cookie.split("Bearer ")[1], secret);
    if (isPath("/login") || isPath("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (isPath("/login") || isPath("/login")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/sign-up/:path*",
  ],
};
export default middleware;
