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
import { IHeader } from "./index";

interface GeneralFormProps {
  logoText: string;
  onFieldChange: (field: keyof IHeader, value: any) => void;
}

export function GeneralForm({ logoText, onFieldChange }: GeneralFormProps) {
  return (
    <Card className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure general header settings like the logo text.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logoText">Logo Text</Label>
          <Input
            id="logoText"
            value={logoText}
            onChange={(e) => onFieldChange("logoText", e.target.value)}
            placeholder="Enter logo text"
          />
        </div>
      </CardContent>
    </Card>
  );
}
