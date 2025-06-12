"use client";

import { useTheme } from "next-themes";

export default function LightBackground() {
  const { theme } = useTheme();

  if (theme !== "light") return null;

  return (
    <div className="absolute inset-0 -z-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 1024 768"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lightGrad" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f2f2f2" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrad)" />
        <circle cx="200" cy="150" r="100" fill="#e0e0e0" />
        <circle cx="800" cy="600" r="120" fill="#eeeeee" />
        <circle cx="600" cy="300" r="60" fill="#f5f5f5" />
      </svg>
    </div>
  );
}
