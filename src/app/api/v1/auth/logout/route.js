import { NextResponse } from "next/server";

export const POST = async (request) => {
  const res = new NextResponse(
    JSON.stringify({
      message: "Logout Successfully!",
    })
  );
  res.cookies.set("ACCESS_TOKEN", "", {
    expires: new Date(Date.now()),
  });
  return res;
};
