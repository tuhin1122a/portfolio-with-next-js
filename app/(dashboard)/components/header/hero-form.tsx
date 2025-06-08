// src/components/header/hero-form.tsx
"use client";
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
import { Textarea } from "@/components/ui/textarea";
import type { IHeader } from "@/types";
import ImageUploader from "./image-uploader";
import ListItemManager from "./list-item-manager";

interface HeroFormProps {
  heroData: IHeader["hero"];
  onHeroChange: (field: keyof IHeader["hero"], value: any) => void;
}

export default function HeroForm({ heroData, onHeroChange }: HeroFormProps) {
  return (
    <Card className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Configure hero section content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={heroData.title}
              onChange={(e) => onHeroChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={heroData.subtitle}
              onChange={(e) => onHeroChange("subtitle", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={heroData.description}
            onChange={(e) => onHeroChange("description", e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>CTA Text</Label>
            <Input
              value={heroData.ctaText}
              onChange={(e) => onHeroChange("ctaText", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Link</Label>
            <Input
              value={heroData.ctaLink}
              onChange={(e) => onHeroChange("ctaLink", e.target.value)}
            />
          </div>
        </div>

        <ListItemManager
          label="Typing Texts"
          items={heroData.typingTexts}
          onItemsChange={(newItems) => onHeroChange("typingTexts", newItems)}
          placeholder="Add typing text..."
        />
        <ListItemManager
          label="Tags"
          items={heroData.tags}
          onItemsChange={(newItems) => onHeroChange("tags", newItems)}
          placeholder="Add tag..."
        />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch
              id="showProfileImage"
              checked={heroData.showProfileImage}
              onCheckedChange={(checked) =>
                onHeroChange("showProfileImage", checked)
              }
            />
            <Label htmlFor="showProfileImage">Show Profile Image</Label>
          </div>
          {heroData.showProfileImage && (
            <ImageUploader
              currentImageUrl={heroData.profileImageUrl}
              onUploadSuccess={(url) => onHeroChange("profileImageUrl", url)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
