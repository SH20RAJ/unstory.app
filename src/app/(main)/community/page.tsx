import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COMMUNITIES } from "@db/users";
import { CommunityFilters } from "@/components/community/CommunityFilters";
import { CommunityCard } from "@/components/community/CommunityCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communities | Unstory",
  description: "Explore and join student communities, clubs, and societies.",
};

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

        <CommunityFilters />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITIES.map((community) => (
                <CommunityCard key={community.name} community={community} />
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
