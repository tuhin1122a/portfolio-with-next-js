import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IAbout } from "@/lib/models/about";

export default function EducationCard({
  education,
}: {
  education?: IAbout["education"];
}) {
  if (!education?.length) return null;

  return (
    <Card className="shadow-md bg-card/50 backdrop-blur-sm hover:shadow-glow border-border/50 hover:border-primary/50 group transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Education</CardTitle>
      </CardHeader>
      <CardContent>
        {education.map((edu, i) => (
          <div key={i} className={i > 0 ? "mt-4" : ""}>
            <h4 className="font-medium">{edu.degree}</h4>
            <p className="text-sm text-muted-foreground">
              {edu.institution} | {edu.year}
            </p>
            {edu.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
