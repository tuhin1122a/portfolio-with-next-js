"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { AdminAIHeader } from "./../../components/ai/AdminAIHeader";
import { GeneralSettingsCard } from "./../../components/ai/GeneralSettingsCard";
import { ModelSettingsCard } from "./../../components/ai/ModelSettingsCard";
import { PersonalitySettingsCard } from "./../../components/ai/PersonalitySettingsCard";

export default function AdminAIPage() {
  const { settings, setSettings, isLoading, isSaving, saveSettings } =
    useAISettings();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center p-8">
        <p>Failed to load AI settings. Please try again.</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Reload
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminAIHeader isSaving={isSaving} onSave={saveSettings} />

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="model">Model Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettingsCard settings={settings} setSettings={setSettings} />
        </TabsContent>

        <TabsContent value="personality">
          <PersonalitySettingsCard
            settings={settings}
            setSettings={setSettings}
          />
        </TabsContent>

        <TabsContent value="model">
          <ModelSettingsCard settings={settings} setSettings={setSettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
