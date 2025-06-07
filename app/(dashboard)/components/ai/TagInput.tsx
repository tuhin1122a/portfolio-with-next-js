"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder: string;
}

export function TagInput({
  label,
  items,
  setItems,
  placeholder,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (!inputValue.trim()) return;
    setItems([...items, inputValue.trim()]);
    setInputValue("");
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddItem}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
