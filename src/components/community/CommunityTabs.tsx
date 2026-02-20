"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CommunityTabsProps {
  slug: string;
  activeTab: string;
}

export function CommunityTabs({ slug, activeTab }: CommunityTabsProps) {
  const tabs = [
    { id: "feed", label: "Feed" },
    { id: "events", label: "Events" },
    { id: "members", label: "Members" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <div className="flex gap-4 border-b border-white/10 pb-1 overflow-x-auto scrollbar-hide">
      {tabs.map(tab => (
        <Link key={tab.id} href={`/community/${slug}?tab=${tab.id}`}>
          <Button 
            variant="ghost" 
            className={cn(
              "rounded-none border-b-2 px-2 hover:bg-transparent transition-colors",
              activeTab === tab.id 
                ? "border-[#FFE500] text-[#FFE500]" 
                : "border-transparent text-white/60 hover:text-white"
            )}
          >
            {tab.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
