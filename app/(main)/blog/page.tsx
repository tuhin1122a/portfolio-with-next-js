import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connectToDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models/blog";


// Sample blog post data for fallback during build
const fallbackBlogPosts = [
  {
    _id: "507f1f77bcf86cd799439011", // MongoDB-like ObjectId
    title: "Building Modern Web Applications Using Next 14",
    excerpt:
      "Explore the latest features and best practices for building modern web applications with Next.js 14.",
    createdAt: "2025-03-10T00:00:00.000Z",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    title: "The Power of Tailwind CSS",
    excerpt:
      "Discover why Tailwind CSS has become so popular and the best practices for modern web development.",
    createdAt: "2025-02-25T00:00:00.000Z",
    readTime: "4 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "CSS",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Mastering Framer Motion Animations",
    excerpt:
      "Learn how to create stunning animations in React applications using Framer Motion.",
    createdAt: "2025-01-15T00:00:00.000Z",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Animations",
  },
];

export default async function BlogPage() {
  // Try to fetch blog posts, but use fallback data during build
  let blogPosts = fallbackBlogPosts;
  

  try {
    // Connect to database
    const db = await connectToDB();

    // Only fetch from DB if we're not in build phase
    if (db) {
     

      // Fetch published blog posts
      const posts = await Blog.find({ published: true })
        .sort({ createdAt: -1 })
        .populate("author", "name image");

      if (posts && posts.length > 0) {
        blogPosts = posts;
      }
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Use fallback data
  }

  return (
    <div className=" min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50 "
        style={{ backgroundImage: 'url("/bg.webp")' }}
      ></div>
     
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, insights, and tutorials about web development, design,
              and technology.
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post._id.toString()} href={`/blog/${post._id}`}>
                  <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          post.image || "/placeholder.svg?height=400&width=600"
                        }
                        alt={post.title}
                        fill
                        className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/90 text-primary-foreground">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            <span>
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <Button
                          variant="ghost"
                          className="gap-1 px-0 text-primary hover:text-primary/80 hover:bg-transparent"
                        >
                          Read More <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No blog posts found. Check back later for new content.
              </p>
            </div>
          )}
        </div>
      </main>
     
    </div>
  );
}
