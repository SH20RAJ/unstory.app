"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  MessageCircle, 
  Search,
} from "lucide-react";
import { ProfileSidebar } from "./ProfileSidebar";
import { ActivitySidebar } from "./ActivitySidebar";
import { DashboardFeed } from "./DashboardFeed";
import { TopNav } from "./TopNav";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function SocialDashboard() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full min-h-screen bg-[#09090b] flex flex-col font-sans mb-16 md:mb-0">
       {/* Top Navigation - Desktop Only */}
       <TopNav />

       <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 lg:p-8 flex-1">
           
           {/* Left Column - Profile (3 cols) */}
           <div className="hidden lg:block lg:col-span-3">
               <ProfileSidebar />
           </div>

           {/* Center Column - Feed (5-6 cols) */}
           <div className="col-span-1 lg:col-span-6">
               <DashboardFeed />
           </div>

           {/* Right Column - Activity (3 cols) */}
           <div className="hidden xl:block xl:col-span-3">
               <ActivitySidebar />
           </div>
       </div>

       {/* Mobile Bottom Navigation */}
       <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#09090b]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 md:hidden">
            <Link href="/home" className="w-full h-full">
                <Button variant="ghost" className={cn("flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5", isActive("/home") ? "text-[#FFE500]" : "text-white/60")}>
                    <Home className="h-5 w-5 fill-current" />
                </Button>
            </Link>
            
            <Link href="/connect" className="w-full h-full">
                <Button variant="ghost" className={cn("flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5", isActive("/connect") ? "text-[#FFE500]" : "text-white/60")}>
                    <Search className="h-5 w-5" />
                </Button>
            </Link>

             <div className="relative -top-5">
                <Link href="/create">
                    <Button className="h-12 w-12 rounded-full bg-[#FFE500] hover:bg-[#FFE500]/90 text-black shadow-lg shadow-[#FFE500]/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                        <span className="text-2xl font-light mb-1">+</span>
                    </Button>
                </Link>
            </div>

            <Link href="/chat" className="w-full h-full">
                <Button variant="ghost" className={cn("flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5", isActive("/chat") ? "text-[#FFE500]" : "text-white/60")}>
                    <MessageCircle className="h-5 w-5" />
                </Button>
            </Link>

            <Link href="/profile" className="w-full h-full">
                <Button variant="ghost" className={cn("flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5", isActive("/profile") ? "text-[#FFE500]" : "text-white/60")}>
                    <Avatar className={cn("h-6 w-6 border", isActive("/profile") ? "border-[#FFE500]" : "border-white/10")}>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                </Button>
            </Link>
       </nav>
    </div>
  );
}
