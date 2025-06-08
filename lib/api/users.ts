import { User } from "@/app/(dashboard)/components/user";

const API_BASE_URL = "/api";

// User API
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const updateUser = async (
  userId: string,
  data: Partial<User>
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete user");
  }
};

export const addUser = async (
  userData: Omit<User, "_id" | "createdAt"> & { password?: string }
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to add user");
};
