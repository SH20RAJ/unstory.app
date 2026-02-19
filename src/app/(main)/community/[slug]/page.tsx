import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MessageCircle } from "lucide-react";
import { COMMUNITIES } from "@db/users";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CommunityStats } from "@/components/community/CommunityStats";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const community = COMMUNITIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!community) {
    return {
      title: "Community Not Found",
    };
  }

  return {
    title: `${community.name} | Unstory`,
    description: `Join ${community.name} on Unstory. ${community.count} members.`,
  };
}

export default async function CommunityPage({ params }: PageProps) {
  const { slug } = await params;

  const community = COMMUNITIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!community) {
    return notFound();
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
        <CommunityHero name={community.name} image={community.image} />

        <div className="px-8 mt-2 space-y-6">
            <CommunityStats name={community.name} count={community.count} />
            <CommunityTabs />

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
