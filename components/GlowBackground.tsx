"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const glowDuration = 18;
const glowCount = 4;

const colors = [
  "rgba(255, 105, 180, 0.2)",
  "rgba(107, 94, 252, 0.2)",
  "rgba(0, 150, 255, 0.2)",
  "rgba(170, 0, 255, 0.2)",
];

const GlowLayer = ({
  color,
  delay,
  zIndex,
}: {
  color: string;
  delay: number;
  zIndex: number;
}) => {
  const style = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    background: `radial-gradient(ellipse at bottom, ${color} 0%, rgba(0,0,0,0) 60%)`,
    backgroundSize: "140% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom center",
    backgroundAttachment: "fixed",
    opacity: 0,
    animationName: "glowFade",
    animationDuration: `${glowDuration}s`,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDelay: `${delay}s`,
    zIndex,
  };
  return <div style={style} />;
};

export default function GlowBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme !== "dark") return null;

  return (
    <>
      <style>
        {`
          @keyframes glowFade {
            0% { opacity: 0; }
            33% { opacity: 0.8; }
            66% { opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#05050c",
          zIndex: -10,
        }}
      />
      {colors.map((color, i) => (
        <GlowLayer
          key={i}
          color={color}
          delay={i * (glowDuration / glowCount)}
          zIndex={-6 + i}
        />
      ))}
    </>
  );
}
