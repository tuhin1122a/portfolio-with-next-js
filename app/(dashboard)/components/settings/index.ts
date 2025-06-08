// src/features/admin/settings/types/index.ts

export interface Settings {
  _id?: string;
  fullName: string;
  email: string;
  bio: string;
  location: string;
  profileImage?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  appearance: {
    accentColor: string;
    defaultTheme: "dark" | "light" | "system";
    enableAnimations: boolean;
    enableParticles: boolean;
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPass: string;
    emailFrom: string;
    emailTo: string;
    enableNotifications: boolean;
  };
}

export const defaultSettings: Settings = {
  fullName: "",
  email: "",
  bio: "",
  location: "",
  profileImage: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  },
  appearance: {
    accentColor: "#7c3aed",
    defaultTheme: "dark",
    enableAnimations: true,
    enableParticles: true,
  },
  emailSettings: {
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
    emailFrom: "",
    emailTo: "",
    enableNotifications: true,
  },
};
