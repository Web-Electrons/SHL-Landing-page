// api > hello > [slug] > route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
    const slug = params.slug;
    const paramGreeting = request.nextUrl.searchParams.get('greeting')
    const greeting = `${paramGreeting || 'Hello'} ${slug}!!!`
    const json = {
        greeting
    };
    return NextResponse.json(json);
}