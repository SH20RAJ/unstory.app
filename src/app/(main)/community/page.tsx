"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { COMMUNITIES } from "@db/users";

export default function CommunityLandingPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-4 py-8 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
             <div>
                <h1 className="text-3xl font-bold text-white mb-2">Communities</h1>
                <p className="text-white/50">Find your tribe inside campus.</p>
             </div>
             <Button className="rounded-full bg-[#FFE500] text-black hover:bg-[#FFE500]/90 font-bold gap-2">
                <Plus className="h-4 w-4" /> Create Community
             </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input 
                placeholder="Search for clubs, societies, and groups..." 
                className="pl-10 h-12 bg-[#1A1A1A] border-white/10 text-white rounded-xl focus:border-[#FFE500]/50 transition-colors"
            />
        </div>

        {/* Categories (Tabs placeholder) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITIES.map((community) => (
                <Link 
                    key={community.name} 
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
            ))}

            {/* Create New Card Placeholder */}
            <button className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 rounded-3xl h-full min-h-[250px] hover:border-white/20 hover:bg-white/5 transition-all group">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FFE500] transition-colors">
                    <Plus className="h-8 w-8 text-white/40 group-hover:text-black transition-colors" />
                </div>
                <span className="font-medium text-white/60 group-hover:text-white">Create New Community</span>
            </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
