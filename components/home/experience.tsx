"use client";

import { Badge } from "@/components/ui/badge";
import type { IExperience } from "@/lib/models/experience";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "../ui/section-heading";

export default function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch("/api/experiences");
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  // Render loading skeleton if loading
  if (loading) {
    return (
      <section id="experience" className="py-16 md:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Work Experience"
            subtitle="My professional journey and roles"
            align="left"
          />

          <div className="mt-12 space-y-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative grid md:grid-cols-[1fr_3fr] gap-6 group animate-pulse"
              >
                <div className="space-y-2">
                  <div className="h-6 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-4 bg-muted/50 rounded w-1/2"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 bg-muted/50 rounded-full w-24"></div>
                    <div className="h-6 bg-muted/50 rounded-full w-20"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="h-4 bg-muted/50 rounded w-full"
                      ></div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div
                        key={j}
                        className="h-6 bg-muted/50 rounded-full w-16"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and roles"
          align="center"
        />

        <div className="mt-16">
          {experiences.length > 0 ? (
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-4 top-20 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute right-0 bottom-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-1 gap-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id.toString()}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group"
                  >
                    <div className="bg-card/50 border border-border shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:border-primary/30 backdrop-blur-sm hover:shadow-glow">
                      {/* Top colorful border indicator */}
                      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30"></div>

                      <div className="p-6 md:p-8">
                        <div className="grid md:grid-cols-[1fr_2.5fr] gap-8">
                          {/* Left column: Basic information */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                                {index + 1}
                              </div>
                              <div className="text-sm font-medium text-primary/90 px-3 py-1 rounded-full bg-primary/10">
                                {exp.duration}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {exp.position}
                              </h3>
                              <p className="text-lg font-medium mt-1 text-foreground/80">
                                {exp.company}
                              </p>
                              <Badge variant="outline" className="mt-2">
                                {exp.location}
                              </Badge>
                            </div>

                            {/* <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 rounded-lg border-primary/30 text-primary hover:bg-primary/10 group/btn w-full justify-between"
                            >
                              <span>View Details</span>
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </Button> */}
                          </div>

                          {/* Right column: Description and tags */}
                          <div className="space-y-6">
                            <div className="rounded-lg border text-card-foreground shadow-sm overflow-hidden border-border/50 group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm p-5">
                              <ul className="space-y-3">
                                {exp.description.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 group/item"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="text-primary text-sm">
                                        0{i + 1}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                                      {item}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                                Technologies & Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No experience entries found. Add some from the admin dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
