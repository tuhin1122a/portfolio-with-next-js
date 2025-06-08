// src/features/admin/services/components/ServiceDialog.tsx

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import type { IService, ServiceFormData } from "./index";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceToEdit?: IService | null;
  onSubmit: (data: ServiceFormData, id?: string) => Promise<void>;
  isSubmitting: boolean;
}

const INITIAL_FORM_DATA: ServiceFormData = {
  title: "",
  description: "",
  icon: "Briefcase",
  features: "",
  price: "",
  isPopular: false,
};

export default function ServiceDialog({
  open,
  onOpenChange,
  serviceToEdit,
  onSubmit,
  isSubmitting,
}: ServiceDialogProps) {
  const [formData, setFormData] = useState<ServiceFormData>(INITIAL_FORM_DATA);
  const isEditing = !!serviceToEdit;

  useEffect(() => {
    if (open && serviceToEdit) {
      setFormData({
        title: serviceToEdit.title,
        description: serviceToEdit.description,
        icon: serviceToEdit.icon,
        features: serviceToEdit.features.join("\n"),
        price: serviceToEdit.price || "",
        isPopular: serviceToEdit.isPopular || false,
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [serviceToEdit, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, serviceToEdit?._id);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update service details."
              : "Add a new service to your offerings."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Web Development"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the service"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, icon: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Briefcase">Briefcase</SelectItem>
                <SelectItem value="Code">Code</SelectItem>
                <SelectItem value="PenTool">Design</SelectItem>
                <SelectItem value="Smartphone">Mobile</SelectItem>
                <SelectItem value="Megaphone">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={handleChange}
              className="min-h-[120px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (optional)</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., Starting at $500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPopular"
              checked={formData.isPopular}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isPopular: checked }))
              }
            />
            <Label htmlFor="isPopular">Mark as popular</Label>
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
