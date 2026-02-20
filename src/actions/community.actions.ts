"use server";

import { db } from "@/db/drizzle";
import { communities, users, colleges } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export async function getAllCommunities() {
  return await db.query.communities.findMany();
}

export async function getCommunityBySlugOrId(slug: string) {
  const numericId = parseInt(slug, 10);
  
  return await db.query.communities.findFirst({
      where: isNaN(numericId)
          ? eq(communities.slug, slug)
          : or(eq(communities.slug, slug), eq(communities.id, numericId))
  });
}

export async function getCommunityMembers(communityName: string) {
  // Using SQL to check if the community name exists in the interests array
  const rawMembers = await db.select({
      user: users,
      college: colleges,
  })
  .from(users)
  .leftJoin(colleges, eq(users.collegeId, colleges.id))
  .where(sql`${communityName} = ANY(${users.interests})`)
  .limit(50);

  return rawMembers.map(m => ({
      id: m.user.id,
      name: m.user.nickname || m.user.name,
      username: m.user.username || 'user',
      avatar: m.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.user.username}`,
      bio: m.user.bio,
      college: m.college?.name,
      verified: !!m.user.verified,
  }));
}

