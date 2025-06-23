import { NextResponse } from "next/server";

export async function POST(req) {
    return NextResponse.json({result: "Design Room API is working!"});
}