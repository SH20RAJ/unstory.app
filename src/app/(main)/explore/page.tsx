"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Play } from "lucide-react";
import Image from "next/image";

// Mock Explore Data
const EXPLORE_ITEMS = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", likes: 234, comments: 12, aspect: "aspect-3/4" },
  { id: 2, type: "video", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", likes: 856, comments: 45, aspect: "aspect-video" }, // Thumbnail for video
  { id: 3, type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", likes: 120, comments: 8, aspect: "aspect-square" },
  { id: 4, type: "image", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80", likes: 450, comments: 30, aspect: "aspect-4/5" },
  { id: 5, type: "image", src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80", likes: 89, comments: 5, aspect: "aspect-3/4" },
  { id: 6, type: "video", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", likes: 1200, comments: 110, aspect: "aspect-square" },
  { id: 7, type: "image", src: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80", likes: 300, comments: 20, aspect: "aspect-video" },
  { id: 8, type: "image", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", likes: 156, comments: 14, aspect: "aspect-4/5" },
  { id: 9, type: "image", src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", likes: 670, comments: 40, aspect: "aspect-3/4" },
];

export default function ExplorePage() {
  return (
    <DashboardLayout showRightSidebar={false}>
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
            {EXPLORE_ITEMS.map((item) => (
                <div key={item.id} className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer">
                    <div className={cn("relative w-full bg-white/5", item.aspect)}>
                        <Image 
                            src={item.src} 
                            alt="Explore content" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                             <div className="flex items-center gap-2 text-white font-bold">
                                 <Heart className="h-5 w-5 fill-white" /> {item.likes}
                             </div>
                             <div className="flex items-center gap-2 text-white font-bold">
                                 <MessageCircle className="h-5 w-5 fill-white" /> {item.comments}
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
    </DashboardLayout>
  );
}
