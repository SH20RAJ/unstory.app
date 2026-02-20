"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Home, 
  MessageCircle, 
  Search,
  User,
  Plus
} from "lucide-react";

interface MobileNavProps {
    userAvatar?: string | null;
    userName?: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileNav({ userAvatar, userName }: MobileNavProps) {
  const pathname = usePathname();

  const tabs = [
    { id: "home", icon: Home, label: "Home", href: "/home" },
    { id: "connect", icon: Search, label: "Connect", href: "/connect" },
    { id: "create", icon: Plus, label: "Create", href: "/create", isPrimary: true },
    { id: "chat", icon: MessageCircle, label: "Chat", href: "/chat" },
    { id: "profile", icon: User, label: "Profile", href: "/profile", isProfile: true },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm md:hidden">
      <div className="flex items-center justify-between bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl shadow-black/50">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          if (tab.isPrimary) {
             return (
                <div key={tab.id} className="relative -top-6">
                    <Link href={tab.href}>
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="h-14 w-14 rounded-full bg-[#FFE500] text-black shadow-lg shadow-[#FFE500]/25 flex items-center justify-center border-4 border-[#09090b]"
                        >
                            <Plus className="h-6 w-6 stroke-3" />
                        </motion.div>
                    </Link>
                </div>
             );
          }

          return (
            <Link key={tab.id} href={tab.href} className="relative group">
              <div className="flex flex-col items-center justify-center w-12 h-12">
                {isActive && (
                    <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                
                {tab.isProfile ? (
                     <Avatar className={cn("h-6 w-6 border-2 transition-all", isActive ? "border-[#FFE500] scale-110" : "border-transparent opacity-60")}>
                        <AvatarImage src={userAvatar || undefined} />
                        <AvatarFallback>{userName?.[0]}</AvatarFallback>
                    </Avatar>
                ) : (
                    <Icon 
                        className={cn(
                            "h-5 w-5 transition-all duration-300", 
                            isActive ? "text-[#FFE500] scale-110" : "text-white/60 group-hover:text-white/80"
                        )} 
                        strokeWidth={isActive ? 2.5 : 2}
                    />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
