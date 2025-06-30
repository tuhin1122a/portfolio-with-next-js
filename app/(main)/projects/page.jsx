import GlowBackground from "@/components/GlowBackground";
import LightBackground from "@/components/home/LightBackground";

import { getProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProjectCard } from "./components/project-card";

// একটি ছোট কম্পোনেন্ট হিসেবে পেইজের হেডার
const PageHeader = () => (
  <div className="text-center space-y-4 mb-16 animate-fade-in-up animation-delay-300">
    <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Explore my portfolio of web development projects, showcasing my skills and
      experience.
    </p>
  </div>
);

export default async function ProjectPage() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800 dark:text-foreground transition-colors duration-300">
      <GlowBackground />
      <LightBackground />
      <main className="pt-24 pb-16 px-4 md:px-8 animate-fade-in animation-delay-200">
        <div className="max-w-6xl mx-auto">
          <PageHeader />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-500">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id.toString()}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
