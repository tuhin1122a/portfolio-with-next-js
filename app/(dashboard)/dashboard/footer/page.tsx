// src/app/(admin)/footer/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFooterForm } from "@/hooks/use-footer-form";
import { Save } from "lucide-react";
import ContactForm from "../../components/footer/contact-form";
import GeneralSettingsForm from "../../components/footer/general-settings-form";
import SectionsForm from "../../components/footer/sections-form";
import SocialLinksForm from "../../components/footer/social-links-form";
export default function AdminFooterPage() {
  const {
    footer,
    isLoading,
    isSaving,
    handleSubmit,
    handleFieldChange,
    handleContactChange,
    setSections,
    setSocialLinks,
  } = useFooterForm();

  if (isLoading) {
    return <div>Loading footer settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettingsForm
            footerData={footer}
            onFieldChange={handleFieldChange}
          />
        </TabsContent>
        <TabsContent value="sections">
          <SectionsForm
            sections={footer.sections}
            onSectionsChange={setSections}
          />
        </TabsContent>
        <TabsContent value="contact">
          <ContactForm
            contactData={footer.contactInfo}
            onContactChange={handleContactChange}
          />
        </TabsContent>
        <TabsContent value="social">
          <SocialLinksForm
            socialLinks={footer.socialLinks}
            onSocialLinksChange={setSocialLinks}
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
