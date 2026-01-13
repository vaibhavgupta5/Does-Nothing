import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export async function POST(req: Request) {
  try {
    const text = await req.text();

    await connectToDatabase();

    // Create a new document for each request to maintain a history
    await Content.create({
      text,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error("Error saving to DB:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
