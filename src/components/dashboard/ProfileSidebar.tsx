"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const communities = [
  { name: "Coding Club", count: 142, image: "bg-blue-600" },
  { name: "Debate Soc", count: 89, image: "bg-red-500" },
  { name: "Robotics", count: 56, image: "bg-purple-500" },
];

export function ProfileSidebar() {
  return (
    <div className="flex flex-col gap-6 h-full">
        {/* Profile Stats Card (Yellow Arcs) */}
        <div className="relative rounded-[32px] bg-[#121212] p-6 text-center overflow-hidden border border-white/5 shadow-xl">
             {/* Decorative Arcs */}
             <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-[6px] border-[#FFE500] opacity-20" />
             <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border-[6px] border-[#FFE500] opacity-40" />
             <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-[6px] border-[#FFE500] opacity-60" />
             <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-[6px] border-[#FFE500]" />

             <div className="relative z-10 flex flex-col items-center mt-4">
                  <div className="relative">
                      <Avatar className="h-20 w-20 border-4 border-[#121212] shadow-2xl">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>RM</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-[#121212]" />
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-4 mb-2 text-white/50 text-xs font-mono">
                      <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-lg">482</span>
                          <span>Connections</span>
                      </div>
                      <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-lg">12</span>
                          <span>Projects</span>
                      </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mt-2">Shaswat Raj</h2>
                  <p className="text-white/40 text-sm">@sh20raj</p>

                  <p className="text-white/80 text-sm mt-4 leading-relaxed">
                      💻 CS Undergrad @ BIT Mesra. <br/>
                      Building tools for the future. 🚀
                  </p>

                  <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 border border-white/5">
                      View Profile
                  </Button>
             </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Interests</h3>
            <div className="flex flex-wrap gap-2">
                {["React", "AI/ML", "Hackathons", "Photography", "Badminton"].map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-[#1A1A1A] hover:bg-[#252525] text-white/70 border-0 py-2 px-4 rounded-xl font-normal">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>

        {/* Communities */}
        <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">My Clubs</h3>
                <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/50 hover:text-white rounded-full"><Search className="h-4 w-4"/></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white/50 hover:text-white rounded-full"><Plus className="h-4 w-4"/></Button>
                </div>
             </div>
             
             <div className="space-y-3">
                 {communities.map((comm) => (
                     <div key={comm.name} className="flex items-center gap-3 p-3 rounded-2xl bg-[#121212] hover:bg-[#1A1A1A] transition-colors group cursor-pointer border border-white/5">
                         <div className={`h-10 w-10 rounded-full ${comm.image} flex items-center justify-center text-white font-bold opacity-80 group-hover:opacity-100`}>
                             {comm.name[0]}
                         </div>
                         <div className="flex flex-col">
                             <span className="text-white text-sm font-medium">{comm.name}</span>
                             <span className="text-white/40 text-xs flex items-center gap-1">
                                 <span className="h-1.5 w-1.5 rounded-full bg-[#FFE500]" />
                                 {comm.count} members
                             </span>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );
}
