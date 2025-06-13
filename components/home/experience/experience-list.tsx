"use client";

import { IExperience } from "@/lib/models/experience";
import { motion } from "framer-motion";
import ExperienceCard from "./experience-card";

export default function ExperienceList({
  experiences,
}: {
  experiences: IExperience[];
}) {
  if (!experiences?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No experience entries found. Add some from the admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="relative grid gap-10">
      <div className="absolute -left-4 top-20 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

      {experiences.map((exp, index) => (
        <motion.div
          key={exp._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ExperienceCard experience={exp} index={index} />
        </motion.div>
      ))}
    </div>
  );
}
