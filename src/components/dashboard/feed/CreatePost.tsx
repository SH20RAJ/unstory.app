"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Calendar, 
  Smile,
  MapPin,
  Globe,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CreatePost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");

  const handleFocus = () => setIsExpanded(true);

  return (
    <div className={cn(
        "bg-[#121212] rounded-[32px] border border-white/5 transition-all duration-200 overflow-hidden",
        isExpanded ? "ring-1 ring-white/10 shadow-2xl" : "hover:border-white/10"
    )}>
      <div className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            {/* Input Area */}
            <div className="relative">
                <Textarea 
                    placeholder="Tell your campus about your thoughts..." 
                    className="min-h-[40px] w-full bg-transparent border-0 text-white placeholder:text-white/20 focus-visible:ring-0 text-md p-4 resize-none leading-relaxed"
                    onFocus={handleFocus}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={isExpanded ? 3 : 1}
                />
            </div>
            
            {/* Expanded Content */}
            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Media Preview Area (Hidden for now) */}
                    
                    <div className="h-px w-full bg-white/5 my-3" />

                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1 -ml-2">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:bg-white/5 rounded-full"><ImageIcon className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-white/5 rounded-full"><Video className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-white/5 rounded-full"><BarChart2 className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500 hover:bg-white/5 rounded-full"><Calendar className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-full"><Smile className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-full"><MapPin className="h-4 w-4" /></Button>
                         </div>

                         <div className="flex items-center gap-3">
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 rounded-full text-white/40 hover:text-white hover:bg-white/5 gap-2 px-3 text-xs"
                             >
                                 <Globe className="h-3 w-3" />
                                 Everyone
                                 <ChevronDown className="h-3 w-3" />
                             </Button>

                             <Button 
                                className={cn(
                                    "rounded-full h-8 px-6 font-bold transition-all",
                                    content.length > 0 
                                        ? "bg-[#FFE500] text-black hover:bg-[#FFE500]/90" 
                                        : "bg-white/10 text-white/40 hover:bg-white/20"
                                )}
                                disabled={content.length === 0}
                             >
                                 Post
                             </Button>
                         </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Collapsed Footer Actions (Only shown when collapsed) */}
      {!isExpanded && (
          <div className="flex gap-2 p-2 pt-0 pl-16">
            <Button variant="ghost" className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-green-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <ImageIcon className="h-3.5 w-3.5" /> Photo
            </Button>
            <Button variant="ghost" className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-blue-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <Video className="h-3.5 w-3.5" /> Video
            </Button>
            <Button variant="ghost" className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-red-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <BarChart2 className="h-3.5 w-3.5" /> Poll
            </Button>
            <Button variant="ghost" className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-yellow-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <Calendar className="h-3.5 w-3.5" /> Event
            </Button>
          </div>
      )}
    </div>
  );
}
