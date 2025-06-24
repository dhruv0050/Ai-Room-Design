import { NextResponse } from "next/server";
import supabase from "../../../config/supabase";
import { db } from "../../../config/db";
import { AiGeneratedImage } from "../../../config/schema";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

  try {
    // Step 1: Fetching AI-generated image from Replicate

    const input = {
      image: imageUrl,
      prompt: 'A '+roomType+' with a'+designType+' style interior '+additionalReq
  };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
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
