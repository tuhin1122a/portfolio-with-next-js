"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reply } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function MessageDialog({
  message,
  onMarkAsRead,
}: {
  message: Message;
  onMarkAsRead: (id: string) => void;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{message.subject}</DialogTitle>
        <DialogDescription>
          From: {message.name} ({message.email})
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="text-muted-foreground whitespace-pre-line">
          {message.message}
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onMarkAsRead(message._id)}>
          Mark as Read
        </Button>
        <Button className="gap-1" asChild>
          <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
            <Reply className="h-4 w-4" /> Reply
          </a>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
