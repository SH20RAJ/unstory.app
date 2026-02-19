"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CommunityHeroProps {
  name: string;
  image: string;
}

export function CommunityHero({ name, image }: CommunityHeroProps) {
  return (
    <div className={`w-full h-48 ${image} rounded-b-3xl relative mb-12`}>
        <Link href="/community" className="absolute top-4 left-4">
            <Button size="icon" variant="secondary" className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10">
                <ArrowLeft className="h-5 w-5" />
            </Button>
        </Link>
        
        <div className="absolute -bottom-10 left-8">
            <div className={`h-24 w-24 rounded-3xl ${image} border-4 border-[#09090b] shadow-2xl flex items-center justify-center`}>
                <span className="text-4xl text-white font-bold">
                    {name[0]}
                </span>
            </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
                <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold">
                Join Community
                </Button>
        </div>
    </div>
  );
}
