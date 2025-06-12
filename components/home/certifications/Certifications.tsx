import SectionHeading from "@/components/ui/section-heading";
import CertificationCarousel from "./CertificationCarousel";
import { Certification } from "./types";

export default async function Certifications() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/certifications`, {
    next: { revalidate: 3600 }, // ISR (optional)
  });

  if (!res.ok) return null;

  const certifications: Certification[] = await res.json();

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="py-20">
      <div className="container px-4 mx-auto">
        <SectionHeading
          title="Certifications & Achievements"
          subtitle="A showcase of my professional certifications and achievements that validate my expertise and skills."
        />
        <CertificationCarousel certifications={certifications} />
      </div>
    </section>
  );
}
