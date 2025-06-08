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
import { Textarea } from "@/components/ui/textarea";
import { IFooter } from "./index";

interface GeneralSettingsFormProps {
  footerData: IFooter;
  onFieldChange: (field: keyof IFooter, value: string) => void;
}

export default function GeneralSettingsForm({
  footerData,
  onFieldChange,
}: GeneralSettingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Configure general footer settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={footerData.companyName}
            onChange={(e) => onFieldChange("companyName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            value={footerData.companyDescription}
            onChange={(e) =>
              onFieldChange("companyDescription", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="copyrightText">Copyright Text</Label>
          <Input
            id="copyrightText"
            value={footerData.copyrightText}
            onChange={(e) => onFieldChange("copyrightText", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Use {"{year}"} to automatically insert the current year.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
