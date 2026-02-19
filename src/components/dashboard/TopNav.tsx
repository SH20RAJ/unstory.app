"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  MessageCircle, 
  Bell, 
  Heart, 
  Search,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { CURRENT_USER } from "../../../db/users";

export function TopNav() {
  const pathname = usePathname();
  const user = CURRENT_USER;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-[#09090b] border-b border-white/5 hidden md:flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8 flex-1">
            {/* Logo */}
            <Link href="/home" className="h-10 w-10 bg-white rounded-full flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
                <div className="h-5 w-5 bg-black rounded-tr-xl rounded-bl-xl" />
            </Link>
            
            {/* Search */}
            <div className="relative w-full max-w-md hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input 
                    placeholder="# Explore Campus" 
                    className="h-10 w-full bg-[#121212] border-0 rounded-full pl-10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-[#FFE500]/50 transition-all"
                />
            </div>
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
             <Link href="/home">
                 <Button variant="ghost" size="icon" className={cn("h-10 w-10 rounded-full hover:bg-white/5 relative", isActive("/home") ? "text-[#FFE500]" : "text-white/60 hover:text-white")}>
                     <Home className="h-5 w-5 fill-current" />
                     {isActive("/home") && <span className="absolute bottom-2 h-1 w-1 bg-[#FFE500] rounded-full" />}
                 </Button>
             </Link>

             <Link href="/chat">
                 <Button variant="ghost" size="icon" className={cn("h-10 w-10 rounded-full hover:bg-white/5 relative", isActive("/chat") ? "text-[#FFE500]" : "text-white/60 hover:text-white")}>
                     <MessageCircle className="h-5 w-5" />
                     {isActive("/chat") && <span className="absolute bottom-2 h-1 w-1 bg-[#FFE500] rounded-full" />}
                 </Button>
             </Link>

             <Link href="/notifications"> {/* Placeholder for now */}
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 relative">
                     <Bell className="h-5 w-5" />
                     <span className="absolute top-2 right-2 h-2 w-2 bg-green-500 rounded-full border-2 border-[#09090b]" />
                 </Button>
             </Link>

             <Link href="/dating">
                 <Button variant="ghost" size="icon" className={cn("h-10 w-10 rounded-full hover:bg-white/5 relative", isActive("/dating") ? "text-[#FFE500]" : "text-white/60 hover:text-white")}>
                     <Heart className="h-5 w-5" />
                     {isActive("/dating") && <span className="absolute bottom-2 h-1 w-1 bg-[#FFE500] rounded-full" />}
                 </Button>
             </Link>

             <div className="h-8 w-px bg-white/10 mx-2" />

             <Link href="/profile">
                 <Button variant="ghost" className="h-10 px-2 rounded-full hover:bg-white/5 gap-2 text-white/80">
                      <Avatar className="h-8 w-8 border border-white/10">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 text-white/40" />
                 </Button>
             </Link>
        </div>
    </header>
  );
}
