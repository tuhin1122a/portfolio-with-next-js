// src/hooks/use-footer-form.ts
import { IFooter, IFooterSection } from "@/app/(dashboard)/components/footer";
import { getFooter, updateFooter } from "@/lib/api";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_FOOTER: IFooter = {
  companyName: "",
  companyDescription: "",
  sections: [],
  contactInfo: { email: "", phone: "", address: "" },
  copyrightText: "© {year} Company Name. All rights reserved.",
  socialLinks: {},
};

export function useFooterForm() {
  const [footer, setFooter] = useState<IFooter>(DEFAULT_FOOTER);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadFooter = async () => {
      setIsLoading(true);
      const data = await getFooter();
      if (data) {
        // Ensure nested objects are initialized to prevent runtime errors
        setFooter({
          ...DEFAULT_FOOTER,
          ...data,
          contactInfo: data.contactInfo || DEFAULT_FOOTER.contactInfo,
          socialLinks: data.socialLinks || DEFAULT_FOOTER.socialLinks,
          sections: data.sections || DEFAULT_FOOTER.sections,
        });
      }
      setIsLoading(false);
    };
    loadFooter();
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof IFooter, value: string) => {
      setFooter((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleContactChange = useCallback(
    (field: keyof IFooter["contactInfo"], value: string) => {
      setFooter((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value },
      }));
    },
    []
  );

  const setSections = useCallback((sections: IFooterSection[]) => {
    setFooter((prev) => ({ ...prev, sections }));
  }, []);

  const setSocialLinks = useCallback((socialLinks: Record<string, string>) => {
    setFooter((prev) => ({ ...prev, socialLinks }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateFooter(footer);
      toast.success("Footer updated successfully!");
    } catch (error) {
      console.error("Error updating footer:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    footer,
    isLoading,
    isSaving,
    handleSubmit,
    handleFieldChange,
    handleContactChange,
    setSections,
    setSocialLinks,
  };
}
