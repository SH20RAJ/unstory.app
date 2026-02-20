import { PublicProfileClient } from "@/components/profile/PublicProfileClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { users, colleges, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { Post } from "@/components/dashboard/feed/FeedPost";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedName = decodeURIComponent(username).replace('@', '');
  return {
    title: `${decodedName} | Unstory`,
    description: `View ${decodedName}'s profile on Unstory.`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decodedName = decodeURIComponent(username).replace('@', '');

  const profileUser = await db.query.users.findFirst({
      where: eq(users.username, decodedName),
      with: {
          collegeId: false // we can fetch college info using db.query if relations are set, or separately
      }
  });

  if (!profileUser) return notFound();

  let collegeData = null;
  if (profileUser.collegeId) {
       collegeData = await db.query.colleges.findFirst({
           where: eq(colleges.id, profileUser.collegeId)
       });
  }

  const stackUser = await stackServerApp.getUser();
  const isCurrentUser = stackUser?.id === profileUser.id;

  const rawPosts = await db.query.posts.findMany({
      where: eq(posts.userId, profileUser.id),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });

  const mappedPosts = rawPosts.map(p => ({
      id: p.id,
      user: {
          name: profileUser.nickname || profileUser.name,
          username: profileUser.username || 'user',
          avatar: profileUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser.username}`,
          verified: !!profileUser.verified,
          collegeSafeName: collegeData?.name || undefined,
      },
      time: new Date(p.createdAt).toLocaleDateString(),
      type: p.type as Post['type'],
      content: p.content || '',
      image: p.mediaUrls?.[0],
      poll: p.pollDetails as unknown as Post['poll'],
      event: p.eventDetails as unknown as Post['event'],
      article: p.articleDetails as unknown as Post['article'],
      likes: p.likesCount || 0,
      comments: p.commentsCount || 0,
      shares: p.sharesCount || 0,
  }));

  return (
    <DashboardLayout>
      <PublicProfileClient user={profileUser} college={collegeData} isCurrentUser={isCurrentUser} initialPosts={mappedPosts} />
    </DashboardLayout>
  );
}
