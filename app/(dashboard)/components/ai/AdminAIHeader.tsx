"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface AdminAIHeaderProps {
  isSaving: boolean;
  onSave: () => void;
}

export function AdminAIHeader({ isSaving, onSave }: AdminAIHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">AI Chat Settings</h2>
      <Button onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
}
