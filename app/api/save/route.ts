import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const content = await req.text();
    const filePath = path.join(process.cwd(), "output.txt");

    fs.writeFileSync(filePath, content);

    return NextResponse.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 500 }
    );
  }
}
