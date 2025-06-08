// src/features/admin/projects/components/ProjectDialog.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import FileUpload from "./FileUpload";
import { Project, ProjectFormData } from "./index";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectToEdit?: Project | null;
  onSubmit: (data: ProjectFormData, id?: string) => Promise<void>;
  isSubmitting: boolean;
}

const INITIAL_FORM_DATA: ProjectFormData = {
  title: "",
  description: "",
  longDescription: "",
  tags: "",
  demoUrl: "",
  githubUrl: "",
  features: "",
  featured: false,
  image: "",
  screenshots: [],
};

export function ProjectDialog({
  open,
  onOpenChange,
  projectToEdit,
  onSubmit,
  isSubmitting,
}: ProjectDialogProps) {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_DATA);
  const isEditing = !!projectToEdit;

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        description: projectToEdit.description,
        longDescription: projectToEdit.longDescription || "",
        tags: projectToEdit.tags.join(", "),
        demoUrl: projectToEdit.demoUrl || "",
        githubUrl: projectToEdit.githubUrl || "",
        features: projectToEdit.features
          ? projectToEdit.features.join("\n")
          : "",
        featured: projectToEdit.featured,
        image: projectToEdit.image,
        screenshots: projectToEdit.screenshots || [],
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [projectToEdit, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleScreenshotUpload = (url: string) => {
    if (formData.screenshots.length < 6) {
      setFormData((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, url],
      }));
    }
  };

  const removeScreenshot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, projectToEdit?._id);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of your existing project."
              : "Fill in the details for your new project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              {/* Basic Info Fields: Title, Description, Tags, Featured */}
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your project"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="Next.js, React, TypeScript"
                  value={formData.tags}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, featured: checked }))
                  }
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              {/* Details Fields: Long Description, Features, URLs */}
              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description</Label>
                <Textarea
                  id="longDescription"
                  className="min-h-[150px]"
                  placeholder="In-depth description of your project"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Key Features (one per line)</Label>
                <Textarea
                  id="features"
                  className="min-h-[100px]"
                  placeholder={"Real-time conversations\nVoice commands"}
                  value={formData.features}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    placeholder="https://example.com"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/user/repo"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="media" className="space-y-6">
              {/* Media Fields: Main Image and Screenshots */}
              <div className="space-y-2">
                <Label>Main Project Image</Label>
                <FileUpload
                  value={formData.image}
                  onChange={(url) =>
                    setFormData((prev) => ({ ...prev, image: url }))
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>Project Screenshots (up to 6)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative border rounded-md overflow-hidden h-32"
                    >
                      <Image
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeScreenshot(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {formData.screenshots.length < 6 && (
                    <div className="border border-dashed rounded-md flex items-center justify-center h-32 bg-muted/50">
                      <FileUpload
                        value=""
                        onChange={handleScreenshotUpload}
                        buttonText="Add Screenshot"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEditing ? "Update Project" : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
