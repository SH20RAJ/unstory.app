"use client";

import { Users, Calendar } from "lucide-react";

interface CommunityStatsProps {
  name: string;
  count: number;
}

export function CommunityStats({ name, count }: CommunityStatsProps) {
  return (
    <div className="space-y-4">
        <div>
            <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
            <div className="flex items-center gap-4 text-white/50 text-sm">
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {count} Members</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Created 2024</span>
            </div>
        </div>

        <p className="text-white/80 max-w-2xl leading-relaxed">
            Welcome to the official {name}. Connect with fellow students, share resources, and participate in events.
        </p>
    </div>
  );
}
