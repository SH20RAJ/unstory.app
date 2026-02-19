"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Zap, Play } from "lucide-react";

interface FeedItem {
  id: number;
  type: "image" | "video";
  image: string;
  author: {
    name: string;
    avatar?: string;
    university?: string;
  };
  metrics: {
    likes: number;
  };
  featured?: boolean;
}

import { cn } from "@/lib/utils";
import { EXPLORE_ITEMS } from "../../../db/explore";

export function ModernFeed() {
  const [activeTab, setActiveTab] = useState<"For You" | "Popular">("For You");

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-screen text-white">
        
        {/* Main Feed Area (Center) */}
        <div className="flex-1">
            {/* Header / Tabs */}
            <div className="flex items-center gap-6 mb-8 px-4">
                <button 
                  onClick={() => setActiveTab("For You")}
                  className={`text-lg font-medium transition-colors ${activeTab === "For You" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                >
                    For You
                    {activeTab === "For You" && <div className="h-1 w-full bg-white rounded-full mt-1" />}
                </button>
                <button 
                  onClick={() => setActiveTab("Popular")}
                  className={`text-lg font-medium transition-colors ${activeTab === "Popular" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                >
                    Popular
                    {activeTab === "Popular" && <div className="h-1 w-full bg-white rounded-full mt-1" />}
                </button>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {EXPLORE_ITEMS.map((item) => (
                <div key={item.id} className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer">
                    <div className={cn("relative w-full bg-white/5", item.aspect)}>
                        
                        {/* Image Placeholder */}
                        <div className={`w-full ${item.featured ? 'aspect-[3/4]' : 'aspect-[4/5]'} ${item.image} transition-transform duration-700 group-hover:scale-105`} />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-white/20">
                                        <AvatarFallback className="bg-white/10 text-white text-xs">{item.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white leading-none mb-1">{item.author.name}</span>
                                         {item.author.university && <span className="text-[10px] text-white/60">{item.author.university}</span>}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                     <button className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <Zap className="h-4 w-4 fill-white text-white" />
                                    </button>
                                </div>
                             </div>
                        </div>

                         {/* Hidden Actions on Hover */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <Button size="icon" variant="ghost" className="rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 h-10 w-10">
                                <Heart className="h-5 w-5" />
                            </Button>
                             <Button size="icon" variant="ghost" className="rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 h-10 w-10">
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>

        {/* Right Panel (Stories / Live) - Replicating "Today" and "Live Rooms" */}
        <div className="w-full lg:w-[380px] flex flex-col gap-8 p-4">
             {/* Today Section */}
             <div>
                <h3 className="text-2xl font-light mb-6 text-white/90">Today</h3>
                <div className="relative rounded-[40px] overflow-hidden aspect-[3/4] group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                         <Avatar className="h-8 w-8 border border-white/50">
                            <AvatarFallback>E</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Ethan</span>
                    </div>

                     <div className="absolute bottom-6 inset-x-6">
                        <div className="flex items-center justify-between p-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/10">
                             <div className="flex -space-x-2 px-2">
                                  {[1,2,3].map(i => (
                                     <div key={i} className="h-6 w-6 rounded-full bg-white/20 border border-white/10" />
                                  ))}
                             </div>
                             <span className="text-xs font-medium pr-2">Stories</span>
                        </div>
                     </div>
                </div>
             </div>

             {/* Live Rooms Section - The Orange Card */}
             <div className="mt-auto">
                 <div className="flex items-center gap-2 mb-4">
                     <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                     <h3 className="text-lg font-medium">Live Rooms (6)</h3>
                 </div>
                 
                 <div className="relative rounded-[32px] overflow-hidden bg-linear-to-br from-[#FF6B00] to-[#FF2E00] aspect-[4/5] p-6 flex flex-col justify-end group cursor-pointer shadow-2xl shadow-orange-900/40">
                      {/* Abstract Background Design */}
                      <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                          <div className="absolute top-0 right-0 h-64 w-64 bg-yellow-400 rounded-full blur-[80px]" />
                          <div className="absolute bottom-0 left-0 h-64 w-64 bg-red-900 rounded-full blur-[80px]" />
                      </div>

                      <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                              <Badge className="bg-black/20 hover:bg-black/30 text-white border-0 backdrop-blur-md">
                                  Hip-Hop Night
                              </Badge>
                              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                  550K Followers
                              </Badge>
                          </div>
                          
                          <h2 className="text-3xl font-bold leading-tight mb-2">
                              21 August<br />
                              A freestyle session<br />
                              with rising stars
                          </h2>
                          
                          <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center gap-2 text-white/80 text-sm">
                                  <div className="h-5 w-5 rounded bg-white/20 flex items-center justify-center">
                                    <Play className="h-3 w-3 fill-current" />
                                  </div>
                                  Lounge P2
                              </div>
                              <Button size="sm" variant="secondary" className="rounded-full h-8 px-4 bg-white/20 hover:bg-white/30 text-white border border-white/40">
                                  Join +
                              </Button>
                          </div>
                      </div>
                 </div>
             </div>
        </div>
    </div>
  );
}
