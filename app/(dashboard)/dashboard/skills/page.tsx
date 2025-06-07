// import AdminSkills from "@/components/admin/admin-skills";

// export default function SkillsPage(){
//     return<AdminSkills/>
// }

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

import { ISkill } from '@/lib/models/skill';
import { useSkills } from "@/hooks/useSkills";
import { SkillsTable } from "../../components/skills/SkillsTable";
import { SkillFormDialog } from "../../components/skills/SkillFormDialog";

export default function AdminSkillsPage() {
  const { skills, loading, isSubmitting, submitSkill, deleteSkill, reorderSkills } = useSkills();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);

  const handleAddNew = () => {
    setEditingSkill(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (skill: ISkill) => {
    setEditingSkill(skill);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skills & Expertise</CardTitle>
            <CardDescription>Manage your skills and expertise</CardDescription>
          </div>
          <Button className="gap-1" onClick={handleAddNew}>
            <Plus className="h-4 w-4" /> Add Skill Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <SkillsTable
          skills={skills}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteSkill}
          onMove={reorderSkills}
        />
      </CardContent>

      <SkillFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={submitSkill}
        isSubmitting={isSubmitting}
        editingSkill={editingSkill}
      />
    </Card>
  );
}