"use client";

import { Button } from "@/components/ui/button";

export function CommunityTabs() {
  return (
    <div className="flex gap-4 border-b border-white/10 pb-1">
        <Button variant="ghost" className="rounded-none border-b-2 border-[#FFE500] text-[#FFE500] hover:bg-transparent px-2">Feed</Button>
        <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Events</Button>
        <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Members</Button>
        <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Resources</Button>
    </div>
  );
}
