import { StoryRail } from "./stories/StoryRail";
import { CreatePost } from "./feed/CreatePost";
import { FeedPost, Post } from "./feed/FeedPost";
import { db } from "@/db/drizzle";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";

export async function DashboardFeed() {
  const stackUser = await stackServerApp.getUser();
  let dbUser = null;
  if (stackUser) {
      dbUser = await db.query.users.findFirst({
          where: eq(users.id, stackUser.id)
      });
  }

  // Manual join is safer if relations object isn't perfectly typed. Let's do a fast query directly using drizzle syntax.
  const rawPosts = await db.select({
      post: posts,
      user: users,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .orderBy(desc(posts.createdAt));

  // Map to the expected UI Post type
  const mappedPosts: Post[] = rawPosts.map(p => ({
      id: p.post.id,
      user: {
          name: p.user.nickname || p.user.name,
          username: p.user.username || 'user',
          avatar: p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`,
          verified: !!p.user.verified,
      },
      time: new Date(p.post.createdAt).toLocaleDateString(),
      type: p.post.type as Post['type'],
      content: p.post.content || '',
      image: p.post.mediaUrls?.[0],
      poll: p.post.pollDetails as unknown as Post['poll'],
      event: p.post.eventDetails as unknown as Post['event'],
      article: p.post.articleDetails as unknown as Post['article'],
      likes: p.post.likesCount || 0,
      comments: p.post.commentsCount || 0,
      shares: p.post.sharesCount || 0,
  }));

  return (
    <div className="flex flex-col gap-8 h-full max-w-2xl mx-auto w-full">
        <StoryRail />
        <CreatePost userAvatar={dbUser?.avatar || null} userName={dbUser?.nickname || dbUser?.name || "User"} />
        
        <div className="space-y-6">
            {mappedPosts.map((post) => (
                <FeedPost key={post.id} post={post} />
            ))}
            {mappedPosts.length === 0 && (
                <div className="text-center text-muted-foreground py-10">No posts yet. Be the first to share!</div>
            )}
        </div>
    </div>
  );
}
