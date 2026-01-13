import { headers } from "next/headers"; // Force dynamic
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export const dynamic = "force-dynamic";

export default async function AbcXyzPage() {
  let contents = [];

  try {
    await connectToDatabase();
    // Fetch latest 20 entries
    const docs = await Content.find({}).sort({ updatedAt: -1 }).limit(20);
    contents = JSON.parse(JSON.stringify(docs)); // Serializable
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8 text-center">
          Saved Content History
        </h1>

        <div className="space-y-4">
          {contents.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No records found.
            </div>
          ) : (
            contents.map((item: any) => (
              <div
                key={item._id}
                className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 shadow-lg hover:border-neutral-700 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded">
                    {new Date(item.updatedAt).toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    ID: {item._id}
                  </span>
                </div>
                <div className="bg-black rounded-lg p-4 font-mono text-sm text-gray-300 border border-neutral-800 whitespace-pre-wrap break-words">
                  {item.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
