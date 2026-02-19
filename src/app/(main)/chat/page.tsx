"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { ContactList } from "@/components/chat/ContactList";
import { ChatWindow } from "@/components/chat/ChatWindow";

import { CONTACTS, MESSAGES } from "../../../../db/chats";

export default function ChatPage() {
  const [selectedId, setSelectedId] = useState("1");
  const currentUserId = "me";

  const selectedContact = CONTACTS.find(c => c.id === selectedId) || CONTACTS[0];
  const currentMessages = MESSAGES[selectedId as keyof typeof MESSAGES] || [];

  return (
    <div className="w-full min-h-screen bg-[#09090b] flex flex-col font-sans">
       {/* Use a wrapper to constrain width but keep full height feel */}
       <div className="max-w-[1600px] mx-auto w-full flex-1 p-0 md:p-4 lg:p-8">
            <div className="bg-[#09090b] rounded-2xl border border-white/5 overflow-hidden h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] shadow-2xl">
                <ChatLayout>
                    <ContactList 
                        contacts={CONTACTS} 
                        selectedId={selectedId} 
                        onSelect={setSelectedId} 
                    />
                    <ChatWindow 
                        conversationId={selectedId}
                        recipient={selectedContact}
                        messages={currentMessages as any}
                        currentUserId={currentUserId}
                    />
                </ChatLayout>
            </div>
       </div>
    </div>
  );
}
