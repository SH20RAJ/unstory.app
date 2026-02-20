import { PublicProfileClient } from "@/components/profile/PublicProfileClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { users, colleges, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/stack/server";

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
      },
      time: new Date(p.createdAt).toLocaleDateString(),
      type: p.type as any,
      content: p.content || '',
      image: p.mediaUrls?.[0],
      poll: p.pollDetails as any,
      event: p.eventDetails as any,
      article: p.articleDetails as any,
      likes: p.likesCount || 0,
      comments: p.commentsCount || 0,
      shares: p.sharesCount || 0,
  }));

  return <PublicProfileClient user={profileUser} college={collegeData} isCurrentUser={isCurrentUser} initialPosts={mappedPosts} />;
}
