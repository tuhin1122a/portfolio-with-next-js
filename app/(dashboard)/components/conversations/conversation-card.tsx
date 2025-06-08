// src/components/conversations/conversation-card.tsx
"use client";

import { Conversation } from "@/app/(dashboard)/components/conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { Archive, MessageCircle, MoreVertical, Trash2 } from "lucide-react";

interface ConversationCardProps {
  conversation: Conversation;
  onView: (conversation: Conversation) => void;
  onArchiveToggle: (conversation: Conversation) => void;
  onDelete: (conversation: Conversation) => void;
}

export default function ConversationCard({
  conversation,
  onView,
  onArchiveToggle,
  onDelete,
}: ConversationCardProps) {
  const { userName, userEmail, messages, createdAt, lastUpdated, isArchived } =
    conversation;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${userName}`} />
              <AvatarFallback>
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{userName}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {userEmail || "Anonymous User"}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(conversation)}>
                <MessageCircle className="mr-2 h-4 w-4" /> View Conversation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchiveToggle(conversation)}>
                <Archive className="mr-2 h-4 w-4" />{" "}
                {isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(conversation)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {messages.length} messages
            </p>
            <p className="text-xs text-muted-foreground">
              Started: {formatDate(createdAt)}
            </p>
            <p className="text-xs text-muted-foreground">
              Last updated: {formatDate(lastUpdated)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(conversation)}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
