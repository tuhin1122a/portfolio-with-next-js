// src/features/admin/services/hooks/useServices.ts

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  IService,
  ServiceFormData,
} from "@/app/(dashboard)/components/services";
import * as api from "@/lib/api";

export function useServices() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getServices();
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      await api.createService(data);
      toast.success("Service created successfully.");
      await fetchServices();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create service."
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const editService = async (id: string, data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      await api.updateService(id, data);
      toast.success("Service updated successfully.");
      await fetchServices();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update service."
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await api.deleteService(id);
        toast.success("Service deleted successfully.");
        await fetchServices();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete service."
        );
      }
    }
  };

  const moveService = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const service1 = services[index];
    const service2 = services[targetIndex];

    try {
      await api.swapServiceOrder(service1, service2);
      await fetchServices(); // Refresh to show the new order
    } catch (error) {
      toast.error("Failed to reorder services.");
    }
  };

  return {
    services,
    loading,
    isSubmitting,
    addService,
    editService,
    removeService,
    moveService,
  };
}
