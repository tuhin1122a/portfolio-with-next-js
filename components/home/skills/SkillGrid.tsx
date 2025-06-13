"use client";

import type { ISkill } from "@/lib/models/skill";
import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function SkillGrid({
  skillCategories,
}: {
  skillCategories: ISkill[];
}) {
  if (!skillCategories.length) {
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-muted-foreground">
          No skills found. Add some skills from the admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
    >
      {skillCategories.map((category) => (
        <motion.div key={category._id.toString()} variants={item}>
          <SkillCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
}
