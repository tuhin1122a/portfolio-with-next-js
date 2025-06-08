// src/app/(admin)/services/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServices } from "@/hooks/useServices";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { IService } from "../../components/services";
import ServiceDialog from "../../components/services/ServiceDialog";
import ServicesTable from "../../components/services/ServicesTable";

export default function AdminServicesPage() {
  const {
    services,
    loading,
    isSubmitting,
    addService,
    editService,
    removeService,
    moveService,
  } = useServices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<IService | null>(null);

  const handleOpenNewDialog = () => {
    setServiceToEdit(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (service: IService) => {
    setServiceToEdit(service);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (data, id) => {
    if (id) {
      await editService(id, data);
    } else {
      await addService(data);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your services and offerings
              </CardDescription>
            </div>
            <Button className="gap-1" onClick={handleOpenNewDialog}>
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <ServicesTable
              services={services}
              onEdit={handleOpenEditDialog}
              onDelete={removeService}
              onMove={moveService}
            />
          )}
        </CardContent>
      </Card>

      <ServiceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        serviceToEdit={serviceToEdit}
        onSubmit={handleDialogSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
