import BlogComments from "@/components/blog/blog-comments";
import GlowBackground from "@/components/GlowBackground";
import LightBackground from "@/components/home/LightBackground";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/models/blog";
import { connectToDB } from "@/lib/mongodb";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import { User } from "@/lib/models/user";


// Sample blog post data for fallback during build
const fallbackBlogPosts = {
  Next: {
    _id: "507f1f77bcf86cd799439011",
    title: "Building Modern Web Applications Using Next 14",
    content: `
      <p>Next.js has rapidly become the go-to framework for building modern web applications, and with the release of Next.js 14, it brings even more powerful features to the table. In this post, we'll explore the latest advancements and best practices for creating cutting-edge web experiences.</p>
      
      <h2>The Evolution of Next.js</h2>
      <p>Since its initial release, Next.js has continuously evolved to meet the ever-changing demands of web development. Version 14 represents a significant leap forward, with improvements in performance, developer experience, and overall capabilities.</p>
      
      <h2>Key Features in Next.js 14</h2>
      <ul>
        <li><strong>Enhanced App Router:</strong> Building upon the App Router introduced in Next.js 13, version 14 brings further optimizations and new features to streamline routing in your applications.</li>
        <li><strong>Improved Server Components:</strong> React Server Components are now more powerful and easier to use, allowing for more efficient rendering strategies.</li>
        <li><strong>Turbopack Advancements:</strong> The Rust-based bundler continues to improve, offering even faster build times and development experiences.</li>
        <li><strong>Enhanced Image Component:</strong> The Image component now includes more optimization options and better performance metrics.</li>
      </ul>
      
      <h2>Building a Modern Application</h2>
      <p>When building a modern web application with Next.js 14, it's essential to embrace the latest patterns and practices. This includes leveraging server components for improved performance, using the App Router for simplified routing, and taking advantage of the enhanced image optimization capabilities.</p>
      
      <p>By adopting these modern approaches, you can create web applications that are not only fast and responsive but also maintainable and scalable for future growth.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js 14 represents a significant step forward in the evolution of web development frameworks. By embracing its new features and patterns, developers can create more efficient, performant, and user-friendly web applications that meet the demands of today's digital landscape.</p>
    `,
    createdAt: "2025-03-10T00:00:00.000Z",
    readTime: "5 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Web Development",
    tags: ["Next.js", "React", "Web Development", "JavaScript", "Frontend"],
    author: {
      name: "Masudur Rahman",
      image: "/placeholder.svg?height=100&width=100",
    },
    comments: [],
  },
  Tailwind: {
    _id: "507f1f77bcf86cd799439012",
    title: "The Power of Tailwind CSS",
    content: `
      <p>Tailwind CSS has revolutionized the way we approach styling in web development. With its utility-first methodology, it offers unprecedented flexibility and efficiency in creating beautiful, responsive designs.</p>
      
      <h2>Why Tailwind CSS?</h2>
      <p>Traditional CSS frameworks often come with predefined components and styles that can be limiting. Tailwind CSS, on the other hand, provides low-level utility classes that let you build completely custom designs without leaving your HTML.</p>
      
      <h2>Key Benefits of Tailwind CSS</h2>
      <ul>
        <li><strong>Productivity:</strong> With Tailwind, you can rapidly build user interfaces without writing custom CSS, allowing for faster development cycles.</li>
        <li><strong>Consistency:</strong> Tailwind's utility classes help maintain a consistent design system throughout your application.</li>
        <li><strong>Responsiveness:</strong> Built-in responsive modifiers make it easy to create designs that work across all screen sizes.</li>
        <li><strong>Customization:</strong> Unlike other frameworks, Tailwind is highly customizable, allowing you to tailor it to your specific design needs.</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>While Tailwind CSS offers tremendous flexibility, it's important to follow some best practices to ensure your code remains maintainable:</p>
      
      <ul>
        <li>Use component extraction for repeated elements</li>
        <li>Leverage Tailwind's configuration file for customization</li>
        <li>Utilize the @apply directive for complex, repeated utility combinations</li>
        <li>Implement a consistent naming convention for your components</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS represents a paradigm shift in how we approach styling in web development. By embracing its utility-first philosophy, developers can create beautiful, responsive designs more efficiently than ever before. As the framework continues to evolve, it's likely to remain at the forefront of modern web development practices.</p>
    `,
    createdAt: "2025-02-25T00:00:00.000Z",
    readTime: "4 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "CSS",
    tags: ["CSS", "Tailwind CSS", "Web Development", "Frontend", "UI Design"],
    author: {
      name: "Masudur Rahman",
      image: "/placeholder.svg?height=100&width=100",
    },
    comments: [],
  },
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  // Try to get blog post data
  let post;
  try {
    const db = await connectToDB();
    if (db) {
      post = await Blog.findById(id).lean();
    }

    if (!post) {
      post = fallbackBlogPosts[id as keyof typeof fallbackBlogPosts];
    }
  } catch (error) {
    post = fallbackBlogPosts[id as keyof typeof fallbackBlogPosts];
  }

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
      images: [post.image || "/placeholder.svg?height=600&width=1200"],
      type: "article",
    },
  };
}

// Helper function to transform comments to match the Comment interface
function transformComments(comments = []) {
  return comments.map((comment) => ({
    _id: comment._id.toString(),
    author: {
      _id: comment.author?._id?.toString() || "",
      name: comment.author?.name || "Anonymous",
      image: comment.author?.image || undefined,
    },
    content: comment.content || "",
    date: comment.createdAt || comment.date || new Date().toISOString(),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  let post;
  let settings = {};

  try {
    // Connect to database
    const db = await connectToDB();

    // Only fetch from DB if we're not in build phase
    if (db) {
      // Fetch blog post by ID with populated author and comments
      const blogPost = await Blog.findById(id)
        .populate("author", "name image")
        .populate("comments.author", "name image")
        .lean(); // Use .lean() to get plain JavaScript object

      if (blogPost) {
        // Create the post object with transformed comments
        post = {
          ...blogPost,
          _id: blogPost._id.toString(),
          comments: transformComments(blogPost.comments),
        };
      }
    }

    // If no post found in DB, try fallback data
    if (!post) {
      const fallbackPost =
        fallbackBlogPosts[id as keyof typeof fallbackBlogPosts];
      if (fallbackPost) {
        post = {
          ...fallbackPost,
          comments: transformComments(fallbackPost.comments),
        };
      }
    }

    // If still no post, return 404
    if (!post) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Try fallback data
    const fallbackPost =
      fallbackBlogPosts[id as keyof typeof fallbackBlogPosts];
    if (fallbackPost) {
      post = {
        ...fallbackPost,
        comments: transformComments(fallbackPost.comments),
      };
    }

    // If no fallback data, return 404
    if (!post) {
      return notFound();
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800 dark:text-foreground transition-colors duration-300">
      <GlowBackground />
      <LightBackground />

      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>{post?.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post?.readTime}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{post?.title}</h1>

              <div className="flex items-center gap-3 pt-4">
                <Avatar>
                  <AvatarImage
                    src={
                      post.author?.image ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={post.author?.name || "Author"}
                  />
                  <AvatarFallback>
                    {(post.author?.name || "A").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {post.author?.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Web Developer and Tech Enthusiast
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg">
              <Image
                src={post?.image || "/placeholder.svg?height=600&width=1200"}
                alt={post?.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />

            <div className="flex flex-wrap gap-2 pt-6">
              {Array.isArray(post.tags) &&
                post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>

          <Suspense fallback={<div>Loading comments...</div>}>
            <BlogComments
              postId={post._id.toString()}
              initialComments={post.comments}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
