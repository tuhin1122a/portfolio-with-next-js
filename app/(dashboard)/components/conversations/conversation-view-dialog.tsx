// src/components/conversations/conversation-view-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

import { Conversation } from "@/app/(dashboard)/components/conversations";
import { Archive, Trash2 } from "lucide-react";
import ChatMessage from "./chat-message";

interface ConversationViewDialogProps {
  conversation: Conversation | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onArchiveToggle: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
}

export default function ConversationViewDialog({
  conversation,
  isOpen,
  onOpenChange,
  onArchiveToggle,
  onDelete,
}: ConversationViewDialogProps) {
  if (!conversation) return null;

  const handleDeleteAndClose = () => {
    onDelete(conversation);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Conversation with {conversation.userName}</DialogTitle>
          <DialogDescription>
            {conversation.userEmail || "Anonymous User"} •{" "}
            {formatDate(conversation.createdAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-sm text-muted-foreground">
            {conversation.messages.length} messages
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onArchiveToggle(conversation)}
            >
              <Archive className="mr-2 h-4 w-4" />
              {conversation.isArchived ? "Unarchive" : "Archive"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteAndClose}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
