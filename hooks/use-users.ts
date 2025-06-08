import { useCallback, useEffect, useState } from "react";

import { User } from "@/app/(dashboard)/components/user";
import { fetchUsers as apiFetchUsers } from "@/lib/api/users";
import { toast } from "sonner";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, fetchUsers };
}
