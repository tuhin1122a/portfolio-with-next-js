// src/features/admin/settings/utils/api.ts

import {
  defaultSettings,
  Settings,
} from "@/app/(dashboard)/components/settings";
import { deepmerge } from "deepmerge-ts";

// Helper to handle API responses and errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An API error occurred");
  }
  return response.json();
}

export const getSettings = async (): Promise<Settings> => {
  const response = await fetch("/api/settings");
  const data = await handleResponse<Partial<Settings>>(response);
  // Deep merge with defaults to ensure all keys are present
  return deepmerge(defaultSettings, data) as Settings;
};

export const saveSettings = (settings: Settings): Promise<Settings> => {
  return fetch("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  }).then(handleResponse<Settings>);
};
