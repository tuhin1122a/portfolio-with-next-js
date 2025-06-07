"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, FileText, Mail, Users } from "lucide-react";

import AdminAbout from "@/components/admin/admin-about";
import AdminAI from "@/components/admin/admin-ai";
import AdminBlogs from "@/components/admin/admin-blogs";
import AdminCertifications from "@/components/admin/admin-certifications";
import AdminConversations from "@/components/admin/admin-conversations";
import AdminExperiences from "@/components/admin/admin-experiences";
import AdminFooter from "@/components/admin/admin-footer";
import AdminHeader from "@/components/admin/admin-header";
import AdminMessages from "@/components/admin/admin-messages";
import AdminProjects from "@/components/admin/admin-projects";
import AdminServices from "@/components/admin/admin-services";
import AdminSettings from "@/components/admin/admin-settings";
import AdminSkills from "@/components/admin/admin-skills";
import AdminUsers from "@/components/admin/admin-users";
import ProtectedRoute from "@/components/auth/protected-route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    users: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        // Fetch project count
        const projectsRes = await fetch("/api/projects");
        const projects = await projectsRes.json();

        // Fetch blog count
        const blogsRes = await fetch("/api/blogs");
        const blogs = await blogsRes.json();

        // Fetch message count
        const messagesRes = await fetch("/api/contact");
        const messages = await messagesRes.json();

        // Fetch user count
        const usersRes = await fetch("/api/users");
        const users = await usersRes.json();

        setCounts({
          projects: Array.isArray(projects) ? projects.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          users: Array.isArray(users) ? users.length : 0,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    }

    if (session?.user.isAdmin) {
      fetchCounts();
    }
  }, [session]);

  return (
    <ProtectedRoute adminOnly>
      <div className="bg-gradient-to-br from-background to-background/90 min-h-screen">
        <main className="pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Projects
                  </CardTitle>
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.projects}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Blog Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.blogs}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Messages
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.messages}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{counts.users}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="header" className="w-full h-full">
              <TabsList className="mb-8 flex flex-wrap">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="footer">Footer</TabsTrigger>
                <TabsTrigger value="ai">AI Chat</TabsTrigger>
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              <TabsContent value="header">
                <AdminHeader />
              </TabsContent>
              <TabsContent value="about">
                <AdminAbout />
              </TabsContent>
              <TabsContent value="skills">
                <AdminSkills />
              </TabsContent>
              <TabsContent value="experience">
                <AdminExperiences />
              </TabsContent>
              <TabsContent value="services">
                <AdminServices />
              </TabsContent>
              <TabsContent value="certifications">
                <AdminCertifications />
              </TabsContent>
              <TabsContent value="projects">
                <AdminProjects />
              </TabsContent>
              <TabsContent value="blogs">
                <AdminBlogs />
              </TabsContent>
              <TabsContent value="messages">
                <AdminMessages />
              </TabsContent>
              <TabsContent value="footer">
                <AdminFooter />
              </TabsContent>
              <TabsContent value="ai">
                <AdminAI />
              </TabsContent>
              <TabsContent value="conversations">
                <AdminConversations />
              </TabsContent>
              <TabsContent value="settings">
                <AdminSettings />
              </TabsContent>
              <TabsContent value="users">
                <AdminUsers />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
