import GlowBackground from "@/components/GlowBackground";
import AboutSection from "@/components/home/about/AboutSection";
import Certifications from "@/components/home/certifications/Certifications";
import Contact from "@/components/home/contact";

import ExperienceSection from "@/components/home/experience/experience-section";
import ExperienceSkeleton from "@/components/home/experience/experience-skeleton";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
import LatestBlogPosts from "@/components/home/latest-blog-posts";
import LightBackground from "@/components/home/LightBackground";
import Services from "@/components/home/services";
import SkillsPage from "@/components/home/skills/Skills";

import { getAboutData } from "@/lib/server/about";
import { getFooter, initializeDefaultFooter } from "@/lib/server/footer";
import { getHeader, initializeDefaultHeader } from "@/lib/server/header";
import { serializeData } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home() {
  await initializeDefaultHeader();
  await initializeDefaultFooter();
  const [header, about] = await Promise.all([
    getHeader(),
    getAboutData(),
    getFooter(),
  ]);
  // Serialize the data to plain objects
  const serializedHeader = serializeData(header);
  const serializedAbout = serializeData(about);
  console.log("homee");

  return (
    <main className="min-h-screen relative overflow-hidden text-gray-800 dark:text-foreground transition-colors duration-300">
      <GlowBackground />
      <LightBackground />

      <Hero header={serializedHeader} />
      <AboutSection about={serializedAbout} />
      <SkillsPage />
      <Suspense fallback={<ExperienceSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <Certifications />
      <FeaturedProjects />
      <Services />
      <LatestBlogPosts />
      <Contact />
    </main>
  );
}
