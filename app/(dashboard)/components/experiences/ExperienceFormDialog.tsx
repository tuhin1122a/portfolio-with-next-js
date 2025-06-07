"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { IExperience } from "@/lib/models/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ExperienceFormData = Omit<IExperience, '_id' | 'order'>;

interface ExperienceFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: ExperienceFormData, id?: string) => Promise<boolean>;
  isSubmitting: boolean;
  editingExperience: IExperience | null;
}

export function ExperienceFormDialog({ isOpen, onOpenChange, onSubmit, isSubmitting, editingExperience }: ExperienceFormDialogProps) {
  const [formData, setFormData] = useState({ position: "", company: "", duration: "", location: "", description: "", tags: "" });

  useEffect(() => {
    if (editingExperience && isOpen) {
      setFormData({
        position: editingExperience.position,
        company: editingExperience.company,
        duration: editingExperience.duration,
        location: editingExperience.location,
        description: editingExperience.description.join("\n"),
        tags: editingExperience.tags.join(", "),
      });
    } else {
      setFormData({ position: "", company: "", duration: "", location: "", description: "", tags: "" });
    }
  }, [editingExperience, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const descriptionArray = formData.description.split("\n").filter(item => item.trim() !== "");
    const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    const submissionData: ExperienceFormData = {
        ...formData,
        description: descriptionArray,
        tags: tagsArray,
    };
    
    const success = await onSubmit(submissionData, editingExperience?._id);
    if (success) {
      onOpenChange(false); // Close dialog on success
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingExperience ? "Edit Experience" : "Add Experience"}</DialogTitle>
          <DialogDescription>Fill in the details of the work experience.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" value={formData.company} onChange={handleChange} required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 2020 - Present" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Remote, New York" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description (one point per line)</Label>
                <Textarea id="description" value={formData.description} onChange={handleChange} className="min-h-[150px]" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., React, Node.js" required />
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : editingExperience ? "Update" : "Save"}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}