// src/app/(admin)/projects/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

import { useProjects } from "@/hooks/useProjects";

import { Project } from "../../components/projects";
import { ProjectDialog } from "../../components/projects/ProjectDialog";
import { ProjectsTable } from "../../components/projects/ProjectsTable";

export default function AdminProjectsPage() {
  const {
    projects,
    loading,
    isSubmitting,
    addProject,
    editProject,
    removeProject,
  } = useProjects();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleOpenNewDialog = () => {
    setProjectToEdit(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (project: Project) => {
    setProjectToEdit(project);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (data, id) => {
    if (id) {
      await editProject(id, data);
    } else {
      await addProject(data);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </div>
            <Button className="gap-1" onClick={handleOpenNewDialog}>
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects.length > 0 ? (
            <ProjectsTable
              projects={projects}
              onEdit={handleOpenEditDialog}
              onDelete={removeProject}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>
                No projects found. Create your first project to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        projectToEdit={projectToEdit}
        onSubmit={handleDialogSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
