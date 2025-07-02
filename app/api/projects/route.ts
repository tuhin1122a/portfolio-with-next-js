import { authOptions } from "@/lib/auth-options";
import { Project } from "@/lib/models/project";
import { connectToDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET all projects
export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    let query = {};
    if (featured === "true") {
      query = { featured: true };
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Transform MongoDB documents to serializable objects
    const serializedProjects = projects.map((project: any) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toISOString(),
      updatedAt: project.updatedAt?.toISOString(),
    }));

    return NextResponse.json(serializedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

// POST new project (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is admin
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const projectData = await req.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "longDescription",
      "image",
      "demoUrl",
      "githubUrl",
    ];
    for (const field of requiredFields) {
      if (!projectData[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newProject = await Project.create(projectData);

    // Transform new project to serializable object
    const serializedProject = {
      ...newProject.toObject(),
      _id: newProject._id.toString(),
      createdAt: newProject.createdAt?.toISOString(),
      updatedAt: newProject.updatedAt?.toISOString(),
    };

    return NextResponse.json(serializedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
