// src/app/admin/certifications/components/CertificationsTable.tsx
"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ArrowDown, ArrowUp, Edit, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Certification } from ".";

interface CertificationsTableProps {
  certifications: Certification[];
  onEdit: (certification: Certification) => void;
  onDelete: (id: string) => void;
  onOrderChange: (reorderedCertifications: Certification[]) => void;
}

export default function CertificationsTable({
  certifications,
  onEdit,
  onDelete,
  onOrderChange,
}: CertificationsTableProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(certifications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onOrderChange(items);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const items = Array.from(certifications);
    const item = items[index];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= items.length) return;

    items[index] = items[swapIndex];
    items[swapIndex] = item;

    onOrderChange(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Order</TableHead>
            <TableHead className="w-1/5">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Droppable droppableId="certifications">
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {certifications.map((cert, index) => (
                <Draggable key={cert._id} draggableId={cert._id} index={index}>
                  {(provided) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveItem(index, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveItem(index, "down")}
                            disabled={index === certifications.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative h-16 w-24 rounded-md overflow-hidden border">
                          <Image
                            src={cert.imagePath || "/placeholder.svg"}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {cert.title}
                      </TableCell>
                      <TableCell>{cert.organization}</TableCell>
                      <TableCell>
                        {new Date(cert.issueDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onEdit(cert)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onDelete(cert._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
}
