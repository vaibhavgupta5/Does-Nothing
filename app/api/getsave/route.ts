import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all documents sorted by updatedAt descending (newest first)
    const docs = await Content.find({}).sort({ updatedAt: -1 }).limit(100);

    return NextResponse.json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
