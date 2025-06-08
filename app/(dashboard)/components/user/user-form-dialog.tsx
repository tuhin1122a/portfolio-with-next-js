"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser, updateUser } from "@/lib/api/users";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { User } from "./index";

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: (user?: User) => void;
  initialData?: User | null;
}

const generateRandomPassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default function UserFormDialog({
  isOpen,
  onOpenChange,
  onSuccess,
  initialData,
}: UserFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        isAdmin: initialData.isAdmin,
      });
    } else {
      setFormData({ name: "", email: "", isAdmin: false });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAdmin: checked }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && initialData) {
        await updateUser(initialData._id, formData);
        toast.success("User updated successfully");
      } else {
        const password = generateRandomPassword();
        await addUser({ ...formData, password });
        toast.success("User created successfully");
        // We'll need to pass the new user data and password back up
        // This part needs adjustment in the main page component to open the password dialog
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
          {!isEditMode && (
            <DialogDescription>
              A secure random password will be generated for the new user.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={formData.isAdmin}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isAdmin">Admin privileges</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
