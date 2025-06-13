import SectionHeading from "@/components/ui/section-heading";

import { getExperiences } from "@/lib/api/get-experiences";
import ExperienceList from "./experience-list";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and roles"
          align="center"
        />
        <div className="mt-16">
          <ExperienceList experiences={experiences} />
        </div>
      </div>
    </section>
  );
}
