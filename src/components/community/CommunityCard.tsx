"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { Community } from "@/db/schema";
import Image from "next/image";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link 
        href={`/community/${community.slug || community.id}`}
        className="group"
    >
        <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all hover:translate-y-[-2px]">
            {/* Cover */}
            <div className={`h-24 w-full opacity-80 group-hover:opacity-100 transition-opacity relative`}>
                {community.image && community.image.startsWith('http') ? (
                    <Image src={community.image} fill className="object-cover" alt={community.name} />
                ) : (
                    <div className="w-full h-full bg-[#1A1A1A]" />
                )}
            </div>
            
            <div className="p-5 pt-0 relative">
                    {/* Icon */}
                    <div className={`h-16 w-16 rounded-2xl border-4 border-[#121212] absolute -top-8 flex items-center justify-center text-2xl shadow-lg overflow-hidden bg-[#222]`}>
                        {community.image && community.image.startsWith('http') ? (
                            <Image src={community.image} fill className="object-cover" alt="icon" />
                        ) : (
                            <span className="text-white z-10">{community.name[0]}</span>
                        )}
                    </div>

                    <div className="mt-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFE500] transition-colors">{community.name}</h3>
                    <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {community.memberCount || 0} Members</span>
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
