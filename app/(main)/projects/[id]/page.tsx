import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/project";

import mongoose from "mongoose";
import type { Metadata, ResolvingMetadata } from "next/types";

// Add this type and function before your component
type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  // Try to fetch project data
  let project;

  try {
    // First try from database
    const db = await connectToDB();

    if (db) {
      project = await Project.findOne({
        $or: [{ slug: id }, { _id: mongoose.isValidObjectId(id) ? id : null }],
      });
    }

    // If not found in DB, use fallback
    if (!project) {
      project = fallbackProjects[id as keyof typeof fallbackProjects];
    }

    // If still no project, use default
    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      };
    }

    // Return metadata based on project
    return {
      title: `${project.title} | Portfolio Project`,
      description: project.description,
      openGraph: {
        title: `${project.title} | Portfolio Project`,
        description: project.description,
        images: [project.image || "/placeholder.svg?height=600&width=800"],
      },
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: "Project Details",
      description: "View detailed information about this portfolio project",
    };
  }
}

// Sample project data for fallback during build
const fallbackProjects = {
  aibuddy: {
    _id: "aibuddy",
    title: "AiBuddy",
    description:
      "AI Chat assistant built with Next.js. Chat with Smart AI, leveraging OpenAI's GPT-4 for intelligent responses.",
    longDescription:
      "AiBuddy is a sophisticated AI assistant platform built with Next.js and powered by OpenAI's GPT-4. It provides users with real-time, intelligent conversation capabilities, handling various user queries from simple questions to complex problem-solving tasks. The application features a sleek, responsive interface designed for optimal user experience across all devices. Users can save their conversation history, export chats, and even customize the AI's response style. The platform includes premium features like voice conversations and document analysis, making it a versatile tool for professionals, students, and casual users alike.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "React", "TypeScript", "OpenAI"],
    demoUrl: "https://aibuddy.example.com",
    githubUrl: "https://github.com/example/aibuddy",
    features: [
      "Real-time AI conversations with GPT-4",
      "Responsive design for all devices",
      "Conversation history and chat exports",
      "Custom AI personality settings",
      "Voice conversations",
      "Document analysis",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  fitrecipes: {
    _id: "fitrecipes",
    title: "Fit Recipes",
    description:
      "Fit Recipes is a Nutrition-Based AI Recipe Generator. Create personalized recipes based on your dietary preferences.",
    longDescription:
      "Fit Recipes is a cutting-edge nutrition-based AI recipe generator designed to revolutionize meal planning. This application allows users to create personalized recipes based on their unique dietary preferences, restrictions, and fitness goals. Using advanced machine learning algorithms, Fit Recipes analyzes nutritional data and user preferences to suggest optimal meal options. The platform includes features like calorie tracking, macro-nutrient calculation, and shopping list generation. Users can save favorite recipes, share their creations, and track their nutritional intake over time. The intuitive interface makes healthy eating accessible to everyone, from fitness enthusiasts to busy professionals looking for quick, healthy meal ideas.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoUrl: "https://fitrecipes.example.com",
    githubUrl: "https://github.com/example/fitrecipes",
    features: [
      "AI-powered recipe generation",
      "Personalized nutrition recommendations",
      "Dietary restriction accommodations",
      "Calorie and macro-nutrient tracking",
      "Shopping list generation",
      "Meal planning calendar",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // Try to fetch project data, but use fallback data during build

  const { id } = await params;

  let project;

  try {
    // Connect to database
    const db = await connectToDB();

    // Only fetch from DB if we're not in build phase
    if (db) {
      // Try to find project by slug or ID
      project = await Project.findOne({
        $or: [{ slug: id }, { _id: mongoose.isValidObjectId(id) ? id : null }],
      });
    }

    // If no project found in DB, try fallback data
    if (!project) {
      project = fallbackProjects[id as keyof typeof fallbackProjects];
    }

    // If still no project, return 404
    if (!project) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    // Try fallback data
    project = fallbackProjects[id as keyof typeof fallbackProjects];

    // If no fallback data, return 404
    if (!project) {
      return notFound();
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat ">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50 "
        style={{ backgroundImage: 'url("/bg.webp")' }}
      ></div>

      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground text-lg">
                {project.longDescription}
              </p>

              <div className="flex gap-4">
                <Button asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
              <Image
                src={project.image || "/placeholder.svg?height=600&width=800"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} className="text-sm py-1 px-3 rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.screenshots.map((screenshot: string, index: number) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-border/50"
                >
                  <Image
                    src={screenshot || "/placeholder.svg?height=400&width=600"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
