"use client";

import { useParams, notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";
import { COMMUNITIES } from "@db/users"; // Using the alias we set up

export default function CommunityPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Simple slug matching: "Coding Club" -> "coding-club"
  const community = COMMUNITIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!community) {
    return notFound();
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
        {/* Header Image/Color */}
        <div className={`w-full h-48 ${community.image} rounded-b-3xl relative mb-12`}>
            <Link href="/home" className="absolute top-4 left-4">
                <Button size="icon" variant="secondary" className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </Link>
            
            <div className="absolute -bottom-10 left-8">
                <div className={`h-24 w-24 rounded-3xl ${community.image} border-4 border-[#09090b] shadow-2xl flex items-center justify-center`}>
                    <span className="text-4xl">
                        {community.name[0]}
                    </span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
                 <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold">
                    Join Community
                 </Button>
            </div>
        </div>

        <div className="px-8 mt-2 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-1">{community.name}</h1>
                <div className="flex items-center gap-4 text-white/50 text-sm">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {community.count} Members</span>
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Created 2024</span>
                </div>
            </div>

            <p className="text-white/80 max-w-2xl leading-relaxed">
                Welcome to the official {community.name}. Connect with fellow students, share resources, and participate in events.
            </p>

            {/* Quick Actions / Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-1">
                <Button variant="ghost" className="rounded-none border-b-2 border-[#FFE500] text-[#FFE500] hover:bg-transparent px-2">Feed</Button>
                <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Events</Button>
                <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Members</Button>
                <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-white/60 hover:text-white hover:bg-transparent px-2">Resources</Button>
            </div>

            {/* Content Placeholder */}
            <div className="py-8 text-center text-white/30 border border-dashed border-white/10 rounded-xl h-64 flex flex-col items-center justify-center gap-4">
                <MessageCircle className="h-10 w-10 text-white/10" />
                <p>Community feed coming soon...</p>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
