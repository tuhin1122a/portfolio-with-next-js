"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConversations } from "@/hooks/use-conversations";

import { Conversation } from "@/app/(dashboard)/components/conversations";
import { useState } from "react";
import ConversationList from "../../components/conversations/conversation-list";
import ConversationViewDialog from "../../components/conversations/conversation-view-dialog";

export default function AdminConversationsPage() {
  const {
    activeConversations,
    archivedConversations,
    isLoading,
    handleArchiveToggle,
    handleDelete,
  } = useConversations();

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat Conversations</h2>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">
            Active
            {activeConversations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeConversations.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived
            {archivedConversations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {archivedConversations.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ConversationList
            conversations={activeConversations}
            isLoading={isLoading}
            isArchivedTab={false}
            onView={handleViewConversation}
            onArchiveToggle={handleArchiveToggle}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="archived">
          <ConversationList
            conversations={archivedConversations}
            isLoading={isLoading}
            isArchivedTab={true}
            onView={handleViewConversation}
            onArchiveToggle={handleArchiveToggle}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      <ConversationViewDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        conversation={selectedConversation}
        onArchiveToggle={handleArchiveToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
