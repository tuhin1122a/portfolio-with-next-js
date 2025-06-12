import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LanguagesCard({
  languages,
}: {
  languages: { name: string; proficiency: string }[];
}) {
  return (
    <Card className="shadow-md border-border/50 hover:border-primary/50 group bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang, i) => (
            <div key={i} className="flex justify-between">
              <span>{lang.name}</span>
              <span className="text-muted-foreground">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
