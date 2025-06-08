// src/features/admin/services/components/ServicesTable.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, MoveDown, MoveUp, Trash2 } from "lucide-react";
import { IService } from "./index";

interface ServicesTableProps {
  services: IService[];
  onEdit: (service: IService) => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}

export default function ServicesTable({
  services,
  onEdit,
  onDelete,
  onMove,
}: ServicesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <TableRow key={service._id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.features.length} features</TableCell>
                <TableCell>{service.isPopular ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(service._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMove(index, "up")}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMove(index, "down")}
                      disabled={index === services.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No services found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
