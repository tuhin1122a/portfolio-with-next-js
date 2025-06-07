// src/components/skills/SkillsTable.tsx
"use client";

import type { ISkill } from "@/lib/models/skill";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MoveUp, MoveDown } from "lucide-react";
import { DeleteSkillAlert } from "./DeleteSkillAlert";

interface SkillsTableProps {
  skills: ISkill[];
  onEdit: (skill: ISkill) => void;
  onDelete: (id: string) => void;
  onMove: (skill: ISkill, direction: 'up' | 'down') => void;
  loading: boolean;
}

export function SkillsTable({ skills, onEdit, onDelete, onMove, loading }: SkillsTableProps) {
  if (loading) {
    return <div className="text-center py-4">Loading skills...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <TableRow key={skill._id}>
                <TableCell className="font-medium">{skill.title}</TableCell>
                <TableCell>{skill.icon}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {skill.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-full bg-primary/10">{s}</span>
                    ))}
                    {skill.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        +{skill.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(skill)}>
                      <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                    </Button>
                    <DeleteSkillAlert onDeleteConfirm={() => onDelete(skill._id)} />
                    <Button variant="ghost" size="icon" onClick={() => onMove(skill, 'up')} disabled={index === 0}>
                      <MoveUp className="h-4 w-4" /> <span className="sr-only">Move Up</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onMove(skill, 'down')} disabled={index === skills.length - 1}>
                      <MoveDown className="h-4 w-4" /> <span className="sr-only">Move Down</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No skills found. Add some skills to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}