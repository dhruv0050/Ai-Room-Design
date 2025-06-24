import { NextResponse } from "next/server";
import supabase from "../../../config/supabase";
import { db } from "../../../config/db";
import { AiGeneratedImage } from "../../../config/schema";

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

  try {
    // Step 1: Fetch AI-generated image from Replicate (static for now)
    const output = "https://replicate.delivery/xezq/hd0RWJLosOo3GBAlYRZfQ5ywD9XoS5uqXWxOLvG9O8GjM5cKA/out.png";
    const response = await fetch(output);
    if (!response.ok) throw new Error("Failed to fetch image from Replicate");

    const blob = await response.blob();

    // Step 2: Upload to Supabase
    const fileName = `${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from("room-design")
      .upload(`designs/${fileName}`, blob, {
        contentType: "image/png",
      });

    if (error) throw new Error("Supabase upload failed: " + error.message);

    const { data: publicData } = supabase.storage
      .from("room-design")
      .getPublicUrl(`designs/${fileName}`);

    const aiImageUrl = publicData.publicUrl;

    // Step 3: Insert metadata into DB
    const dbResult = await db.insert(AiGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      additionalReq: additionalReq || null,
      orgImage: imageUrl,              // original uploaded image URL
      aiImage: aiImageUrl,             // generated image URL from Supabase
      userEmail: userEmail
    }).returning({ id: AiGeneratedImage.id });

    return NextResponse.json({ result: aiImageUrl});

  } catch (err) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
