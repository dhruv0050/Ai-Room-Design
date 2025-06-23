import { NextResponse } from "next/server";
import supabase from "../../../config/supabase"; 
import { db } from "../../../config/db";

export async function POST(req) {
  try {
    // Static image URL for testing
    const output = "https://replicate.delivery/xezq/hd0RWJLosOo3GBAlYRZfQ5ywD9XoS5uqXWxOLvG9O8GjM5cKA/out.png";

    // Step 1: Fetch image from URL as Blob
    const response = await fetch(output);
    if (!response.ok) {
      throw new Error("Failed to fetch image from output URL");
    }
    const blob = await response.blob();

    // Step 2: Upload to Supabase
    const fileName = `${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from("room-design")
      .upload(`designs/${fileName}`, blob, {
        contentType: "image/png",
      });

    if (error) {
      throw new Error("Supabase upload failed: " + error.message);
    }

    // Step 3: Get public URL
    const { data: publicData } = supabase.storage
      .from("room-design")
      .getPublicUrl(`designs/${fileName}`);

    return NextResponse.json({ result: publicData.publicUrl });

    const dbResult = await db.insert()
  } catch (err) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
