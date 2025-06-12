"use client";

import type { IAbout } from "@/lib/models/about";
import { motion } from "framer-motion";
import BioCard from "./BioCard";
import EducationCard from "./EducationCard";

export default function AboutLeft({ about }: { about?: Partial<IAbout> }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <BioCard about={about} />
      {about?.education && about.education.length > 0 && (
        <EducationCard education={about.education} />
      )}
    </motion.div>
  );
}
