"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IProject } from "@/lib/models/project";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeading from "../ui/section-heading";

type SerializedProject = Omit<IProject, "_id"> & {
  _id: string;
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<SerializedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects?featured=true");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some of my recent work"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={`skeleton-${index}`} variants={item}>
                <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="relative h-48 bg-muted animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-muted animate-pulse rounded"></div>
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-5 w-16 bg-muted animate-pulse rounded-full"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <motion.div key={project._id} variants={item}>
                <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
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
                    <div className="space-y-3">
                      <Link href={`/projects/${project._id}`}>
                        <h3 className="text-xl font-bold hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="rounded-full bg-muted text-muted-foreground border border-border hover:bg-primary/10 hover:text-foreground transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <Button size="sm" variant="ghost">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="mr-1 h-4 w-4 inline" />{" "}
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="mr-1 h-4 w-4 inline" /> GitHub
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No projects found. Add some projects from the admin dashboard.
              </p>
            </div>
          )}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
