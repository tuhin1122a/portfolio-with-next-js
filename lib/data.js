import { Project } from "@/lib/models/project";
import { connectToDB } from "@/lib/mongodb";

// ডাটাবেস সংযোগ ব্যর্থ হলে ফলব্যাক করার জন্য স্যাম্পল ডেটা
const fallbackProjects = {
  aibuddy: {
    _id: "aibuddy",
    title: "AiBuddy",
    description:
      "AI Chat assistant built with Next.js. Chat with Smart AI, leveraging OpenAI's GPT-4 for intelligent responses.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "React", "TypeScript", "OpenAI"],
    demoUrl: "https://aibuddy.example.com",
    githubUrl: "https://github.com/example/aibuddy",
  },
  fitrecipes: {
    _id: "fitrecipes",
    title: "Fit Recipes",
    description:
      "Fit Recipes is a Nutrition-Based AI Recipe Generator. Create personalized recipes based on your dietary preferences.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoUrl: "https://fitrecipes.example.com",
    githubUrl: "https://github.com/example/fitrecipes",
  },
};

export async function getProjects() {
  try {
    await connectToDB();
    // .lean() ব্যবহার করলে ডেটা সাধারণ জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে আসে, যা পারফরম্যান্স বাড়ায়
    const dbProjects = await Project.find().sort({ createdAt: -1 }).lean();

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects;
    }

    // ডেটাবেসে প্রজেক্ট না থাকলে ফলব্যাক ডেটা রিটার্ন করবে
    return Object.values(fallbackProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    // কোনো এরর হলেও ফলব্যাক ডেটা রিটার্ন করবে
    return Object.values(fallbackProjects);
  }
}
