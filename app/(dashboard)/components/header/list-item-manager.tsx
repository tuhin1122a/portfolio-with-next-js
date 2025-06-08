// src/components/shared/list-item-manager.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface ListItemManagerProps {
  label: string;
  items: string[];
  onItemsChange: (newItems: string[]) => void;
  placeholder?: string;
}

export default function ListItemManager({
  label,
  items,
  onItemsChange,
  placeholder,
}: ListItemManagerProps) {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    onItemsChange([...items, newItem]);
    setNewItem("");
  };

  const handleRemoveItem = (indexToRemove: number) => {
    onItemsChange(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={placeholder}
            className="w-64"
          />
          <Button type="button" onClick={handleAddItem} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <span>{item}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
