// src/components/conversations/chat-message.tsx
"use client";

import { formatDate } from "@/lib/utils";
import { Message } from "@/types";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {message.role === "assistant" ? (
          <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
            {/* Using a library is safer and more robust than regex replacements */}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
        <p className="text-xs opacity-70 mt-1 text-right">
          {formatDate(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
