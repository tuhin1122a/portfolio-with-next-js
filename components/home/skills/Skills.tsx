import { getSkills } from "@/lib/api/skills";
import SectionHeading from "../../ui/section-heading";
import SkillGrid from "./SkillGrid";

export const dynamic = "force-dynamic"; // Ensure SSR

export default async function SkillsPage() {
  const skillCategories = await getSkills();

  return (
    <section id="skills" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I've worked with"
        />
        <SkillGrid skillCategories={skillCategories} />
      </div>
    </section>
  );
}
