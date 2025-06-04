"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import SectionHeading from "../ui/section-heading";
import type { IAbout } from "@/lib/models/about";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AboutProps {
  about?: Partial<IAbout>;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Learn a little more about my background and experience"
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Bio Card */}
            <Card className="shadow-md overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  {about?.bio ||
                    "Hello! I'm Masudur Rahman, a passionate full-stack web developer specializing in creating beautiful, functional, and user-friendly web applications. With over 5 years of experience in the field, I've worked on a diverse range of projects, from small business websites to complex enterprise applications."}
                </p>
                <p className="text-muted-foreground mt-4">
                  {about?.bioExtended ||
                    "My journey in web development began during my university days, where I discovered my passion for coding. Since then, I've been constantly learning and expanding my skillset to stay on top of the latest industry trends and technologies."}
                </p>
                <p className="text-muted-foreground mt-4">
                  {about?.bioConclusion ||
                    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and tutorials."}
                </p>
              </CardContent>
            </Card>

            {/* Education Card */}
            {about?.education && about.education.length > 0 && (
              <Card className="shadow-md overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {about.education.map((edu, index) => (
                    <div key={index} className={index > 0 ? "mt-4" : ""}>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} | {edu.year}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Personal Info Card */}
            <Card className="shadow-md overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Personal Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">Name:</h3>
                    <p className="text-muted-foreground">
                      {about?.fullName || "Masudur Rahman"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Email:</h3>
                    <p className="text-muted-foreground">
                      {about?.email || "contact@masudurrahman.com"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Location:</h3>
                    <p className="text-muted-foreground">
                      {about?.location || "Dhaka, Bangladesh"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Availability:</h3>
                    <p className="text-muted-foreground">
                      {about?.availability || "Full-time"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages Card */}
            {about?.languages && about.languages.length > 0 && (
              <Card className="shadow-md overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {about.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interests Card */}
            {about?.interests && about.interests.length > 0 && (
              <Card className="shadow-md overflow-hidden border-border/50 hover:border-primary/50 group transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {about.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Resume Download Button */}
            <div className="pt-2 w-full flex items-center justify-center">
              <Button asChild className="group ">
                <Link href={about?.resumeUrl || "/resume.pdf"} target="_blank">
                  <FileText className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download Resume
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
