"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export interface StoryUI {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  img: string;
}

interface StoryRailProps {
  stories: StoryUI[];
}

export function StoryRail({ stories }: StoryRailProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      
      {/* Add Story Button */}
      <Link href="/story/create" className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]">
        <div className="relative p-[2px] rounded-[24px] bg-white/10 group-hover:bg-white/20 transition-colors">
          <div className="h-16 w-16 rounded-[22px] border-4 border-[#09090b] bg-[#121212] flex items-center justify-center transition-all">
            <Plus className="h-6 w-6 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </div>
        <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
          Add Story
        </span>
      </Link>

      {stories.map((story) => (
        <Link 
          href={`/story/${story.id}`}
          key={story.id} 
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]"
        >
          <div className="relative p-[2px] rounded-[24px] bg-linear-to-tr from-[#FFE500] to-orange-500 group-hover:scale-105 transition-transform">
            <div className={cn(
              "h-16 w-16 rounded-[22px] border-4 border-[#09090b] transition-all bg-cover bg-center"
            )} 
            style={{ backgroundImage: `url(${story.img || story.avatar})` }}
            />
            
            {story.isLive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm border border-[#09090b]">
                LIVE
              </div>
            )}
          </div>
          <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
            {story.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
