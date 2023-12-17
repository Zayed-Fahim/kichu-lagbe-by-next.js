import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN);
  const alg = "HS256";

  const jwt = await new SignJWT(body)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("60d")
    .sign(secret);

  cookies().set({
    name: "ACCESS_TOKEN",
    value: `Bearer ${jwt}`,
    httpOnly: true,
    secure: true,
  });
  return NextResponse.json({ message: "Access token generated successfully" });
};
