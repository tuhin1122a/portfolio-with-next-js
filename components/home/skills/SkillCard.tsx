import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ISkill } from "@/lib/models/skill";
import { iconComponents } from "./icon-map";

export default function SkillCard({ category }: { category: ISkill }) {
  const Icon = iconComponents[category.icon] || iconComponents["Frontend"];

  return (
    <Card className="h-full overflow-hidden group rounded-xl border border-border bg-background shadow-sm hover:shadow-md hover:border-primary/60 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Icon className="h-6 w-6 text-primary" />
          {category.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-1">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border hover:bg-primary/10 hover:text-foreground transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
