// src/features/admin/settings/hooks/useSettings.ts

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  defaultSettings,
  Settings,
} from "@/app/(dashboard)/components/settings";
import * as api from "@/lib/api/setting";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      setSettings(data);
    } catch (error) {
      toast.error("Failed to load settings. Using default values.");
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.saveSettings(settings);
      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return { settings, loading, saving, updateSetting, handleSave };
}
