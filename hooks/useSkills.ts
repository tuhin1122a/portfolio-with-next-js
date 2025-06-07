// src/hooks/useSkills.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { ISkill } from "@/lib/models/skill";

export function useSkills() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/skills");
      if (!response.ok) throw new Error("Failed to fetch skills");
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const submitSkill = async (skillData: Omit<ISkill, '_id' | 'order'>, editingSkillId?: string) => {
    setIsSubmitting(true);
    try {
      const url = editingSkillId ? `/api/skills/${editingSkillId}` : "/api/skills";
      const method = editingSkillId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(editingSkillId ? "Skill updated successfully." : "Skill created successfully.");
      await fetchSkills(); // Refresh the list
      return true; // Indicate success
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
      return false; // Indicate failure
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete skill");
      }
      toast.success("Skill deleted successfully.");
      await fetchSkills(); // Refresh the list
    } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete skill");
    }
  };

  const reorderSkills = async (skill: ISkill, direction: 'up' | 'down') => {
      const index = skills.findIndex(s => s._id === skill._id);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === skills.length - 1)) {
          return;
      }

      const otherSkill = direction === 'up' ? skills[index - 1] : skills[index + 1];

      try {
          // Perform both updates
          await Promise.all([
              fetch(`/api/skills/${skill._id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ order: otherSkill.order }),
              }),
              fetch(`/api/skills/${otherSkill._id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ order: skill.order }),
              }),
          ]);
          await fetchSkills(); // Refresh to show new order
      } catch (error) {
          toast.error("Failed to reorder skills.");
      }
  };


  return { skills, loading, isSubmitting, fetchSkills, submitSkill, deleteSkill, reorderSkills };
}