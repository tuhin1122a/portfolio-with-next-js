import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type ProjectDetailsProps = {
  features: string[];
  tags: string[];
  screenshots: string[];
  title: string;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-6">{children}</h2>
);

export default function ProjectDetails({
  features,
  tags,
  screenshots,
  title,
}: ProjectDetailsProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <SectionTitle>Key Features</SectionTitle>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Tech Stack</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="text-sm py-1 px-3 rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>Screenshots</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden border border-border/50"
            >
              <Image
                src={screenshot || "/placeholder.svg?height=400&width=600"}
                alt={`${title} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
