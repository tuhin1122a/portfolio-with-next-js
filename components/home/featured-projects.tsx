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
  const [descriptionExpanded, setDescriptionExpanded] = useState<
    Record<string, boolean>
  >({});

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
    <section id="projects" className="py-16 md:py-24 scroll-smooth">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some of my recent work"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {loading ? (
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
            projects.map((project) => {
              const visibleTags = project.tags.slice(0, 3);
              const remainingTagCount =
                project.tags.length - visibleTags.length;
              const isExpanded = descriptionExpanded[project._id] || false;

              return (
                <motion.div key={project._id} variants={item}>
                  <Card className="h-[430px] overflow-hidden border-border/50 group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow flex flex-col relative">
                    <Link
                      href={`/projects/${project._id}`}
                      className="flex-1 relative block"
                    >
                      {/* Image */}
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

                      {/* Overlay Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 w-full h-48 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4" /> Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1"
                          >
                            <Github className="w-4 h-4" /> GitHub
                          </a>
                        </Button>
                      </motion.div>
                    </Link>

                    {/* Card Content */}
                    <CardContent className="p-6 flex flex-col justify-between flex-1">
                      <div className="space-y-3">
                        <Link href={`/projects/${project._id}`}>
                          <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground">
                          {isExpanded
                            ? project.description
                            : `${project.description.slice(0, 120)}... `}
                          {project.description.length > 120 && (
                            <button
                              onClick={() =>
                                setDescriptionExpanded((prev) => ({
                                  ...prev,
                                  [project._id]: !isExpanded,
                                }))
                              }
                              className="text-primary hover:underline ml-1"
                            >
                              {isExpanded ? "Less" : "More"}
                            </button>
                          )}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {visibleTags.map((tag) => (
                            <Badge
                              key={tag}
                              className="rounded-full bg-muted text-muted-foreground border border-border hover:bg-primary/10 hover:text-foreground transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {remainingTagCount > 0 && (
                            <Badge className="rounded-full bg-muted text-muted-foreground border border-border">
                              +{remainingTagCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
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
