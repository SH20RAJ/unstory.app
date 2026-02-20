"use server";

import { db } from "@/db/drizzle";
import { users, posts, communities, colleges } from "@/db/schema";
import { ilike, or, desc, eq } from "drizzle-orm";

export async function getSearchResults(query: string) {
  if (!query || query.trim() === "") {
    return { users: [], communities: [], posts: [] };
  }

  const searchPattern = `%${query}%`;

  // 1. Search Users
  const matchedUsers = await db.select({
      id: users.id,
      name: users.name,
      nickname: users.nickname,
      username: users.username,
      avatar: users.avatar,
      verified: users.verified,
      collegeSafeName: colleges.name
  })
  .from(users)
  .leftJoin(colleges, eq(users.collegeId, colleges.id))
  .where(
      or(
          ilike(users.name, searchPattern),
          ilike(users.username, searchPattern),
          ilike(users.nickname, searchPattern)
      )
  )
  .limit(10);

  // 2. Search Communities
  const matchedCommunities = await db.query.communities.findMany({
      where: or(
          ilike(communities.name, searchPattern),
          ilike(communities.description, searchPattern)
      ),
      limit: 10
  });

  // 3. Search Posts (text, content, or hashtags)
  const matchedPosts = await db.select({
      post: posts,
      user: users,
      college: colleges,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .leftJoin(colleges, eq(users.collegeId, colleges.id))
  .where(ilike(posts.content, searchPattern))
  .orderBy(desc(posts.createdAt))
  .limit(20);

  // Format users
  const formattedUsers = matchedUsers.map(u => ({
      id: u.id,
      name: u.nickname || u.name,
      username: u.username || 'user',
      avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
      verified: !!u.verified,
      collegeSafeName: u.collegeSafeName,
  }));

  // Format posts
  const formattedPosts = matchedPosts.map(p => ({
      id: p.post.id,
      user: {
          name: p.user.nickname || p.user.name,
          username: p.user.username || 'user',
          avatar: p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`,
          verified: !!p.user.verified,
          collegeSafeName: p.college?.name,
      },
      time: new Date(p.post.createdAt).toLocaleDateString(),
      type: p.post.type as "text" | "image" | "video" | "poll" | "event" | "article",
      content: p.post.content || '',
      image: p.post.mediaUrls?.[0],
      poll: p.post.pollDetails as any, 
      event: p.post.eventDetails as any,
      article: p.post.articleDetails as any,
      likes: p.post.likesCount || 0,
      comments: p.post.commentsCount || 0,
      shares: p.post.sharesCount || 0,
  }));

  return {
      users: formattedUsers,
      communities: matchedCommunities,
      posts: formattedPosts
  };
}
