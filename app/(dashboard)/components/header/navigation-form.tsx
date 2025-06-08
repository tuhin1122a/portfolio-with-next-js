// src/components/header/navigation-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import type { INavItem } from "./index";

interface NavigationFormProps {
  navItems: INavItem[];
  onItemsChange: (newItems: INavItem[]) => void;
}

const DEFAULT_NAV_ITEM: INavItem = { label: "", href: "", isExternal: false };

export default function NavigationForm({
  navItems,
  onItemsChange,
}: NavigationFormProps) {
  const [newItem, setNewItem] = useState<INavItem>(DEFAULT_NAV_ITEM);

  const handleAddItem = () => {
    if (!newItem.label || !newItem.href) return;
    onItemsChange([...navItems, newItem]);
    setNewItem(DEFAULT_NAV_ITEM);
  };

  const handleRemoveItem = (index: number) => {
    onItemsChange(navItems.filter((_, i) => i !== index));
  };

  const handleToggleExternal = (index: number, checked: boolean) => {
    const updatedItems = [...navItems];
    updatedItems[index].isExternal = checked;
    onItemsChange(updatedItems);
  };

  return (
    <Card className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <CardHeader>
        <CardTitle>Navigation Items</CardTitle>
        <CardDescription>Manage navigation menu items.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* List of existing items */}
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 border rounded-md"
            >
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.href}</p>
              </div>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor={`ext-${index}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  External
                </Label>
                <Switch
                  id={`ext-${index}`}
                  checked={item.isExternal}
                  onCheckedChange={(checked) =>
                    handleToggleExternal(index, checked)
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Form to add a new item */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <Label htmlFor="navLabel">Label</Label>
            <Input
              id="navLabel"
              value={newItem.label}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, label: e.target.value }))
              }
              placeholder="About"
            />
          </div>
          <div>
            <Label htmlFor="navHref">Link</Label>
            <Input
              id="navHref"
              value={newItem.href}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, href: e.target.value }))
              }
              placeholder="/#about"
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="navExternal">External</Label>
              <Switch
                id="navExternal"
                checked={newItem.isExternal}
                onCheckedChange={(checked) =>
                  setNewItem((p) => ({ ...p, isExternal: checked }))
                }
              />
            </div>
            <Button type="button" onClick={handleAddItem} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
