"use client";

import { cn } from "@/lib/utils";

interface Story {
  name: string;
  img: string;
  isLive?: boolean;
}

const stories: Story[] = [
  { name: "Your Story", img: "bg-zinc-800", isLive: false },
  { name: "GDSC", img: "bg-blue-500", isLive: true },
  { name: "P-Soc", img: "bg-purple-600", isLive: true },
  { name: "IEEE", img: "bg-blue-700" },
  { name: "Rotaract", img: "bg-pink-600" },
  { name: "E-Cell", img: "bg-orange-500" },
  { name: "Robotics", img: "bg-red-600" },
  { name: "Audio", img: "bg-yellow-500" },
];

export function StoryRail() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {stories.map((story) => (
        <div 
          key={story.name} 
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]"
        >
          <div className="relative p-[2px] rounded-[24px] bg-linear-to-tr from-[#FFE500] to-orange-500 group-hover:scale-105 transition-transform">
            <div className={cn(
              "h-16 w-16 rounded-[22px] border-4 border-[#09090b] transition-all bg-cover bg-center",
              story.img
            )} />
            
            {story.isLive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm border border-[#09090b]">
                LIVE
              </div>
            )}
          </div>
          <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );
}
