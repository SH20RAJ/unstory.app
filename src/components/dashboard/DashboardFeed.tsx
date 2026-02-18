"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Video, BarChart2, Calendar, MoreVertical, Heart, MessageCircle, Send } from "lucide-react";

export function DashboardFeed() {
  const stories = [
    { name: "Amanda", img: "bg-red-500" },
    { name: "John", img: "bg-orange-500" },
    { name: "Andrew", img: "bg-yellow-500" },
    { name: "Rosaline", img: "bg-green-500" },
    { name: "Mudreh", img: "bg-blue-500" },
    { name: "Juliet", img: "bg-indigo-500" },
    { name: "Bohdan", img: "bg-purple-500" },
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
        {/* Stories Row */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story) => (
                <div key={story.name} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]">
                    <div className="relative p-[2px] rounded-[24px] bg-linear-to-tr from-[#FFE500] to-orange-500 group-hover:scale-105 transition-transform">
                        <div className={`h-16 w-16 rounded-[22px] ${story.img} border-4 border-[#09090b]`} />
                    </div>
                    <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">{story.name}</span>
                </div>
            ))}
        </div>

        {/* Create Post Input */}
        <div className="bg-[#121212] rounded-[32px] p-2 border border-white/5">
             <div className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Input 
                    placeholder="Tell your friends about your thoughts..." 
                    className="bg-transparent border-0 text-white placeholder:text-white/20 focus-visible:ring-0 text-md h-auto p-0"
                />
             </div>
             <div className="flex gap-2 p-2">
                 <Button variant="ghost" className="flex-1 bg-[#1A1A1A] hover:bg-[#252525] text-white/70 rounded-2xl h-10 gap-2 font-normal">
                     <ImageIcon className="h-4 w-4 text-green-500" /> Photo
                 </Button>
                 <Button variant="ghost" className="flex-1 bg-[#1A1A1A] hover:bg-[#252525] text-white/70 rounded-2xl h-10 gap-2 font-normal">
                     <Video className="h-4 w-4 text-blue-500" /> Video
                 </Button>
                 <Button variant="ghost" className="flex-1 bg-[#1A1A1A] hover:bg-[#252525] text-white/70 rounded-2xl h-10 gap-2 font-normal">
                     <BarChart2 className="h-4 w-4 text-red-500" /> Poll
                 </Button>
                 <Button variant="ghost" className="flex-1 bg-[#1A1A1A] hover:bg-[#252525] text-white/70 rounded-2xl h-10 gap-2 font-normal">
                     <Calendar className="h-4 w-4 text-yellow-500" /> Schedule
                 </Button>
             </div>
        </div>

        {/* Feed Post */}
        <div className="bg-[#121212] rounded-[32px] p-6 border border-white/5 space-y-4">
             {/* Post Header */}
             <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                     <Avatar className="h-10 w-10">
                         <AvatarImage src="https://i.pravatar.cc/150?u=5" />
                         <AvatarFallback>MK</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">Mudreh Kumbirai</span>
                            <span className="bg-blue-500/20 text-blue-500 text-[10px] px-1.5 rounded-full">✓</span>
                         </div>
                         <span className="text-white/40 text-xs">@Muhadrehh • <span className="text-[#FFE500]">1 hr ago</span></span>
                     </div>
                 </div>
                 <Button variant="ghost" size="icon" className="text-white/40"><MoreVertical className="h-5 w-5"/></Button>
             </div>

             {/* Post Content */}
             <p className="text-white/80 text-sm leading-relaxed">
                 In some cases you may see a third-party client name, which indicates the Tweet came from a non-Twitter application.
             </p>

             {/* Post Image (Artistic) */}
             <div className="relative rounded-[24px] overflow-hidden aspect-video bg-[#1A1A1A] group cursor-pointer">
                 {/* Abstract Art Placeholder */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80" />
             </div>

             {/* Post Actions */}
             <div className="flex items-center justify-between pt-2">
                 <div className="flex gap-4">
                     <Button size="icon" variant="ghost" className="text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-full h-10 w-10">
                         <Heart className="h-5 w-5 fill-current" />
                     </Button>
                     <Button size="icon" variant="ghost" className="text-white/40 hover:text-white rounded-full h-10 w-10 bg-[#1A1A1A]">
                         <MessageCircle className="h-5 w-5" />
                     </Button>
                     <Button size="icon" variant="ghost" className="text-white/40 hover:text-white rounded-full h-10 w-10 bg-[#1A1A1A]">
                         <Send className="h-5 w-5" />
                     </Button>
                 </div>
                 <Button className="bg-[#FFE500] hover:bg-[#FFE500]/90 text-black font-bold rounded-full px-6">
                     Hire me
                 </Button>
             </div>

             {/* Comment Input */}
             <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                 <Avatar className="h-8 w-8">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>ME</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 bg-[#1A1A1A] rounded-2xl h-10 flex items-center px-4 hover:bg-[#202020] transition-colors cursor-text">
                     <span className="text-white/20 text-sm">Write your comment</span>
                 </div>
                 <div className="flex gap-2 text-white/40">
                     <ImageIcon className="h-5 w-5" />
                 </div>
             </div>
        </div>
    </div>
  );
}
