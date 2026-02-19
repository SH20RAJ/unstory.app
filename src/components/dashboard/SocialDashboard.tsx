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
import { ProfileSidebar } from "./ProfileSidebar";
import { ActivitySidebar } from "./ActivitySidebar";
import { DashboardFeed } from "./DashboardFeed";

export function SocialDashboard() {
  return (
    <div className="w-full min-h-screen bg-[#09090b] flex flex-col font-sans mb-16 md:mb-0">
       {/* Top Navigation - Desktop Only */}
       <header className="sticky top-0 z-50 w-full h-20 bg-[#09090b] border-b border-white/5 hidden md:flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-8 flex-1">
                {/* Logo */}
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shrink-0">
                    <div className="h-5 w-5 bg-black rounded-tr-xl rounded-bl-xl" />
                </div>
                
                {/* Search */}
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                        placeholder="# Explore" 
                        className="h-10 w-full bg-[#121212] border-0 rounded-full pl-10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-[#FFE500]/50 transition-all"
                    />
                </div>
            </div>

            {/* Nav Icons */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-[#FFE500] hover:bg-white/5 relative">
                     <Home className="h-5 w-5 fill-current" />
                     <span className="absolute bottom-2 h-1 w-1 bg-[#FFE500] rounded-full" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-white/60 hover:text-white hover:bg-white/5">
                     <MessageCircle className="h-5 w-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 relative">
                     <Bell className="h-5 w-5" />
                     <span className="absolute top-2 right-2 h-2 w-2 bg-green-500 rounded-full border-2 border-[#09090b]" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-white/60 hover:text-white hover:bg-white/5">
                     <Heart className="h-5 w-5" />
                 </Button>

                 <div className="h-8 w-px bg-white/10 mx-2" />

                 <Button variant="ghost" className="h-10 px-2 rounded-full hover:bg-white/5 gap-2 text-white/80">
                      <Avatar className="h-8 w-8 border border-white/10">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>EL</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline">Evgen Ledo</span>
                      <ChevronDown className="h-4 w-4 text-white/40" />
                 </Button>
            </div>
       </header>

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
            <Button variant="ghost" className="flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5 text-[#FFE500]">
                <Home className="h-5 w-5 fill-current" />
            </Button>
            <Button variant="ghost" className="flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5 text-white/60">
                <Search className="h-5 w-5" />
            </Button>
             <div className="relative -top-5">
                <Button className="h-12 w-12 rounded-full bg-[#FFE500] hover:bg-[#FFE500]/90 text-black shadow-lg shadow-[#FFE500]/20 flex items-center justify-center">
                    <span className="text-2xl font-light mb-1">+</span>
                </Button>
            </div>
            <Button variant="ghost" className="flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5 text-white/60">
                <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="flex flex-col items-center justify-center gap-1 h-full w-full rounded-none hover:bg-white/5 text-white/60">
                <Avatar className="h-6 w-6 border border-white/10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ME</AvatarFallback>
                </Avatar>
            </Button>
       </nav>
    </div>
  );
}
