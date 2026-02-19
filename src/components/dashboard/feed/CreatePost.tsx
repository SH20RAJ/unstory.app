"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Calendar 
} from "lucide-react";

export function CreatePost() {
  return (
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
  );
}
