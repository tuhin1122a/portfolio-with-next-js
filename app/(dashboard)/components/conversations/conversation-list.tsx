// src/components/conversations/conversation-list.tsx
"use client";

import { Conversation } from "@/app/(dashboard)/components/conversations";
import { Loader2 } from "lucide-react";
import ConversationCard from "./conversation-card";

interface ConversationListProps {
  conversations: Conversation[];
  isLoading: boolean;
  isArchivedTab: boolean;
  onView: (conversation: Conversation) => void;
  onArchiveToggle: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  isLoading,
  isArchivedTab,
  ...handlers
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No {isArchivedTab ? "archived" : "active"} conversations found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation._id}
          conversation={conversation}
          {...handlers}
        />
      ))}
    </div>
  );
}
