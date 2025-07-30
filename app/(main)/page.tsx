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

// 🆕 Added animated wrapper
import FadeIn from "@/components/FadeIn";

export default async function Home() {
  await initializeDefaultHeader();
  await initializeDefaultFooter();

  const [header, about] = await Promise.all([
    getHeader(),
    getAboutData(),
    getFooter(),
  ]);

  const serializedHeader = serializeData(header);
  const serializedAbout = serializeData(about);

  return (
    <main className="min-h-screen relative overflow-hidden scroll-smooth text-gray-800 dark:text-foreground transition-colors duration-300">
      {/* Smooth scroll enabled via Tailwind scroll-smooth class */}

      <GlowBackground />
      <LightBackground />

      <FadeIn>
        <Hero header={serializedHeader} />
      </FadeIn>
      <FadeIn delay={0.1}>
        <AboutSection about={serializedAbout} />
      </FadeIn>
      <FadeIn delay={0.2}>
        <SkillsPage />
      </FadeIn>
      <FadeIn delay={0.3}>
        <Suspense fallback={<ExperienceSkeleton />}>
          <ExperienceSection />
        </Suspense>
      </FadeIn>
      <FadeIn delay={0.4}>
        <Certifications />
      </FadeIn>
      <FadeIn delay={0.5}>
        <FeaturedProjects />
      </FadeIn>
      <FadeIn delay={0.6}>
        <Services />
      </FadeIn>
      <FadeIn delay={0.7}>
        <LatestBlogPosts />
      </FadeIn>
      <FadeIn delay={0.8}>
        <Contact />
      </FadeIn>
    </main>
  );
}
