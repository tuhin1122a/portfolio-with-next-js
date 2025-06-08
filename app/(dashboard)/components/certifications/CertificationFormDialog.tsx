// src/app/admin/certifications/components/CertificationFormDialog.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
import { Certification } from ".";

interface CertificationFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (
    data: Omit<Certification, "_id" | "order">,
    imageFile: File | null
  ) => Promise<void>;
  initialData?: Certification | null;
}

const INITIAL_FORM_STATE = {
  title: "",
  organization: "",
  issueDate: "",
  description: "",
  imagePath: "",
};

export default function CertificationFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
}: CertificationFormDialogProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title,
        organization: initialData.organization,
        issueDate: new Date(initialData.issueDate).toISOString().split("T")[0],
        description: initialData.description,
        imagePath: initialData.imagePath,
      });
      setImagePreview(initialData.imagePath);
    } else if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagePath && !imageFile) {
      toast.error("Certificate image is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData, imageFile);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Certification" : "Add New Certification"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details." : "Fill in the details to add."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Form fields from your original code */}
          <div className="grid gap-4">
            {/* Title, Organization, Issue Date, Description fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            {/* ... other fields ... */}
            <div className="space-y-2">
              <Label htmlFor="image">Certificate Image</Label>
              <Input
                id="image"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="relative mt-2 h-40 w-full border rounded-md overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
