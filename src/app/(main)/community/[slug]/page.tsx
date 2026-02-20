import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MessageCircle } from "lucide-react";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CommunityStats } from "@/components/community/CommunityStats";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { CommunityMembers } from "@/components/community/CommunityMembers";
import { Metadata } from "next";
import { getCommunityBySlugOrId, getCommunityMembers } from "@/actions/community.actions";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const community = await getCommunityBySlugOrId(slug);

  if (!community) {
    return {
      title: "Community Not Found",
    };
  }

  return {
    title: `${community.name} | Unstory`,
    description: `Join ${community.name} on Unstory. ${community.memberCount || 0} members.`,
  };
}

export default async function CommunityPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const activeTab = typeof sp?.tab === 'string' ? sp.tab : 'feed';

  const community = await getCommunityBySlugOrId(slug);

  if (!community) {
    return notFound();
  }

  // Fetch members only if "members" tab is active
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let membersList: any[] = [];
  if (activeTab === 'members') {
      membersList = await getCommunityMembers(community.name);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
        <CommunityHero name={community.name} image={community.image || ''} />

        <div className="px-8 mt-2 space-y-6">
            <CommunityStats name={community.name} count={community.memberCount || 0} />
            <CommunityTabs slug={slug} activeTab={activeTab} />

            {/* Content Switcher */}
            <div className="py-4">
               {activeTab === 'feed' && (
                 <div className="py-8 text-center text-white/30 border border-dashed border-white/10 rounded-xl h-64 flex flex-col items-center justify-center gap-4">
                    <MessageCircle className="h-10 w-10 text-white/10" />
                    <p>Community feed coming soon...</p>
                 </div>
               )}

               {activeTab === 'members' && (
                 <CommunityMembers members={membersList} />
               )}

               {['events', 'resources'].includes(activeTab) && (
                 <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-2xl bg-[#121212]">
                    <p>Coming soon...</p>
                 </div>
               )}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
