// src/components/header/social-links-form.tsx
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
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface SocialLinksFormProps {
  socialLinks: Record<string, string>;
  onLinksChange: (newLinks: Record<string, string>) => void;
}

export default function SocialLinksForm({
  socialLinks,
  onLinksChange,
}: SocialLinksFormProps) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddLink = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    const updatedLinks = { ...socialLinks, [newKey.toLowerCase()]: newValue };
    onLinksChange(updatedLinks);
    setNewKey("");
    setNewValue("");
  };

  const handleRemoveLink = (key: string) => {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[key];
    onLinksChange(updatedLinks);
  };

  return (
    <Card className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>
          Manage social media links in the header.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* List of existing links */}
        <div className="space-y-2">
          {Object.entries(socialLinks).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-2 p-2 border rounded-md"
            >
              <strong className="capitalize w-1/4">{key}</strong>
              <Input className="flex-1" value={value} readOnly />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveLink(key)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Form to add a new link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <Label htmlFor="socialKey">Platform</Label>
            <Input
              id="socialKey"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g., github"
            />
          </div>
          <div>
            <Label htmlFor="socialValue">URL</Label>
            <Input
              id="socialValue"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={handleAddLink} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
