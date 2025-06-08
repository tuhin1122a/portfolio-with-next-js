// src/types/index.ts (add these)

export interface INavItem {
  label: string;
  href: string;
  isExternal: boolean;
}

export interface IHeader {
  _id?: string;
  navItems: INavItem[];
  hero: {
    title: string;
    subtitle: string;
    description: string;
    typingTexts: string[];
    tags: string[];
    ctaText: string;
    ctaLink: string;
    showProfileImage: boolean;
    profileImageUrl: string;
  };
  socialLinks: Record<string, string>;
  logoText: string;
}
