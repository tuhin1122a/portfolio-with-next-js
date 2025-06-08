// src/features/admin/settings/components/AppearanceSettingsForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "./index";

interface Props {
  appearance: Settings["appearance"];
  onFieldChange: (field: keyof Settings["appearance"], value: any) => void;
}

export function AppearanceSettingsForm({ appearance, onFieldChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="accentColor">Accent Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="accentColor"
            type="color"
            className="w-24 h-10 p-1"
            value={appearance.accentColor}
            onChange={(e) => onFieldChange("accentColor", e.target.value)}
          />
          <span className="text-sm text-muted-foreground">
            {appearance.accentColor}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>Default Theme</Label>
          <p className="text-sm text-muted-foreground">
            Set the default theme for your portfolio.
          </p>
        </div>
        <Select
          value={appearance.defaultTheme}
          onValueChange={(value: Settings["appearance"]["defaultTheme"]) =>
            onFieldChange("defaultTheme", value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>Enable Animations</Label>
          <p className="text-sm text-muted-foreground">
            Enable animations and transitions.
          </p>
        </div>
        <Switch
          checked={appearance.enableAnimations}
          onCheckedChange={(checked) =>
            onFieldChange("enableAnimations", checked)
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label>Enable Particle Effects</Label>
          <p className="text-sm text-muted-foreground">
            Enable background particle effects.
          </p>
        </div>
        <Switch
          checked={appearance.enableParticles}
          onCheckedChange={(checked) =>
            onFieldChange("enableParticles", checked)
          }
        />
      </div>
    </div>
  );
}
