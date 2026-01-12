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
    }, 9000); 

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <main className={`page-container ${isDay ? "day" : ""}`}>
      <div className="sun" />
      <div className="clouds">
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
      </div>
      <h1 className="text-content uppercase fixed bottom-10">
        this website does nothing!
      </h1>
    </main>
  );
}
