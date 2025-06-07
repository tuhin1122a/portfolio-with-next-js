// src/components/skills/SkillFormDialog.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { ISkill } from "@/lib/models/skill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SkillFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (skillData: Omit<ISkill, '_id' | 'order'>, editingSkillId?: string) => Promise<boolean>;
  isSubmitting: boolean;
  editingSkill: ISkill | null;
}

export function SkillFormDialog({ isOpen, onOpenChange, onSubmit, isSubmitting, editingSkill }: SkillFormDialogProps) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("Frontend");
  const [skillsList, setSkillsList] = useState("");

  useEffect(() => {
    if (editingSkill) {
      setTitle(editingSkill.title);
      setIcon(editingSkill.icon);
      setSkillsList(editingSkill.skills.join("\n"));
    } else {
      // Reset for new entry
      setTitle("");
      setIcon("Frontend");
      setSkillsList("");
    }
  }, [editingSkill, isOpen]); // Rerun when dialog opens or editingSkill changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsList.split("\n").filter((skill) => skill.trim() !== "");
    const success = await onSubmit({ title, icon, skills: skillsArray }, editingSkill?._id);
    if (success) {
      onOpenChange(false); // Close dialog on successful submission
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingSkill ? "Edit Skill Category" : "Add Skill Category"}</DialogTitle>
          <DialogDescription>
            {editingSkill ? "Update the details of this skill category." : "Add a new skill category to showcase your expertise."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Category Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend, Backend, etc." required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger><SelectValue placeholder="Select an icon" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Cloud">Cloud & DevOps</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Tools">Tools & Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (one per line)</Label>
            <Textarea id="skills" value={skillsList} onChange={(e) => setSkillsList(e.target.value)} placeholder="HTML&#10;CSS&#10;JavaScript&#10;React" className="min-h-[150px]" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingSkill ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}