"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string | null;
  college?: string | null;
  verified: boolean;
}

export function CommunityMembers({ members }: { members: Member[] }) {
  if (members.length === 0) {
    return (
      <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-2xl bg-[#121212]">
        <p>No members found with this interest yet.</p>
        <p className="text-sm mt-2">Update your profile interests to join!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {members.map((member) => (
        <Link key={member.id} href={`/@${member.username}`}>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121212] border border-white/5 hover:bg-[#1A1A1A] transition-colors group">
            <Avatar className="h-12 w-12 border border-white/10 group-hover:scale-105 transition-transform">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-bold text-white truncate group-hover:underline decoration-[#FFE500] underline-offset-2">
                    {member.name}
                  </span>
                  {member.verified && (
                    <span className="bg-blue-500/20 text-blue-500 text-[10px] px-1.5 rounded-full shrink-0">✓</span>
                  )}
                </div>
              </div>
              
              <span className="text-white/40 text-xs truncate">@{member.username}</span>
              
              {member.bio && (
                <p className="text-white/70 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>
              )}
              
              {member.college && (
                <div className="mt-3">
                  <Badge variant="outline" className="bg-white/5 text-white/60 border-white/10 group-hover:bg-white/10 transition-colors pointer-events-none">
                    {member.college}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
