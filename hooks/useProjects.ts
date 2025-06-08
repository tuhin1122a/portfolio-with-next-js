// src/features/admin/projects/hooks/useProjects.ts

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Project,
  ProjectFormData,
} from "@/app/(dashboard)/components/projects";
import * as api from "@/lib/api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (projectData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await api.createProject(projectData);
      toast.success("Project created successfully.");
      await fetchProjects(); // Refresh data
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project.");
      throw error; // Re-throw to handle in component if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const editProject = async (id: string, projectData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await api.updateProject(id, projectData);
      toast.success("Project updated successfully.");
      await fetchProjects(); // Refresh data
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
      throw error; // Re-throw to handle in component
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await api.deleteProject(id);
        toast.success("Project deleted successfully.");
        await fetchProjects(); // Refresh data
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project.");
      }
    }
  };

  return {
    projects,
    loading,
    isSubmitting,
    addProject,
    editProject,
    removeProject,
  };
}
