import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // Ensure exact current content is shown

import os from "os";

export default function AbcXyzPage() {
  const filePath = path.join(os.tmpdir(), "output.txt");
  let content = "";

  try {
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, "utf-8");
    } else {
      content = "File output.txt does not exist yet.";
    }
  } catch (err) {
    content = "Error reading file.";
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-neutral-900 rounded-xl border border-neutral-800 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
          File Content
        </h1>
        <div className="bg-black rounded-lg p-6 font-mono text-sm text-gray-300 border border-neutral-800 whitespace-pre-wrap break-words min-h-[100px]">
          {content}
        </div>
      </div>
    </div>
  );
}
