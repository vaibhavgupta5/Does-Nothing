"use client";

import { useState } from "react";

export default function HitItPage() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: content,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Content saved successfully!");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setStatus("error");
      setMessage("Failed to send request");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-neutral-900 rounded-2xl border border-neutral-800 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Hit the API
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Enter text below to send a POST request to{" "}
          <code className="bg-neutral-800 px-1 py-0.5 rounded text-green-400">
            /api/save
          </code>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              className="w-full h-32 bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none placeholder-neutral-600"
              placeholder="Type something here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20"
          >
            {status === "loading" ? "Sending..." : "Send Request"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-xl text-green-400 text-center animate-fade-in">
            <svg
              className="w-6 h-6 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 text-center animate-fade-in">
            <svg
              className="w-6 h-6 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
