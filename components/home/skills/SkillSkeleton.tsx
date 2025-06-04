import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkillSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm animate-pulse">
      <CardHeader className="pb-2">
        <div className="h-6 bg-primary/20 rounded w-1/2"></div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, j) => (
            <div key={j} className="h-6 bg-primary/10 rounded-full w-16"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
