"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Mail, Trash2 } from "lucide-react";
import MessageDialog from "./message-dialog";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface Props {
  message: Message;
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

export default function MessageRow({ message, onDelete, onMarkAsRead }: Props) {
  return (
    <TableRow className={message.read ? "" : "font-medium bg-muted/30"}>
      <TableCell>{message.name}</TableCell>
      <TableCell>{message.email}</TableCell>
      <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
      <TableCell>
        {new Date(message.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <Badge variant={message.read ? "outline" : "default"}>
          {message.read ? "Read" : "Unread"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <MessageDialog message={message} onMarkAsRead={onMarkAsRead} />
          </Dialog>

          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(message._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
