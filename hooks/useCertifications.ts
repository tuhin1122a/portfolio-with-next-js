// src/app/admin/certifications/hooks/useCertifications.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Certification } from "../types";

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/certifications");
      if (!response.ok) throw new Error("Failed to fetch certifications");
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      toast.error("Failed to fetch certifications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const addCertification = async (newCert: Certification) => {
    setCertifications((prev) => [...prev, newCert]);
  };

  const updateCertification = async (updatedCert: Certification) => {
    setCertifications((prev) =>
      prev.map((cert) => (cert._id === updatedCert._id ? updatedCert : cert))
    );
  };

  const deleteCertification = async (id: string) => {
    const originalCerts = [...certifications];
    setCertifications((prev) => prev.filter((cert) => cert._id !== id)); // Optimistic update

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete on server");
      }
      toast.success("Certification deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete certification. Restoring...");
      setCertifications(originalCerts); // Rollback on error
    }
  };

  const updateOrder = async (orderedCerts: Certification[]) => {
    const originalOrder = [...certifications];
    setCertifications(orderedCerts); // Optimistic update

    try {
      const orderedIds = orderedCerts.map((cert) => cert._id);
      const response = await fetch("/api/certifications/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
      if (!response.ok) {
        throw new Error("Failed to update order on server.");
      }
      // No toast needed for order updates to keep UI clean
    } catch (error) {
      toast.error("Failed to update order. Restoring original order.");
      setCertifications(originalOrder); // Rollback
    }
  };

  return {
    certifications,
    loading,
    addCertification,
    updateCertification,
    deleteCertification,
    updateOrder,
  };
}
