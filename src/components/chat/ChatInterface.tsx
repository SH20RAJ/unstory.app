"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessage } from "@/actions/chat";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface ChatInterfaceProps {
  initialMessages: Message[];
  currentUserId: string;
}

export function ChatInterface({ initialMessages, currentUserId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Optimistic update
    const tempId = Math.random().toString();
    const optimisticMessage: Message = {
      id: tempId,
      content: input,
      sender_id: currentUserId,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, optimisticMessage]);
    setInput("");

    try {
      await sendMessage(optimisticMessage.content);
    } catch (error) {
      console.error("Failed to send", error);
      // Rollback or show error
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-muted/50">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
                    isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
