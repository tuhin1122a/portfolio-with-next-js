import { Conversation } from "@/app/(dashboard)/components/conversations";

const API_BASE_URL = "/api/chat/conversations";

export const fetchConversations = async (
  isArchived: boolean
): Promise<Conversation[]> => {
  const response = await fetch(`${API_BASE_URL}?archived=${isArchived}`);
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  const data = await response.json();
  return data.conversations || [];
};

export const updateConversationArchiveStatus = async (
  id: string,
  isArchived: boolean
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isArchived }),
  });

  if (!response.ok) {
    throw new Error("Failed to update conversation");
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete conversation");
  }
};
