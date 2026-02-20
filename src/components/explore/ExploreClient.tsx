"use client";

import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Play } from "lucide-react";
import Image from "next/image";

interface ExploreItem {
    id: number;
    image: string;
    aspect: string;
    metrics: { likes: number; comments: number };
    type: string;
}

interface ExploreClientProps {
    exploreItems: ExploreItem[];
}

export function ExploreClient({ exploreItems }: ExploreClientProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Explore</h1>

        {/* Categories / Tags */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["For You", "Campus Life", "Events", "Photography", "Art", "Music", "Tech"].map((tag, i) => (
                <button 
                    key={tag}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        i === 0 ? "bg-[#FFE500] text-black" : "bg-white/5 hover:bg-white/10 text-white"
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {exploreItems.map((item) => (
                <div key={item.id} className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer">
                    <div className={cn("relative w-full bg-white/5", item.aspect)}>
                        <Image 
                            src={item.image} 
                            alt="Explore content" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                             <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span className="text-xs font-medium">{item.metrics.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-xs font-medium">{item.metrics.comments}</span>
                            </div>
                        </div>
                        {item.type === "video" && (
                            <div className="absolute top-2 right-2 h-8 w-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Play className="h-4 w-4 fill-white text-white ml-0.5" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}
