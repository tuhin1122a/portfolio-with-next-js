"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";

interface PasswordDisplayDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tempPassword?: string;
  userEmail?: string;
}

export default function PasswordDisplayDialog({
  isOpen,
  onOpenChange,
  tempPassword,
  userEmail,
}: PasswordDisplayDialogProps) {
  const copyPasswordToClipboard = () => {
    if (!tempPassword) return;
    navigator.clipboard.writeText(tempPassword);
    toast.success("Password copied to clipboard");
  };

  const sendPasswordByEmail = async () => {
    // This is a placeholder for the actual email sending logic
    toast.info(`An email would be sent to ${userEmail}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Created Successfully</DialogTitle>
          <DialogDescription>
            Please save the temporary password below. The user should change
            this after their first login.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Card className="bg-muted">
            <CardContent className="pt-6 flex items-center justify-between">
              <code className="font-mono text-sm">{tempPassword}</code>
              <Button
                variant="outline"
                size="icon"
                onClick={copyPasswordToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Button onClick={sendPasswordByEmail} className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Email Password to User
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
