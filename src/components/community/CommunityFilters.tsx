"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function CommunityFilters() {
  return (
    <div className="space-y-4 mb-8">
        {/* Search */}
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input 
                placeholder="Search for clubs, societies, and groups..." 
                className="pl-10 h-12 bg-[#1A1A1A] border-white/10 text-white rounded-xl focus:border-[#FFE500]/50 transition-colors"
            />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Academic", "Cultural", "Sports", "Tech", "Arts"].map((cat, i) => (
                <Button 
                    key={cat} 
                    variant="outline" 
                    className={`rounded-full border-white/10 hover:bg-white/10 ${i === 0 ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white'}`}
                >
                    {cat}
                </Button>
            ))}
        </div>
    </div>
  );
}
