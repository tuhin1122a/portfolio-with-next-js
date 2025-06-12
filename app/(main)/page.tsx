import GlowBackground from "@/components/GlowBackground";
import AboutSection from "@/components/home/about/AboutSection";
import Certifications from "@/components/home/certifications/Certifications";

import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
import LatestBlogPosts from "@/components/home/latest-blog-posts";
import LightBackground from "@/components/home/LightBackground";
import Services from "@/components/home/services";
import Skills from "@/components/home/skills";
import { getAboutData } from "@/lib/server/about";
import { getFooter, initializeDefaultFooter } from "@/lib/server/footer";
import { getHeader, initializeDefaultHeader } from "@/lib/server/header";
import { serializeData } from "@/lib/utils";

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

  return (
    <main className="min-h-screen relative overflow-hidden text-gray-800 dark:text-foreground transition-colors duration-300">
      <GlowBackground />
      <LightBackground />

      <Hero header={serializedHeader} />
      <AboutSection about={serializedAbout} />
      <Skills />
      <Experience />
      <Certifications />
      <FeaturedProjects />
      <Services />
      <LatestBlogPosts />
      <Contact />
    </main>
  );
}
