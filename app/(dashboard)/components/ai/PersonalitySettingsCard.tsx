"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { TagInput } from "./TagInput";
import { AISettings } from "@/hooks/useAISettings";

interface PersonalitySettingsCardProps {
  settings: AISettings;
  setSettings: (settings: AISettings) => void;
}

export function PersonalitySettingsCard({
  settings,
  setSettings,
}: PersonalitySettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personality Settings</CardTitle>
        <CardDescription>
          Configure how your AI assistant behaves and responds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="system-prompt">System Prompt</Label>
          <Textarea
            id="system-prompt"
            value={settings.systemPrompt}
            onChange={(e) =>
              setSettings({ ...settings, systemPrompt: e.target.value })
            }
            placeholder="Enter the system prompt for the AI"
            rows={5}
          />
        </div>
        <TagInput
          label="Personality Traits"
          items={settings.personalityTraits}
          setItems={(newTraits) =>
            setSettings({ ...settings, personalityTraits: newTraits })
          }
          placeholder="Add a personality trait"
        />
        <TagInput
          label="Knowledge Areas"
          items={settings.knowledgeAreas}
          setItems={(newAreas) =>
            setSettings({ ...settings, knowledgeAreas: newAreas })
          }
          placeholder="Add a knowledge area"
        />
      </CardContent>
    </Card>
  );
}
