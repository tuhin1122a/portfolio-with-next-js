// src/components/footer/section-editor.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { IFooterLink, IFooterSection } from "./types";

interface SectionEditorProps {
  section: IFooterSection;
  sectionIndex: number;
  onUpdateSection: (
    sectionIndex: number,
    updatedSection: IFooterSection
  ) => void;
  onRemoveSection: (sectionIndex: number) => void;
}

const NEW_LINK_DEFAULT: Omit<IFooterLink, "id"> = {
  label: "",
  href: "",
  isExternal: false,
};

export default function SectionEditor({
  section,
  sectionIndex,
  onUpdateSection,
  onRemoveSection,
}: SectionEditorProps) {
  const [newLink, setNewLink] = useState(NEW_LINK_DEFAULT);

  const handleAddLink = () => {
    if (!newLink.label || !newLink.href) return;
    const updatedSection = {
      ...section,
      links: [...section.links, newLink],
    };
    onUpdateSection(sectionIndex, updatedSection);
    setNewLink(NEW_LINK_DEFAULT);
  };

  const handleRemoveLink = (linkIndex: number) => {
    const updatedSection = {
      ...section,
      links: section.links.filter((_, i) => i !== linkIndex),
    };
    onUpdateSection(sectionIndex, updatedSection);
  };

  const handleToggleExternal = (linkIndex: number, checked: boolean) => {
    const updatedLinks = [...section.links];
    updatedLinks[linkIndex].isExternal = checked;
    onUpdateSection(sectionIndex, { ...section, links: updatedLinks });
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{section.title}</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemoveSection(sectionIndex)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Existing Links */}
      <div className="space-y-2">
        {section.links.map((link, linkIndex) => (
          <div
            key={linkIndex}
            className="flex items-center justify-between p-2 border rounded-md text-sm"
          >
            <span>
              {link.label} ({link.href})
            </span>
            <div className="flex items-center gap-4">
              <Label
                htmlFor={`ext-${sectionIndex}-${linkIndex}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                External{" "}
                <Switch
                  id={`ext-${sectionIndex}-${linkIndex}`}
                  checked={link.isExternal}
                  onCheckedChange={(checked) =>
                    handleToggleExternal(linkIndex, checked)
                  }
                />
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveLink(linkIndex)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Link Form */}
      <div className="mt-2 p-2 border rounded-md">
        <h4 className="text-sm font-medium mb-2">Add New Link</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <Input
            placeholder="Label"
            value={newLink.label}
            onChange={(e) =>
              setNewLink((p) => ({ ...p, label: e.target.value }))
            }
          />
          <Input
            placeholder="URL"
            value={newLink.href}
            onChange={(e) =>
              setNewLink((p) => ({ ...p, href: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Label
            htmlFor={`new-ext-${sectionIndex}`}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            External Link{" "}
            <Switch
              id={`new-ext-${sectionIndex}`}
              checked={newLink.isExternal}
              onCheckedChange={(checked) =>
                setNewLink((p) => ({ ...p, isExternal: checked }))
              }
            />
          </Label>
          <Button type="button" onClick={handleAddLink} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
