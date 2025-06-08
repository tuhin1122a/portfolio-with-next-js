// src/app/(admin)/header/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHeaderForm } from "@/hooks/use-header-form";
import { Save } from "lucide-react";
import { GeneralForm } from "../../components/header/general-form";
import HeroForm from "../../components/header/hero-form";
import NavigationForm from "../../components/header/navigation-form";
import SocialLinksForm from "../../components/header/social-links-form";

export default function AdminHeaderPage() {
  const {
    header,
    isLoading,
    isSaving,
    handleSubmit,
    handleFieldChange,
    handleHeroChange,
  } = useHeaderForm();

  if (isLoading) {
    return <div>Loading header settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralForm
            logoText={header.logoText}
            onFieldChange={handleFieldChange}
          />
        </TabsContent>
        <TabsContent value="navigation">
          <NavigationForm
            navItems={header.navItems}
            onItemsChange={(items) => handleFieldChange("navItems", items)}
          />
        </TabsContent>
        <TabsContent value="hero">
          <HeroForm heroData={header.hero} onHeroChange={handleHeroChange} />
        </TabsContent>
        <TabsContent value="social">
          <SocialLinksForm
            socialLinks={header.socialLinks}
            onLinksChange={(links) => handleFieldChange("socialLinks", links)}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
