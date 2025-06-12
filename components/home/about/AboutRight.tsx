"use client";

import { Button } from "@/components/ui/button";
import type { IAbout } from "@/lib/models/about";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Link from "next/link";
import InterestsCard from "./InterestsCard";
import LanguagesCard from "./LanguagesCard";
import PersonalInfoCard from "./PersonalInfoCard";

export default function AboutRight({ about }: { about?: Partial<IAbout> }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <PersonalInfoCard about={about} />
      {about?.languages && <LanguagesCard languages={about.languages} />}
      {about?.interests && <InterestsCard interests={about.interests} />}
      <div className="pt-2 w-full flex items-center justify-center">
        <Button asChild className="group">
          <Link href={about?.resumeUrl || "/resume.pdf"} target="_blank">
            <FileText className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Download Resume
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
