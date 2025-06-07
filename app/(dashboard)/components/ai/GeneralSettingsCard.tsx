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
import type { AISettings } from "../hooks/useAISettings";

interface GeneralSettingsCardProps {
  settings: AISettings;
  setSettings: (settings: AISettings) => void;
}

export function GeneralSettingsCard({
  settings,
  setSettings,
}: GeneralSettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure basic settings for your AI chat assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-enabled">Enable AI Chat</Label>
            <p className="text-sm text-muted-foreground">
              Turn the AI chat assistant on or off
            </p>
          </div>
          <Switch
            id="ai-enabled"
            checked={settings.isEnabled}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, isEnabled: checked })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Textarea
            id="welcome-message"
            value={settings.welcomeMessage}
            onChange={(e) =>
              setSettings({ ...settings, welcomeMessage: e.target.value })
            }
            placeholder="Enter the welcome message for new chats"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model-name">Model Name</Label>
          <Input
            id="model-name"
            value={settings.modelName}
            onChange={(e) =>
              setSettings({ ...settings, modelName: e.target.value })
            }
            placeholder="e.g., gemini-1.5-pro"
          />
        </div>
      </CardContent>
    </Card>
  );
}
