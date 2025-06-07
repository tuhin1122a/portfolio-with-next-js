"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { IExperience } from "@/lib/models/experience";

type ExperienceFormData = Omit<IExperience, '_id' | 'order'>;

export function useExperiences() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/experiences");
      if (!response.ok) throw new Error("Failed to fetch experiences");
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const submitExperience = async (experienceData: ExperienceFormData, editingId?: string) => {
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/experiences/${editingId}` : "/api/experiences";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to save experience");
      }

      toast.success(`Experience ${editingId ? 'updated' : 'created'} successfully.`);
      await fetchExperiences(); // Refresh list
      return true; // Indicate success
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
      return false; // Indicate failure
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete experience");
      }
      toast.success("Experience deleted successfully.");
      await fetchExperiences();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete experience");
    }
  };

  const reorderExperience = async (experience: IExperience, direction: 'up' | 'down') => {
    const index = experiences.findIndex(exp => exp._id === experience._id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === experiences.length - 1)) {
      return;
    }

    const otherExperience = direction === 'up' ? experiences[index - 1] : experiences[index + 1];

    try {
      // Efficiently swap orders with Promise.all
      await Promise.all([
        fetch(`/api/experiences/${experience._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: otherExperience.order }),
        }),
        fetch(`/api/experiences/${otherExperience._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: experience.order }),
        }),
      ]);
      await fetchExperiences(); // Refresh to show new order
    } catch (error) {
      toast.error("Failed to reorder experiences.");
    }
  };

  return { experiences, loading, isSubmitting, submitExperience, deleteExperience, reorderExperience };
}