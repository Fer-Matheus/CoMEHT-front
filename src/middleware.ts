"use server";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const cookies = request.cookies.get("Authorization");

    if (request.nextUrl.pathname.startsWith("/arena")) {
        if (!cookies) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    if (request.nextUrl.pathname === "/" && cookies) {
        return NextResponse.redirect(new URL("arena", request.url))
    }
}