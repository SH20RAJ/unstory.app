"use server";

import { db } from "@/db/drizzle";
import { posts, users, colleges, stories, comments, likes } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { desc, sql, eq } from "drizzle-orm";

export async function getDashboardFeedPosts() {
  const rawPosts = await db.select({
      post: posts,
      user: users,
      college: colleges,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .leftJoin(colleges, eq(users.collegeId, colleges.id))
  .orderBy(desc(posts.createdAt))
  .limit(30);

  return rawPosts;
}

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

export async function getSinglePost(id: number) {
  const rawPost = await db.select({
      post: posts,
      user: users,
      college: colleges,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .leftJoin(colleges, eq(users.collegeId, colleges.id))
  .where(eq(posts.id, id))
  .limit(1);

  if (rawPost.length === 0) return null;

  return rawPost[0];
}
export async function getActiveStories() {
  const activeStories = await db.select({
      story: stories,
      user: users,
  })
  .from(stories)
  .innerJoin(users, eq(stories.userId, users.id))
  .orderBy(desc(stories.createdAt))
  .limit(20);

  return activeStories;
}

// --- Post Interactions ---

export async function getPostComments(postId: number) {
  const postComments = await db.select({
    comment: comments,
    user: users,
  })
  .from(comments)
  .innerJoin(users, eq(comments.userId, users.id))
  .where(eq(comments.postId, postId))
  .orderBy(desc(comments.createdAt));

  return postComments.map(c => ({
    id: c.comment.id,
    user: {
      name: c.user.name,
      username: c.user.username || 'user',
      avatar: c.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user.username}`,
      verified: c.user.verified || false,
    },
    content: c.comment.content,
    time: new Date(c.comment.createdAt).toLocaleDateString(),
  }));
}

export async function addComment(postId: number, content: string) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) throw new Error("Unauthorized");

  // Insert comment
  await db.insert(comments).values({
    postId,
    userId: stackUser.id,
    content,
  });

  // Increment comments count
  await db.update(posts)
    .set({ commentsCount: sql`${posts.commentsCount} + 1` })
    .where(eq(posts.id, postId));

  return { success: true };
}

export async function toggleLikePost(postId: number) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) throw new Error("Unauthorized");

  const existingLike = await db.query.likes.findFirst({
    where: (likes, { and, eq }) => and(eq(likes.postId, postId), eq(likes.userId, stackUser.id))
  });

  if (existingLike) {
    // Unlike
    await db.delete(likes)
      .where(sql`${likes.postId} = ${postId} AND ${likes.userId} = ${stackUser.id}`);
    
    await db.update(posts)
      .set({ likesCount: sql`${posts.likesCount} - 1` })
      .where(eq(posts.id, postId));
    
    return { liked: false };
  } else {
    // Like
    await db.insert(likes).values({
      postId,
      userId: stackUser.id,
    });
    
    await db.update(posts)
      .set({ likesCount: sql`${posts.likesCount} + 1` })
      .where(eq(posts.id, postId));
    
    return { liked: true };
  }
}

