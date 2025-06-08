// src/hooks/use-conversations.ts

import {
  deleteConversation as apiDeleteConversation,
  fetchConversations,
  updateConversationArchiveStatus,
} from "@/lib/api";
import { Conversation } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useConversations() {
  const [activeConversations, setActiveConversations] = useState<
    Conversation[]
  >([]);
  const [archivedConversations, setArchivedConversations] = useState<
    Conversation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      const [activeData, archivedData] = await Promise.all([
        fetchConversations(false),
        fetchConversations(true),
      ]);
      setActiveConversations(activeData);
      setArchivedConversations(archivedData);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleArchiveToggle = useCallback(
    async (conversation: Conversation) => {
      try {
        const newArchiveStatus = !conversation.isArchived;
        await updateConversationArchiveStatus(
          conversation._id,
          newArchiveStatus
        );

        // Optimistically update UI and then reload for consistency
        if (newArchiveStatus) {
          setActiveConversations((prev) =>
            prev.filter((c) => c._id !== conversation._id)
          );
          setArchivedConversations((prev) => [
            { ...conversation, isArchived: true },
            ...prev,
          ]);
        } else {
          setArchivedConversations((prev) =>
            prev.filter((c) => c._id !== conversation._id)
          );
          setActiveConversations((prev) => [
            { ...conversation, isArchived: false },
            ...prev,
          ]);
        }

        toast.success(
          newArchiveStatus ? "Conversation archived" : "Conversation unarchived"
        );
      } catch (error) {
        console.error("Error updating conversation:", error);
        toast.error("Failed to update conversation");
        // Optional: Revert optimistic update on error
        loadConversations();
      }
    },
    [loadConversations]
  );

  const handleDelete = useCallback(async (conversation: Conversation) => {
    if (
      !confirm(
        "Are you sure you want to delete this conversation? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await apiDeleteConversation(conversation._id);

      if (conversation.isArchived) {
        setArchivedConversations((prev) =>
          prev.filter((c) => c._id !== conversation._id)
        );
      } else {
        setActiveConversations((prev) =>
          prev.filter((c) => c._id !== conversation._id)
        );
      }

      toast.success("Conversation deleted successfully");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Failed to delete conversation");
    }
  }, []);

  return {
    activeConversations,
    archivedConversations,
    isLoading,
    handleArchiveToggle,
    handleDelete,
  };
}
