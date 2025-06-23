import { NextResponse } from "next/server";

export async function POST(req) {
    const {imageUrl,roomType,designType,additionalReq} = await req.json()
}