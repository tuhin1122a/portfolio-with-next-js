// src/features/admin/settings/components/GeneralSettingsForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "./index";

type GeneralSettings = Pick<
  Settings,
  "fullName" | "email" | "bio" | "location" | "profileImage"
>;

interface Props {
  settings: GeneralSettings;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function GeneralSettingsForm({ settings, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" value={settings.fullName} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={settings.email}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          className="min-h-[100px]"
          value={settings.bio}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={settings.location} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Picture URL</Label>
        <Input
          id="profileImage"
          value={settings.profileImage}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
