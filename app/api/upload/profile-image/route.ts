import { uploadImage } from "@/lib/cloudinary";
import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ✅ FIX: Pass req directly instead of reconstructing it
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token?.sub) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as Blob | null;

    if (!file) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    await connectToDB();

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadImage(buffer, "profile");

    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    await User.findByIdAndUpdate(token.sub, { $set: { image: imageUrl } });
    revalidatePath("/profile");

    return NextResponse.json({ success: true, imageUrl });
  } catch (err) {
    console.error("Image Upload Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
