"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

interface CommunityCardProps {
  community: {
    name: string;
    count: number;
    image: string;
  };
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link 
        href={`/community/${community.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="group"
    >
        <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all hover:translate-y-[-2px]">
            {/* Cover */}
            <div className={`h-24 w-full ${community.image} opacity-80 group-hover:opacity-100 transition-opacity`} />
            
            <div className="p-5 pt-0 relative">
                    {/* Icon */}
                    <div className={`h-16 w-16 rounded-2xl ${community.image} border-4 border-[#121212] absolute -top-8 flex items-center justify-center text-2xl shadow-lg`}>
                    {community.name[0]}
                    </div>

                    <div className="mt-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFE500] transition-colors">{community.name}</h3>
                    <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {community.count} Members</span>
                    </div>
                    
                    <Button variant="ghost" className="w-full justify-between hover:bg-white/5 text-white/60 group-hover:text-white group-hover:pl-4 transition-all">
                        View Community <ArrowRight className="h-4 w-4" />
                    </Button>
                    </div>
            </div>
        </div>
    </Link>
  );
}
