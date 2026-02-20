"use client";

import { DatingProfile } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, BookOpen } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle } from "lucide-react";

interface DatingCardProps {
  profile: DatingProfile & { username?: string | null };
}

export function DatingCard({ profile }: DatingCardProps) {
  return (
    <div className="relative w-full h-full bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none">
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={profile.images?.[0] || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60'}
          alt={profile.name}
          fill
          className="object-cover pointer-events-none"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-3xl font-bold text-white flex items-baseline gap-2">
                {profile.name}
                <span className="text-xl font-normal text-white/80">{profile.age}</span>
                </h2>
                
                <div className="flex items-center gap-2 text-white/90 mt-1 font-medium">
                    <GraduationCap className="h-5 w-5 text-[#FFE500]" />
                    {profile.university}
                </div>
            </div>
             <div className="flex items-center gap-1 text-white/60 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                <MapPin className="h-3 w-3" />
                {profile.distance}
            </div>
            {profile.username && (
                <Link href={`/@${profile.username}`}>
                  <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                      <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
            )}
        </div>

        <div className="flex items-center gap-2 text-white/70 text-sm">
            <BookOpen className="h-4 w-4" />
            {profile.major}
        </div>

        <p className="text-white/80 text-base line-clamp-2 leading-relaxed">
            {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
            {(profile.interests || []).map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                    {interest}
                </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
