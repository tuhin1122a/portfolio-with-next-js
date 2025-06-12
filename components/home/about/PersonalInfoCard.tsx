import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IAbout } from "@/lib/models/about";

export default function PersonalInfoCard({
  about,
}: {
  about?: Partial<IAbout>;
}) {
  return (
    <Card className="shadow-md border-border/50 hover:border-primary/50 group bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Personal Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-muted-foreground">
          <div>
            <h3 className="font-medium">Name:</h3>
            <p>{about?.fullName || "Tuhinur Rahman"}</p>
          </div>
          <div>
            <h3 className="font-medium">Email:</h3>
            <p>{about?.email || "tuhinrahman48@gmail.com"}</p>
          </div>
          <div>
            <h3 className="font-medium">Location:</h3>
            <p>{about?.location || "Jhenaidah, Bangladesh"}</p>
          </div>
          <div>
            <h3 className="font-medium">Availability:</h3>
            <p>{about?.availability || "Full-time"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
