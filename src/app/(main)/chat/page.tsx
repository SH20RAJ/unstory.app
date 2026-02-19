"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { ContactList } from "@/components/chat/ContactList";
import { ChatWindow } from "@/components/chat/ChatWindow";

// Mock Data
const CONTACTS = [
  { id: "1", name: "Tanya Sharma", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", lastMessage: "See you at the event!", time: "2m", unreadCount: 2, online: true },
  { id: "2", name: "Rohan Das", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", lastMessage: "Can you send me the notes?", time: "1h", online: false },
  { id: "3", name: "Aditya Kumar", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", lastMessage: "The project looks great.", time: "3h", online: true },
];

const MESSAGES = {
    "1": [
        { id: "m1", content: "Hey! Are you going to the GDSC workshop?", senderId: "other", time: "10:30 AM", status: "read" },
        { id: "m2", content: "Yes, definitely! It starts at 5 PM right?", senderId: "me", time: "10:32 AM", status: "read" },
        { id: "m3", content: "See you at the event!", senderId: "other", time: "10:33 AM", status: "sent" }
    ],
    "2": [
        { id: "m1", content: "Bro, did you attend the lecture?", senderId: "other", time: "Yesterday", status: "read" },
        { id: "m2", content: "Can you send me the notes?", senderId: "other", time: "Yesterday", status: "read" }
    ]
} as const;

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
