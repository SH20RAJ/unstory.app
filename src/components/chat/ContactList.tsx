"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  online?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ContactList({ contacts, selectedId, onSelect }: ContactListProps) {
  const [query, setQuery] = useState("");

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-3 border-r border-white/5 flex flex-col bg-[#09090b]">
        {/* Header */}
        <div className="p-4 border-b border-white/5">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input 
                    placeholder="Search messages..." 
                    className="bg-white/5 border-0 rounded-full pl-9 h-9 text-sm focus-visible:ring-1 focus-visible:ring-[#FFE500]/50"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filtered.map(contact => (
                <button
                    key={contact.id}
                    onClick={() => onSelect(contact.id)}
                    className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left group",
                        selectedId === contact.id ? "bg-white/10" : "hover:bg-white/5"
                    )}
                >
                    <div className="relative">
                        <Avatar className="h-12 w-12 border border-white/5">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name[0]}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#09090b]" />
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className={cn("font-medium truncate", selectedId === contact.id ? "text-white" : "text-white/90")}>
                                {contact.name}
                            </span>
                            <span className="text-[10px] text-white/40 shrink-0">{contact.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                             <p className="text-sm text-white/50 truncate pr-2 group-hover:text-white/70 transition-colors">
                                 {contact.lastMessage}
                             </p>
                             {contact.unreadCount && contact.unreadCount > 0 && (
                                 <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-[#FFE500] text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                                     {contact.unreadCount}
                                 </span>
                             )}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
}
