// src/components/footer/contact-form.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IFooter } from "./types";

interface ContactFormProps {
  contactData: IFooter["contactInfo"];
  onContactChange: (field: keyof IFooter["contactInfo"], value: string) => void;
}

export default function ContactForm({
  contactData,
  onContactChange,
}: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Manage contact details displayed in the footer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={contactData.email}
            onChange={(e) => onContactChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={contactData.phone}
            onChange={(e) => onContactChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={contactData.address}
            onChange={(e) => onContactChange("address", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
