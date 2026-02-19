"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { ACTIVITIES } from "@db/activities";

export function ActivitySidebar() {
  return (
    <div className="flex flex-col h-full bg-[#121212] rounded-[32px] p-6 border border-white/5">
        <h3 className="text-white text-lg font-medium mb-6">Recent activity</h3>
        
        <div className="space-y-1 relative">
             {/* Timeline Line (Conceptual) */}
             <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />

             {ACTIVITIES.map((item) => (
                 <div key={item.id} className="relative flex flex-col gap-3 p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:bg-[#202020] transition-colors mb-4 last:mb-0">
                     <div className="flex items-start justify-between">
                         <div className="flex items-start gap-3">
                             <div className="relative">
                                <Avatar className="h-10 w-10 border border-white/10">
                                    <AvatarImage src={item.avatar} />
                                    <AvatarFallback>{item.user[0]}</AvatarFallback>
                                </Avatar>
                                {item.highlight && <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#FFE500] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center"><CheckCircle2 className="h-2 w-2 text-black" /></div>}
                                {item.isGroup && <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full border-2 border-[#1A1A1A]" />}
                             </div>
                             <div>
                                 <p className="text-white font-medium text-sm leading-none pt-1">{item.user}</p>
                                 <p className="text-white/40 text-xs mt-1">
                                    {item.action} {item.time && `• ${item.time}`}
                                 </p>
                             </div>
                         </div>
                     </div>

                     {/* Action Buttons area */}
                     {(item.type === "purchase" || item.type === "tip" || item.type === "invite") && (
                         <div className="flex items-center justify-between mt-1 pl-[52px]">
                             {item.amount && <span className="text-white font-bold">{item.amount} <span className="text-white/40 text-xs font-normal">/purchase</span></span>}
                             {item.isGroup && <Button variant="ghost" size="sm" className="h-8 rounded-full text-white/60 hover:text-white bg-white/5">Discard</Button>}
                             
                             {item.theme === "yellow" ? (
                                 <Button size="sm" className="bg-[#FFE500] hover:bg-[#FFE500]/90 text-black font-bold h-8 rounded-full px-4">
                                     {item.status}
                                 </Button>
                             ) : (
                                 <Button size="sm" variant="secondary" className="bg-[#2A2A2A] hover:bg-[#333] text-white/60 h-8 rounded-full px-4">
                                     {item.status}
                                 </Button>
                             )}
                         </div>
                     )}
                 </div>
             ))}
        </div>
    </div>
  );
}
