"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

// ইন্টারফেসটি একটি টাইপ ফাইলে রাখা যেতে পারে, তবে এখানে রাখছি
export interface AISettings {
  _id: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  modelName: string;
  personalityTraits: string[];
  knowledgeAreas: string[];
  welcomeMessage: string;
  isEnabled: boolean;
}

export function useAISettings() {
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/chat/settings");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching AI settings:", error);
        toast.error("Failed to load AI settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/chat/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast.success("AI settings saved successfully");
    } catch (error) {
      console.error("Error saving AI settings:", error);
      toast.error("Failed to save AI settings");
    } finally {
      setIsSaving(false);
    }
  };

  return { settings, setSettings, isLoading, isSaving, saveSettings };
}
