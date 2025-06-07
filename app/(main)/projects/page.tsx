import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/project";
import ProjectLinks from "@/components/project-links";

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

export default async function ProjectPage() {
  let projects = [];
  

  try {
    await connectToDB();
   
    const dbProjects = await Project.find().sort({ createdAt: -1 });

    if (dbProjects && dbProjects.length > 0) {
      projects = JSON.parse(JSON.stringify(dbProjects));
    } else {
      projects = Object.values(fallbackProjects);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    projects = Object.values(fallbackProjects);
  }

  if (!projects.length) {
    return notFound();
  }

  return (
    <div className=" min-h-screen bg-cover bg-center bg-no-repeat text-foreground animate-fade-in">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50  "
        style={{ backgroundImage: 'url("/bg.webp")' }}
      ></div>
      <div className="min-h-screen">
        
        <main className="pt-24 pb-16 px-4 md:px-8 animate-fade-in animation-delay-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16 animate-fade-in-up animation-delay-300">
              <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore my portfolio of web development projects, showcasing my
                skills and experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-500">
              {projects.map((project, index) => (
                <Card
                  key={project._id.toString()}
                  className={`h-full overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover-card-effect animate-slide-up`}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <Link href={`/projects/${project._id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          project.image ||
                          "/placeholder.svg?height=600&width=800"
                        }
                        alt={project.title}
                        fill
                        className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Link href={`/projects/${project._id}`}>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <Link href={`/projects/${project._id}`}>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
       
      </div>
    </div>
  );
}
