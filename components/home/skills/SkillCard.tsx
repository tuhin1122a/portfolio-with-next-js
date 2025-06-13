import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ISkill } from "@/lib/models/skill";
import { iconComponents } from "./icon-map";

export default function SkillCard({ category }: { category: ISkill }) {
  const Icon = iconComponents[category.icon] || iconComponents["Frontend"];

  return (
    <Card className="h-full overflow-hidden border-border/50 group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-6 w-6" />
          {category.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground group-hover:bg-primary/20 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
