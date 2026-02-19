"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  Smile,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  conversationId: string;
  recipient: {
      name: string;
      avatar: string;
      online?: boolean;
  };
  messages: Message[];
  currentUserId: string;
}

export function ChatWindow({ conversationId, recipient, messages: initialMessages, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, conversationId]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        senderId: currentUserId,
        time: "Just now",
        status: "sent"
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col h-full bg-[#09090b]">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 backdrop-blur-md bg-[#09090b]/50 sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src={recipient.avatar} />
                    <AvatarFallback>{recipient.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-bold text-sm text-white leading-none mb-1">{recipient.name}</h3>
                    {recipient.online ? (
                        <span className="text-[10px] text-green-400 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online
                        </span>
                    ) : (
                        <span className="text-[10px] text-white/40">Offline</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white rounded-full">
                    <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white rounded-full">
                    <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white rounded-full">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                    <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                        <div className={cn(
                            "max-w-[70%] rounded-2xl p-4 text-sm leading-relaxed relative group",
                            isMe 
                                ? "bg-[#FFE500] text-black rounded-tr-none" 
                                : "bg-white/10 text-white rounded-tl-none"
                        )}>
                            <p>{msg.content}</p>
                            <span className={cn(
                                "text-[9px] absolute -bottom-5 min-w-[40px]",
                                isMe ? "right-1 text-right text-white/40" : "left-1 text-white/40"
                            )}>
                                {msg.time}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-[#09090b]">
            <div className="flex items-center gap-2 bg-white/5 rounded-full p-2 px-4 shadow-lg ring-1 ring-white/5 focus-within:ring-white/10 transition-all">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full shrink-0">
                    <Paperclip className="h-4 w-4" />
                </Button>
                
                <Input 
                    placeholder="Type a message..." 
                    className="bg-transparent border-0 h-10 shadow-none focus-visible:ring-0 text-white placeholder:text-white/40 px-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />

                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full shrink-0">
                    <Smile className="h-4 w-4" />
                </Button>

                {inputValue.trim() ? (
                     <Button 
                        size="icon" 
                        className="h-9 w-9 bg-[#FFE500] text-black hover:bg-[#FFE500]/90 rounded-full shrink-0 ml-2"
                        onClick={handleSend}
                     >
                        <Send className="h-4 w-4 ml-0.5" />
                     </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full shrink-0">
                         <ImageIcon className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    </div>
  );
}
