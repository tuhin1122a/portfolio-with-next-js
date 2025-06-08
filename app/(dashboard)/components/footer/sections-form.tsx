// src/components/footer/sections-form.tsx
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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import SectionEditor from "./section-editor";
import type { IFooterSection } from "./types";

interface SectionsFormProps {
  sections: IFooterSection[];
  onSectionsChange: (sections: IFooterSection[]) => void;
}

export default function SectionsForm({
  sections,
  onSectionsChange,
}: SectionsFormProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    onSectionsChange([...sections, { title: newSectionTitle, links: [] }]);
    setNewSectionTitle("");
  };

  const handleRemoveSection = (sectionIndex: number) => {
    onSectionsChange(sections.filter((_, i) => i !== sectionIndex));
  };

  const handleUpdateSection = (
    sectionIndex: number,
    updatedSection: IFooterSection
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex] = updatedSection;
    onSectionsChange(newSections);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Sections</CardTitle>
        <CardDescription>
          Manage footer sections and their links.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <SectionEditor
            key={index}
            section={section}
            sectionIndex={index}
            onUpdateSection={handleUpdateSection}
            onRemoveSection={handleRemoveSection}
          />
        ))}
        {/* Add New Section Form */}
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Add New Section</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Section Title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />
            <Button type="button" onClick={handleAddSection}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Section
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
