import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "./index";
import UserActions from "./user-actions";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {/* ... (Image and placeholder SVG logic remains the same) */}
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-muted px-2 py-1 rounded-full text-xs font-medium">
                      User
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <UserActions
                    onEdit={() => onEdit(user)}
                    onDelete={() => onDelete(user)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
