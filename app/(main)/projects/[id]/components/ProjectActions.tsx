import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type ProjectActionsProps = {
  demoUrl: string;
  githubUrl: string;
};

export default function ProjectActions({
  demoUrl,
  githubUrl,
}: ProjectActionsProps) {
  return (
    <div className="flex gap-4">
      <Button asChild>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Live Demo
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" />
          View Code
        </a>
      </Button>
    </div>
  );
}
