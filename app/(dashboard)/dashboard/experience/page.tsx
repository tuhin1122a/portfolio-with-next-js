"use client";

import { useState } from "react";
import type { IExperience } from "@/lib/models/experience";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useExperiences } from "@/hooks/useExperiences";
import { ExperiencesTable } from "../../components/experiences/ExperiencesTable";
import { ExperienceFormDialog } from "../../components/experiences/ExperienceFormDialog";


export default function AdminExperiencesPage() {
  const { experiences, loading, isSubmitting, submitExperience, deleteExperience, reorderExperience } = useExperiences();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<IExperience | null>(null);

  const handleAddNew = () => {
    setEditingExperience(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (experience: IExperience) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Manage your professional experience</CardDescription>
          </div>
          <Button className="gap-1" onClick={handleAddNew}>
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ExperiencesTable
          experiences={experiences}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteExperience}
          onMove={reorderExperience}
        />
      </CardContent>

      <ExperienceFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={submitExperience}
        isSubmitting={isSubmitting}
        editingExperience={editingExperience}
      />
    </Card>
  );
}