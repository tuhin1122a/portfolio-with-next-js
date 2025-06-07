"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { AISettings } from "../hooks/useAISettings";

interface ModelSettingsCardProps {
  settings: AISettings;
  setSettings: (settings: AISettings) => void;
}

export function ModelSettingsCard({
  settings,
  setSettings,
}: ModelSettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Settings</CardTitle>
        <CardDescription>
          Configure technical parameters for the AI model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Temperature: {settings.temperature.toFixed(1)}</Label>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[settings.temperature]}
              onValueChange={(value) =>
                setSettings({ ...settings, temperature: value[0] })
              }
            />
          </div>
          <div>
            <Label>Max Tokens: {settings.maxTokens}</Label>
            <Slider
              min={100}
              max={8192}
              step={100}
              value={[settings.maxTokens]}
              onValueChange={(value) =>
                setSettings({ ...settings, maxTokens: value[0] })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
