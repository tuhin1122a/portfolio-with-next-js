import { Badge } from "@/components/ui/badge";

interface BlogTagsProps {
  tags: string[];
}

const BlogTags = ({ tags }: BlogTagsProps) => {
  if (!tags || tags.length === 0) {
    return null; // যদি কোনো ট্যাগ না থাকে তাহলে কিছু রেন্ডার করবে না
  }

  return (
    <div className="flex flex-wrap gap-2 pt-8">
           {" "}
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="rounded-full px-3 py-1 text-sm"
        >
                    {tag}       {" "}
        </Badge>
      ))}
         {" "}
    </div>
  );
};

export default BlogTags;
