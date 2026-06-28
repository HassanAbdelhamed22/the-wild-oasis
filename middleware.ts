// import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// export function middleware(request: Request) {
//   console.log(request);

//   return NextResponse.next();
// }

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
