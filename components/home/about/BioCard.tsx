import { Card, CardContent } from "@/components/ui/card";
import type { IAbout } from "@/lib/models/about";

export default function BioCard({ about }: { about?: Partial<IAbout> }) {
  return (
    <Card className="shadow-md bg-card/50 backdrop-blur-sm hover:shadow-glow border-border/50 hover:border-primary/50 group transition-all duration-300">
      <CardContent className="pt-6 space-y-4 text-muted-foreground">
        <p>
          {about?.bio ||
            "Hello! I'm Tuhinur Rahman, a passionate full-stack developer..."}
        </p>
        <p>
          {about?.bioExtended ||
            "My journey in web development began during university..."}
        </p>
        <p>
          {about?.bioConclusion || "When I'm not coding, you can find me..."}
        </p>
      </CardContent>
    </Card>
  );
}
