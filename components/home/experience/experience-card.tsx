import { Badge } from "@/components/ui/badge";
import { IExperience } from "@/lib/models/experience";

export default function ExperienceCard({
  experience,
  index,
}: {
  experience: IExperience;
  index: number;
}) {
  return (
    <div className="bg-card/50 border border-border shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl group hover:border-primary/30 backdrop-blur-sm">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30"></div>
      <div className="p-6 md:p-8 grid md:grid-cols-[1fr_2.5fr] gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
              {index + 1}
            </div>
            <div className="text-sm font-medium text-primary/90 bg-primary/10 px-3 py-1 rounded-full">
              {experience.duration}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {experience.position}
            </h3>
            <p className="text-lg font-medium mt-1 text-foreground/80">
              {experience.company}
            </p>
            <Badge variant="outline" className="mt-2">
              {experience.location}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-sm">
            <ul className="space-y-3">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 flex items-center justify-center rounded-full mt-0.5">
                    <span className="text-primary text-sm">0{i + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Technologies & Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-secondary/50 rounded-lg"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
