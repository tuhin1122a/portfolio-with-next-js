import SectionHeading from "@/components/ui/section-heading";
import type { IAbout } from "@/lib/models/about";
import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";

interface AboutProps {
  about?: Partial<IAbout>;
}

export default function AboutSection({ about }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Learn a little more about my background and experience"
          align="center"
        />
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <AboutLeft about={about} />
          <AboutRight about={about} />
        </div>
      </div>
    </section>
  );
}
