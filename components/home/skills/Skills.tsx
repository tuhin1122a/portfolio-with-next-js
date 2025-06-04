"use client";

import type { ISkill } from "@/lib/models/skill";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import SectionHeading from "@/components/ui/section-heading";
import SkillCard from "./SkillCard";
import SkillSkeleton from "./SkillSkeleton";

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkillCategories(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

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

  return (
    <section id="skills" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I've worked with"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {loading
            ? [...Array(6)].map((_, i) => <SkillSkeleton key={i} />)
            : skillCategories.map((category) => (
                <motion.div key={category._id.toString()} variants={item}>
                  <SkillCard category={category} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
