// src/features/admin/settings/components/SocialLinksForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "./index";

interface Props {
  socialLinks: Settings["socialLinks"];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SocialLinksForm({ socialLinks, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input id="github" value={socialLinks.github} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input id="linkedin" value={socialLinks.linkedin} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input id="twitter" value={socialLinks.twitter} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <Input id="website" value={socialLinks.website} onChange={onChange} />
      </div>
    </div>
  );
}
