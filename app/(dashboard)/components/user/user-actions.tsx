"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface UserActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserActions({ onEdit, onDelete }: UserActionsProps) {
  return (
    <>
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
}
