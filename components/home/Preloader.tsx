"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) =>
          Math.min(prev + Math.floor(Math.random() * 5) + 1, 100)
        );
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const elapsed = Date.now() - startTime;
      const minDisplayTime = 1500; // milliseconds, 1.5 seconds minimum

      const timeout = setTimeout(
        () => {
          setIsAnimating(true);
          setTimeout(() => {
            setIsHidden(true);
          }, 1000);
        },
        elapsed < minDisplayTime ? minDisplayTime - elapsed : 300
      );

      return () => clearTimeout(timeout);
    }
  }, [progress, startTime]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white 
        bg-gradient-to-br from-[#1e1e2f] via-[#2e2e50] to-[#3b3b7c]
        backdrop-blur-md
        transition-transform duration-1000 ease-in-out
        ${isAnimating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      `}
    >
      <h1 className="text-5xl font-extrabold mb-6 tracking-widest text-white drop-shadow-glow animate-pulse">
        Tuhin
      </h1>
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-white/70">{progress}%</p>
    </div>
  );
}
