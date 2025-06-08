// src/hooks/use-header-form.ts
import { IHeader } from "@/app/(dashboard)/components/header";
import { getHeader, updateHeader } from "@/lib/api";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_HEADER: IHeader = {
  navItems: [],
  hero: {
    title: "",
    subtitle: "",
    description: "",
    typingTexts: [],
    tags: [],
    ctaText: "",
    ctaLink: "",
    showProfileImage: true,
    profileImageUrl: "",
  },
  socialLinks: {},
  logoText: "",
};

export function useHeaderForm() {
  const [header, setHeader] = useState<IHeader>(DEFAULT_HEADER);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadHeader = async () => {
      setIsLoading(true);
      const data = await getHeader();
      if (data) {
        setHeader({
          ...DEFAULT_HEADER,
          ...data,
          hero: { ...DEFAULT_HEADER.hero, ...(data.hero || {}) },
        });
      }
      setIsLoading(false);
    };
    loadHeader();
  }, []);

  const handleFieldChange = useCallback((field: keyof IHeader, value: any) => {
    setHeader((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleHeroChange = useCallback(
    (field: keyof IHeader["hero"], value: any) => {
      setHeader((prev) => ({
        ...prev,
        hero: { ...prev.hero, [field]: value },
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateHeader(header);
      toast.success("Header updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    header,
    isLoading,
    isSaving,
    handleSubmit,
    handleFieldChange,
    handleHeroChange,
  };
}
