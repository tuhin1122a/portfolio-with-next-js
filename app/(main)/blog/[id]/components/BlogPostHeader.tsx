import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IBlog } from "@/lib/models/blog"; // আপনার blog model থেকে IBlog টাইপ ইমপোর্ট করুন
import { Calendar, Clock } from "lucide-react";

interface BlogPostHeaderProps {
  post: IBlog;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  return (
    <div className="space-y-6">
           {" "}
      <div className="space-y-2">
               {" "}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge>{post.category}</Badge>         {" "}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       {" "}
            <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />             {" "}
              <span>
                               {" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                             {" "}
              </span>
                         {" "}
            </div>
                       {" "}
            <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />             {" "}
              <span>{post.readTime}</span>           {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <h1 className="text-3xl md:text-4xl font-bold pt-2">{post.title}</h1>   
                   {" "}
        <div className="flex items-center gap-3 pt-4">
                   {" "}
          <Avatar>
                       {" "}
            <AvatarImage
              src={post.author?.image || "/placeholder.svg?height=40&width=40"}
              alt={post.author?.name || "Author"}
            />
                       {" "}
            <AvatarFallback>
              {(post.author?.name || "A").charAt(0)}
            </AvatarFallback>
                     {" "}
          </Avatar>
                   {" "}
          <div>
                       {" "}
            <div className="font-medium">
              {post.author?.name || "Anonymous"}
            </div>
                       {" "}
            <div className="text-sm text-muted-foreground">
                            Web Developer and Tech Enthusiast            {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default BlogPostHeader;
