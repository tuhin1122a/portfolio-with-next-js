// src/features/admin/settings/components/EmailSettingsForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "./index";

interface Props {
  emailSettings: Settings["emailSettings"];
  onFieldChange: (field: keyof Settings["emailSettings"], value: any) => void;
}

export function EmailSettingsForm({ emailSettings, onFieldChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="smtpHost">SMTP Host</Label>
          <Input
            id="smtpHost"
            value={emailSettings.smtpHost}
            onChange={(e) => onFieldChange("smtpHost", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtpPort">SMTP Port</Label>
          <Input
            id="smtpPort"
            value={emailSettings.smtpPort}
            onChange={(e) => onFieldChange("smtpPort", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtpUser">SMTP Username</Label>
          <Input
            id="smtpUser"
            value={emailSettings.smtpUser}
            onChange={(e) => onFieldChange("smtpUser", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtpPass">SMTP Password</Label>
          <Input
            id="smtpPass"
            type="password"
            value={emailSettings.smtpPass}
            onChange={(e) => onFieldChange("smtpPass", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailFrom">From Email</Label>
          <Input
            id="emailFrom"
            value={emailSettings.emailFrom}
            onChange={(e) => onFieldChange("emailFrom", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailTo">To Email</Label>
          <Input
            id="emailTo"
            value={emailSettings.emailTo}
            onChange={(e) => onFieldChange("emailTo", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <Label>Email Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails from your contact form.
          </p>
        </div>
        <Switch
          checked={emailSettings.enableNotifications}
          onCheckedChange={(checked) =>
            onFieldChange("enableNotifications", checked)
          }
        />
      </div>
      <div className="pt-2">
        <Button type="button" variant="outline">
          Test Connection
        </Button>
      </div>
    </div>
  );
}
