"use client";

import { useState } from "react";

import { useUsers } from "@/hooks/use-users";
import { deleteUser } from "@/lib/api/users";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";

import { User } from "../../components/user";
import PasswordDisplayDialog from "../../components/user/password-display-dialog";
import UserFormDialog from "../../components/user/user-form-dialog";
import UserTable from "../../components/user/user-table";

export default function AdminUsersPage() {
  const { users, loading, fetchUsers } = useUsers();

  // State for managing dialogs and selected data
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tempPassword, setTempPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  // Handlers for opening dialogs
  const handleAddClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  // Handler for successful form submission
  const handleSuccess = (newUser?: { email: string; password?: string }) => {
    fetchUsers(); // Refresh the user list
    if (newUser?.password) {
      // If a new user was created, set state for the password dialog
      setTempPassword(newUser.password);
      setNewUserEmail(newUser.email);
      setIsPasswordOpen(true);
    }
  };

  // Handler for the final delete action
  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id);
      toast.success("User deleted successfully");
      fetchUsers();
      setIsDeleteOpen(false);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={handleAddClick}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UserTable
        users={users}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit User Dialog */}
      <UserFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={handleSuccess}
        initialData={selectedUser}
      />

      {/* New User Password Display Dialog */}
      <PasswordDisplayDialog
        isOpen={isPasswordOpen}
        onOpenChange={setIsPasswordOpen}
        tempPassword={tempPassword}
        userEmail={newUserEmail}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for {selectedUser?.email}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
