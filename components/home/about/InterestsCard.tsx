import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterestsCard({ interests }: { interests: string[] }) {
  return (
    <Card className="shadow-md border-border/50 hover:border-primary/50 group bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, i) => (
            <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
