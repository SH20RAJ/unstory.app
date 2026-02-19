"use client";

import { cn } from "@/lib/utils";

interface Story {
  name: string;
  img: string;
  isLive?: boolean;
}

const stories: Story[] = [
  { name: "Amanda", img: "bg-red-500", isLive: true },
  { name: "John", img: "bg-orange-500" },
  { name: "Andrew", img: "bg-yellow-500" },
  { name: "Rosaline", img: "bg-green-500" },
  { name: "Mudreh", img: "bg-blue-500" },
  { name: "Juliet", img: "bg-indigo-500" },
  { name: "Bohdan", img: "bg-purple-500" },
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
