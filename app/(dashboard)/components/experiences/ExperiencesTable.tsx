"use client";

import type { IExperience } from "@/lib/models/experience";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MoveUp, MoveDown } from "lucide-react";
import { DeleteConfirmationAlert } from "./DeleteConfirmationAlert";

interface ExperiencesTableProps {
  experiences: IExperience[];
  onEdit: (experience: IExperience) => void;
  onDelete: (id: string) => void;
  onMove: (experience: IExperience, direction: 'up' | 'down') => void;
  loading: boolean;
}

export function ExperiencesTable({ experiences, onEdit, onDelete, onMove, loading }: ExperiencesTableProps) {
  if (loading) {
    return <div className="text-center py-4">Loading experiences...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <TableRow key={exp._id}>
                <TableCell className="font-medium">{exp.position}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>{exp.duration}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    {exp.tags.length > 3 && <Badge variant="outline">+{exp.tags.length - 3}</Badge>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(exp)}><Edit className="h-4 w-4" /></Button>
                    <DeleteConfirmationAlert onConfirm={() => onDelete(exp._id)} />
                    <Button variant="ghost" size="icon" onClick={() => onMove(exp, 'up')} disabled={index === 0}><MoveUp className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => onMove(exp, 'down')} disabled={index === experiences.length - 1}><MoveDown className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">No experiences found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}