"use server";

import { db } from "@/db/drizzle";
import { posts, users } from "@/db/schema";
import { desc, sql, eq } from "drizzle-orm";

export async function getExploreMediaPosts() {
  const mediaPosts = await db.query.posts.findMany({
      where: sql`${posts.mediaUrls} IS NOT NULL AND array_length(${posts.mediaUrls}, 1) > 0`,
      orderBy: [desc(posts.createdAt)],
      limit: 30,
  });

  const exploreItems = mediaPosts.map(p => {
    const aspects = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-video"];
    const aspect = aspects[p.id % aspects.length];

    return {
      id: p.id,
      image: p.mediaUrls?.[0] || "",
      aspect,
      metrics: {
        likes: p.likesCount || 0,
        comments: p.commentsCount || 0,
      },
      type: p.type || "image"
    };
  });

  return exploreItems;
}

export async function getArticleById(id: number) {
  const rawPost = await db.select({
      post: posts,
      user: users,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .where(eq(posts.id, id))
  .limit(1);

  if (rawPost.length === 0) {
      return null;
  }

  const { post, user } = rawPost[0];
  const articleDetails = post.articleDetails as Record<string, unknown>;

  return {
      category: String(articleDetails?.category || "Campus News"),
      title: String(articleDetails?.title || "Untitled Article"),
      author: {
          name: user.nickname || user.name,
          avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          date: new Date(post.createdAt).toLocaleDateString(),
          readTime: String(articleDetails?.readTime || "3 min read"),
      },
      coverImage: post.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
      content: post.content || 'No content provided.',
      stats: {
          likes: post.likesCount || 0,
          comments: post.commentsCount || 0,
      }
  };
}
