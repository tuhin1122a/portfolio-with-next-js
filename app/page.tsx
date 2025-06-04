import About from "@/components/home/about";
import Certifications from "@/components/home/certifications";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
import LatestBlogPosts from "@/components/home/latest-blog-posts";
import Services from "@/components/home/services";
import Skills from "@/components/home/skills";
import { getAboutData } from "@/lib/server/about";
import { getFooter, initializeDefaultFooter } from "@/lib/server/footer";
import { getHeader, initializeDefaultHeader } from "@/lib/server/header";
import { serializeData } from "@/lib/utils";
import GlowBackground from "./../components/GlowBackground";

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
    <main className="min-h-screen bg-cover bg-center bg-no-repeat object-fit-contain text-foreground relative overflow-hidden">
      <GlowBackground />

      <Hero header={serializedHeader} />
      <About about={serializedAbout} />
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
