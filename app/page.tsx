"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    // Start animation shortly after mount
    const animTimeout = setTimeout(() => {
      setIsDay(true);
    }, 500);

    // Redirect to google.com after animation and reading time
    const redirectTimeout = setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 6000); // 0.5s start + 4s rise + 1.5s read

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <main className={`page-container ${isDay ? "day" : ""}`}>
      <div className="sun" />
      <h1 className="text-content">
        this website does nothing and sends to google.com
      </h1>
    </main>
  );
}
