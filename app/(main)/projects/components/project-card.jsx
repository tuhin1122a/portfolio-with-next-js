import ProjectLinks from "@/components/project-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project, index }) {
  const projectId = project._id.toString();
  const projectUrl = `/projects/${projectId}`;

  return (
    <Card
      className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover-card-effect animate-slide-up"
      style={{ animationDelay: `${500 + index * 100}ms` }}
    >
      <Link href={projectUrl} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg?height=600&width=800"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
          <Link href={projectUrl}>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 mt-auto">
          <Link href={projectUrl}>
            <Button
              variant="ghost"
              className="gap-1 px-0 text-primary hover:text-primary/80 hover:bg-transparent"
            >
              View Details <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <ProjectLinks
            githubUrl={project.githubUrl}
            demoUrl={project.demoUrl}
          />
        </div>
      </CardContent>
    </Card>
  );
}
