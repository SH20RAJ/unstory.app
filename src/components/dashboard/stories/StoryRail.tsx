"use client";

import { cn } from "@/lib/utils";

import { STORIES } from "../../../../db/stories";

export function StoryRail() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {STORIES.map((story) => (
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
