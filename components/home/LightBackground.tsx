"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LightBackground(): JSX.Element | null {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme !== "light") return null;

  return (
    <div className="absolute inset-0 -z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
      >
        <defs>
          <radialGradient
            id="a"
            cx="396"
            cy="281"
            r="514"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#F7FFFB" />
            <stop offset="1" stopColor="#FFFAF9" />
          </radialGradient>
          <linearGradient
            id="b"
            x1="400"
            y1="148"
            x2="400"
            y2="333"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#51061D" stopOpacity="0" />
            <stop offset="1" stopColor="#51061D" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="lightGrad" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f2f2f2" />
          </radialGradient>
        </defs>

        <rect fill="#FFFAF9" width="800" height="400" />
        <rect fill="url(#a)" width="800" height="400" />

        <g fillOpacity="0.5">
          <circle fill="url(#b)" cx="267.5" cy="61" r="300" />
          <circle fill="url(#b)" cx="532.5" cy="61" r="300" />
          <circle fill="url(#b)" cx="400" cy="30" r="300" />
        </g>

        <rect width="100%" height="100%" fill="url(#lightGrad)" />
        <circle cx="200" cy="150" r="100" fill="#e0e0e0" />
        <circle cx="800" cy="600" r="120" fill="#eeeeee" />
        <circle cx="600" cy="300" r="60" fill="#f5f5f5" />
      </svg>
    </div>
  );
}
