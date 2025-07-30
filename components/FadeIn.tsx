// components/FadeIn.tsx
"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
