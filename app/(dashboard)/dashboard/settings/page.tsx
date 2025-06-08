// src/app/(admin)/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/hooks/useSettings";
import { Loader2 } from "lucide-react";
import { AppearanceSettingsForm } from "../../components/settings/AppearanceSettingsForm";
import { EmailSettingsForm } from "../../components/settings/EmailSettingsForm";
import { GeneralSettingsForm } from "../../components/settings/GeneralSettingsForm";
import { SocialLinksForm } from "../../components/settings/SocialLinksForm";

// A generic form wrapper for each tab
function SettingsCard({ title, description, children, onSave, isSaving }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-6">
          {children}
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminSettingsPage() {
  const { settings, loading, saving, updateSetting, handleSave } =
    useSettings();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateSetting(e.target.id as keyof typeof settings, e.target.value);
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting("socialLinks", {
      ...settings.socialLinks,
      [e.target.id]: e.target.value,
    });
  };

  const handleAppearanceChange = (field, value) => {
    updateSetting("appearance", {
      ...settings.appearance,
      [field]: value,
    });
  };

  const handleEmailChange = (field, value) => {
    updateSetting("emailSettings", {
      ...settings.emailSettings,
      [field]: value,
    });
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <SettingsCard
          title="General Settings"
          description="Manage your profile and personal information."
          onSave={handleSave}
          isSaving={saving}
        >
          <GeneralSettingsForm
            settings={settings}
            onChange={handleGeneralChange}
          />
        </SettingsCard>
      </TabsContent>

      <TabsContent value="social">
        <SettingsCard
          title="Social Media"
          description="Manage your social media profiles."
          onSave={handleSave}
          isSaving={saving}
        >
          <SocialLinksForm
            socialLinks={settings.socialLinks}
            onChange={handleSocialChange}
          />
        </SettingsCard>
      </TabsContent>

      <TabsContent value="appearance">
        <SettingsCard
          title="Appearance"
          description="Customize how your portfolio looks."
          onSave={handleSave}
          isSaving={saving}
        >
          <AppearanceSettingsForm
            appearance={settings.appearance}
            onFieldChange={handleAppearanceChange}
          />
        </SettingsCard>
      </TabsContent>

      <TabsContent value="email">
        <SettingsCard
          title="Email Settings"
          description="Configure your contact form."
          onSave={handleSave}
          isSaving={saving}
        >
          <EmailSettingsForm
            emailSettings={settings.emailSettings}
            onFieldChange={handleEmailChange}
          />
        </SettingsCard>
      </TabsContent>
    </Tabs>
  );
}
