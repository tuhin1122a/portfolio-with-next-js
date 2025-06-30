import { Badge } from "@/components/ui/badge";

type ProjectHeaderProps = {
  title: string;
  tags: string[];
};

export default function ProjectHeader({ title, tags }: ProjectHeaderProps) {
  return (
    <header>
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
