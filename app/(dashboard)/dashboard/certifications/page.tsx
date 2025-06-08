// src/app/admin/certifications/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useCertifications } from "./../../../../hooks/useCertifications";
import CertificationFormDialog from "./../../components/certifications/CertificationFormDialog";
import CertificationsTable from "./../../components/certifications/CertificationsTable";
import { Certification } from "./../../components/certifications/index";

export default function AdminCertificationsPage() {
  const {
    certifications,
    loading,
    addCertification,
    updateCertification,
    deleteCertification,
    updateOrder,
  } = useCertifications();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const handleOpenDialog = (cert: Certification | null = null) => {
    setEditingCert(cert);
    setDialogOpen(true);
  };

  const uploadImage = async (imageFile: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Image upload failed");
    const data = await response.json();
    return data.filePath; // Assuming Cloudinary URL is returned
  };

  const handleSubmit = async (
    formData: Omit<Certification, "_id" | "order">,
    imageFile: File | null
  ) => {
    try {
      let imagePath = editingCert?.imagePath || "";
      if (imageFile) {
        const uploadedPath = await uploadImage(imageFile);
        if (!uploadedPath)
          throw new Error("Image path not returned from upload.");
        imagePath = uploadedPath;
      }
      console.log(formData, imagePath);
      const certData = { ...formData, imagePath };

      let response;
      if (editingCert) {
        response = await fetch(`/api/certifications/${editingCert._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(certData),
        });
      } else {
        response = await fetch("/api/certifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(certData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save certification.");
      }

      const savedData = await response.json();
      if (editingCert) {
        updateCertification(savedData);
        toast.success("Certification updated successfully.");
      } else {
        addCertification(savedData);
        toast.success("Certification created successfully.");
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Certifications</h2>
        <Button onClick={() => handleOpenDialog()}>
          Add New Certification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Certifications</CardTitle>
          <CardDescription>Drag and drop to reorder.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CertificationsTable
              certifications={certifications}
              onEdit={handleOpenDialog}
              onDelete={deleteCertification}
              onOrderChange={updateOrder}
            />
          )}
        </CardContent>
      </Card>

      <CertificationFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editingCert}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
